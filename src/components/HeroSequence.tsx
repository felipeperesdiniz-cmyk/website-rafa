"use client";

import { useEffect, useRef, useState } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { heroConfig, siteConfig } from "@/data/site-data";

export default function HeroSequence() {
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPreload, setVideoPreload] = useState<"auto" | "metadata">(
    "metadata"
  );

  useEffect(() => {
    const title = titleRef.current;
    const scroll = scrollRef.current;
    if (!title || !scroll) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    setVideoPreload(isMobile ? "metadata" : "auto");

    if (!prefersReduced) {
      setMotionEnabled(true);
    }

    if (prefersReduced) {
      gsap.set([title, scroll], { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      title,
      { y: 20 },
      { y: 0, duration: 1.2, delay: 0.4, ease: "power3.out" }
    );

    gsap.fromTo(
      scroll,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (!motionEnabled || videoFailed) return;

    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.muted = true;

    const play = () => {
      video.play().catch(() => {});
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };

    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);
    play();

    return () => {
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motionEnabled, videoFailed]);

  return (
    <section
      className="relative h-[100svh] min-h-[600px] w-full bg-background overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0">
        <PortfolioImage
          src={heroConfig.poster}
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={heroConfig.blurDataURL}
          className="object-cover"
          style={{ objectPosition: heroConfig.objectPosition }}
          sizes="100vw"
          aria-hidden="true"
          fallbackVariant="hero"
        />

        {motionEnabled && !videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: heroConfig.objectPosition }}
            autoPlay
            muted
            loop
            playsInline
            preload={videoPreload}
            poster={heroConfig.poster}
            aria-hidden="true"
            onCanPlay={(e) => {
              e.currentTarget.loop = true;
              e.currentTarget.play().catch(() => {});
            }}
            onError={() => setVideoFailed(true)}
          >
            <source src={heroConfig.video} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      </div>

      <div
        ref={titleRef}
        className="absolute bottom-24 sm:bottom-20 md:bottom-20 left-6 md:left-10 z-10 max-w-[80%]"
      >
        <h1 className="text-[clamp(1.5rem,4vw,3rem)] tracking-[0.2em] uppercase font-light">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-xs md:text-sm tracking-[0.3em] uppercase text-muted">
          {siteConfig.tagline}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-5 right-6 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto z-10 opacity-0 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-muted">
          Explore
        </span>
        <div className="w-px h-6 bg-muted/50" />
      </div>
    </section>
  );
}
