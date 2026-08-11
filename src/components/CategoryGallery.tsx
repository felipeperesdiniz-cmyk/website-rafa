"use client";

import { useState, useCallback, useEffect } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import type { GalleryLayout, GalleryPhoto } from "@/data/site-data";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";
import { ModalCloseButton, ModalControlBar } from "@/components/ModalControls";

interface CategoryGalleryProps {
  photos: GalleryPhoto[];
  title: string;
  clean?: boolean;
}

const layoutGrid: Record<GalleryLayout, string> = {
  standard: "col-span-12 sm:col-span-6 md:col-span-6 min-h-[260px] md:min-h-[320px]",
  wide: "col-span-12 md:col-span-8 min-h-[220px] md:min-h-[360px]",
  tall: "col-span-12 sm:col-span-6 md:col-span-4 md:row-span-2 min-h-[360px] md:min-h-[520px]",
  full: "col-span-12 min-h-[300px] md:min-h-[480px]",
  float:
    "col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-5 md:col-start-8 min-h-[280px] md:min-h-[380px]",
};

function getLayoutClass(layout?: GalleryLayout): string {
  return layoutGrid[layout ?? "standard"];
}

export default function CategoryGallery({
  photos,
  title,
  clean = false,
}: CategoryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => {
    if (activeIndex !== null) unlockPageScroll();
    setActiveIndex(null);
  }, [activeIndex]);

  const open = useCallback((index: number) => {
    lockPageScroll();
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
          i !== null && i < photos.length - 1 ? i + 1 : i
        );
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, photos.length]);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div
        className={
          clean
            ? "grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-[1080px] mx-auto"
            : "grid grid-cols-12 gap-3 md:gap-4 max-w-[1440px] mx-auto auto-rows-auto"
        }
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => open(index)}
            className={
              clean
                ? "group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground/50"
                : `group relative overflow-hidden bg-surface focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground/50 ${getLayoutClass(photo.layout)}`
            }
            aria-label={`View ${photo.alt}`}
          >
            <PortfolioImage
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: photo.objectPosition }}
              sizes={clean ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 640px) 100vw, 50vw"}
              loading="lazy"
              fallbackVariant="tile"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
          </button>
        ))}
      </div>

      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={close}
        >
          <ModalControlBar className="!top-5 !right-5 md:!top-8 md:!right-8">
            <ModalCloseButton
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              label="Close image"
            />
          </ModalControlBar>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-3 text-foreground/60 hover:text-foreground disabled:opacity-20"
            disabled={activeIndex === 0}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) =>
                i !== null && i < photos.length - 1 ? i + 1 : i
              );
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-3 text-foreground/60 hover:text-foreground disabled:opacity-20"
            disabled={activeIndex === photos.length - 1}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-[1400px] mx-4 md:mx-8 h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <PortfolioImage
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              fallbackVariant="lightbox"
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-muted">
            {activeIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
