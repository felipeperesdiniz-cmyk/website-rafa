import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  backHref?: string;
  backLabel?: string;
  label: string;
  title: string;
  hero?: {
    src: string;
    alt: string;
    objectPosition: string;
  };
  count?: number;
}

export default function PageHeader({
  backHref = "/",
  backLabel = "Back",
  label,
  title,
  hero,
  count,
}: PageHeaderProps) {
  if (hero) {
    return (
      <header className="relative min-h-[50vh] md:min-h-[58vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: hero.objectPosition }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 px-6 md:px-10 pt-24 md:pt-28 pb-10 md:pb-14 max-w-[1440px] mx-auto w-full">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted hover:text-foreground transition-colors mb-10 md:mb-12"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {backLabel}
          </Link>

          <p className="text-[10px] tracking-[0.45em] uppercase text-muted mb-3">
            {label}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight leading-[0.95]">
            {title}
          </h1>
          {count !== undefined && (
            <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-muted/60">
              {count} images
            </p>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="px-6 md:px-10 pt-24 md:pt-28 pb-10 md:pb-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {backLabel}
      </Link>

      <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">
        {label}
      </p>
      <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight">
        {title}
      </h1>
    </header>
  );
}
