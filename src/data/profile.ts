/**
 * Single source of truth for everything personal about the site owner.
 * Editing this file is enough to rebrand the whole portfolio.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lmsdevop.vercel.app",
  brand: "lms.devop",
  brandParts: { prefix: "lms", suffix: "devop" },
};

export const profile = {
  name: "Lucas Mendonça",
  shortName: "Lucas",
  initials: "LM",
  email: "lms.devop@gmail.com",
  githubUsername: "lmsdevop",
  /** Fallback avatar in case the GitHub API is unreachable at build time. */
  avatarFallback: "https://avatars.githubusercontent.com/u/127643515?v=4",
  timeZone: "America/Sao_Paulo",
  codingSince: 2023,
  repoUrl: "https://github.com/lmsdevop/lms.devop-site",
} as const;

/**
 * Path to the résumé PDF inside `public/`. Keep it `null` until the file
 * exists — the download CTAs hide themselves instead of linking to a 404.
 */
export const resumePath: string | null = null;

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "facebook" | "mail";
};

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@lmsdevop",
    href: "https://github.com/lmsdevop",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/lmsdevop",
    href: "https://www.linkedin.com/in/lmsdevop/",
    icon: "linkedin",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "lukemendonc",
    href: "https://web.facebook.com/lukemendonc",
    icon: "facebook",
  },
  {
    id: "email",
    label: "E-mail",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
];

/** Order here drives the header nav, the scroll spy and the command palette. */
export const sections = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "skills", key: "skills" },
  { id: "work", key: "work" },
  { id: "journey", key: "journey" },
  { id: "contact", key: "contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export type NavKey = (typeof sections)[number]["key"];

/** Rendered in the infinite marquee under the hero. */
export const techMarquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "C#",
  "Git",
  "Vercel",
  "REST APIs",
  "Motion",
  "Figma",
];
