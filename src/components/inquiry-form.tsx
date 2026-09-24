"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitInquiry, type InquiryState } from "@/actions/inquiry";
import type { InquiryField } from "@/lib/inquiry-schema";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: InquiryState = { status: "idle" };

function Field({
  id,
  label,
  optional,
  error,
  children,
  idPrefix = "",
}: {
  id: InquiryField;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  idPrefix?: string;
}) {
  const fid = `${idPrefix}${id}`;
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={fid}>
        {label}
        {optional ? (
          <span className="normal-case tracking-normal opacity-70">Optional</span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p id={`${fid}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function InquiryForm({ idPrefix = "" }: { idPrefix?: string }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation, or to the first invalid field.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.status === "error") {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border-t pt-10 outline-none"
      >
        <h3 className="text-xl">{contact.form.success}</h3>
        <p className="mt-4 max-w-[40ch] text-muted-foreground">
          {contact.form.successNote}
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};
  const a11y = (id: InquiryField) => ({
    id: `${idPrefix}${id}`,
    name: id,
    "aria-invalid": errors[id] ? (true as const) : undefined,
    "aria-describedby": errors[id] ? `${idPrefix}${id}-error` : undefined,
    defaultValue: values[id] ?? "",
  });

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="relative grid gap-x-10 gap-y-8 md:grid-cols-2"
    >
      <Field id="name" label="Name" error={errors.name}>
        <Input {...a11y("name")} type="text" autoComplete="name" aria-required="true" />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <Input
          {...a11y("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-required="true"
        />
      </Field>
      <Field id="phone" label="Phone" optional error={errors.phone}>
        <Input {...a11y("phone")} type="tel" autoComplete="tel" />
      </Field>
      <Field id="date" label="Preferred date" optional error={errors.date}>
        <Input {...a11y("date")} type="text" placeholder="October 12" />
      </Field>
      <div className="md:col-span-2">
        <Field id="details" label="Occasion & details" optional error={errors.details}>
          <Textarea
            {...a11y("details")}
            placeholder="The occasion, guest count, and any preferences."
            maxLength={2000}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-center gap-4 md:col-span-2 md:items-start">
        {state.status === "error" && state.message ? (
          <p role="alert" className="text-destructive">
            {state.message}
          </p>
        ) : null}
        <div>
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? contact.form.pending : contact.form.submit}
          </Button>
        </div>
      </div>
    </form>
  );
}
