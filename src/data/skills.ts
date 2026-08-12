export type SkillLevel = "learning" | "comfortable" | "strong";

export type Skill = {
  name: string;
  level: SkillLevel;
  /** 0-100, drives the bar width. Keep it honest. */
  score: number;
};

export type SkillCategoryId = "frontend" | "backend" | "data" | "tooling";

export type SkillCategory = {
  id: SkillCategoryId;
  /** Lucide icon name resolved in the Skills component. */
  icon: "layout" | "server" | "database" | "wrench";
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    icon: "layout",
    skills: [
      { name: "React", level: "strong", score: 88 },
      { name: "Next.js", level: "strong", score: 84 },
      { name: "TypeScript", level: "comfortable", score: 78 },
      { name: "JavaScript (ES2023+)", level: "strong", score: 90 },
      { name: "HTML semântico", level: "strong", score: 92 },
      { name: "CSS / Sass", level: "strong", score: 88 },
      { name: "Tailwind CSS", level: "strong", score: 85 },
      { name: "Acessibilidade (WCAG)", level: "comfortable", score: 72 },
      { name: "Motion / animações", level: "comfortable", score: 70 },
    ],
  },
  {
    id: "backend",
    icon: "server",
    skills: [
      { name: "Node.js", level: "comfortable", score: 78 },
      { name: "Express", level: "comfortable", score: 76 },
      { name: "REST APIs", level: "comfortable", score: 80 },
      { name: "Autenticação / JWT", level: "comfortable", score: 68 },
      { name: "Python", level: "comfortable", score: 70 },
      { name: "PHP", level: "learning", score: 52 },
      { name: "C#", level: "learning", score: 55 },
      { name: "Testes automatizados", level: "learning", score: 48 },
    ],
  },
  {
    id: "data",
    icon: "database",
    skills: [
      { name: "MongoDB", level: "comfortable", score: 74 },
      { name: "SQL (MySQL / Postgres)", level: "comfortable", score: 68 },
      { name: "Modelagem de dados", level: "comfortable", score: 66 },
      { name: "Swagger / OpenAPI", level: "comfortable", score: 70 },
      { name: "Integração de APIs externas", level: "strong", score: 82 },
    ],
  },
  {
    id: "tooling",
    icon: "wrench",
    skills: [
      { name: "Git / GitHub", level: "strong", score: 88 },
      { name: "Vercel", level: "strong", score: 84 },
      { name: "VS Code", level: "strong", score: 92 },
      { name: "Figma", level: "comfortable", score: 66 },
      { name: "CI/CD (GitHub Actions)", level: "learning", score: 54 },
      { name: "Lighthouse / Web Vitals", level: "comfortable", score: 72 },
    ],
  },
];
