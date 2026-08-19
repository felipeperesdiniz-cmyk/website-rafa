"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import HeroSequence from "@/components/HeroSequence";
import Showreel from "@/components/Showreel";
import SectionDivider from "@/components/SectionDivider";
import MotionProjects from "@/components/MotionProjects";
import PhotographyGallery from "@/components/PhotographyGallery";
import About from "@/components/About";
import Finale from "@/components/Finale";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/lib/scroll";

export default function Home() {
  useSmoothScroll();

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <main>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:outline focus:outline-1 focus:outline-foreground/50"
      >
        Skip to content
      </a>
      <Navigation />
      <HeroSequence />
      <section id="work" className="scroll-mt-24" aria-label="Work">
        <Showreel />
        <SectionDivider />
        <MotionProjects />
      </section>
      <PhotographyGallery />
      <About />
      <Finale />
      <Footer />
    </main>
  );
}
