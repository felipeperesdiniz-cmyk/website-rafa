import { siteConfig } from "@/data/site-data";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 px-[5vw] py-6"
      role="contentinfo"
    >
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="label-caps text-[var(--text-secondary)] opacity-30">
          &copy; 2026 RAFAEL DINIZ
        </p>
        <p className="label-caps text-[var(--text-secondary)] opacity-30">
          PHOTOGRAPHY & MOTION
        </p>
      </div>
    </footer>
  );
}
