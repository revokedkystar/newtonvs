import Image from "next/image";
import { business } from "@/lib/site";
import { CarIcon, ClockIcon, HomeIcon, ShieldIcon } from "../icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const reasons = [
  {
    icon: HomeIcon,
    title: "No garage drop-offs",
    text: "Your car is fixed on your driveway or in the work car park. No lifts, no courtesy-car hassle, no wasted afternoon.",
  },
  {
    icon: ShieldIcon,
    title: "Honest, upfront pricing",
    text: "Published starting prices and a clear quote before any spanner turns. You only pay for what your car actually needs.",
  },
  {
    icon: ClockIcon,
    title: `${business.yearsExperience}+ years in the trade`,
    text: "Over a decade and a half of hands-on experience diagnosing and repairing everything from hatchbacks to vans.",
  },
  {
    icon: CarIcon,
    title: "Daily drivers to classics",
    text: "Equally at home with modern ECU diagnostics, performance cars and lovingly kept classic vehicles.",
  },
];

const gallery = [
  { src: "/images/ferrari-360.webp", alt: "Red Ferrari 360 Spider serviced by Newton Vehicle Solutions", w: 1628, h: 1154, label: "Performance" },
  { src: "/images/bmw-x5.webp", alt: "Black BMW X5 M Sport worked on by Newton Vehicle Solutions", w: 1599, h: 1178, label: "Modern" },
  { src: "/images/classic-van.webp", alt: "Classic red ice-cream van being prepared for summer", w: 622, h: 324, label: "Classic" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-y border-white/5 bg-ink-2 py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="Why Choose Newton Vehicle Solutions"
            title={
              <>
                Garage-quality work,
                <br />
                <span className="text-racing">on your driveway.</span>
              </>
            }
            intro={
              <>
                Hi, I&apos;m <strong className="font-semibold text-white">{business.owner}</strong>. I&apos;ve spent over{" "}
                {business.yearsExperience} years working on cars, and I started Newton Vehicle Solutions to make
                looking after your vehicle simpler. I bring the tools, the diagnostics and the know-how to you —
                across {business.town} and the surrounding Teignbridge villages.
              </>
            }
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-line bg-ink p-5 transition-colors hover:border-white/20">
                  <Icon className="h-6 w-6 text-racing" />
                  <h3 className="display mt-4 text-xl not-italic">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Recent work gallery */}
        <Reveal delay={0.1} className="lg:pt-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {gallery.map((img, i) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-xl border border-white/10 ${
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="display absolute bottom-3 left-3 rounded bg-racing px-2 py-0.5 text-sm">
                  {img.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-5 rounded-xl border border-line bg-ink p-5">
            <p className="display shrink-0 text-6xl text-racing">{business.yearsExperience}+</p>
            <p className="text-sm leading-relaxed text-silver">
              <span className="block font-semibold text-white">Years of hands-on experience</span>
              From everyday runarounds and family SUVs to performance cars and classics.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
