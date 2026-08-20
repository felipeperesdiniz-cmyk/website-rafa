"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: true,
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-px w-full"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-white/50"
        style={{ width: "0%" }}
      />
    </div>
  );
}
