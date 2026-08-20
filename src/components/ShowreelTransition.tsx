"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showreelConfig } from "@/data/site-data";
import { prefersLightVideo } from "@/lib/video";
import {
  bindFullscreenChange,
  enterVideoFullscreen,
  exitElementFullscreen,
  getFullscreenElement,
  requestElementFullscreen,
  supportsElementFullscreen,
} from "@/lib/fullscreen";
import { getLenis } from "@/lib/scroll";
import {
  ModalCloseButton,
  ModalControlBar,
  ModalFullscreenButton,
} from "@/components/ModalControls";

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const showreelLayerRef = useRef<HTMLDivElement>(null);
  const playUiRef = useRef<HTMLDivElement>(null);
  const playHintRef = useRef<HTMLParagraphElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uiReady, setUiReady] = useState(false);
  const [ended, setEnded] = useState(false);

  const sources = useMemo(
    () =>
      prefersLightVideo()
        ? showreelConfig.lightSources
        : showreelConfig.sources,
    []
  );

  const scrollToWork = useCallback(() => {
    const work = document.getElementById("work");
    const lenis = getLenis();
    if (lenis && work) {
      lenis.scrollTo(work, { offset: -80, duration: 1.2 });
      return;
    }
    work?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleStop = useCallback(async () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (getFullscreenElement()) {
      await exitElementFullscreen().catch(() => {});
    }

    setPlaying(false);
    setEnded(false);
    setIsFullscreen(false);
    playBtnRef.current?.focus();
  }, []);

  const handleSkip = useCallback(async () => {
    await handleStop();
    scrollToWork();
  }, [handleStop, scrollToWork]);

  useEffect(() => {
    const scrollTrack = scrollTrackRef.current;
    const pinStage = pinStageRef.current;
    const revealLayer = revealLayerRef.current;
    const showreelLayer = showreelLayerRef.current;
    const playUi = playUiRef.current;
    const playHint = playHintRef.current;

    if (!scrollTrack || !pinStage || !revealLayer || !showreelLayer || !playUi) {
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(revealLayer, { opacity: 0 });
      gsap.set(showreelLayer, { opacity: 1, clipPath: "inset(0% 0 0 0)" });
      gsap.set(playUi, { opacity: 1, y: 0 });
      setUiReady(true);
      return;
    }

    const mm = gsap.matchMedia();

    const setupTrigger = (end: string, scrub: number) => {
      gsap.set(revealLayer, { opacity: 1, scale: 1.08 });
      gsap.set(showreelLayer, {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        scale: 1.06,
      });
      gsap.set(playUi, { opacity: 0, y: 20 });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: scrollTrack,
        start: "top top",
        end,
        pin: pinStage,
        scrub,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.45) {
            const t = p / 0.45;
            const inset = 100 - t * 100;
            gsap.set(showreelLayer, {
              opacity: t * 0.9,
              clipPath: `inset(${inset}% 0 0 0)`,
              scale: 1.06 - t * 0.06,
            });
            gsap.set(revealLayer, {
              opacity: 1 - t * 0.7,
              scale: 1.08 - t * 0.08,
            });
            gsap.set(playUi, { opacity: 0, y: 20 * (1 - t) });
            if (playHint) gsap.set(playHint, { opacity: 0 });
            setUiReady(false);
          } else if (p < 0.72) {
            const t = (p - 0.45) / 0.27;
            gsap.set(showreelLayer, {
              opacity: 0.9 + t * 0.1,
              clipPath: "inset(0% 0 0 0)",
              scale: 1,
            });
            gsap.set(revealLayer, { opacity: 0.3 * (1 - t) });
            gsap.set(playUi, { opacity: t * 0.5, y: 12 * (1 - t) });
            if (playHint) gsap.set(playHint, { opacity: 0 });
            setUiReady(t > 0.6);
          } else {
            const t = (p - 0.72) / 0.28;
            gsap.set(revealLayer, { opacity: 0 });
            gsap.set(showreelLayer, { opacity: 1, scale: 1 });
            gsap.set(playUi, {
              opacity: 0.5 + t * 0.5,
              y: 12 - t * 12,
            });
            if (playHint) gsap.set(playHint, { opacity: t > 0.45 ? 0.55 : 0 });
            setUiReady(t > 0.45);
          }
        },
        onLeave: () => setUiReady(false),
        onLeaveBack: () => setUiReady(false),
      });
    };

    mm.add("(min-width: 768px)", () => setupTrigger("+=260%", 1.4));
    mm.add("(max-width: 767px)", () => setupTrigger("+=200%", 1.2));

    return () => {
      scrollTriggerRef.current = null;
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const pinStage = pinStageRef.current;
    if (!pinStage || loaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(pinStage);
    return () => observer.disconnect();
  }, [loaded]);

  useEffect(() => {
    return bindFullscreenChange(() => {
      setIsFullscreen(Boolean(getFullscreenElement()));
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inSection = sectionRef.current?.contains(document.activeElement);
      const sectionVisible = scrollTriggerRef.current?.isActive;
      if (!inSection && !sectionVisible && !playing) return;

      if (e.key === "Escape") {
        if (getFullscreenElement()) {
          exitElementFullscreen().catch(() => {});
          return;
        }
        if (playing) {
          e.preventDefault();
          handleStop();
          return;
        }
      }

      if (e.key === "Tab" && playing && getFullscreenElement()) {
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, handleStop]);

  const handlePlay = useCallback(async () => {
    const btn = playBtnRef.current;
    const video = videoRef.current;
    const container = pinStageRef.current;
    if (!btn || !video || !container) return;

    gsap.to(btn, {
      scale: 2.2,
      opacity: 0,
      duration: 0.55,
      ease: "power2.in",
    });

    setPlaying(true);
    setEnded(false);
    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
    } catch {
      video.muted = true;
      await video.play().catch(() => {});
    }

    if (supportsElementFullscreen(container)) {
      requestElementFullscreen(container).catch(() => {
        enterVideoFullscreen(video);
      });
    } else {
      enterVideoFullscreen(video);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const container = pinStageRef.current;
    const video = videoRef.current;
    if (!container) return;

    if (getFullscreenElement()) {
      await exitElementFullscreen().catch(() => {});
      return;
    }

    if (supportsElementFullscreen(container)) {
      await requestElementFullscreen(container).catch(() => {
        enterVideoFullscreen(video);
      });
    } else {
      enterVideoFullscreen(video);
    }
  }, []);

  const onVideoEnded = useCallback(() => {
    setEnded(true);
    setPlaying(false);
    exitElementFullscreen().catch(() => {});
    playBtnRef.current?.focus();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--bg)]"
      aria-label="Showreel"
    >
      <div ref={scrollTrackRef} className="relative h-[200vh] md:h-[260vh]">
        <div
          ref={pinStageRef}
          className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[var(--bg)]"
        >
          {/* Hero handoff */}
          <div
            ref={revealLayerRef}
            className="absolute inset-0 z-10 bg-[var(--bg)]"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, var(--bg) 70%)",
              }}
            />
          </div>

          {/* Showreel video */}
          <div
            ref={showreelLayerRef}
            className="absolute inset-0 z-20 opacity-0"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              muted={!playing}
              controls={playing}
              preload={loaded ? "auto" : "none"}
              poster={showreelConfig.poster}
              data-cursor="play"
              onEnded={onVideoEnded}
              tabIndex={playing ? 0 : -1}
            >
              {loaded &&
                sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
            </video>
            {!playing && (
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-[var(--bg)]/30"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Top controls — always tabbable once UI is ready */}
          <div className="absolute inset-x-0 top-0 z-40 flex items-start justify-between px-[5vw] pt-6 md:pt-8">
            <button
              ref={skipBtnRef}
              type="button"
              onClick={handleSkip}
              className={`label-caps-sm rounded-sm border border-white/15 px-4 py-2.5 text-[var(--text-secondary)] transition-all hover:border-white/35 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/50 ${
                uiReady || playing ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              tabIndex={uiReady || playing ? 0 : -1}
            >
              Skip to work
            </button>

            {playing && (
              <ModalControlBar className="!static !rounded-full">
                <ModalFullscreenButton
                  isFullscreen={isFullscreen}
                  onClick={toggleFullscreen}
                />
                <ModalCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStop();
                  }}
                  label="Close showreel"
                />
              </ModalControlBar>
            )}
          </div>

          {/* Center play UI */}
          <div
            ref={playUiRef}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center"
            aria-hidden={playing}
          >
            <p className="label-caps-sm pointer-events-none mb-8 text-[var(--text-secondary)] opacity-40 md:mb-10">
              SHOWREEL
            </p>

            {!playing && (
              <button
                ref={playBtnRef}
                type="button"
                onClick={handlePlay}
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:scale-[1.11] hover:border-white/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/50 md:h-[80px] md:w-[80px] ${
                  uiReady ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-label="Play showreel fullscreen"
                data-cursor="play"
                tabIndex={uiReady ? 0 : -1}
              >
                <span className="label-caps-sm text-[10px]">PLAY</span>
              </button>
            )}

            {ended && !playing && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <p className="label-caps-sm text-[var(--text-secondary)] opacity-60">
                  Showreel complete
                </p>
                <button
                  type="button"
                  onClick={scrollToWork}
                  className="label-caps-sm border border-white/20 px-6 py-3 text-[var(--text-primary)] transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/50"
                >
                  Continue to work
                </button>
              </div>
            )}

            <p className="label-caps pointer-events-none absolute bottom-8 right-[5vw] text-[var(--text-secondary)] opacity-35 md:bottom-12">
              {showreelConfig.duration} · {showreelConfig.year}
            </p>

            {!playing && !ended && (
              <p
                ref={playHintRef}
                className="label-caps pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-tertiary)] opacity-0 md:bottom-12"
              >
                TAB · PLAY &nbsp;|&nbsp; SKIP TO WORK
              </p>
            )}
          </div>

          {/* Bottom continue — visible when UI ready and not playing */}
          {uiReady && !playing && !ended && (
            <div className="absolute bottom-8 left-[5vw] z-40 md:bottom-12">
              <button
                type="button"
                onClick={scrollToWork}
                className="label-caps-sm text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/50"
              >
                Scroll to continue ↓
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
