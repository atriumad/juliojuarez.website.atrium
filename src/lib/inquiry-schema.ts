import { z } from "zod";

/**
 * Single-line text: control and invisible format characters (CR/LF, bidi
 * overrides...) become plain spaces, so a field can never add lines to the email
 * body or the subject.
 */
const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((s) => s.replace(/[\p{Cc}\p{Cf}\s]+/gu, " ").trim());

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100)
    .transform((s) => s.replace(/[\p{Cc}\p{Cf}\s]+/gu, " ").trim()),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.").max(254)),
  phone: singleLine(40),
  date: singleLine(60),
  guests: singleLine(30),
  location: singleLine(120),
  details: z.string().trim().max(2000, "Please keep this under 2,000 characters."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryField = keyof InquiryInput;
