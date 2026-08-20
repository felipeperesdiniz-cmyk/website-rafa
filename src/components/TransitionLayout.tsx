"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    const content = contentRef.current;
    const bar = barRef.current;
    if (!content || !bar) return;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline();

    tl.set(bar, { scaleX: 0, transformOrigin: "left center" })
      .set(content, { opacity: 0, y: 20 })
      .to(bar, { scaleX: 1, duration: 0.4, ease: "power2.inOut" })
      .to(bar, { scaleX: 0, transformOrigin: "right center", duration: 0.4, ease: "power2.inOut" })
      .to(content, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={barRef}
        className="pointer-events-none fixed left-0 top-0 z-[150] h-1 w-full origin-left bg-[var(--bg)]"
        aria-hidden="true"
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
