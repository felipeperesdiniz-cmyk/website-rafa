"use client";

import FilmProject from "@/components/FilmProject";
import { videoProjects } from "@/data/site-data";

export default function MotionProjects() {
  return (
    <section aria-label="Selected work">
      <div className="px-[5vw] pb-8 pt-4">
        <p className="label-caps-sm text-[var(--text-secondary)] opacity-40">
          SELECTED WORK
        </p>
        <div className="mt-4 h-px w-full bg-white opacity-[0.12]" />
      </div>

      {videoProjects.map((project) => (
        <FilmProject key={project.id} project={project} />
      ))}
    </section>
  );
}
