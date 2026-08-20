"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rd-portfolio-loaded";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
    if (alreadyLoaded) return;

    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    const overlay = overlayRef.current;
    const monogram = monogramRef.current;
    if (!overlay || !monogram) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.fromTo(
      monogram,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    )
      .to({}, { duration: 0.4 })
      .to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--bg)]"
      aria-hidden="true"
    >
      <div
        ref={monogramRef}
        className="label-caps-sm text-[var(--text-secondary)] opacity-0"
      >
        RD
      </div>
    </div>
  );
}
