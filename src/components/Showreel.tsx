"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showreelConfig } from "@/data/site-data";
import { prefersLightVideo } from "@/lib/video";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const sources = useMemo(
    () =>
      prefersLightVideo()
        ? showreelConfig.lightSources
        : showreelConfig.sources,
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        const inset = 100 - p * 100;
        container.style.clipPath = `inset(${inset}% 0 0 0)`;
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [loaded]);

  const handlePlay = useCallback(() => {
    const btn = playBtnRef.current;
    const video = videoRef.current;
    if (!btn || !video) return;

    gsap.to(btn, {
      scale: 2,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setPlaying(true);
        video.play().catch(() => {});
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--bg)] py-16 md:py-20"
      aria-label="Showreel"
    >
      <p className="label-caps-sm mb-8 text-center text-[var(--text-secondary)] opacity-40">
        SHOWREEL
      </p>

      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden bg-[var(--surface)]"
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
        >
          {loaded &&
            sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
        </video>

        {!playing && (
          <button
            ref={playBtnRef}
            type="button"
            onClick={handlePlay}
            className="absolute left-1/2 top-1/2 z-10 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:scale-[1.11] hover:border-white/80"
            aria-label="Play showreel"
            data-cursor="play"
          >
            <span className="label-caps-sm text-[10px]">PLAY</span>
          </button>
        )}
      </div>

      <p className="label-caps mt-4 pr-[5vw] text-right text-[var(--text-secondary)] opacity-35">
        {showreelConfig.duration} · {showreelConfig.year}
      </p>
    </section>
  );
}
