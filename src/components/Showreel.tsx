"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showreelConfig } from "@/data/site-data";
import {
  ModalCloseButton,
  ModalControlBar,
  ModalFullscreenButton,
} from "@/components/ModalControls";
import {
  bindFullscreenChange,
  exitElementFullscreen,
  getFullscreenElement,
  requestElementFullscreen,
} from "@/lib/fullscreen";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const SHOWREEL_VOLUME = 1;

interface ShowreelProps {
  compact?: boolean;
}

export default function Showreel({ compact = false }: ShowreelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const savedScroll = useRef(0);

  useEffect(() => {
    if (compact) return;

    const section = sectionRef.current;
    const poster = posterRef.current;
    const label = labelRef.current;
    if (!section || !poster || !label) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        poster,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        label,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        [poster, label],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => mm.revert();
  }, [compact]);

  const closeModal = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (getFullscreenElement()) {
      exitElementFullscreen().catch(() => {});
    }

    setIsOpen(false);
    setVideoLoaded(false);
    unlockPageScroll(savedScroll.current);
    triggerRef.current?.focus();
  }, []);

  const openModal = useCallback(() => {
    savedScroll.current = lockPageScroll();
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (getFullscreenElement()) {
        exitElementFullscreen().catch(() => {});
        return;
      }

      closeModal();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen || !videoLoaded || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = false;
    video.volume = SHOWREEL_VOLUME;
    video.play().catch(() => {});
  }, [isOpen, videoLoaded]);

  useEffect(() => {
    return () => {
      if (isOpen) {
        unlockPageScroll(savedScroll.current);
      }
    };
  }, [isOpen]);

  const posterButton = (
    <button
      ref={triggerRef}
      type="button"
      onClick={openModal}
      className="group relative w-full cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground/50"
      aria-label="Play showreel"
      style={{
        width: "min(100vw - 3rem, 90rem, calc((100svh - 8rem) * 16 / 9))",
        aspectRatio: "16 / 9",
      }}
    >
      <div
        ref={posterRef}
        className="relative w-full h-full overflow-hidden bg-surface"
      >
        <PortfolioImage
          src={showreelConfig.poster}
          alt="Showreel poster frame"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 1400px"
          loading="lazy"
          fallbackSrc={showreelConfig.posterFallback}
          fallbackVariant="hero"
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-foreground/30 flex items-center justify-center backdrop-blur-sm bg-black/20 group-hover:border-foreground/60 group-hover:scale-105 transition-all duration-500">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 md:w-6 md:h-6 ml-0.5 text-foreground"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">
              Play Showreel
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <>
      <section
        ref={sectionRef}
        id={compact ? undefined : "showreel"}
        className={`relative flex flex-col items-center justify-center px-6 md:px-10 scroll-mt-24 ${
          compact ? "pb-12 md:pb-16" : "min-h-screen py-20 md:py-24"
        }`}
        aria-label="Showreel"
      >
        <p
          ref={labelRef}
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted mb-8 md:mb-12 text-center"
        >
          {showreelConfig.phrase}
        </p>

        {posterButton}
      </section>

      {isOpen && (
        <ShowreelModal
          closeRef={closeRef}
          closeModal={closeModal}
          videoRef={videoRef}
          setVideoLoaded={setVideoLoaded}
        />
      )}
    </>
  );
}

function ShowreelModal({
  closeRef,
  closeModal,
  videoRef,
  setVideoLoaded,
}: {
  closeRef: React.RefObject<HTMLButtonElement | null>;
  closeModal: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setVideoLoaded: (loaded: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    return bindFullscreenChange(() => {
      setIsFullscreen(getFullscreenElement() === containerRef.current);
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (getFullscreenElement() === container) {
      exitElementFullscreen().catch(() => {});
      return;
    }

    requestElementFullscreen(container).catch(() => {});
  }, []);

  return (
    <div
      ref={containerRef}
      className={`showreel-modal fixed inset-0 z-[100] bg-black ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={showreelConfig.title}
    >
      <ModalControlBar>
        <ModalFullscreenButton
          isFullscreen={isFullscreen}
          onClick={toggleFullscreen}
        />
        <ModalCloseButton
          ref={closeRef}
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          label="Close showreel"
        />
      </ModalControlBar>

      <video
        ref={videoRef}
        className="showreel-modal-video absolute inset-0 w-full h-full bg-black"
        controls
        controlsList="nofullscreen noremoteplayback"
        disablePictureInPicture
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoLoaded(true)}
        aria-label={showreelConfig.title}
      >
        {showreelConfig.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
    </div>
  );
}
