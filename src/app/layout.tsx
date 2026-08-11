import type { Metadata } from "next";
import { fontSans, fontSerif } from "@/lib/fonts";
import { siteConfig } from "@/data/site-data";
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
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero-poster.webp" />
        <link
          rel="preload"
          as="video"
          href="/videos/hero.mp4"
          type="video/mp4"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
