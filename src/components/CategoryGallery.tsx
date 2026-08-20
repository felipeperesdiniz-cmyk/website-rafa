"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryPhoto } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

interface CategoryGalleryProps {
  photos: GalleryPhoto[];
  title?: string;
}

export default function CategoryGallery({ photos }: CategoryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [displayPhotos, setDisplayPhotos] = useState(photos);
  const gridRef = useRef<HTMLDivElement>(null);
  const savedScroll = useRef(0);

  useEffect(() => {
    setDisplayPhotos(photos);
    setVisibleCount(INITIAL_COUNT);
  }, [photos]);

  const close = useCallback(() => {
    if (activeIndex !== null) unlockPageScroll(savedScroll.current);
    setActiveIndex(null);
  }, [activeIndex]);

  const open = useCallback((index: number) => {
    savedScroll.current = lockPageScroll();
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight")
        setActiveIndex((i) =>
          i !== null && i < displayPhotos.length - 1 ? i + 1 : i
        );
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, displayPhotos.length]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".photo-item");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    items.forEach((item, i) => {
      const offset = i % 4 === 3 ? 40 : 0;
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 + offset },
        {
          opacity: 1,
          y: offset,
          duration: 0.8,
          delay: i * 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, [displayPhotos, visibleCount]);

  const visiblePhotos = displayPhotos.slice(0, visibleCount);
  const active = activeIndex !== null ? displayPhotos[activeIndex] : null;

  return (
    <>
      <div ref={gridRef} className="photo-masonry">
        {visiblePhotos.map((photo, index) => {
          const ratio = photo.width / Math.max(photo.height, 1);
          const parallaxOffset = index % 4 === 3 ? 40 : 0;

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => open(index)}
              className="photo-masonry-item photo-item group relative w-full overflow-hidden bg-[var(--surface)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/50"
              style={{ aspectRatio: String(ratio), transform: `translateY(${parallaxOffset}px)` }}
              aria-label={`View ${photo.alt}`}
              data-cursor="view"
            >
              <PortfolioImage
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                style={{ objectPosition: photo.objectPosition }}
                sizes="50vw"
                loading="lazy"
                fallbackVariant="tile"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-3 left-3">
                  <p className="label-caps text-white">
                    {photo.location} · {photo.category.toUpperCase()}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {visibleCount < displayPhotos.length && (
        <div className="flex justify-center py-12">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((c) =>
                Math.min(c + LOAD_MORE_COUNT, displayPhotos.length)
              )
            }
            className="label-caps-sm border border-[var(--border)] px-8 py-3 text-[var(--text-secondary)] transition-colors hover:border-white/30 hover:text-[var(--text-primary)]"
          >
            LOAD MORE
          </button>
        </div>
      )}

      {active && activeIndex !== null && (
        <Lightbox
          photo={active}
          index={activeIndex}
          total={displayPhotos.length}
          onClose={close}
          onPrev={() =>
            setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i))
          }
          onNext={() =>
            setActiveIndex((i) =>
              i !== null && i < displayPhotos.length - 1 ? i + 1 : i
            )
          }
          allPhotos={displayPhotos}
        />
      )}
    </>
  );
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  allPhotos,
}: {
  photo: GalleryPhoto;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  allPhotos: GalleryPhoto[];
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prevIndex = useRef(index);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }, []);

  useEffect(() => {
    if (prevIndex.current === index) return;
    const wrap = imageWrapRef.current;
    if (!wrap) return;

    const direction = index > prevIndex.current ? 1 : -1;
    gsap.fromTo(
      wrap,
      { opacity: 0, x: -20 * direction },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
    prevIndex.current = index;
  }, [index, allPhotos]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 p-3 text-white/60 hover:text-white disabled:opacity-20 md:left-8"
        disabled={index === 0}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 p-3 text-white/60 hover:text-white disabled:opacity-20 md:right-8"
        disabled={index === total - 1}
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-6 top-6 label-caps-sm text-white/60 hover:text-white md:right-8 md:top-8"
        aria-label="Close lightbox"
      >
        CLOSE
      </button>

      <div
        ref={imageWrapRef}
        className="relative mx-4 max-h-[90vh] max-w-[90vw]"
        style={{ aspectRatio: `${photo.width}/${photo.height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <PortfolioImage
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
          fallbackVariant="lightbox"
        />
      </div>

      <p className="label-caps absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--text-secondary)]">
        {index + 1} / {total}
      </p>
    </div>
  );
}
