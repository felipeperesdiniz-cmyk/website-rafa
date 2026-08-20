"use client";

import { useEffect, useRef } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GrainOverlay from "@/components/GrainOverlay";
import { aboutContent } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    if (!section || !portrait) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    ScrollTrigger.create({
      trigger: portrait,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      onUpdate: (self) => {
        const inset = 100 - self.progress * 100;
        portrait.style.clipPath = `inset(0 0 ${inset}% 0)`;
      },
    });

    const textEls = [
      labelRef.current,
      quoteRef.current,
      bodyRef.current,
      tagsRef.current,
    ].filter(Boolean);

    textEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === portrait || t.trigger === section) t.kill();
      });
    };
  }, []);

  const { portrait } = aboutContent;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 min-h-[100dvh] bg-[var(--bg)]"
      aria-label="About Rafael Diniz"
    >
      <div className="flex min-h-[100dvh] flex-col md:flex-row">
        <div className="relative w-full md:w-1/2">
          <div
            ref={portraitRef}
            className="relative h-[55vh] w-full overflow-hidden bg-[var(--surface)] md:h-full md:min-h-[100dvh]"
            style={{ clipPath: "inset(0 0 100% 0)" }}
          >
            <PortfolioImage
              src={portrait.src}
              alt={portrait.alt}
              fill
              className="object-cover"
              style={{ objectPosition: portrait.objectPosition }}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <GrainOverlay />
          </div>
        </div>

        <div className="flex w-full flex-col justify-center px-[5vw] py-14 md:w-1/2 md:min-h-[100dvh] md:py-0">
          <p
            ref={labelRef}
            className="label-caps mb-6 text-[var(--text-secondary)] opacity-40 md:mb-8"
          >
            ABOUT
          </p>

          <blockquote
            ref={quoteRef}
            className="mb-6 border-l border-white/20 pl-5 font-serif text-[1.35rem] font-light italic leading-snug text-[var(--text-primary)] opacity-55 md:mb-8 md:pl-6 md:text-[1.6rem]"
          >
            {aboutContent.pullQuote}
          </blockquote>

          <div ref={bodyRef} className="mb-8 max-w-[520px] space-y-4 md:mb-10 md:space-y-5">
            {aboutContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[0.95rem] leading-[1.8] text-[var(--text-primary)] opacity-85 md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-8 md:mb-10">
            <p className="label-caps mb-3 text-[var(--text-secondary)] opacity-40 md:mb-4">
              AS SEEN ON / WITH
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {aboutContent.credentials.map((cred) => (
                <span
                  key={cred}
                  className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] opacity-50 md:text-[11px]"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>

          <ul ref={tagsRef} className="flex flex-wrap gap-2 md:gap-3">
            {aboutContent.disciplines.map((discipline) => (
              <li
                key={discipline}
                className="label-caps rounded-full border border-[var(--border)] px-3 py-1"
              >
                {discipline.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
