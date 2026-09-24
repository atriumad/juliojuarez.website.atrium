import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.")),
  phone: z.string().trim().max(40),
  date: z.string().trim().max(60),
  details: z.string().trim().max(2000, "Please keep this under 2,000 characters."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryField = keyof InquiryInput;
