export type GalleryLayout = "wide" | "tall" | "full" | "float" | "standard";
export type PhotoCategory =
  | "wildlife"
  | "documentary"
  | "sports"
  | "travel"
  | "architecture";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
  layout?: GalleryLayout;
  category: PhotoCategory;
  location?: string;
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
  role?: string;
  summary?: string;
  description?: string;
  poster: string | null;
  videoSrc: string | null;
  youtubeId?: string | null;
  variant: "quiet" | "drift" | "frame";
  abstractCrop?: string;
  location?: string;
  year?: string;
  duration?: string;
  stills?: string[];
  caseStudy?: string;
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
  blurDataURL:
    "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAgCdASoYAA4APzmGuVOvKSWisAgB4CcJZQC+SC0kAAD+7d1TCAZ/Ay4pUqn4AAA=",
};

export const showreelConfig = {
  sources: [
    { src: "/videos/showreel-web.mp4", type: "video/mp4" },
    { src: "/videos/showreel.mp4", type: "video/mp4" },
  ],
  lightSources: [
    { src: "/videos/showreel-mobile.mp4", type: "video/mp4" },
    { src: "/videos/showreel-web.mp4", type: "video/mp4" },
  ],
  poster: "/images/showreel-poster.webp",
  posterFallback: "/images/showreel-poster.jpg",
  blurDataURL:
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAgCdASoYAA4APzmGulQ+qSWjMAgD0CcJYgCw7C5JAAD+6/YyJdb/N1o4mf1keWOMEKVMuDqHeR4Bg8YAAA==",
  title: "Rafael Diniz Showreel",
  duration: "2:45",
  year: "2026",
};

export const videoProjects: VideoProject[] = [
  {
    id: "film-project-01",
    number: "01",
    title: "B2B Ranch — Institucional",
    role: "Director",
    summary:
      "Institutional brand film grounded in landscape, rhythm, and the quiet discipline of ranch life.",
    description:
      "A cinematic portrait of ranch life in the American West — where patience, landscape, and craft converge. The film moves at the pace of the work itself: deliberate, grounded, and deeply connected to place.",
    poster: null,
    videoSrc: null,
    youtubeId: "4IPh_fbGn5g",
    variant: "quiet",
    location: "Texas",
    year: "2025",
    duration: "3:12",
    stills: [
      "/images/showreel-poster.webp",
      "/images/gallery/img-0570.webp",
      "/images/gallery/img-0584.webp",
      "/images/gallery/img-2370.webp",
    ],
    caseStudy:
      "B2B Ranch needed a film that felt as considered as the work they do — not a flashy commercial, but something that breathes. The brief was simple: show the ranch as it actually is. We spent three days on location, shooting at first light and last light, letting the landscape dictate pace. Every frame was composed to emphasize horizontal lines — horizon, fence lines, the slow arc of cattle moving across pasture. The challenge was making stillness feel dynamic. We used long lenses to compress distance, shallow depth of field to isolate detail, and held shots longer than conventional editing would allow. Sound design became half the story: wind through grass, leather creaking, the low rumble of hooves. The final piece runs just over three minutes and has been used across the brand's digital presence, trade events, and investor communications. It positioned B2B not as a commodity producer but as stewards of land and craft.",
  },
  {
    id: "film-project-02",
    number: "02",
    title: "Paixão Calejada",
    role: "Director",
    summary:
      "Short documentary on devotion, repetition, and the cost of Brazilian folk wrestling.",
    description:
      "An intimate documentary following practitioners of Brazilian folk wrestling — where physical sacrifice meets cultural identity, and every scar tells a story passed down through generations.",
    poster: null,
    videoSrc: null,
    youtubeId: "BNN8BEkgFSk",
    variant: "drift",
    location: "Brazil",
    year: "2024",
    duration: "8:30",
    stills: [
      "/images/gallery/img-1442.webp",
      "/images/gallery/imgl-1995.webp",
      "/images/gallery/imgl-2017.webp",
      "/images/gallery/silhouette-sunset.webp",
    ],
    caseStudy:
      "Paixão Calejada began as a personal project — a return to the folk traditions of northeastern Brazil that I'd grown up around but never fully understood. The film follows three wrestlers across a season of training and competition, each at different stages of their practice. The challenge was access: these communities are tight-knit and skeptical of outside cameras. We spent weeks building trust before rolling a single frame, living alongside the athletes, sharing meals, attending their rituals. Visually, I wanted the camera to feel embedded rather than observational — handheld but controlled, close enough to feel breath and sweat. We shot primarily on available light in cramped training spaces and open-air arenas, embracing the grain and contrast of high ISO rather than fighting it. The narrative structure follows the body as archive: hands, backs, knees — each marked by years of repetition. The film premiered at a regional documentary festival and has since been used in cultural preservation programs across Brazil.",
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
      { id: "wn-01", src: "/images/gallery/img-1370.webp", alt: "Close-up of a black swan with a vivid red beak against dark water", objectPosition: "50% 30%", width: 2700, height: 2878, layout: "tall", category: "wildlife", location: "Melbourne" },
      { id: "wn-02", src: "/images/gallery/IMG_0143.webp", alt: "Golden sunrise through mist above a Florida marsh", objectPosition: "50% 45%", width: 2700, height: 2106, layout: "wide", category: "wildlife", location: "Florida" },
      { id: "wn-03", src: "/images/gallery/orangutang.webp", alt: "Close-up portrait of an orangutan", objectPosition: "55% 40%", width: 2700, height: 1800, layout: "tall", category: "wildlife", location: "Borneo" },
      { id: "wn-04", src: "/images/gallery/img-0570.webp", alt: "Footprints across wind-rippled sand dunes in golden light", objectPosition: "50% 45%", width: 2700, height: 3325, layout: "float", category: "wildlife", location: "Namibia" },
      { id: "wn-05", src: "/images/gallery/img-2370.webp", alt: "Dramatic ocean sunset with the sun dipping below the horizon", objectPosition: "50% 40%", width: 2700, height: 3600, layout: "full", category: "wildlife", location: "Florida" },
      { id: "wn-06", src: "/images/gallery/img-0584.webp", alt: "Wind-sculpted sand ripples with scattered desert twigs", objectPosition: "50% 50%", width: 2700, height: 1800, layout: "wide", category: "wildlife", location: "Namibia" },
      { id: "wn-07", src: "/images/gallery/img-55007379.webp", alt: "Natural landscape with rich texture and warm tones", objectPosition: "50% 45%", width: 2700, height: 2000, layout: "standard", category: "wildlife", location: "Brazil" },
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
      { id: "sp-01", src: "/images/gallery/58243158.webp", alt: "Golden basketball net against a clear blue sky", objectPosition: "50% 50%", width: 1080, height: 1630, layout: "tall", category: "sports", location: "Gainesville" },
      { id: "sp-02", src: "/images/gallery/img-8525.webp", alt: "Skateboarder mid-air in an indoor skatepark wearing a Santa hat", objectPosition: "50% 40%", width: 2700, height: 3600, layout: "full", category: "sports", location: "Gainesville" },
      { id: "sp-03", src: "/images/gallery/IMG_1399.webp", alt: "Child on a rope climbing structure against pale blue sky", objectPosition: "70% 40%", width: 1080, height: 722, layout: "wide", category: "sports", location: "Florida" },
      { id: "sp-04", src: "/images/gallery/img-5655.webp", alt: "Athletic moment captured with dynamic motion and energy", objectPosition: "50% 45%", width: 2700, height: 2000, layout: "standard", category: "sports", location: "Gainesville" },
      { id: "sp-05", src: "/images/gallery/img-0381.webp", alt: "Beach volleyball player leaping mid-air", objectPosition: "50% 18%", width: 2700, height: 3467, layout: "full", category: "sports", location: "Florida" },
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
      { id: "ta-01", src: "/images/gallery/IMG_1725.webp", alt: "Roman amphitheater ruins in dramatic black and white", objectPosition: "50% 40%", width: 2700, height: 1801, layout: "wide", category: "travel", location: "Rome" },
      { id: "ta-02", src: "/images/gallery/IMG_1731.webp", alt: "Colosseum exterior arches in stark black and white", objectPosition: "60% 50%", width: 2700, height: 1801, layout: "standard", category: "architecture", location: "Rome" },
      { id: "ta-03", src: "/images/gallery/IMG_1398.webp", alt: "Stone sculpture on the Passion Façade of Sagrada Família", objectPosition: "30% 50%", width: 1080, height: 1603, layout: "tall", category: "architecture", location: "Barcelona" },
      { id: "ta-04", src: "/images/gallery/IMG_1651.webp", alt: "Gondola on a Venetian canal", objectPosition: "40% 50%", width: 2700, height: 1860, layout: "full", category: "travel", location: "Venice" },
      { id: "ta-05", src: "/images/gallery/img-5244.webp", alt: "Couple in a cathedral aisle lit by stained-glass light", objectPosition: "50% 55%", width: 2700, height: 3565, layout: "tall", category: "architecture", location: "Paris" },
      { id: "ta-06", src: "/images/gallery/img-1630.webp", alt: "Ceramic plates on a shop wall with a blurred passerby", objectPosition: "50% 45%", width: 2700, height: 1754, layout: "wide", category: "travel", location: "Lisbon" },
      { id: "ta-07", src: "/images/gallery/55007365.webp", alt: "Feet dangling over a sunlit cliff against cyan sky", objectPosition: "50% 45%", width: 2700, height: 1790, layout: "wide", category: "travel", location: "Brazil" },
      { id: "ta-08", src: "/images/gallery/leading-lines.webp", alt: "Vertical long-exposure traffic light trails at night", objectPosition: "50% 50%", width: 2700, height: 2058, layout: "tall", category: "architecture", location: "São Paulo" },
      { id: "ta-09", src: "/images/gallery/img-3242.webp", alt: "Colorful light trails sweeping through a city street at night", objectPosition: "50% 50%", width: 2700, height: 1800, layout: "wide", category: "travel", location: "Tokyo" },
      { id: "ta-10", src: "/images/gallery/img-5536.webp", alt: "Parisian fountain with children, classical architecture behind", objectPosition: "50% 45%", width: 2700, height: 3600, layout: "standard", category: "architecture", location: "Paris" },
      { id: "ta-11", src: "/images/gallery/img-3379.webp", alt: "Burj Khalifa tower with an airplane contrail crossing the sky", objectPosition: "50% 30%", width: 2700, height: 4000, layout: "tall", category: "architecture", location: "Dubai" },
      { id: "ta-12", src: "/images/gallery/img-1741.webp", alt: "Classical colonnade in high-contrast black and white", objectPosition: "50% 40%", width: 2700, height: 2000, layout: "wide", category: "architecture", location: "Rome" },
      { id: "ta-13", src: "/images/gallery/IMG_1737-HDR.webp", alt: "Corinthian column photographed from below against bright sky", objectPosition: "50% 20%", width: 2700, height: 1860, layout: "standard", category: "architecture", location: "Rome" },
      { id: "ta-14", src: "/images/gallery/img-1975.webp", alt: "Modern building facade with geometric balconies against blue sky", objectPosition: "50% 40%", width: 2700, height: 3600, layout: "float", category: "architecture", location: "Miami" },
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
      { id: "pd-01", src: "/images/gallery/imgl-2017.webp", alt: "UF graduate celebrating with champagne at the campus arch", objectPosition: "50% 22%", width: 2400, height: 3598, layout: "tall", category: "documentary", location: "Gainesville" },
      { id: "pd-02", src: "/images/gallery/imgl-1995.webp", alt: "Graduate portrait in golden hour light", objectPosition: "50% 28%", width: 2400, height: 3088, layout: "tall", category: "documentary", location: "Gainesville" },
      { id: "pd-03", src: "/images/gallery/img-1442.webp", alt: "Candid portrait with natural light and editorial composition", objectPosition: "50% 45%", width: 2700, height: 2000, layout: "standard", category: "documentary", location: "Rio de Janeiro" },
    ],
  },
];

export const photoFilterTabs = [
  { id: "all", label: "ALL" },
  { id: "wildlife", label: "WILDLIFE" },
  { id: "documentary", label: "DOCUMENTARY" },
  { id: "sports", label: "SPORTS" },
  { id: "travel", label: "TRAVEL" },
  { id: "architecture", label: "ARCHITECTURE" },
] as const;

export type PhotoFilterId = (typeof photoFilterTabs)[number]["id"];

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
      category: "wildlife",
      location: "Fernando de Noronha",
    },
    {
      id: "g-hero-02",
      src: "/images/gallery/IMG_1752.webp",
      alt: "Quadriga sculpture silhouetted against ornate arched windows",
      objectPosition: "50% 35%",
      width: 2700,
      height: 2350,
      layout: "wide",
      category: "architecture",
      location: "Berlin",
    },
    {
      id: "g-hero-03",
      src: "/images/gallery/silhouette-sunset.webp",
      alt: "Silhouette on a rooftop ledge at sunset with a wine glass",
      objectPosition: "40% 50%",
      width: 2700,
      height: 1694,
      layout: "wide",
      category: "documentary",
      location: "Rio de Janeiro",
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
    "Photographer and filmmaker from Rio de Janeiro, based in Gainesville, Florida. His work spans still photography, live sports broadcast, and narrative film — shaped by nearly six years moving between two cultures.",
    "From Florida Gators athletics on ESPN networks to feature productions, the camera has been a constant. Discipline from martial arts — jiu-jitsu, judo, and coaching — runs through how he works and what he chooses to frame.",
  ],
  pullQuote:
    "From Florida Gators athletics on ESPN networks to feature productions, the camera has been a constant.",
  credentials: ["ESPN", "FLORIDA GATORS ATHLETICS", "SEC NETWORK", "FEATURE FILM"],
  disciplines: ["Photography", "Film", "Documentary", "Sports", "Wildlife"],
  portrait: {
    src: "/images/about/rafael-cinema.webp",
    alt: "Rafael Diniz operating a cinema camera on a gimbal in a library setting",
    objectPosition: "55% 25%",
  },
};

export const contactLinks: ContactLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/rafaeldiniz" },
  { label: "YouTube", href: "https://www.youtube.com/@rafaeldiniz" },
];

export const finaleCopy = {
  headline: "LET'S CREATE SOMETHING WORTH REMEMBERING.",
};
