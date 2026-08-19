"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  enterVideoFullscreen,
  exitElementFullscreen,
  getFullscreenElement,
  requestElementFullscreen,
  supportsElementFullscreen,
} from "@/lib/fullscreen";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";
import {
  bufferedAhead,
  pauseBackgroundVideos,
  prefersLightVideo,
} from "@/lib/video";

gsap.registerPlugin(ScrollTrigger);

const SHOWREEL_VOLUME = 1;
/** Seconds of lead buffer before playback starts, so it doesn't stall instantly. */
const MIN_BUFFER_SECONDS = 4;
/** Start anyway after this long, even if the lead buffer never fills. */
const BUFFER_TIMEOUT_MS = 2500;

interface ShowreelProps {
  compact?: boolean;
}

export default function Showreel({ compact = false }: ShowreelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [isOpen, setIsOpen] = useState(false);
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
    if (!isOpen) return;
    return pauseBackgroundVideos(videoRef.current);
  }, [isOpen]);

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
      className="group relative w-full max-w-[min(100%,90rem)] cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground/50 aspect-video"
      aria-label="Play showreel"
    >
      <div
        ref={posterRef}
        className="relative w-full h-full overflow-hidden bg-surface"
      >
        <PortfolioImage
          src={showreelConfig.poster}
          alt="Showreel poster frame"
          fill
          placeholder="blur"
          blurDataURL={showreelConfig.blurDataURL}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 1400px"
          loading="lazy"
          fallbackSrc={showreelConfig.posterFallback}
          fallbackVariant="hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/20 group-hover:from-black/45 transition-colors duration-500" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-6 md:pb-8 pointer-events-none">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-foreground/35 flex items-center justify-center backdrop-blur-sm bg-black/35 group-hover:border-foreground/60 group-hover:scale-105 transition-all duration-500">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 ml-0.5 text-foreground"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/80">
            Play Showreel
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative flex flex-col items-center justify-center px-6 md:px-10 scroll-mt-24 ${
          compact ? "pb-12 md:pb-16" : "py-14 md:py-20"
        }`}
        aria-label="Showreel"
      >
        <p
          ref={labelRef}
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted mb-8 md:mb-12 text-center"
        >
          {showreelConfig.phrase}
        </p>

        <div className="w-full max-w-[1400px] mx-auto">{posterButton}</div>
      </section>

      {isOpen && (
        <ShowreelModal
          closeRef={closeRef}
          closeModal={closeModal}
          videoRef={videoRef}
        />
      )}
    </>
  );
}

function ShowreelModal({
  closeRef,
  closeModal,
  videoRef,
}: {
  closeRef: React.RefObject<HTMLButtonElement | null>;
  closeModal: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [needsSoundTap, setNeedsSoundTap] = useState(false);
  const hasStarted = useRef(false);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sources = useMemo(
    () =>
      prefersLightVideo()
        ? showreelConfig.lightSources
        : showreelConfig.sources,
    []
  );

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasStarted.current) return;
    hasStarted.current = true;

    if (startTimer.current) {
      clearTimeout(startTimer.current);
      startTimer.current = null;
    }

    video.volume = SHOWREEL_VOLUME;
    video.muted = false;

    try {
      await video.play();
    } catch {
      // iOS only grants sound to a play() call inside the tap itself, so fall
      // back to a muted start and offer a tap to bring the audio in.
      video.muted = true;
      setNeedsSoundTap(true);
      try {
        await video.play();
      } catch {
        hasStarted.current = false;
      }
    }
  }, [videoRef]);

  const enableSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = SHOWREEL_VOLUME;
    video.play().catch(() => {});
    setNeedsSoundTap(false);
  }, [videoRef]);

  const onBufferProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasStarted.current) return;

    if (video.readyState >= 4 || bufferedAhead(video) >= MIN_BUFFER_SECONDS) {
      startPlayback();
    }
  }, [videoRef, startPlayback]);

  const onCanPlay = useCallback(() => {
    onBufferProgress();
    if (hasStarted.current || startTimer.current) return;
    startTimer.current = setTimeout(startPlayback, BUFFER_TIMEOUT_MS);
  }, [onBufferProgress, startPlayback]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      if (startTimer.current) clearTimeout(startTimer.current);
    };
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

    if (!supportsElementFullscreen(container)) {
      enterVideoFullscreen(videoRef.current);
      return;
    }

    requestElementFullscreen(container).catch(() => {
      enterVideoFullscreen(videoRef.current);
    });
  }, [videoRef]);

  return (
    <div
      ref={containerRef}
      className={`showreel-modal fixed inset-0 z-[100] bg-black flex items-center justify-center ${
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

      <div className="relative w-full h-full max-h-[100dvh] flex items-center justify-center px-0 sm:px-4">
        <video
          ref={videoRef}
          className="showreel-modal-video w-full h-auto max-h-[100dvh] bg-black cursor-pointer"
          playsInline
          preload="auto"
          poster={showreelConfig.poster}
          disablePictureInPicture
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (video.paused) video.play().catch(() => {});
            else video.pause();
          }}
          onLoadedMetadata={onBufferProgress}
          onProgress={onBufferProgress}
          onCanPlay={onCanPlay}
          onPlaying={() => setIsBuffering(false)}
          onWaiting={() => setIsBuffering(true)}
          aria-label={showreelConfig.title}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        {isBuffering && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-8 h-8 rounded-full border border-foreground/25 border-t-foreground/80 animate-spin" />
          </div>
        )}

        {needsSoundTap && (
          <button
            type="button"
            onClick={enableSound}
            className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 rounded-full bg-black/60 px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M11 5L6 9H3v6h3l5 4V5zM16 9a4 4 0 010 6M19 6a8 8 0 010 12" />
            </svg>
            Tap for sound
          </button>
        )}
      </div>
    </div>
  );
}
