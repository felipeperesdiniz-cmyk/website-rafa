export default function SectionDivider() {
  return (
    <div
      className="px-6 md:px-10 py-10 md:py-16"
      aria-hidden="true"
    >
      <div className="max-w-[1440px] mx-auto flex items-center gap-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-border/30" />
        <span className="text-[8px] tracking-[0.6em] uppercase text-muted/40">
          ◆
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border/60 to-border/30" />
      </div>
    </div>
  );
}
