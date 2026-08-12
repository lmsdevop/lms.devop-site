import type { Dictionary } from "./pt";

export const en: Dictionary = {
  meta: {
    title: "Lucas Mendonça — Full-Stack Developer",
    titleTemplate: "%s | lms.devop",
    description:
      "Portfolio of Lucas Mendonça (lms.devop): full-stack developer focused on React, Next.js, TypeScript and Node.js. Fast, accessible, carefully finished interfaces.",
    keywords: [
      "full-stack developer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "portfolio",
      "Rio de Janeiro",
      "Lucas Mendonça",
    ],
    ogAlt: "Lucas Mendonça — Full-Stack Developer",
  },

  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    changeLanguage: "Change language",
    openCommandPalette: "Open command palette",
    scrollProgress: "Page reading progress",
  },

  nav: {
    items: {
      home: "Home",
      about: "About",
      services: "Services",
      skills: "Skills",
      work: "Work",
      journey: "Journey",
      contact: "Contact",
    },
    cta: "Let's talk",
    searchHint: "Search",
  },

  preloader: {
    greeting: "Welcome",
    loading: "Loading experience",
  },

  hero: {
    availability: "Available for new projects",
    titleTop: "I build",
    titleRotating: ["web products", "interfaces", "APIs", "experiences"],
    titleBottom: "that people actually use.",
    intro:
      "I'm Lucas Mendonça — a full-stack developer based in Rio de Janeiro. I turn ideas into web applications that are fast, accessible and pleasant to use, from the database to the last pixel.",
    ctaPrimary: "See my work",
    ctaSecondary: "Download résumé",
    ctaSecondaryFallback: "Let's talk",
    scrollCue: "Scroll to explore",
    localTime: "Local time",
    quickFacts: {
      based: "Based in",
      basedValue: "Rio de Janeiro, Brazil",
      focus: "Focus",
      focusValue: "Full-stack / Web",
      languages: "Languages",
      languagesValue: "EN · PT-BR",
    },
  },

  marquee: {
    label: "Everyday stack",
  },

  about: {
    eyebrow: "About",
    title: "Code that solves problems for real people.",
    lead: "I started poking at HTML out of curiosity and never stopped. Today I work across the whole product: I model the data, write the API, build the interface and ship it.",
    paragraphs: [
      "My background mixes the formal and the hands-on route: I study Software Development at BYU-Idaho (through BYU-Pathway Worldwide) and top it up with intensive front-end tracks at Alura. Every course became a public repository — you can follow the progress commit by commit.",
      "I care about finished work: accessible components, thoughtful loading states, performance that is measured rather than guessed. I also care about explaining what I did — clear communication saves more time than any technical shortcut.",
    ],
    portraitAlt: "Portrait of Lucas Mendonça",
    nowTitle: "What I'm on right now",
    now: [
      "Building applications with Next.js 16 and React Server Components",
      "Going deeper into advanced TypeScript and automated testing",
      "Studying API architecture and relational databases",
    ],
    valuesTitle: "How I work",
    values: [
      {
        title: "Ship in slices",
        text: "I'd rather deliver something small that works than promise big and slip.",
      },
      {
        title: "Accessibility isn't an extra",
        text: "Keyboard, screen reader and contrast are part of the first version.",
      },
      {
        title: "Measure before optimising",
        text: "Performance decisions come from numbers, not hunches.",
      },
    ],
  },

  stats: {
    eyebrow: "By the numbers",
    title: "The path so far, measured.",
    items: {
      repos: "Public repositories",
      languages: "Languages used",
      years: "Years writing code",
      courses: "Courses completed",
    },
    note: "Repository and language counts come straight from the GitHub API.",
  },

  services: {
    eyebrow: "Services",
    title: "What I deliver.",
    lead: "Four areas I cover end to end — solo or plugged into an existing team.",
    items: [
      {
        title: "Web applications",
        text: "Complete products in React and Next.js: routing, auth, dashboards and integrations.",
        bullets: ["Next.js / React", "TypeScript", "Server Components"],
      },
      {
        title: "Interfaces & design systems",
        text: "Reusable, responsive, accessible components that stay faithful to the design.",
        bullets: ["Tailwind CSS", "Motion", "WCAG AA"],
      },
      {
        title: "APIs & back-end",
        text: "REST services in Node.js and Express, with validation, docs and a modelled database.",
        bullets: ["Node / Express", "MongoDB / SQL", "Swagger"],
      },
      {
        title: "Performance & delivery",
        text: "Lean builds, Core Web Vitals in the green and an automated release pipeline.",
        bullets: ["Core Web Vitals", "Vercel", "CI/CD"],
      },
    ],
  },

  skills: {
    eyebrow: "Skills",
    title: "Tools I actually use.",
    lead: "Grouped by area. Hover or use the arrow keys to move between categories.",
    levels: {
      learning: "Learning",
      comfortable: "Comfortable",
      strong: "Strong",
    },
    categories: {
      frontend: "Front-end",
      backend: "Back-end",
      data: "Data",
      tooling: "Tooling",
    },
  },

  projects: {
    eyebrow: "Work",
    title: "Things I've built.",
    lead: "This list syncs with my GitHub. Filter by type and open any card for the details.",
    filters: {
      all: "All",
      app: "Applications",
      frontend: "Front-end",
      api: "APIs",
      study: "Studies",
    },
    sort: {
      label: "Sort",
      recent: "Most recent",
      stars: "Most stars",
      name: "Name (A-Z)",
    },
    featured: "Featured",
    empty: "No projects in this category yet.",
    liveDemo: "View live",
    sourceCode: "Source code",
    openDetails: "Open details",
    closeDetails: "Close details",
    updatedAt: "Updated",
    stars: "stars",
    forks: "forks",
    stack: "Stack",
    highlights: "Technical highlights",
    role: "My role",
    viewAll: "See all repositories",
    fallbackNotice:
      "Couldn't reach GitHub right now — showing the saved selection.",
    count: {
      one: "project",
      other: "projects",
    },
  },

  journey: {
    eyebrow: "Journey",
    title: "How I got here.",
    lead: "Education, milestones and what each step taught me.",
    present: "Now",
    types: {
      education: "Education",
      milestone: "Milestone",
      work: "Experience",
    },
  },

  testimonials: {
    eyebrow: "Recommendations",
    title: "What it's like to work with me.",
    placeholderNotice:
      "Placeholder content — swap these cards for real testimonials in src/data/testimonials.ts.",
    previous: "Previous testimonial",
    next: "Next testimonial",
    goTo: "Go to testimonial",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's build something.",
    lead: "Got a role, a freelance project or just want to talk code? Drop me a line — I reply within one business day.",
    channels: {
      email: "Email",
      location: "Location",
      locationValue: "Rio de Janeiro, RJ — Brazil",
      availability: "Status",
      availabilityValue: "Open to offers",
      social: "Find me at",
    },
    copyEmail: "Copy email",
    emailCopied: "Email copied!",
    form: {
      name: "Your name",
      namePlaceholder: "What should I call you?",
      email: "Your email",
      emailPlaceholder: "you@company.com",
      subject: "Subject",
      subjectPlaceholder: "What are we talking about?",
      subjectOptions: {
        job: "Job opportunity",
        freelance: "Freelance project",
        collab: "Collaboration / open source",
        other: "Something else",
      },
      message: "Message",
      messagePlaceholder: "Share some context, timeline and what you're expecting.",
      submit: "Send message",
      submitting: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      error: "I couldn't send it right now. Try again or reach me by email.",
      required: "Required field",
      charactersLeft: "characters left",
    },
    validation: {
      nameMin: "Please use at least 2 characters.",
      nameMax: "Maximum of 80 characters.",
      emailInvalid: "Enter a valid email address.",
      subjectMin: "Please use at least 3 characters.",
      subjectMax: "Maximum of 120 characters.",
      messageMin: "Tell me a bit more — at least 20 characters.",
      messageMax: "Maximum of 2000 characters.",
    },
  },

  footer: {
    cta: "Available for new projects",
    tagline:
      "Full-stack developer in Rio de Janeiro. Building for the web since 2023.",
    sections: {
      navigate: "Navigate",
      social: "Social",
      legal: "Built with",
    },
    builtWith: "Next.js, TypeScript and Tailwind CSS",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    sourceCode: "View this site's source",
  },

  palette: {
    placeholder: "Search sections, links and actions...",
    empty: "Nothing found.",
    groups: {
      sections: "Sections",
      actions: "Actions",
      social: "Links",
    },
    actions: {
      toggleTheme: "Toggle light/dark theme",
      switchLanguage: "Switch to Portuguese",
      copyEmail: "Copy my email",
      downloadResume: "Download résumé",
    },
    hint: {
      navigate: "navigate",
      select: "select",
      close: "close",
    },
    trigger: "Search",
  },
};
