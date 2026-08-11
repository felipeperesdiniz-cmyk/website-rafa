import { contactLinks, siteConfig } from "@/data/site-data";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 md:py-12 border-t border-border/30" role="contentinfo">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-muted/50">
              {siteConfig.tagline}
            </p>
          </div>

          <a
            href={`mailto:${siteConfig.email}`}
            className="font-serif text-xl md:text-2xl font-light text-foreground/80 hover:text-foreground transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>

        {contactLinks.length > 0 && (
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[10px] tracking-[0.3em] uppercase text-muted hover:text-foreground transition-colors"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
