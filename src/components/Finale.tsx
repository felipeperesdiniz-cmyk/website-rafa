"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finaleCopy, contactLinks, siteConfig } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    const links = linksRef.current;
    if (!section || !lines) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lineEls = lines.querySelectorAll(".finale-line");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      lineEls.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 40 },
          {
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              once: true,
            },
            delay: i * 0.12,
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        lineEls,
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lines,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    if (links) {
      gsap.fromTo(
        links,
        { y: 12 },
        {
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: links,
            start: "top 92%",
            once: true,
          },
        }
      );
    }

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative scroll-mt-24 min-h-[40vh] flex flex-col justify-center py-16 md:py-24 px-6 md:px-10"
      aria-label="Contact"
    >
      <div ref={linesRef} className="max-w-[900px]">
        {finaleCopy.lines.map((line, i) => (
          <p
            key={i}
            className="finale-line font-serif text-[clamp(2rem,6vw,5rem)] font-light leading-[1.1] tracking-[-0.01em]"
          >
            {line}
          </p>
        ))}
      </div>

      <div className="mt-14 md:mt-20">
        <a
          href={`mailto:${siteConfig.email}`}
          className="group inline-flex flex-col gap-3"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted group-hover:text-foreground/80 transition-colors">
            Start a conversation
          </span>
          <span className="font-serif text-2xl md:text-4xl font-light text-foreground/90 group-hover:text-foreground transition-colors">
            {siteConfig.email}
          </span>
        </a>
      </div>

      {contactLinks.length > 0 && (
        <div ref={linksRef} className="mt-10 md:mt-12 flex flex-wrap gap-8">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] tracking-[0.3em] uppercase text-muted hover:text-foreground transition-colors"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="h-[6vh]" aria-hidden="true" />
    </section>
  );
}
