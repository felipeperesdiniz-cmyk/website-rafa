"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";
import PortfolioImage from "@/components/PortfolioImage";
import type { VideoProject } from "@/data/site-data";

interface ProjectModalProps {
  project: VideoProject;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const savedScroll = useRef(0);

  const close = useCallback(() => {
    unlockPageScroll(savedScroll.current);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    savedScroll.current = lockPageScroll();
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    gsap.fromTo(
      overlay,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power3.inOut" }
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    return () => {
      if (isOpen) unlockPageScroll(savedScroll.current);
    };
  }, [isOpen]);

  if (!isOpen || !project.youtubeId) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-[20px]"
      role="dialog"
      aria-modal="true"
      aria-label={project.title || "Project"}
    >
      <div ref={contentRef} className="min-h-full px-[5vw] py-16 md:py-20">
        <div className="mb-8 flex items-start justify-between">
          <h2 className="font-serif text-[2rem] font-light text-[var(--text-primary)]">
            {project.title}
          </h2>
          <div className="flex items-center gap-6">
            <span className="label-caps-sm text-[var(--text-secondary)]">
              {project.role} · {project.year}
            </span>
            <button
              type="button"
              onClick={close}
              className="label-caps-sm text-[var(--text-secondary)] transition-opacity hover:opacity-100"
              aria-label="Close project"
            >
              CLOSE
            </button>
          </div>
        </div>

        <div className="relative mb-10 aspect-video w-full overflow-hidden bg-[var(--surface)]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?${params.toString()}`}
            title={project.title || "Project video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {project.caseStudy && (
          <p className="mb-12 max-w-3xl text-base leading-[1.8] text-[var(--text-primary)] opacity-85">
            {project.caseStudy}
          </p>
        )}

        {project.stills && project.stills.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {project.stills.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]"
              >
                <PortfolioImage
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  fallbackVariant="tile"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
