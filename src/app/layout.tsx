import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { business, services } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const title = `Mobile Mechanic Newton Abbot | ${business.name}`;
const description = `${business.yearsExperience}+ years' experience. Servicing, diagnostics, brakes, remaps and repairs at your home or workplace across Newton Abbot & Teignbridge. Call-outs from £40. Call ${business.phoneDisplay}.`;

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  keywords: [
    "mobile mechanic Newton Abbot",
    "mobile mechanic Teignbridge",
    "car servicing Newton Abbot",
    "ECU remap Devon",
    "brake pads Newton Abbot",
    "car diagnostics Kingsteignton",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: business.siteUrl,
    siteName: business.name,
    title,
    description,
    images: [{ url: "/images/van.webp", width: 1175, height: 345, alt: "Newton Vehicle Solutions mobile mechanic van" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  description,
  image: `${business.siteUrl}/images/van.webp`,
  logo: `${business.siteUrl}/images/logo.png`,
  telephone: "+447715610775",
  email: business.email,
  url: business.siteUrl,
  founder: business.owner,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.town,
    addressRegion: business.county,
    addressCountry: "GB",
  },
  areaServed: business.serviceAreas.map((name) => ({ "@type": "Place", name })),
  priceRange: "££",
  sameAs: [business.facebookUrl],
  makesOffer: services
    .filter((s) => s.priceFrom !== null)
    .map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.priceFrom,
        priceCurrency: "GBP",
      },
    })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
