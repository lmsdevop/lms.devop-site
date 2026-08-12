"use client";

import { Check, Copy, LoaderCircle, MapPin, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { socialIcons } from "@/components/icons/brand";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { profile, socials } from "@/data/profile";
import { useI18n } from "@/i18n/provider";
import {
  createContactSchema,
  MESSAGE_MAX_LENGTH,
  type ContactInput,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "subject" | "message";

const emptyForm: ContactInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-sm text-fg transition-colors duration-300 placeholder:text-fg-subtle hover:border-line-strong focus:border-accent-ink focus:outline-none aria-[invalid=true]:border-red-500/60";

export function Contact() {
  const { dict } = useI18n();
  const [values, setValues] = useState<ContactInput>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const schema = useMemo(
    () => createContactSchema(dict.contact.validation),
    [dict.contact.validation],
  );

  const setField = (field: keyof ContactInput, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "company" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  /** Validates one field on blur so mistakes surface before submitting. */
  const validateField = (field: FieldName) => {
    const result = schema.shape[field].safeParse(values[field]);
    setErrors((current) => ({
      ...current,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success(dict.contact.emailCopied);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        nextErrors[field] ??= issue.message;
      }
      setErrors(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { ok: boolean; code?: string };

      if (data.ok) {
        toast.success(dict.contact.form.success);
        setValues(emptyForm);
        return;
      }

      // No mail provider configured yet: hand the message to the visitor's own
      // mail client instead of losing it.
      if (data.code === "not_configured") {
        const body = encodeURIComponent(
          `${parsed.data.message}\n\n—\n${parsed.data.name} · ${parsed.data.email}`,
        );
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
          parsed.data.subject,
        )}&body=${body}`;
        return;
      }

      throw new Error(data.code ?? "unknown_error");
    } catch {
      toast.error(dict.contact.form.error);
    } finally {
      setSubmitting(false);
    }
  };

  const channels = [
    {
      id: "email",
      label: dict.contact.channels.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      id: "location",
      label: dict.contact.channels.location,
      value: dict.contact.channels.locationValue,
    },
    {
      id: "availability",
      label: dict.contact.channels.availability,
      value: dict.contact.channels.availabilityValue,
    },
  ];

  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        lead={dict.contact.lead}
      />

      <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal direction="right" className="space-y-8">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {channels.map((channel) => (
              <div key={channel.id} className="bg-bg px-5 py-4">
                <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-fg-subtle uppercase">
                  {channel.label}
                </dt>
                <dd className="mt-1.5 flex items-center gap-2 text-sm text-fg">
                  {channel.id === "location" ? (
                    <MapPin className="size-4 text-accent-ink" aria-hidden />
                  ) : null}
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="transition-colors hover:text-accent-ink"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    channel.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-5 text-sm text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            {copied ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
            {copied ? dict.contact.emailCopied : dict.contact.copyEmail}
          </button>

          <div>
            <h3 className="font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
              {dict.contact.channels.social}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-sm text-fg-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
                    >
                      <Icon className="size-4" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal
          direction="left"
          className="rounded-2xl border border-line bg-bg-elevated/60 p-6 sm:p-8"
        >
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={dict.contact.form.name} error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => setField("name", event.target.value)}
                  onBlur={() => validateField("name")}
                  placeholder={dict.contact.form.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field
                id="email"
                label={dict.contact.form.email}
                error={errors.email}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                  onBlur={() => validateField("email")}
                  placeholder={dict.contact.form.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field
              id="subject"
              label={dict.contact.form.subject}
              error={errors.subject}
            >
              <input
                id="subject"
                name="subject"
                type="text"
                list="contact-subjects"
                value={values.subject}
                onChange={(event) => setField("subject", event.target.value)}
                onBlur={() => validateField("subject")}
                placeholder={dict.contact.form.subjectPlaceholder}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={fieldClass}
              />
              <datalist id="contact-subjects">
                {Object.values(dict.contact.form.subjectOptions).map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </Field>

            <Field
              id="message"
              label={dict.contact.form.message}
              error={errors.message}
              hint={`${MESSAGE_MAX_LENGTH - values.message.length} ${dict.contact.form.charactersLeft}`}
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                maxLength={MESSAGE_MAX_LENGTH}
                value={values.message}
                onChange={(event) => setField("message", event.target.value)}
                onBlur={() => validateField("message")}
                placeholder={dict.contact.form.messagePlaceholder}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(fieldClass, "resize-y")}
              />
            </Field>

            {/* Honeypot: hidden from humans, irresistible to bots. */}
            <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={(event) => setField("company", event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-transform duration-300 hover:scale-[1.01] disabled:pointer-events-none disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  {dict.contact.form.submitting}
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  {dict.contact.form.submit}
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[0.7rem] tracking-[0.16em] text-fg-muted uppercase"
        >
          {label}
        </label>
        {hint ? (
          <span className="font-mono text-[0.65rem] text-fg-subtle">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
