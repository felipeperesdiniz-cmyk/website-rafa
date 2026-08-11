"use client";

import { forwardRef } from "react";
import { useDevice } from "@/hooks/useDevice";

export function modalControlPositionClass(isMobile: boolean) {
  return isMobile
    ? "top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))]"
    : "top-6 right-6";
}

export const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  {
    onClick: (e: React.MouseEvent) => void;
    label: string;
    className?: string;
  }
>(function ModalCloseButton({ onClick, label, className = "" }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`group p-2.5 text-foreground/55 hover:text-foreground transition-colors duration-300 ${className}`}
      aria-label={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="w-6 h-6 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
});

export function ModalFullscreenButton({
  isFullscreen,
  onClick,
  className = "",
}: {
  isFullscreen: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group p-2.5 text-foreground/55 hover:text-foreground transition-colors duration-300 ${className}`}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="w-6 h-6 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {isFullscreen ? (
          <path d="M9 9H5V5M19 9h-4V5M5 15v4h4M15 19h4v-4" />
        ) : (
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
        )}
      </svg>
    </button>
  );
}

export function ModalControlBar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <div
      className={`absolute z-[110] flex items-center gap-1 rounded-full bg-black/35 backdrop-blur-md px-1 py-1 ${modalControlPositionClass(isMobile)} ${className}`}
    >
      {children}
    </div>
  );
}
