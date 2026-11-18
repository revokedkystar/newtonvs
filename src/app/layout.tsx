import type { Metadata, Viewport } from "next";
import { Inter, Saira } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { business, services } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Saira (variable width + weight) is the closest open-licence match to the
 * extended, heavy, slanted lettering in the Newton logo. Widened via
 * font-stretch in globals.css.
 */
const saira = Saira({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-saira",
  display: "swap",
});

const title = `Mobile Mechanic Newton Abbot | ${business.name}`;
const description = `${business.yearsExperience}+ years' experience. Servicing, MOTs, diagnostics, brakes, ECU remaps and repairs at your home or workplace across Newton Abbot & Teignbridge. Call-outs from £40. Message us on Facebook or call ${business.phoneDisplay}.`;

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: { default: title, template: `%s | ${business.name}` },
  description,
  keywords: [
    "mobile mechanic Newton Abbot",
    "mobile mechanic Teignbridge",
    "car servicing Newton Abbot",
    "ECU remap Devon",
    "brake pads Newton Abbot",
    "MOT Newton Abbot",
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
    <html lang="en-GB" className={`${inter.variable} ${saira.variable}`}>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-racing focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
