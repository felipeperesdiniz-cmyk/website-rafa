"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Work", href: "/#showreel" },
  { label: "Photography", href: "/#photography" },
  { label: "About", href: "/#about" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
      if (y > lastScroll.current + 10 && y > 200) {
        setVisible(false);
      } else if (y < lastScroll.current - 10) {
        setVisible(true);
      }
      lastScroll.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      role="banner"
    >
      <nav
        className={`flex items-center justify-between px-6 md:px-10 py-5 md:py-6 transition-all duration-500 ${
          isHome && !scrolled
            ? "bg-transparent"
            : "bg-background/92 backdrop-blur-md border-b border-border/20"
        }`}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="shrink-0 text-[10px] md:text-xs tracking-[0.35em] uppercase text-foreground/80 hover:text-foreground transition-colors"
          aria-label="Rafael Diniz — Home"
        >
          RD
        </Link>

        <ul className="flex items-center gap-5 md:gap-10 shrink-0">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={isHome ? link.href.replace("/", "") : link.href}
                className="whitespace-nowrap text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
