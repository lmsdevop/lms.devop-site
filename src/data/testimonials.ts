import type { Locale } from "@/i18n/config";

export type Testimonial = {
  id: string;
  quote: Record<Locale, string>;
  author: Record<Locale, string>;
  role: Record<Locale, string>;
  /** Optional avatar in `public/`. Falls back to the author's initials. */
  avatar?: string;
  /**
   * Marks the entry as sample copy so the UI can flag it. Set to `false`
   * once you replace it with a real, attributable quote.
   */
  placeholder: boolean;
};

/**
 * These are samples, not real quotes. Replace the text, author and role with
 * genuine recommendations and set `placeholder: false` — the notice above the
 * carousel disappears once no placeholder entries remain.
 */
export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    placeholder: true,
    quote: {
      pt: "Este é um espaço de exemplo. Peça a um colega de equipe, professor ou cliente uma frase curta sobre como foi trabalhar com você e cole aqui.",
      en: "This is a sample slot. Ask a teammate, instructor or client for a short line about what it was like to work with you and paste it here.",
    },
    author: { pt: "Nome do colega", en: "Teammate name" },
    role: { pt: "Cargo · Empresa", en: "Role · Company" },
  },
  {
    id: "sample-2",
    placeholder: true,
    quote: {
      pt: "Depoimentos funcionam melhor quando são específicos: o que foi entregue, em quanto tempo e qual problema deixou de existir.",
      en: "Testimonials work best when they're specific: what was delivered, how long it took and which problem went away.",
    },
    author: { pt: "Nome do cliente", en: "Client name" },
    role: { pt: "Cargo · Projeto", en: "Role · Project" },
  },
  {
    id: "sample-3",
    placeholder: true,
    quote: {
      pt: "Duas ou três recomendações reais valem mais que dez genéricas. O LinkedIn é um bom lugar para pedir.",
      en: "Two or three real recommendations are worth more than ten generic ones. LinkedIn is a good place to ask.",
    },
    author: { pt: "Nome do professor", en: "Instructor name" },
    role: { pt: "Instituição", en: "Institution" },
  },
];

export const hasPlaceholderTestimonials = testimonials.some(
  (item) => item.placeholder,
);
