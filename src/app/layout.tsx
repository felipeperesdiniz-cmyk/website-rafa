import type { Metadata } from "next";
import { fontSans, fontSerif } from "@/lib/fonts";
import { siteConfig } from "@/data/site-data";
import CursorProvider from "@/components/CursorProvider";
import TransitionLayout from "@/components/TransitionLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/images/hero-poster.webp", width: 1920, height: 1080 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/hero-poster.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Photographer & Filmmaker",
    description: siteConfig.description,
    sameAs: [
      "https://www.instagram.com/rafaeldiniz",
      "https://www.youtube.com/@rafaeldiniz",
    ],
  };

  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <head>
        <link
          rel="preload"
          href="/videos/hero.mp4"
          as="video"
          type="video/mp4"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <CursorProvider>
          <TransitionLayout>{children}</TransitionLayout>
        </CursorProvider>
      </body>
    </html>
  );
}
