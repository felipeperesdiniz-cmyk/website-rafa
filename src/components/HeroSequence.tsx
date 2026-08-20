"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroConfig } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const name = nameRef.current;
    const scrollLine = scrollLineRef.current;
    const video = videoRef.current;
    if (!section || !videoWrap || !name || !scrollLine) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (video) {
      video.loop = true;
      video.muted = true;
      video.play().catch(() => {});
    }

    if (prefersReduced) {
      gsap.set([name, scrollLine], { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      scrollLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        transformOrigin: "top center",
        repeat: -1,
        yoyo: true,
      }
    );

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(videoWrap, {
          opacity: 0.45 * (1 - p),
          scale: 1 + p * 0.08,
        });
        gsap.set(name, {
          y: -30 * p,
          opacity: 1 - p,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [videoReady]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-[var(--bg)]"
      aria-label="Introduction"
    >
      <div ref={videoWrapRef} className="absolute inset-0" style={{ opacity: 0.45, transform: "scale(1)" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: heroConfig.objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          data-cursor="play"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={heroConfig.video} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.8) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="absolute left-[5vw] top-8 z-10">
        <span className="label-caps-sm text-[13px] text-[var(--text-secondary)] opacity-70">
          RD
        </span>
      </div>

      <div
        ref={nameRef}
        className="absolute left-[5vw] top-1/2 z-10 -translate-y-1/2"
      >
        <h1 className="font-serif text-[clamp(3rem,10vw,14vw)] font-light leading-none tracking-normal text-white">
          RAFAEL DINIZ
        </h1>
        <p className="label-caps-sm mt-4 text-[11px] text-[var(--text-secondary)] opacity-55">
          PHOTOGRAPHY & MOTION
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <div
          ref={scrollLineRef}
          className="h-[60px] w-px origin-top bg-white/40"
          aria-hidden="true"
        />
        <span className="label-caps text-[var(--text-tertiary)] opacity-40">
          SCROLL
        </span>
      </div>
    </section>
  );
}
