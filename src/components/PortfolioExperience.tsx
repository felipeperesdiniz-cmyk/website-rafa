"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroConfig, photoSections, showreelConfig, siteConfig, videoProjects } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

const selected = [photoSections[0].photos[2], photoSections[1].photos[4], photoSections[2].photos[4], photoSections[3].photos[0], photoSections[0].photos[3], photoSections[2].photos[8], photoSections[1].photos[1], photoSections[2].photos[0]];

export default function PortfolioExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line > span", { yPercent: 110, duration: 1.15, stagger: .1, ease: "power4.out", delay: .15 });
      gsap.from(".hero-meta > *", { opacity: 0, y: 12, duration: .7, stagger: .08, delay: .75 });
      gsap.to(".hero-media", { scale: 1.12, yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-copy", { yPercent: -28, opacity: .1, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 35%", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".photo-card").forEach((el, i) => gsap.from(el, { y: 80 + (i % 3) * 30, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      gsap.to(".marquee-track", { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setReelOpen(false); setPhotoOpen(null); }
      if (photoOpen !== null && e.key === "ArrowRight") setPhotoOpen((photoOpen + 1) % selected.length);
      if (photoOpen !== null && e.key === "ArrowLeft") setPhotoOpen((photoOpen - 1 + selected.length) % selected.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = reelOpen || photoOpen !== null ? "hidden" : "";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [reelOpen, photoOpen]);

  return <div ref={root} className="portfolio-shell">
    <a className="skip-link" href="#selected-work">Skip to work</a>
    <header className="site-nav"><a className="wordmark" href="#top" aria-label="Rafael Diniz, home">Rafael Diniz</a><nav aria-label="Primary navigation"><a href="#selected-work">Films</a><a href="#photography">Photography</a><a href="#about">Profile</a></nav><a className="nav-contact" href={`mailto:${siteConfig.email}`}>Start a project <span>↗</span></a></header>
    <main>
      <section id="top" className="hero"><video className="hero-media" autoPlay muted loop playsInline poster={heroConfig.poster}><source src={heroConfig.video} type="video/mp4" /></video><div className="hero-shade" /><div className="hero-copy"><p className="eyebrow">Filmmaker · Photographer · Florida / Brazil</p><h1><span className="hero-line"><span>Stories felt</span></span><span className="hero-line hero-line-indent"><span>before they&apos;re told.</span></span></h1><div className="hero-meta"><p>Rafael Diniz frames movement, place and human discipline through cinematic film and still photography.</p><button onClick={() => setReelOpen(true)} className="reel-button"><span className="play-dot">▶</span> Watch showreel <small>02:45</small></button></div></div><div className="scroll-cue"><span>Scroll to explore</span><i /></div></section>
      <section className="manifesto" aria-label="Creative statement"><p data-reveal>Based between cultures. Drawn to the places where <em>discipline becomes instinct</em> and observation becomes story.</p></section>
      <section id="selected-work" className="work-section"><div className="section-head" data-reveal><p className="eyebrow">01 / Selected motion</p><h2>Films with<br />a pulse.</h2><p>Direction, documentary and visual storytelling shaped by real environments—not manufactured moments.</p></div>{videoProjects.slice().reverse().map((project, i) => <article className="film-card" key={project.id} data-reveal><div className="film-index">0{i + 1}</div><a className="film-image" href={`https://www.youtube.com/watch?v=${project.youtubeId}`} target="_blank" rel="noreferrer" aria-label={`Watch ${project.title} on YouTube`}><Image src={`https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`} alt="" fill sizes="(max-width: 900px) 100vw, 70vw" className="cover" /><span className="film-play">Play film ↗</span></a><div className="film-info"><div><p>{project.role} · {project.location}</p><h3>{project.title}</h3></div><p>{project.summary}</p><p className="film-data">{project.year} / {project.duration}</p></div></article>)}</section>
      <section className="marquee" aria-hidden="true"><div className="marquee-track"><span>Photography in motion — instinct / patience / place — </span><span>Photography in motion — instinct / patience / place — </span></div></section>
      <section id="photography" className="photo-section"><div className="section-head photo-head" data-reveal><p className="eyebrow">02 / Selected stills</p><h2>A world,<br />closely observed.</h2><p>An edited study of wildlife, sport, architecture and the human presence inside them.</p></div><div className="editorial-grid">{selected.map((photo, i) => <button className={`photo-card photo-${i + 1}`} key={photo.id} onClick={() => setPhotoOpen(i)} aria-label={`View ${photo.alt}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 60vw" className="cover" style={{objectPosition: photo.objectPosition}} /><span><b>{String(i + 1).padStart(2, "0")}</b>{photo.location} · {photo.category}</span></button>)}</div></section>
      <section id="about" className="about-section"><div className="about-portrait" data-reveal><Image src="/images/about/rafael-cinema.webp" alt="Rafael Diniz operating a cinema camera" fill sizes="(max-width: 800px) 100vw, 42vw" className="cover" /></div><div className="about-copy" data-reveal><p className="eyebrow">03 / Profile</p><h2>The person<br />behind the frame.</h2><p className="lead">Photographer and filmmaker from Rio de Janeiro, based in Gainesville, Florida.</p><p>From Florida Gators athletics on ESPN networks to independent documentary and feature productions, Rafael works where preparation meets instinct. Years spent moving between Brazil and the United States shape an eye attentive to culture, movement and place.</p><div className="credentials"><span>ESPN</span><span>SEC Network</span><span>Florida Gators</span><span>Film · Documentary · Sports</span></div></div></section>
      <section id="contact" className="contact-section"><p className="eyebrow">Available for select commissions · 2026</p><h2 data-reveal>Have a story<br /><em>worth remembering?</em></h2><a className="contact-link" href={`mailto:${siteConfig.email}`}>Let&apos;s make it happen <span>↗</span></a><footer><span>© 2026 Rafael Diniz</span><div><a href="https://www.instagram.com/rafaeldiniz" target="_blank">Instagram</a><a href="https://www.youtube.com/@rafaeldiniz" target="_blank">YouTube</a></div><a href="#top">Back to top ↑</a></footer></section>
    </main>
    {reelOpen && <div className="media-modal" role="dialog" aria-modal="true" aria-label="Showreel"><button className="modal-close" onClick={() => setReelOpen(false)}>Close ×</button><video autoPlay controls playsInline poster={showreelConfig.poster}><source src="/videos/showreel-mobile.mp4" type="video/mp4" /></video></div>}
    {photoOpen !== null && <div className="media-modal photo-modal" role="dialog" aria-modal="true" aria-label={selected[photoOpen].alt} onClick={() => setPhotoOpen(null)}><button className="modal-close" onClick={() => setPhotoOpen(null)}>Close ×</button><button className="modal-arrow left" onClick={e => { e.stopPropagation(); setPhotoOpen((photoOpen - 1 + selected.length) % selected.length); }}>←</button><div className="modal-image"><Image src={selected[photoOpen].src} alt={selected[photoOpen].alt} fill sizes="100vw" className="contain" /></div><button className="modal-arrow right" onClick={e => { e.stopPropagation(); setPhotoOpen((photoOpen + 1) % selected.length); }}>→</button><p>{selected[photoOpen].location} · {selected[photoOpen].category}</p></div>}
  </div>;
}
