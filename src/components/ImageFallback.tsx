interface ImageFallbackProps {
  alt?: string;
  variant?: "tile" | "hero" | "lightbox";
  className?: string;
  fill?: boolean;
}

export default function ImageFallback({
  alt,
  variant = "tile",
  className = "",
  fill = false,
}: ImageFallbackProps) {
  const positionClass = fill ? "absolute inset-0" : "relative w-full h-full min-h-[inherit]";

  const label =
    variant === "hero"
      ? "Sequence unavailable"
      : variant === "lightbox"
        ? "Image unavailable"
        : "Moment unavailable";

  return (
    <div
      className={`${positionClass} flex flex-col items-center justify-center overflow-hidden bg-[#080808] ${className ?? ""}`}
      role="img"
      aria-label={alt ? `${label}: ${alt}` : label}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(242,240,234,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)",
        }}
        aria-hidden="true"
      />
      <div
        className="relative flex flex-col items-center justify-center px-6 text-center"
      >
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/10 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.4em] text-foreground/25">RD</span>
        </div>
        <p className="mt-5 text-[9px] tracking-[0.4em] uppercase text-muted/55">
          {label}
        </p>
        {variant === "lightbox" && alt && (
          <p className="mt-3 max-w-sm text-[10px] leading-relaxed tracking-[0.12em] text-muted/40">
            {alt}
          </p>
        )}
      </div>
      <div
        className="absolute inset-4 md:inset-6 border border-foreground/[0.06] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
