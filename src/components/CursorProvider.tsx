"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

type CursorMode = "default" | "view" | "play" | "link";

interface CursorContextValue {
  mode: CursorMode;
}

const CursorContext = createContext<CursorContextValue>({ mode: "default" });

export function useCursor() {
  return useContext(CursorContext);
}

export default function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [mode, setMode] = useState<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);

  const updateMode = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Element)) {
      setMode("default");
      return;
    }

    const el = target.closest("a, button, [role='button'], video, iframe");
    if (!el) {
      setMode("default");
      return;
    }

    if (el.closest("a")) {
      setMode("link");
      return;
    }

    if (el.tagName === "VIDEO" || el.tagName === "IFRAME") {
      setMode("play");
      return;
    }

    if (el.closest("[data-cursor='play']")) {
      setMode("play");
      return;
    }

    if (el.closest("img, picture, [data-cursor='view']")) {
      setMode("view");
      return;
    }

    setMode("default");
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      updateMode(e.target);
    };

    const onOver = (e: MouseEvent) => updateMode(e.target);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) {
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, [updateMode]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !enabled) return;

    const isExpanded = mode === "view" || mode === "play";
    const isLink = mode === "link";

    dot.style.width = isExpanded ? "60px" : isLink ? "20px" : "10px";
    dot.style.height = isExpanded ? "60px" : isLink ? "20px" : "10px";
    dot.style.background = isLink ? "var(--bg)" : "var(--accent)";
    dot.style.border = isLink
      ? "1px solid var(--accent)"
      : isExpanded
        ? "1px solid rgba(255,255,255,0.3)"
        : "none";

    ring.style.opacity = isExpanded ? "1" : "0";
    ring.style.width = isExpanded ? "60px" : "10px";
    ring.style.height = isExpanded ? "60px" : "10px";

    if (label) {
      label.textContent = mode === "play" ? "PLAY" : mode === "view" ? "VIEW" : "";
      label.style.opacity = isExpanded ? "1" : "0";
    }
  }, [mode, enabled]);

  return (
    <CursorContext.Provider value={{ mode }}>
      {children}
      {enabled && (
        <>
          <div
            ref={ringRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/20 mix-blend-difference"
            style={{ opacity: 0, willChange: "transform" }}
            aria-hidden="true"
          />
          <div
            ref={dotRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
            style={{
              width: 10,
              height: 10,
              background: "var(--accent)",
              willChange: "transform",
            }}
            aria-hidden="true"
          >
            <span
              ref={labelRef}
              className="text-[9px] tracking-[0.2em] text-black mix-blend-normal"
              style={{ opacity: 0 }}
            />
          </div>
        </>
      )}
    </CursorContext.Provider>
  );
}
