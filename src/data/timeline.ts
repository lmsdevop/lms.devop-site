import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type TimelineType = "education" | "milestone" | "work";

export type TimelineEntry = {
  id: string;
  type: TimelineType;
  /** Free-form period label so entries can span months or be open-ended. */
  period: Localized;
  present?: boolean;
  title: Localized;
  org: Localized;
  description: Localized;
  tags: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "first-lines",
    type: "milestone",
    period: { pt: "2023", en: "2023" },
    title: {
      pt: "As primeiras linhas",
      en: "The first lines",
    },
    org: { pt: "Autodidata", en: "Self-taught" },
    description: {
      pt: "Criei minha conta no GitHub e comecei a publicar tudo o que estudava: HTML semântico, CSS moderno e os primeiros scripts em JavaScript. O site que você está lendo nasceu nessa época — em HTML puro.",
      en: "I created my GitHub account and started publishing everything I studied: semantic HTML, modern CSS and my first JavaScript scripts. The site you're reading was born back then — in plain HTML.",
    },
    tags: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    id: "alura",
    type: "education",
    period: { pt: "2023", en: "2023" },
    title: {
      pt: "Formação front-end e back-end",
      en: "Front-end and back-end tracks",
    },
    org: { pt: "Alura", en: "Alura" },
    description: {
      pt: "Mergulhei em projetos guiados: clone do Alura Space com CSS avançado, a Jogoteca em Python/Flask, um carrinho de compras em Python e meu primeiro consumo de API externa com um app de clima.",
      en: "I dove into guided projects: an Alura Space clone with advanced CSS, the Jogoteca app in Python/Flask, a shopping cart in Python and my first external API integration with a weather app.",
    },
    tags: ["Python", "Flask", "CSS", "REST APIs"],
  },
  {
    id: "byu-start",
    type: "education",
    period: { pt: "2023 — 2024", en: "2023 — 2024" },
    title: {
      pt: "Fundamentos de programação",
      en: "Programming fundamentals",
    },
    org: {
      pt: "BYU-Idaho · BYU-Pathway Worldwide",
      en: "BYU-Idaho · BYU-Pathway Worldwide",
    },
    description: {
      pt: "Entrei no programa de Desenvolvimento de Software. Passei por JavaScript (CSE 121B), fundamentos de bancos de dados (CIT 111) e programação orientada a objetos em C# (CSE 210) — todas as disciplinas versionadas em repositórios públicos.",
      en: "I joined the Software Development program. I worked through JavaScript (CSE 121B), database fundamentals (CIT 111) and object-oriented programming in C# (CSE 210) — every course versioned in a public repository.",
    },
    tags: ["JavaScript", "C#", "SQL", "OOP"],
  },
  {
    id: "byu-web",
    type: "education",
    period: { pt: "2024", en: "2024" },
    title: {
      pt: "Front-end e back-end na prática",
      en: "Front-end and back-end in practice",
    },
    org: { pt: "BYU-Idaho", en: "BYU-Idaho" },
    description: {
      pt: "Ano de virada: WDD 230 e WDD 330 me deram front-end com JavaScript puro e consumo de APIs; CSE 340 trouxe uma aplicação MVC completa em Express; CSE 341 foi sobre construir web services REST com MongoDB e documentação em Swagger.",
      en: "The turning-point year: WDD 230 and WDD 330 covered front-end with vanilla JavaScript and API consumption; CSE 340 delivered a full MVC application in Express; CSE 341 was about building REST web services with MongoDB and Swagger docs.",
    },
    tags: ["Node.js", "Express", "MongoDB", "Swagger", "MVC"],
  },
  {
    id: "react-deep-dive",
    type: "milestone",
    period: { pt: "Fim de 2024", en: "Late 2024" },
    title: {
      pt: "Especialização em React e TypeScript",
      en: "Going deep on React and TypeScript",
    },
    org: { pt: "Estudos próprios", en: "Personal study" },
    description: {
      pt: "Migrei meu foco para o ecossistema React: componentes, hooks, estado e tipagem. Construí o Organo em React, publiquei estudos em TypeScript e comecei a tratar acessibilidade como requisito, não como enfeite.",
      en: "I shifted focus to the React ecosystem: components, hooks, state and typing. I built Organo in React, published TypeScript studies and started treating accessibility as a requirement rather than a nice-to-have.",
    },
    tags: ["React", "TypeScript", "Hooks", "A11y"],
  },
  {
    id: "fullstack-project",
    type: "education",
    period: { pt: "2025", en: "2025" },
    title: {
      pt: "Projeto full-stack em equipe",
      en: "Full-stack team project",
    },
    org: { pt: "BYU-Idaho · WDD 430", en: "BYU-Idaho · WDD 430" },
    description: {
      pt: "Trabalhei em grupo em uma aplicação full-stack com banco relacional, autenticação e deploy contínuo. Aprendi tanto sobre code review e comunicação quanto sobre código.",
      en: "I worked in a team on a full-stack application with a relational database, authentication and continuous deployment. I learned as much about code review and communication as about code.",
    },
    tags: ["Full-stack", "PostgreSQL", "Auth", "Teamwork"],
  },
  {
    id: "shipping",
    type: "milestone",
    period: { pt: "2026", en: "2026" },
    title: {
      pt: "Colocando produto no ar",
      en: "Shipping to production",
    },
    org: { pt: "Projetos próprios", en: "Personal projects" },
    description: {
      pt: "Comecei a publicar aplicações de verdade, com usuários de verdade: o FSY App entrou no ar na Vercel e este portfólio foi reconstruído do zero em Next.js 16 com React Server Components.",
      en: "I started shipping real applications with real users: the FSY App went live on Vercel and this portfolio was rebuilt from scratch on Next.js 16 with React Server Components.",
    },
    tags: ["Next.js", "Vercel", "RSC", "Performance"],
  },
  {
    id: "open-to-work",
    type: "work",
    period: { pt: "Hoje", en: "Today" },
    present: true,
    title: {
      pt: "Aberto a oportunidades",
      en: "Open to opportunities",
    },
    org: { pt: "Remoto ou Rio de Janeiro", en: "Remote or Rio de Janeiro" },
    description: {
      pt: "Procuro um time onde eu possa contribuir em produto de verdade, aprender com gente mais experiente e continuar entregando com qualidade. Front-end, back-end ou os dois.",
      en: "I'm looking for a team where I can contribute to a real product, learn from more experienced people and keep shipping quality work. Front-end, back-end or both.",
    },
    tags: ["Full-stack", "Remoto", "Júnior"],
  },
];

/** Fed into the animated counters; repos/languages come from the GitHub API. */
export const coursesCompleted = 9;
