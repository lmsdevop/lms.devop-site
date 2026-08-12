import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { profile, site } from "@/data/profile";
import { getGithubData } from "@/lib/github";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/server";

export default async function HomePage() {
  const [{ projects, stats, avatarUrl, usedFallback }, locale] =
    await Promise.all([getGithubData(), getServerLocale()]);
  const dict = getDictionary(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    email: `mailto:${profile.email}`,
    image: avatarUrl,
    jobTitle: dict.meta.title.split("—")[1]?.trim() ?? "Full-Stack Developer",
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    sameAs: [
      `https://github.com/${profile.githubUsername}`,
      "https://www.linkedin.com/in/lmsdevop/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "MongoDB",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, developer-authored object — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Hero />
      <TechMarquee />
      <About avatarUrl={avatarUrl} />
      <Stats stats={stats} />
      <Services />
      <Skills />
      <Projects projects={projects} usedFallback={usedFallback} />
      <Journey />
      <Testimonials />
      <Contact />
    </>
  );
}
