import { z } from "zod";

export type ContactMessages = {
  nameMin: string;
  nameMax: string;
  emailInvalid: string;
  subjectMin: string;
  subjectMax: string;
  messageMin: string;
  messageMax: string;
};

/** Used by the API route, which has no access to the visitor's locale. */
export const defaultContactMessages: ContactMessages = {
  nameMin: "Name must have at least 2 characters.",
  nameMax: "Name must have at most 80 characters.",
  emailInvalid: "Enter a valid email address.",
  subjectMin: "Subject must have at least 3 characters.",
  subjectMax: "Subject must have at most 120 characters.",
  messageMin: "Message must have at least 20 characters.",
  messageMax: "Message must have at most 2000 characters.",
};

export function createContactSchema(
  messages: ContactMessages = defaultContactMessages,
) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin).max(80, messages.nameMax),
    email: z.email({ message: messages.emailInvalid }).max(160),
    subject: z
      .string()
      .trim()
      .min(3, messages.subjectMin)
      .max(120, messages.subjectMax),
    message: z
      .string()
      .trim()
      .min(20, messages.messageMin)
      .max(2000, messages.messageMax),
    /** Hidden field: bots fill it in, humans never see it. */
    company: z.string().max(0).optional(),
  });
}

export const contactSchema = createContactSchema();

export type ContactInput = z.infer<typeof contactSchema>;

export const MESSAGE_MAX_LENGTH = 2000;
