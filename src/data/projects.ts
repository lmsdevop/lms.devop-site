import type { Locale } from "@/i18n/config";

export type ProjectCategory = "app" | "frontend" | "api" | "study";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectMeta = {
  category: ProjectCategory;
  /** Featured projects are pinned first and rendered as wide cards. */
  featured?: boolean;
  /** Lower numbers surface first inside their group. */
  order?: number;
  /** Keeps a repository out of the portfolio entirely. */
  hidden?: boolean;
  title?: LocalizedText;
  summary: LocalizedText;
  role?: LocalizedText;
  highlights?: LocalizedList;
  stack: string[];
  /** Hue (0-360) used to generate the card's gradient artwork. */
  hue: number;
  /** Overrides the repository `homepage` field when set. */
  liveUrl?: string;
};

/**
 * Hand-written context for repositories that deserve it. Anything not listed
 * here still shows up, classified by `fallbackCategory` below.
 */
export const projectMeta: Record<string, ProjectMeta> = {
  "fsy-app": {
    category: "app",
    featured: false,
    hidden: true,
    order: 1,
    hue: 268,
    liveUrl: "https://fsy-app-black.vercel.app",
    title: { pt: "FSY App", en: "FSY App" },
    summary: {
      pt: "Aplicação web para apoiar os participantes de um evento jovem de grande porte: programação, informações práticas e conteúdo consultável direto do celular.",
      en: "A web application built to support attendees of a large youth event: schedule, practical information and reference content straight from their phones.",
    },
    role: {
      pt: "Projetei a interface, estruturei as rotas e publiquei na Vercel.",
      en: "I designed the interface, structured the routes and deployed it to Vercel.",
    },
    highlights: {
      pt: [
        "Layout mobile-first, pensado para uso em pé e com internet instável",
        "Navegação por seções com carregamento progressivo",
        "Deploy contínuo na Vercel a cada push na main",
      ],
      en: [
        "Mobile-first layout designed for standing use and flaky connections",
        "Section-based navigation with progressive loading",
        "Continuous deployment to Vercel on every push to main",
      ],
    },
    stack: ["Next.js", "React", "CSS", "Vercel"],
  },

  "lms.devop-site": {
    category: "frontend",
    featured: true,
    order: 2,
    hue: 74,
    title: { pt: "Este portfólio", en: "This portfolio" },
    summary: {
      pt: "O site que você está navegando. Reconstruído do zero em Next.js 16 com React Server Components, tema claro/escuro, conteúdo bilíngue e a lista de projetos sincronizada com a API do GitHub.",
      en: "The site you're browsing. Rebuilt from scratch on Next.js 16 with React Server Components, light/dark theming, bilingual content and a project list synced with the GitHub API.",
    },
    role: {
      pt: "Design, arquitetura e implementação — do token de cor ao deploy.",
      en: "Design, architecture and implementation — from colour tokens to deployment.",
    },
    highlights: {
      pt: [
        "Conteúdo em PT-BR e EN com troca instantânea e persistência em cookie",
        "Projetos buscados na API do GitHub e revalidados de hora em hora",
        "Paleta de comandos (Ctrl+K), scroll suave e animações com respeito a prefers-reduced-motion",
      ],
      en: [
        "PT-BR and EN content with instant switching persisted in a cookie",
        "Projects pulled from the GitHub API and revalidated hourly",
        "Command palette (Ctrl+K), smooth scrolling and animations that respect prefers-reduced-motion",
      ],
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Motion"],
  },

  "wdd430-project": {
    category: "app",
    featured: false,
    hidden: true,
    order: 3,
    hue: 200,
    title: {
      pt: "Aplicação full-stack em equipe",
      en: "Full-stack team application",
    },
    summary: {
      pt: "Projeto final de desenvolvimento full-stack construído em grupo: banco relacional modelado do zero, autenticação de usuários, área administrativa e deploy contínuo.",
      en: "Final full-stack project built as a team: a relational database modelled from scratch, user authentication, an admin area and continuous deployment.",
    },
    role: {
      pt: "Atuei no front-end e nas rotas de dados, além de revisar PRs do time.",
      en: "I worked on the front-end and the data routes, and reviewed the team's pull requests.",
    },
    highlights: {
      pt: [
        "Fluxo de trabalho com branches, pull requests e code review",
        "Camada de acesso a dados isolada da interface",
        "Autenticação com sessão e rotas protegidas",
      ],
      en: [
        "Branch-based workflow with pull requests and code review",
        "Data access layer kept isolated from the interface",
        "Session-based authentication with protected routes",
      ],
    },
    stack: ["Next.js", "PostgreSQL", "Auth", "Tailwind CSS"],
  },

  "cse341-final-project": {
    category: "api",
    featured: true,
    order: 4,
    hue: 26,
    title: { pt: "Web service REST", en: "REST web service" },
    summary: {
      pt: "API REST completa em Node.js e Express com persistência em MongoDB, validação de entrada, tratamento de erros centralizado e documentação interativa em Swagger.",
      en: "A complete REST API in Node.js and Express with MongoDB persistence, input validation, centralised error handling and interactive Swagger documentation.",
    },
    role: {
      pt: "Construí toda a API, do modelo de dados à documentação publicada.",
      en: "I built the entire API, from the data model to the published documentation.",
    },
    highlights: {
      pt: [
        "CRUD completo com validação em todas as rotas",
        "Documentação navegável gerada com Swagger/OpenAPI",
        "Respostas de erro padronizadas e códigos HTTP corretos",
      ],
      en: [
        "Full CRUD with validation on every route",
        "Browsable documentation generated with Swagger/OpenAPI",
        "Standardised error responses and correct HTTP status codes",
      ],
    },
    stack: ["Node.js", "Express", "MongoDB", "Swagger"],
  },

  organo: {
    category: "frontend",
    order: 5,
    hue: 320,
    liveUrl: "https://lmsdevop-organo.vercel.app",
    title: { pt: "Organo", en: "Organo" },
    summary: {
      pt: "Organizador de times em React: você cadastra pessoas, escolhe o time e os cartões se agrupam por cor dinamicamente. Um exercício sólido de estado, props e composição de componentes.",
      en: "A team organiser built in React: you add people, pick a team and the cards group themselves by colour. A solid exercise in state, props and component composition.",
    },
    role: {
      pt: "Implementação completa a partir do design proposto.",
      en: "Full implementation from the provided design.",
    },
    highlights: {
      pt: [
        "Estado compartilhado entre formulário e listagem",
        "Componentes reutilizáveis com props tipadas",
        "Publicado na Vercel",
      ],
      en: [
        "Shared state between the form and the listing",
        "Reusable components with typed props",
        "Deployed to Vercel",
      ],
    },
    stack: ["React", "JavaScript", "CSS", "Vercel"],
  },

  cse340: {
    category: "app",
    order: 6,
    hue: 152,
    title: {
      pt: "Aplicação MVC em Express",
      en: "Express MVC application",
    },
    summary: {
      pt: "Aplicação web server-side seguindo o padrão MVC: rotas organizadas por domínio, views renderizadas no servidor, camada de modelo isolada e gestão de sessão.",
      en: "A server-side web application following the MVC pattern: routes organised by domain, server-rendered views, an isolated model layer and session management.",
    },
    highlights: {
      pt: [
        "Separação clara entre rotas, controladores e modelos",
        "Middleware de autenticação e mensagens flash",
        "Validação de formulários no servidor",
      ],
      en: [
        "Clear separation between routes, controllers and models",
        "Authentication middleware and flash messaging",
        "Server-side form validation",
      ],
    },
    stack: ["Node.js", "Express", "EJS", "SQL"],
  },

  "react-alura-studies": {
    category: "frontend",
    order: 7,
    hue: 190,
    title: {
      pt: "Estudos de React com TypeScript",
      en: "React studies with TypeScript",
    },
    summary: {
      pt: "Laboratório de componentes onde eu testo padrões: hooks customizados, tipagem de props, formulários controlados e organização de pastas em projetos que crescem.",
      en: "A component laboratory where I test patterns: custom hooks, prop typing, controlled forms and folder organisation for projects that grow.",
    },
    highlights: {
      pt: [
        "Hooks customizados reaproveitáveis",
        "Props e eventos totalmente tipados",
        "Estrutura de pastas escalável",
      ],
      en: [
        "Reusable custom hooks",
        "Fully typed props and events",
        "Scalable folder structure",
      ],
    },
    stack: ["React", "TypeScript", "Vite"],
  },

  "pride-map": {
    category: "frontend",
    order: 8,
    hue: 340,
    title: { pt: "Pride Map", en: "Pride Map" },
    summary: {
      pt: "Mapa interativo construído com JavaScript puro, com marcadores, filtros e painel de detalhes — sem framework, só DOM e API de mapas.",
      en: "An interactive map built with vanilla JavaScript, featuring markers, filters and a details panel — no framework, just the DOM and a maps API.",
    },
    highlights: {
      pt: [
        "Manipulação direta do DOM sem framework",
        "Filtros aplicados sobre os marcadores em tempo real",
        "Consumo de API de geolocalização",
      ],
      en: [
        "Direct DOM manipulation with no framework",
        "Filters applied to markers in real time",
        "Geolocation API consumption",
      ],
    },
    stack: ["JavaScript", "HTML", "CSS", "Maps API"],
  },

  "wdd330-final-project": {
    category: "frontend",
    order: 9,
    hue: 46,
    title: {
      pt: "Front-end com JavaScript modular",
      en: "Front-end with modular JavaScript",
    },
    summary: {
      pt: "Projeto final de front-end avançado: módulos ES, consumo de múltiplas APIs, armazenamento local e build otimizado — tudo sem framework.",
      en: "Advanced front-end final project: ES modules, multiple API integrations, local storage and an optimised build — all without a framework.",
    },
    highlights: {
      pt: [
        "Arquitetura em módulos ES com responsabilidades separadas",
        "Cache de respostas em localStorage",
        "Tratamento de estados de carregamento e erro",
      ],
      en: [
        "ES module architecture with separated responsibilities",
        "Response caching in localStorage",
        "Loading and error state handling",
      ],
    },
    stack: ["JavaScript", "ES Modules", "REST APIs"],
  },

  "Jogoteca-Alura": {
    category: "app",
    order: 10,
    hue: 12,
    title: { pt: "Jogoteca", en: "Jogoteca" },
    summary: {
      pt: "Catálogo de jogos em Python com Flask: cadastro, edição, upload de capa e login. Meu primeiro contato real com back-end e templates renderizados no servidor.",
      en: "A game catalogue in Python with Flask: create, edit, cover upload and login. My first real contact with back-end work and server-rendered templates.",
    },
    highlights: {
      pt: [
        "CRUD com persistência em banco relacional",
        "Upload e tratamento de arquivos",
        "Sessão de usuário e rotas protegidas",
      ],
      en: [
        "CRUD with relational database persistence",
        "File upload and handling",
        "User sessions and protected routes",
      ],
    },
    stack: ["Python", "Flask", "SQL", "Jinja"],
  },

  "Shopping-Cart": {
    category: "study",
    order: 11,
    hue: 100,
    title: { pt: "Carrinho de compras", en: "Shopping cart" },
    summary: {
      pt: "Projeto em Python puro para praticar lógica de negócio: cálculo de totais, descontos, controle de estoque e persistência simples.",
      en: "A pure Python project to practise business logic: total calculation, discounts, stock control and simple persistence.",
    },
    highlights: {
      pt: [
        "Regras de negócio isoladas em funções testáveis",
        "Tratamento de entradas inválidas",
      ],
      en: [
        "Business rules isolated into testable functions",
        "Invalid input handling",
      ],
    },
    stack: ["Python"],
  },

  WhetherAPI: {
    category: "frontend",
    order: 12,
    hue: 210,
    title: {
      pt: "App de clima (primeira API)",
      en: "Weather app (first API)",
    },
    summary: {
      pt: "Meu primeiro consumo de API externa: busca por cidade, exibição das condições atuais e tratamento dos casos em que a requisição falha.",
      en: "My first external API integration: search by city, current conditions display and handling for failed requests.",
    },
    highlights: {
      pt: [
        "Requisições assíncronas com fetch",
        "Estados de carregamento, sucesso e erro na interface",
      ],
      en: [
        "Asynchronous requests with fetch",
        "Loading, success and error states in the UI",
      ],
    },
    stack: ["JavaScript", "HTML", "REST APIs"],
  },

  "alura-space-lucas": {
    category: "study",
    order: 13,
    hue: 286,
    title: { pt: "Alura Space", en: "Alura Space" },
    summary: {
      pt: "Recriação fiel de uma galeria com CSS avançado: Grid, Flexbox, variáveis e responsividade sem nenhuma biblioteca.",
      en: "A faithful recreation of a gallery using advanced CSS: Grid, Flexbox, custom properties and responsiveness with no libraries.",
    },
    stack: ["CSS", "HTML", "Grid"],
    highlights: {
      pt: ["Layout em CSS Grid com áreas nomeadas", "Design responsivo mobile-first"],
      en: ["CSS Grid layout with named areas", "Mobile-first responsive design"],
    },
  },

  PrimeDocs: {
    category: "frontend",
    order: 14,
    hue: 232,
    title: { pt: "PrimeDocs", en: "PrimeDocs" },
    summary: {
      pt: "Interface de documentação com navegação lateral, busca no conteúdo e tipografia pensada para leitura longa.",
      en: "A documentation interface with sidebar navigation, content search and typography tuned for long reading sessions.",
    },
    stack: ["HTML", "CSS", "JavaScript"],
  },

  /** Profile README repository — not a portfolio piece. */
  lmsdevop: { category: "study", hidden: true, hue: 0, summary: { pt: "", en: "" }, stack: [] },
};

/** Repositories whose names start with these prefixes are coursework. */
const courseworkPrefixes = ["wdd", "cse", "byu-", "cit"];

export function fallbackCategory(repoName: string): ProjectCategory {
  const name = repoName.toLowerCase();
  return courseworkPrefixes.some((prefix) => name.startsWith(prefix))
    ? "study"
    : "frontend";
}

/**
 * Used when the GitHub API is unavailable, so the section never renders empty.
 */
export const featuredFallbackOrder = [
  "fsy-app",
  "lms.devop-site",
  "wdd430-project",
  "cse341-final-project",
  "organo",
  "cse340",
  "react-alura-studies",
  "pride-map",
  "wdd330-final-project",
  "Jogoteca-Alura",
  "WhetherAPI",
  "alura-space-lucas",
];
