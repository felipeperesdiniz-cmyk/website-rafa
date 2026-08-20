"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryGallery from "@/components/CategoryGallery";
import {
  galleryPhotos,
  photoFilterTabs,
  type PhotoFilterId,
  type GalleryPhoto,
} from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function PhotographyGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeFilter, setActiveFilter] = useState<PhotoFilterId>("all");
  const [filteredPhotos, setFilteredPhotos] = useState<GalleryPhoto[]>(galleryPhotos);
  const gridKey = useRef(0);

  const filterPhotos = useCallback((filterId: PhotoFilterId): GalleryPhoto[] => {
    if (filterId === "all") return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === filterId);
  }, []);

  const handleFilter = useCallback(
    (filterId: PhotoFilterId) => {
      if (filterId === activeFilter) return;
      setActiveFilter(filterId);

      const newPhotos = filterPhotos(filterId);
      const section = sectionRef.current;
      if (!section) {
        setFilteredPhotos(newPhotos);
        gridKey.current += 1;
        return;
      }

      const grid = section.querySelector(".photo-masonry");
      if (!grid) {
        setFilteredPhotos(newPhotos);
        gridKey.current += 1;
        return;
      }

      const items = grid.querySelectorAll(".photo-item");
      gsap.to(items, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.02,
        onComplete: () => {
          setFilteredPhotos(newPhotos);
          gridKey.current += 1;
        },
      });
    },
    [activeFilter, filterPhotos]
  );

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="photography"
      ref={sectionRef}
      className="scroll-mt-24 py-section"
      aria-label="Photography"
    >
      <h2
        ref={titleRef}
        className="px-[5vw] font-serif text-[clamp(2.5rem,4rem,4rem)] font-light text-[var(--text-primary)]"
      >
        PHOTOGRAPHY
      </h2>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 px-[5vw]">
        {photoFilterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleFilter(tab.id)}
            className={`label-caps pb-1 transition-opacity ${
              activeFilter === tab.id
                ? "border-b border-white text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] opacity-60 hover:opacity-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <CategoryGallery key={gridKey.current} photos={filteredPhotos} />
      </div>
    </section>
  );
}
