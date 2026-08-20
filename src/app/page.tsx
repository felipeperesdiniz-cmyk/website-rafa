"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import HeroSequence from "@/components/HeroSequence";
import ShowreelTransition from "@/components/ShowreelTransition";
import MotionProjects from "@/components/MotionProjects";
import PhotographyGallery from "@/components/PhotographyGallery";
import About from "@/components/About";
import Finale from "@/components/Finale";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import LoadingScreen from "@/components/LoadingScreen";
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
    <>
      <LoadingScreen />
      <ScrollProgressBar />
      <main>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:bg-[var(--bg)] focus:px-4 focus:py-2 focus:text-[var(--text-primary)] focus:outline focus:outline-1 focus:outline-white/50"
        >
          Skip to content
        </a>
        <Navigation />
        <HeroSequence />
        <ShowreelTransition />
        <section id="work" className="scroll-mt-24" aria-label="Work">
          <MotionProjects />
        </section>
        <PhotographyGallery />
        <About />
        <Finale />
        <Footer />
      </main>
    </>
  );
}
