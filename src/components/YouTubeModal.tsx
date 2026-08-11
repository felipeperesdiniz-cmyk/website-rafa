"use client";

import { useEffect, useRef, useCallback } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scroll";
import { ModalCloseButton, ModalControlBar } from "@/components/ModalControls";

interface YouTubeModalProps {
  youtubeId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function YouTubeModal({
  youtubeId,
  title,
  isOpen,
  onClose,
  triggerRef,
}: YouTubeModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const savedScroll = useRef(0);

  const close = useCallback(() => {
    unlockPageScroll(savedScroll.current);
    onClose();
    triggerRef?.current?.focus();
  }, [onClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    savedScroll.current = lockPageScroll();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    return () => {
      if (isOpen) unlockPageScroll(savedScroll.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={close}
    >
      <ModalControlBar>
        <ModalCloseButton
          ref={closeRef}
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          label={`Close ${title}`}
        />
      </ModalControlBar>

      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0 bg-black"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
