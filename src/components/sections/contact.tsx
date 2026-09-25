import { contact, site } from "@/content/site";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  const rows = [
    { label: "Location", value: contact.details.location, href: null, track: null },
    {
      label: "Email",
      value: contact.details.email,
      href: contact.details.email ? `mailto:${contact.details.email}` : null,
      track: "email",
    },
    {
      label: "Phone",
      value: contact.details.phone,
      href: contact.details.phone
        ? `tel:${contact.details.phone.replace(/[^+\d]/g, "")}`
        : null,
      track: "phone",
    },
  ].filter((r) => r.value);

  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap section-y">
      <div className="flex flex-col items-center text-center">
        <Reveal y={0}>
          <p className="eyebrow text-muted-foreground">{site.descriptor}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="contact-title" className="mt-6 text-2xl">
            {contact.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[46ch] text-muted-foreground">
            {contact.body}
          </p>
        </Reveal>

        <dl className="mt-14 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
          {rows.map((row, i) => (
            <Reveal
              key={row.label}
              y={0}
              delay={0.3 + i * 0.08}
              className="flex items-baseline gap-3"
            >
              <dt className="eyebrow text-muted-foreground">{row.label}</dt>
              <dd className="flex items-baseline gap-3">
                <span aria-hidden="true" className="text-border">
                  ·
                </span>
                {row.href ? (
                  <a
                    href={row.href}
                    className="link-rule"
                    data-event="contact_click"
                    data-label={row.track ?? undefined}
                    data-location="contact"
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-16 w-full max-w-2xl">
        <div className="border-t pt-12 text-center md:text-left">
          <Reveal y={0} delay={0.15}>
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}