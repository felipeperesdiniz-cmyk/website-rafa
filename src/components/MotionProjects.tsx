"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FilmProject from "@/components/FilmProject";
import { videoProjects } from "@/data/site-data";

export default function MotionProjects() {
  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <section id="work" className="scroll-mt-24" aria-label="Film projects">
      <div className="px-6 md:px-10 pt-section pb-8 md:pb-12">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted">
          Selected Projects
        </p>
      </div>

      {videoProjects.map((project) => (
        <FilmProject key={project.id} project={project} />
      ))}
    </section>
  );
}
