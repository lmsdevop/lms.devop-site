import { profile } from "@/data/profile";
import {
  fallbackCategory,
  featuredFallbackOrder,
  projectMeta,
  type LocalizedList,
  type LocalizedText,
  type ProjectCategory,
} from "@/data/projects";
import { coursesCompleted } from "@/data/timeline";
import { yearsSince } from "@/lib/utils";

export type Project = {
  name: string;
  title: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText | null;
  highlights: LocalizedList | null;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  stack: string[];
  hue: number;
  repoUrl: string;
  liveUrl: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
};

export type PortfolioStats = {
  repos: number;
  languages: number;
  years: number;
  courses: number;
};

export type GithubData = {
  projects: Project[];
  stats: PortfolioStats;
  avatarUrl: string;
  /** True when the GitHub API could not be reached and curation was used. */
  usedFallback: boolean;
};

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
};

type GithubUser = {
  avatar_url: string;
  public_repos: number;
};

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60;

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: raises the rate limit from 60 to 5000 requests per hour.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

/** "wdd430-project" -> "WDD430 Project", "fsy-app" -> "Fsy App" */
function prettifyRepoName(name: string) {
  return name
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      /^(wdd|cse|cit|byu|api|ui|css|html)\d*$/i.test(word)
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function toProject(repo: GithubRepo): Project | null {
  const meta = projectMeta[repo.name];
  if (meta?.hidden || repo.fork) return null;

  const title = meta?.title ?? {
    pt: prettifyRepoName(repo.name),
    en: prettifyRepoName(repo.name),
  };

  const genericSummary = repo.description
    ? { pt: repo.description, en: repo.description }
    : {
        pt: `Repositório público com o código de ${title.pt}. Abra no GitHub para ver a estrutura e o histórico de commits.`,
        en: `Public repository holding the code for ${title.en}. Open it on GitHub to browse the structure and commit history.`,
      };

  return {
    name: repo.name,
    title,
    summary: meta?.summary?.pt ? meta.summary : genericSummary,
    role: meta?.role ?? null,
    highlights: meta?.highlights ?? null,
    category: meta?.category ?? fallbackCategory(repo.name),
    featured: meta?.featured ?? false,
    order: meta?.order ?? 900,
    stack: meta?.stack?.length
      ? meta.stack
      : [repo.language, ...(repo.topics ?? [])].filter(
          (value): value is string => Boolean(value),
        ),
    hue: meta?.hue ?? 210,
    repoUrl: repo.html_url,
    liveUrl: meta?.liveUrl ?? (repo.homepage?.trim() ? repo.homepage : null),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics ?? [],
    updatedAt: repo.pushed_at ?? repo.updated_at,
  };
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

/** Rebuilds the portfolio from curated data alone, with no network access. */
function buildFallback(): GithubData {
  const projects = featuredFallbackOrder
    .map((name, index): Project | null => {
      const meta = projectMeta[name];
      if (!meta || meta.hidden) return null;
      const title = meta.title ?? {
        pt: prettifyRepoName(name),
        en: prettifyRepoName(name),
      };
      return {
        name,
        title,
        summary: meta.summary,
        role: meta.role ?? null,
        highlights: meta.highlights ?? null,
        category: meta.category,
        featured: meta.featured ?? false,
        order: meta.order ?? index,
        stack: meta.stack,
        hue: meta.hue,
        repoUrl: `https://github.com/${profile.githubUsername}/${name}`,
        liveUrl: meta.liveUrl ?? null,
        stars: 0,
        forks: 0,
        language: meta.stack[0] ?? null,
        topics: [],
        updatedAt: new Date().toISOString(),
      };
    })
    .filter((project): project is Project => project !== null);

  return {
    projects: sortProjects(projects),
    stats: {
      repos: 24,
      languages: 8,
      years: yearsSince(profile.codingSince),
      courses: coursesCompleted,
    },
    avatarUrl: profile.avatarFallback,
    usedFallback: true,
  };
}

/**
 * Fetches the public profile and repositories, merges them with the curated
 * metadata in `src/data/projects.ts` and caches the result for an hour.
 * Any failure degrades to the curated fallback instead of breaking the page.
 */
export async function getGithubData(): Promise<GithubData> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${API}/users/${profile.githubUsername}`, {
        headers: authHeaders(),
        next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
      }),
      fetch(
        `${API}/users/${profile.githubUsername}/repos?per_page=100&sort=pushed`,
        {
          headers: authHeaders(),
          next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
        },
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error(
        `GitHub API responded ${userResponse.status}/${reposResponse.status}`,
      );
    }

    const user = (await userResponse.json()) as GithubUser;
    const repos = (await reposResponse.json()) as GithubRepo[];

    const projects = sortProjects(
      repos
        .map(toProject)
        .filter((project): project is Project => project !== null),
    );

    const languages = new Set(
      repos.map((repo) => repo.language).filter(Boolean),
    );

    return {
      projects,
      stats: {
        repos: user.public_repos ?? projects.length,
        languages: languages.size,
        years: yearsSince(profile.codingSince),
        courses: coursesCompleted,
      },
      avatarUrl: user.avatar_url ?? profile.avatarFallback,
      usedFallback: false,
    };
  } catch (error) {
    console.error("[github] falling back to curated data:", error);
    return buildFallback();
  }
}
