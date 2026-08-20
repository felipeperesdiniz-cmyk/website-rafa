"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Photography", href: "/#photography", id: "photography" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const navBg = navBgRef.current;
    if (!navBg) return;

    const hero = document.querySelector("section[aria-label='Introduction']");
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "bottom top",
      onEnter: () =>
        gsap.to(navBg, {
          backgroundColor: "rgba(0,0,0,0.75)",
          duration: 0.5,
        }),
      onLeaveBack: () =>
        gsap.to(navBg, {
          backgroundColor: "rgba(0,0,0,0.4)",
          duration: 0.5,
        }),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    const drawer = drawerRef.current;
    if (!l1 || !l2 || !l3) return;

    if (menuOpen) {
      gsap.to(l1, { rotation: 45, y: 6, duration: 0.3 });
      gsap.to(l2, { opacity: 0, duration: 0.2 });
      gsap.to(l3, { rotation: -45, y: -6, duration: 0.3 });
      if (drawer) {
        gsap.fromTo(drawer, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power3.out" });
        const links = drawer.querySelectorAll("a");
        gsap.fromTo(links, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, delay: 0.2, duration: 0.4 });
      }
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(l1, { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(l2, { opacity: 1, duration: 0.2 });
      gsap.to(l3, { rotation: 0, y: 0, duration: 0.3 });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const linkClass = (id: string) =>
    `nav-link label-caps-sm transition-opacity duration-300 ${
      activeId === id ? "opacity-100" : "opacity-[0.45] hover:opacity-100"
    }`;

  return (
    <header ref={navRef} className="fixed left-0 right-0 top-0 z-50" role="banner">
      <div
        ref={navBgRef}
        className="absolute inset-0 backdrop-blur-[12px]"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        aria-hidden="true"
      />
      <nav
        className="relative flex items-center justify-between px-[5vw] py-5 md:py-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="label-caps-sm shrink-0 text-[13px] tracking-[0.2em] text-[var(--text-secondary)] opacity-70 transition-opacity hover:opacity-100"
          aria-label="Rafael Diniz — Home"
        >
          RD
        </Link>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={isHome ? link.href.replace("/", "") : link.href}
                className={linkClass(link.id)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span ref={line1Ref} className="block h-px w-[18px] bg-white" />
          <span ref={line2Ref} className="block h-px w-[18px] bg-white" />
          <span ref={line3Ref} className="block h-px w-[18px] bg-white" />
        </button>
      </nav>

      <div
        ref={drawerRef}
        className={`fixed inset-0 z-40 bg-[var(--bg)] pt-24 px-8 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ transform: "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={isHome ? link.href.replace("/", "") : link.href}
                onClick={closeMenu}
                className="font-serif text-[2rem] font-light text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
