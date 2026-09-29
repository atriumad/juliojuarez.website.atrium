import { bookCta, footer, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { LogoHorizontal } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="wrap pb-(--gutter) pt-8">
      <div className="border-t border-border pt-6 md:grid md:grid-cols-3 md:items-center">
        <div className="flex justify-center md:justify-start">
          <LogoHorizontal className="h-20 w-auto" title={`${site.name} — ${site.descriptor} Chef`} />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground md:mt-0 md:justify-self-center">
          {footer.finePrint}
        </p>
        <div className="mt-4 text-center md:mt-0 md:justify-self-end">
          <Button asChild variant="link" size="default">
            <a href={bookCta.href} data-event="cta_click" data-label="book_dinner" data-location="footer">
              {bookCta.label}
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}