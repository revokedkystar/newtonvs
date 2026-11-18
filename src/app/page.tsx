import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ExampleJobs } from "@/components/sections/ExampleJobs";
import { Hero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ExampleJobs />
      <About />
      <Reviews />
      <Contact />
    </>
  );
}
