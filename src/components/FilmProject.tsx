"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { VideoProject } from "@/data/site-data";
import ProjectModal from "@/components/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

function youtubeThumbnail(id: string, quality: "maxres" | "hq" = "maxres") {
  return `https://i.ytimg.com/vi/${id}/${quality}default.jpg`;
}

interface FilmProjectProps {
  project: VideoProject;
}

export default function FilmProject({ project }: FilmProjectProps) {
  const rowRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const posterSrc =
    project.poster || youtubeThumbnail(project.youtubeId!, "maxres");
  const posterFallback = project.youtubeId
    ? youtubeThumbnail(project.youtubeId, "hq")
    : undefined;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const row = rowRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    if (!row || !number || !title || !desc) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(number, { opacity: 0 }, { opacity: 0.15, duration: 0.6 })
      .fromTo(
        title,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <article
        ref={rowRef}
        className="relative px-[5vw] py-16 md:py-20"
        aria-label={project.title || `Project ${project.number}`}
      >
        <span
          ref={numberRef}
          className="pointer-events-none absolute left-[5vw] top-16 font-serif text-[5rem] font-light leading-none text-white opacity-0 md:top-20"
          aria-hidden="true"
        >
          {project.number}
        </span>

        <div className="relative z-10">
          <button
            type="button"
            onClick={open}
            className="group mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-left"
            data-cursor="view"
          >
            <span
              ref={titleRef}
              className="font-serif text-[2.5rem] font-light leading-tight text-[var(--text-primary)]"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              {project.title}
            </span>
            {project.role && (
              <span className="label-caps-sm border border-[var(--border)] px-2 py-[3px] text-[var(--text-secondary)]">
                {project.role.toUpperCase()}
              </span>
            )}
          </button>

          <p
            ref={descRef}
            className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--text-primary)] opacity-85"
          >
            {project.description || project.summary}
          </p>

          <button
            type="button"
            onClick={open}
            className="group relative block w-full overflow-hidden bg-[var(--surface)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/50"
            style={{ aspectRatio: "16/9" }}
            aria-label={`View ${project.title}`}
            data-cursor="play"
          >
            <PortfolioImage
              src={posterSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
              sizes="100vw"
              loading="lazy"
              fallbackSrc={posterFallback}
              fallbackVariant="hero"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
          </button>

          {(project.location || project.year || project.duration) && (
            <p className="label-caps mt-4 text-[var(--text-secondary)] opacity-35">
              {[project.location, project.year, project.duration]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
      </article>

      <ProjectModal project={project} isOpen={isOpen} onClose={close} />
    </>
  );
}
