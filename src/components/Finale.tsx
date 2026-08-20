"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finaleCopy, contactLinks, siteConfig } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const words = finaleCopy.headline.split(" ");

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const wordEls = headline.querySelectorAll(".word-reveal");
    wordEls.forEach((word, i) => {
      gsap.fromTo(
        word,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: "rgba(255,255,255,1)",
      duration: 0.3,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: "rgba(255,255,255,0.2)",
      duration: 0.3,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[100dvh] scroll-mt-24 flex-col justify-center px-[5vw] py-20 md:py-28"
      aria-label="Contact"
    >
      <h2
        ref={headlineRef}
        className="max-w-5xl font-serif text-[clamp(2.5rem,7vw,7vw)] font-light leading-[1.05] text-[var(--text-primary)]"
      >
        {words.map((word, i) => (
          <span key={i} className="word-reveal inline-block" style={{ clipPath: "inset(0 0 100% 0)" }}>
            {word}{" "}
          </span>
        ))}
      </h2>

      <div className="mt-16 grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="label-caps mb-4 text-[var(--text-secondary)] opacity-40">
            EMAIL DIRECTLY
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[1.1rem] text-[var(--text-primary)] transition-opacity hover:opacity-70"
          >
            {siteConfig.email}
          </a>

          <div className="mt-10 flex flex-wrap gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] hover:underline"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <label className="block">
            <span className="sr-only">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full border-b border-white/20 bg-transparent py-3 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              required
            />
          </label>
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full border-b border-white/20 bg-transparent py-3 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              required
            />
          </label>
          <label className="block">
            <span className="sr-only">Message</span>
            <textarea
              name="message"
              rows={4}
              placeholder="What are you looking to create?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              required
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="group w-full bg-white py-[14px] text-[11px] tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white disabled:opacity-60"
          >
            {status === "sending"
              ? "SENDING…"
              : status === "sent"
                ? "SENT. ✓"
                : status === "error"
                  ? "FAILED — TRY AGAIN"
                  : "SUBMIT"}
          </button>
        </form>
      </div>
    </section>
  );
}
