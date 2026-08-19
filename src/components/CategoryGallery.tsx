"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import PortfolioImage from "@/components/PortfolioImage";
import type { GalleryPhoto } from "@/data/site-data";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";
import { ModalCloseButton, ModalControlBar } from "@/components/ModalControls";

interface CategoryGalleryProps {
  photos: GalleryPhoto[];
  title: string;
  clean?: boolean;
}

export default function CategoryGallery({
  photos,
  title,
}: CategoryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const savedScroll = useRef(0);

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
          i !== null && i < photos.length - 1 ? i + 1 : i
        );
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, photos.length]);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 max-w-[1440px] mx-auto">
        {photos.map((photo, index) => {
          const ratio = photo.width / Math.max(photo.height, 1);

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => open(index)}
              className="group relative mb-3 md:mb-4 w-full break-inside-avoid overflow-hidden bg-surface focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground/50"
              style={{ aspectRatio: String(ratio) }}
              aria-label={`View ${photo.alt}`}
            >
              <PortfolioImage
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{ objectPosition: photo.objectPosition }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                fallbackVariant="tile"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
            </button>
          );
        })}
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
            className="relative w-full max-w-[1400px] mx-4 md:mx-8 h-[70vh] md:h-[80vh]"
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
