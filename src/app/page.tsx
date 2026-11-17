import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <Providers>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-racing focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Reviews />
        <QuoteSection />
      </main>
      <Footer />
      <MobileActionBar />
    </Providers>
  );
}
