export type GalleryLayout = "wide" | "tall" | "full" | "float" | "standard";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
  layout?: GalleryLayout;
}

export interface PhotoSection {
  slug: string;
  title: string;
  label: string;
  hero: {
    src: string;
    alt: string;
    objectPosition: string;
    scale?: number;
  };
  previews: string[];
  photos: GalleryPhoto[];
}

export interface VideoProject {
  id: string;
  number: string;
  title: string | null;
  status?: string;
  year?: string;
  role?: string;
  description?: string | null;
  poster: string | null;
  videoSrc: string | null;
  youtubeId?: string | null;
  variant: "quiet" | "drift" | "frame";
  abstractCrop?: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Rafael Diniz",
  tagline: "Photography & Motion",
  title: "Rafael Diniz — Photography & Motion",
  description:
    "Portfolio of Rafael Diniz, a Florida-based photographer and filmmaker working across photography, motion and visual storytelling.",
  url: "https://rafaeldiniz.com",
  email: "hello@rafaeldiniz.com",
  heroImage: "/images/hero.webp",
};

export const heroConfig = {
  video: "/videos/hero.mp4",
  poster: "/images/hero-poster.webp",
  objectPosition: "50% 50%",
};

export const motionSection = {
  slug: "motion",
  title: "Motion",
  label: "Film & Video",
  hero: {
    src: "/images/showreel-poster.webp",
    alt: "Showreel poster frame",
    objectPosition: "50% 42%",
    scale: 1.05,
  },
};

export const showreelConfig = {
  sources: [
    { src: "/videos/showreel-web.mp4", type: "video/mp4" },
    { src: "/videos/showreel.mp4", type: "video/mp4" },
  ],
  poster: "/images/showreel-poster.webp",
  posterFallback: "/images/showreel-poster.jpg",
  title: "Rafael Diniz Showreel",
  phrase: "MOTION / STILLNESS / STORY",
};

export const videoProjects: VideoProject[] = [
  {
    id: "film-project-01",
    number: "01",
    title: "B2B Ranch — Institucional",
    year: "2024",
    role: "Director · Camera",
    description:
      "An institutional film for B2B Ranch — grounded in landscape, rhythm, and the quiet discipline of ranch life. Shot to feel intimate and cinematic, not corporate.",
    poster: null,
    videoSrc: null,
    youtubeId: "4IPh_fbGn5g",
    variant: "quiet",
  },
  {
    id: "film-project-02",
    number: "02",
    title: "Paixão Calejada",
    year: "2023",
    role: "Director · Editor",
    description:
      "A short documentary on passion worn into the body — the calloused hands, repetition, and devotion behind Brazilian folk wrestling.",
    poster: null,
    videoSrc: null,
    youtubeId: "BNN8BEkgFSk",
    variant: "drift",
  },
];

export const photoSections: PhotoSection[] = [
  {
    slug: "wildlife-nature",
    title: "Wildlife & Nature",
    label: "01",
    hero: {
      src: "/images/gallery/morro-pico.webp",
      alt: "Sea stack above a tropical beach in Fernando de Noronha, Brazil",
      objectPosition: "50% 28%",
      scale: 1.02,
    },
    previews: [
      "/images/gallery/orangutang.webp",
      "/images/gallery/img-1370.webp",
      "/images/gallery/IMG_0143.webp",
    ],
    photos: [
      { id: "wn-01", src: "/images/gallery/img-1370.webp", alt: "Close-up of a black swan with a vivid red beak against dark water", objectPosition: "50% 30%", width: 2700, height: 2878, layout: "tall" },
      { id: "wn-02", src: "/images/gallery/IMG_0143.webp", alt: "Golden sunrise through mist above a Florida marsh", objectPosition: "50% 45%", width: 2700, height: 2106, layout: "wide" },
      { id: "wn-03", src: "/images/gallery/orangutang.webp", alt: "Close-up portrait of an orangutan", objectPosition: "55% 40%", width: 2700, height: 1800, layout: "tall" },
      { id: "wn-04", src: "/images/gallery/img-0570.webp", alt: "Footprints across wind-rippled sand dunes in golden light", objectPosition: "50% 45%", width: 2700, height: 3325, layout: "float" },
      { id: "wn-05", src: "/images/gallery/img-2370.webp", alt: "Dramatic ocean sunset with the sun dipping below the horizon", objectPosition: "50% 40%", width: 2700, height: 3600, layout: "full" },
      { id: "wn-06", src: "/images/gallery/img-0584.webp", alt: "Wind-sculpted sand ripples with scattered desert twigs", objectPosition: "50% 50%", width: 2700, height: 1800, layout: "wide" },
      { id: "wn-07", src: "/images/gallery/img-55007379.webp", alt: "Natural landscape with rich texture and warm tones", objectPosition: "50% 45%", width: 2700, height: 2000, layout: "standard" },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    label: "02",
    hero: {
      src: "/images/gallery/img-0381.webp",
      alt: "Beach volleyball player leaping mid-air",
      objectPosition: "50% 18%",
      scale: 1.06,
    },
    previews: [
      "/images/gallery/58243158.webp",
      "/images/gallery/img-8525.webp",
      "/images/gallery/IMG_1399.webp",
    ],
    photos: [
      { id: "sp-01", src: "/images/gallery/58243158.webp", alt: "Golden basketball net against a clear blue sky", objectPosition: "50% 50%", width: 1080, height: 1630, layout: "tall" },
      { id: "sp-02", src: "/images/gallery/img-8525.webp", alt: "Skateboarder mid-air in an indoor skatepark wearing a Santa hat", objectPosition: "50% 40%", width: 2700, height: 3600, layout: "full" },
      { id: "sp-03", src: "/images/gallery/IMG_1399.webp", alt: "Child on a rope climbing structure against pale blue sky", objectPosition: "70% 40%", width: 1080, height: 722, layout: "wide" },
      { id: "sp-04", src: "/images/gallery/img-5655.webp", alt: "Athletic moment captured with dynamic motion and energy", objectPosition: "50% 45%", width: 2700, height: 2000, layout: "standard" },
      { id: "sp-05", src: "/images/gallery/img-0381.webp", alt: "Beach volleyball player leaping mid-air", objectPosition: "50% 18%", width: 2700, height: 3467, layout: "full" },
    ],
  },
  {
    slug: "travel-architecture",
    title: "Travel & Architecture",
    label: "03",
    hero: {
      src: "/images/gallery/IMG_1752.webp",
      alt: "Quadriga sculpture silhouetted against ornate arched windows",
      objectPosition: "50% 32%",
      scale: 1.04,
    },
    previews: [
      "/images/gallery/IMG_1651.webp",
      "/images/gallery/img-5244.webp",
      "/images/gallery/img-3242.webp",
    ],
    photos: [
      { id: "ta-01", src: "/images/gallery/IMG_1725.webp", alt: "Roman amphitheater ruins in dramatic black and white", objectPosition: "50% 40%", width: 2700, height: 1801, layout: "wide" },
      { id: "ta-02", src: "/images/gallery/IMG_1731.webp", alt: "Colosseum exterior arches in stark black and white", objectPosition: "60% 50%", width: 2700, height: 1801, layout: "standard" },
      { id: "ta-03", src: "/images/gallery/IMG_1398.webp", alt: "Stone sculpture on the Passion Façade of Sagrada Família", objectPosition: "30% 50%", width: 1080, height: 1603, layout: "tall" },
      { id: "ta-04", src: "/images/gallery/IMG_1651.webp", alt: "Gondola on a Venetian canal", objectPosition: "40% 50%", width: 2700, height: 1860, layout: "full" },
      { id: "ta-05", src: "/images/gallery/img-5244.webp", alt: "Couple in a cathedral aisle lit by stained-glass light", objectPosition: "50% 55%", width: 2700, height: 3565, layout: "tall" },
      { id: "ta-06", src: "/images/gallery/img-1630.webp", alt: "Ceramic plates on a shop wall with a blurred passerby", objectPosition: "50% 45%", width: 2700, height: 1754, layout: "wide" },
      { id: "ta-07", src: "/images/gallery/55007365.webp", alt: "Feet dangling over a sunlit cliff against cyan sky", objectPosition: "50% 30%", width: 1790, height: 2700, layout: "float" },
      { id: "ta-08", src: "/images/gallery/leading-lines.webp", alt: "Vertical long-exposure traffic light trails at night", objectPosition: "50% 50%", width: 2700, height: 2058, layout: "tall" },
      { id: "ta-09", src: "/images/gallery/img-3242.webp", alt: "Colorful light trails sweeping through a city street at night", objectPosition: "50% 50%", width: 2700, height: 1800, layout: "wide" },
      { id: "ta-10", src: "/images/gallery/img-5536.webp", alt: "Parisian fountain with children, classical architecture behind", objectPosition: "50% 45%", width: 2700, height: 3600, layout: "standard" },
      { id: "ta-11", src: "/images/gallery/img-3379.webp", alt: "Burj Khalifa tower with an airplane contrail crossing the sky", objectPosition: "50% 30%", width: 2700, height: 4000, layout: "tall" },
      { id: "ta-12", src: "/images/gallery/img-1741.webp", alt: "Classical colonnade in high-contrast black and white", objectPosition: "50% 40%", width: 2700, height: 2000, layout: "wide" },
      { id: "ta-13", src: "/images/gallery/IMG_1737-HDR.webp", alt: "Corinthian column photographed from below against bright sky", objectPosition: "50% 20%", width: 2700, height: 1860, layout: "standard" },
      { id: "ta-14", src: "/images/gallery/img-1975.webp", alt: "Modern building facade with geometric balconies against blue sky", objectPosition: "50% 40%", width: 2700, height: 3600, layout: "float" },
    ],
  },
  {
    slug: "portrait-documentary",
    title: "Portrait & Documentary",
    label: "04",
    hero: {
      src: "/images/gallery/silhouette-sunset.webp",
      alt: "Silhouette on a rooftop ledge at sunset with a wine glass",
      objectPosition: "42% 52%",
      scale: 1.03,
    },
    previews: [
      "/images/gallery/imgl-1995.webp",
      "/images/gallery/imgl-2017.webp",
      "/images/gallery/img-1442.webp",
    ],
    photos: [
      { id: "pd-01", src: "/images/gallery/imgl-2017.webp", alt: "UF graduate celebrating with champagne at the campus arch", objectPosition: "50% 22%", width: 2400, height: 3598, layout: "tall" },
      { id: "pd-02", src: "/images/gallery/imgl-1995.webp", alt: "Graduate portrait in golden hour light", objectPosition: "50% 28%", width: 2400, height: 3088, layout: "tall" },
      { id: "pd-03", src: "/images/gallery/img-1442.webp", alt: "Candid portrait with natural light and editorial composition", objectPosition: "50% 45%", width: 2700, height: 2000, layout: "standard" },
    ],
  },
];

export function getPhotoSection(slug: string): PhotoSection | undefined {
  return photoSections.find((s) => s.slug === slug);
}

export const galleryPhotos: GalleryPhoto[] = (() => {
  const heroes: GalleryPhoto[] = [
    {
      id: "g-hero-01",
      src: "/images/gallery/morro-pico.webp",
      alt: "Sea stack above a tropical beach in Fernando de Noronha, Brazil",
      objectPosition: "50% 35%",
      width: 2700,
      height: 4073,
      layout: "full",
    },
    {
      id: "g-hero-02",
      src: "/images/gallery/IMG_1752.webp",
      alt: "Quadriga sculpture silhouetted against ornate arched windows",
      objectPosition: "50% 35%",
      width: 2700,
      height: 2350,
      layout: "wide",
    },
    {
      id: "g-hero-03",
      src: "/images/gallery/silhouette-sunset.webp",
      alt: "Silhouette on a rooftop ledge at sunset with a wine glass",
      objectPosition: "40% 50%",
      width: 2700,
      height: 1694,
      layout: "wide",
    },
  ];

  const merged = [...photoSections.flatMap((section) => section.photos), ...heroes];
  const seen = new Set<string>();

  return merged.filter((photo) => {
    if (seen.has(photo.src)) return false;
    seen.add(photo.src);
    return true;
  });
})();

export const aboutContent = {
  paragraphs: [
    "Photographer and filmmaker from Rio de Janeiro, based in Gainesville, Florida. His work spans still photography, live sports broadcast, and narrative film.",
    "From Florida Gators athletics on ESPN to feature productions — the camera has been a constant. Discipline shaped by martial arts runs through everything he makes.",
  ],
  disciplines: ["Photography", "Film", "Documentary", "Sports", "Wildlife"],
  portraits: {
    primary: {
      src: "/images/about/rafael-filmmaker.webp",
      alt: "Rafael Diniz operating a cinema camera on a gimbal stabilizer",
      objectPosition: "50% 22%",
    },
    secondary: {
      src: "/images/about/rafael-bjj.webp",
      alt: "Athlete training in a martial arts gym, photographed in black and white",
      objectPosition: "50% 30%",
    },
  },
};

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:hello@rafaeldiniz.com" },
  { label: "Instagram", href: "https://www.instagram.com/rafaeldiniz" },
  { label: "YouTube", href: "https://www.youtube.com/@rafaeldiniz" },
];

export const finaleCopy = {
  lines: ["LET'S CREATE", "SOMETHING", "WORTH REMEMBERING."],
};
