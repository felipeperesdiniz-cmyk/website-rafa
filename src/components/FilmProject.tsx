"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { VideoProject } from "@/data/site-data";
import YouTubeModal from "./YouTubeModal";

gsap.registerPlugin(ScrollTrigger);

function youtubeThumbnail(id: string, quality: "maxres" | "hq" = "maxres") {
  return `https://i.ytimg.com/vi/${id}/${quality}default.jpg`;
}

interface FilmProjectProps {
  project: VideoProject;
  compact?: boolean;
}

export default function FilmProject({ project, compact = false }: FilmProjectProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const posterSrc =
    project.poster || youtubeThumbnail(project.youtubeId!, "maxres");
  const posterFallback = project.youtubeId
    ? youtubeThumbnail(project.youtubeId, "hq")
    : undefined;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (compact) return;

    const section = sectionRef.current;
    const frame = frameRef.current;
    const text = textRef.current;
    if (!section || !frame || !text) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        frame,
        { y: project.variant === "drift" ? 0 : 32 },
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        text,
        { y: 20 },
        {
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        [frame, text],
        { y: 20 },
        {
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, [project.variant, compact]);

  const isDrift = project.variant === "drift";

  return (
    <>
      <section
        ref={sectionRef}
        className={compact ? "relative" : `relative py-section px-6 md:px-10 ${isDrift ? "md:pr-[8%]" : ""}`}
        aria-label={project.title || `Film Project ${project.number}`}
      >
        <div
          className={`max-w-[1400px] ${
            !compact && isDrift ? "md:ml-auto md:mr-0" : "mx-auto"
          }`}
        >
          <div
            ref={textRef}
            className={`mb-6 md:mb-8 ${!compact && isDrift ? "md:text-right" : ""}`}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted">
              {project.number}
            </span>
            {project.title && (
              <h3 className="mt-2 font-serif text-2xl md:text-4xl font-light tracking-tight">
                {project.title}
              </h3>
            )}
            {(project.year || project.role) && (
              <p className="mt-3 text-[10px] tracking-[0.3em] uppercase text-muted/80">
                {[project.year, project.role].filter(Boolean).join(" · ")}
              </p>
            )}
            {project.description && (
              <p
                className={`mt-4 max-w-lg text-sm md:text-base font-light leading-relaxed text-foreground/65 ${
                  !compact && isDrift ? "md:ml-auto" : ""
                }`}
              >
                {project.description}
              </p>
            )}
          </div>

          <button
            ref={frameRef}
            type="button"
            onClick={open}
            className={`group relative w-full overflow-hidden bg-surface cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground/50 aspect-video ${
              !compact && isDrift ? "md:w-[92%] md:ml-auto md:aspect-[2.39/1]" : ""
            }`}
            style={
              !compact
                ? {
                    maxWidth: "min(100%, 90rem)",
                  }
                : undefined
            }
            aria-label={`Play ${project.title}`}
          >
            <PortfolioImage
              src={posterSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1400px"
              loading="lazy"
              fallbackSrc={posterFallback}
              fallbackVariant="hero"
            />

            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-foreground/25 flex items-center justify-center backdrop-blur-sm bg-black/20 group-hover:border-foreground/50 group-hover:scale-105 transition-all duration-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 md:w-5 md:h-5 ml-0.5 text-foreground/90"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </section>

      {project.youtubeId && (
        <YouTubeModal
          youtubeId={project.youtubeId}
          title={project.title || `Film Project ${project.number}`}
          isOpen={isOpen}
          onClose={close}
          triggerRef={frameRef}
        />
      )}
    </>
  );
}
