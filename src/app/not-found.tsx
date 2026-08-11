import Link from "next/link";
import { siteConfig } from "@/data/site-data";

export default function NotFound() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
      aria-labelledby="not-found-title"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(242,240,234,0.05) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <p className="text-[10px] tracking-[0.55em] uppercase text-muted/60">
        404
      </p>

      <h1
        id="not-found-title"
        className="mt-8 font-serif text-[clamp(2.5rem,8vw,5rem)] font-light tracking-tight leading-[1.05]"
      >
        This frame
        <br />
        isn&apos;t in the reel.
      </h1>

      <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-foreground/55">
        The page you&apos;re looking for has moved or never existed — but the
        work is still here.
      </p>

      <Link
        href="/"
        className="mt-12 group inline-flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted group-hover:text-foreground/80 transition-colors">
          Return home
        </span>
        <span
          className="w-px h-8 bg-foreground/20 group-hover:bg-foreground/40 transition-colors"
          aria-hidden="true"
        />
      </Link>

      <p className="mt-16 text-[10px] tracking-[0.3em] uppercase text-muted/40">
        {siteConfig.name}
      </p>
    </main>
  );
}
