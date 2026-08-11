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
      <Navigation />
      <HeroSequence />
      <Showreel />
      <SectionDivider />
      <MotionProjects />
      <PhotographyGallery />
      <About />
      <Finale />
      <Footer />
    </main>
  );
}
