"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryGallery from "@/components/CategoryGallery";
import { galleryPhotos } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function PhotographyGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    if (!section || !label) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const tween = gsap.fromTo(
      label,
      { y: 16 },
      {
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="photography"
      ref={sectionRef}
      className="scroll-mt-24 py-12 md:py-16 px-6 md:px-10 border-t border-border/30"
      aria-label="Photography"
    >
      <p
        ref={labelRef}
        className="text-[10px] tracking-[0.4em] uppercase text-muted mb-8 md:mb-12 max-w-[1440px] mx-auto"
      >
        Photography
      </p>

      <CategoryGallery photos={galleryPhotos} title="Photography" />
    </section>
  );
}
