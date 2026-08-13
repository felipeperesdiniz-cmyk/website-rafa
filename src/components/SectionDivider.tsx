export default function SectionDivider() {
  return (
    <div className="px-6 md:px-10 py-4 md:py-6" aria-hidden="true">
      <div className="max-w-[1440px] mx-auto flex items-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-border/25" />
        <span className="text-[8px] tracking-[0.6em] uppercase text-muted/35">
          ◆
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border/50 to-border/25" />
      </div>
    </div>
  );
}
