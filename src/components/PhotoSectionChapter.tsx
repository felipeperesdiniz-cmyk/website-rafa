"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryGallery from "@/components/CategoryGallery";
import type { PhotoSection } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

interface PhotoSectionChapterProps {
  section: PhotoSection;
}

export default function PhotoSectionChapter({ section }: PhotoSectionChapterProps) {
  const articleRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    const header = headerRef.current;
    const hero = heroRef.current;
    if (!article || !header) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const triggers = [
      gsap.fromTo(
        header,
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 82%",
            once: true,
          },
        }
      ),
    ];

    if (hero) {
      triggers.push(
        gsap.fromTo(
          hero,
          { scale: 1.04 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hero,
              start: "top 88%",
              once: true,
            },
          }
        )
      );
    }

    return () => {
      triggers.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <article
      ref={articleRef}
      id={`photography-${section.slug}`}
      className="scroll-mt-24"
      aria-label={section.title}
    >
      <div ref={headerRef} className="max-w-[1440px] mx-auto mb-8 md:mb-12">
        <p className="text-[10px] tracking-[0.45em] uppercase text-muted">
          {section.label}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-5xl font-light tracking-tight leading-[1.05]">
          {section.title}
        </h2>
        <p className="mt-3 text-[10px] tracking-[0.25em] uppercase text-muted/70">
          {section.photos.length} images
        </p>
      </div>

      <div
        ref={heroRef}
        className="relative w-full max-w-[1440px] mx-auto aspect-[21/9] md:aspect-[2.35/1] max-h-[min(52vh,520px)] overflow-hidden bg-surface mb-10 md:mb-14"
      >
        <Image
          src={section.hero.src}
          alt={section.hero.alt}
          fill
          className="object-cover"
          style={{
            objectPosition: section.hero.objectPosition,
            transform: `scale(${section.hero.scale ?? 1})`,
          }}
          sizes="100vw"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <CategoryGallery photos={section.photos} title={section.title} />
    </article>
  );
}
