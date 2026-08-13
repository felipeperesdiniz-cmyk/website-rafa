"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Work", href: "/#showreel", id: "showreel" },
  { label: "Photography", href: "/#photography", id: "photography" },
  { label: "About", href: "/#about", id: "about" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out" }
    );

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      if (!menuOpen) {
        if (y > lastScroll.current + 10 && y > 200) {
          setVisible(false);
        } else if (y < lastScroll.current - 10) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastScroll.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const linkClass = (id: string) =>
    `whitespace-nowrap text-xs md:text-sm tracking-[0.18em] md:tracking-[0.22em] uppercase transition-colors ${
      activeId === id
        ? "text-foreground"
        : "text-muted hover:text-foreground"
    }`;

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible || menuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
      role="banner"
    >
      <nav
        className={`flex items-center justify-between px-6 md:px-10 py-5 md:py-6 transition-all duration-500 ${
          isHome && !scrolled && !menuOpen
            ? "bg-transparent"
            : "bg-background/92 backdrop-blur-md border-b border-border/20"
        }`}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="shrink-0 text-xs md:text-sm tracking-[0.3em] uppercase text-foreground/90 hover:text-foreground transition-colors"
          aria-label="Rafael Diniz — Home"
        >
          RD
        </Link>

        <ul className="hidden md:flex items-center gap-8 lg:gap-10 shrink-0">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={isHome ? link.href.replace("/", "") : link.href}
                className={`${linkClass(link.id)} ${
                  activeId === link.id
                    ? "underline underline-offset-8 decoration-foreground/40"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/96 backdrop-blur-md pt-24 px-8"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={isHome ? link.href.replace("/", "") : link.href}
                  onClick={closeMenu}
                  className={`text-2xl tracking-[0.2em] uppercase font-light ${linkClass(link.id)}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
