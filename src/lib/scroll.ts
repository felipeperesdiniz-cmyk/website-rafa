"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let scrollLockCount = 0;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function lockPageScroll(): number {
  scrollLockCount += 1;
  if (scrollLockCount === 1) {
    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");
    lenisInstance?.stop();
  }
  return window.scrollY;
}

export function unlockPageScroll(scrollY?: number): void {
  if (scrollLockCount === 0) return;
  scrollLockCount -= 1;
  if (scrollLockCount > 0) return;

  document.documentElement.classList.remove("scroll-locked");
  document.body.classList.remove("scroll-locked");

  const lenis = lenisInstance;
  if (lenis) {
    lenis.start();
    if (scrollY !== undefined) {
      lenis.scrollTo(scrollY, { immediate: true });
    }
    ScrollTrigger.refresh();
    return;
  }

  if (scrollY !== undefined) {
    window.scrollTo(0, scrollY);
  }
}

export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    const init = async () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const LenisClass = (await import("lenis")).default;
      lenis = new LenisClass({
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
      });

      lenisInstance = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      rafCallback = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    init();

    return () => {
      if (rafCallback) gsap.ticker.remove(rafCallback);
      lenis?.destroy();
      lenisInstance = null;
      scrollLockCount = 0;
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, []);
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
