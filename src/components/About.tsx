"use client";

import { useEffect, useRef } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const text = textRef.current;
    if (!section || !portrait || !text) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const triggers = [
      gsap.fromTo(
        portrait,
        { y: 32 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      ),
      gsap.fromTo(
        text,
        { y: 20 },
        {
          y: 0,
          duration: 0.9,
          delay: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      ),
    ];

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  const { primary, secondary } = aboutContent.portraits;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 py-20 md:py-28 px-6 md:px-10 border-t border-border/40 isolate z-0"
      aria-label="About Rafael Diniz"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
        <div ref={portraitRef} className="w-full md:w-[56%] shrink-0 relative z-0">
          <div className="relative pb-10 md:pb-12">
            <div
              className="relative w-full overflow-hidden bg-surface"
              style={{ aspectRatio: "3 / 4" }}
            >
              <PortfolioImage
                src={primary.src}
                alt={primary.alt}
                fill
                className="object-cover"
                style={{
                  objectPosition: primary.objectPosition,
                  transform: "scale(1.05)",
                }}
                sizes="(max-width: 768px) 100vw, 56vw"
              />
            </div>

            <div
              className="absolute bottom-0 right-0 w-[52%] overflow-hidden border border-foreground/15 bg-surface shadow-[0_24px_64px_rgba(0,0,0,0.45)] z-10"
              style={{ aspectRatio: "4 / 3" }}
            >
              <PortfolioImage
                src={secondary.src}
                alt={secondary.alt}
                fill
                className="object-cover"
                style={{
                  objectPosition: secondary.objectPosition,
                  transform: "scale(1.08)",
                }}
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>
          </div>
        </div>

        <div
          ref={textRef}
          className="w-full md:w-[42%] md:max-w-lg md:pt-4 relative z-0"
        >
          <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase text-muted mb-6 md:mb-8">
            About
          </p>

          <div className="space-y-5 md:space-y-6">
            {aboutContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-serif text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-foreground/88"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 md:mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {aboutContent.disciplines.map((discipline) => (
              <li
                key={discipline}
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted border-l border-foreground/25 pl-3"
              >
                {discipline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
