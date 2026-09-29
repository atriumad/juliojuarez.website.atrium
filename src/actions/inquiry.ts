"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contact } from "@/content/site";
import {
  inquirySchema,
  type InquiryField,
  type InquiryInput,
} from "@/lib/inquiry-schema";
import { filledTooFast } from "@/lib/bot-check";
import { allow } from "@/lib/rate-limit";

export type InquiryState = {
  status: "idle" | "success" | "error";
  /** True only when a real inquiry was delivered (never for honeypot or dev skips). */
  lead?: boolean;
  message?: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
  values?: Partial<Record<InquiryField, string>>;
};

const FIELDS: InquiryField[] = ["name", "email", "phone", "date", "guests", "location", "details"];

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

// Per client: 5 valid inquiries per hour is far above any real person.
const RATE_MAX = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

async function clientKey() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

function buildText(data: InquiryInput) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Preferred date: ${data.date || "—"}`,
    `Guests: ${data.guests || "—"}`,
    `Location: ${data.location || "—"}`,
    "",
    "Occasion & details:",
    data.details || "—",
  ].join("\n");
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: real people never see this field. Pretend success to bots.
  if (readField(formData, "website")) {
    return { status: "success" };
  }

  // Filled in faster than a person can type: same treatment as the honeypot.
  if (filledTooFast(readField(formData, "elapsed"))) {
    return { status: "success" };
  }

  const values = Object.fromEntries(
    FIELDS.map((f) => [f, readField(formData, f)]),
  ) as Record<InquiryField, string>;

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: InquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as InquiryField;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", fieldErrors, values };
  }

  if (!allow(await clientKey(), RATE_MAX, RATE_WINDOW_MS)) {
    return { status: "error", message: contact.form.rateLimited, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Never fake success in production: a lost lead is worse than an error.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[inquiry] Email env vars not set. Skipping send (dev only).");
      return { status: "success" };
    }
    console.error("[inquiry] Missing RESEND_API_KEY / INQUIRY_TO_EMAIL / INQUIRY_FROM_EMAIL");
    return { status: "error", message: contact.form.error, values };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `New private dining inquiry — ${parsed.data.name.replace(/\s+/g, " ")}`,
      text: buildText(parsed.data),
    });
    if (error) {
      console.error("[inquiry] Resend error:", error.message);
      return { status: "error", message: contact.form.error, values };
    }
  } catch (err) {
    console.error("[inquiry] Send failed:", err);
    return { status: "error", message: contact.form.error, values };
  }

  return { status: "success", lead: true };
}
