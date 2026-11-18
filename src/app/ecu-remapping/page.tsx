import type { Metadata } from "next";
import Link from "next/link";
import { RemapGauge } from "@/components/remap/RemapGauge";
import { RemapSteps } from "@/components/remap/RemapSteps";
import { Contact } from "@/components/sections/Contact";
import { ArrowRightIcon, CheckIcon, MessengerIcon, PhoneIcon, remapIcons } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, formatPrice, remapFaqs, remapOptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "ECU Remapping Newton Abbot: Stage 1, Stage 2 & Eco Remaps",
  description: `Mobile ECU remapping across Newton Abbot & Teignbridge. Stage 1 from £200, Stage 2, economy, gearbox (TCU) remaps, speed limiters and feature coding, done on your driveway with a health check first. Message ${business.name} on Facebook or call ${business.phoneDisplay}.`,
  alternates: { canonical: "/ecu-remapping" },
};

export default function RemappingPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden pt-16 lg:pt-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-racing/20 blur-[140px]" />
          <div className="absolute -left-[10%] bottom-[14%] h-20 w-[60%] -skew-x-[24deg] bg-gradient-to-r from-racing to-transparent opacity-40" />
          {Array.from({ length: 4 }, (_, i) => (
            <span
              key={i}
              className="hero-streak absolute left-0 h-px"
              style={{ top: `${20 + i * 18}%`, width: `${25 + i * 7}%`, animationDelay: `${i * 0.7}s` }}
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:pb-24">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-silver">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2 text-racing">/</span>
              <span className="text-white">ECU Remapping</span>
            </nav>
            <Reveal>
              <p className="eyebrow mt-6">Performance &amp; Economy Tuning</p>
              <h1 className="display mt-4 text-[2.3rem] sm:text-6xl lg:text-[4rem]">
                ECU Remapping
                <span className="block text-racing">On Your Driveway</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-silver sm:text-lg">
                More power, more torque or better MPG, tuned for your car and done at your home or workplace across{" "}
                {business.town} and Teignbridge. Every remap starts with a health check, and your original software is
                always saved.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={business.messengerUrl} size="lg">
                <MessengerIcon className="h-5 w-5" />
                Ask About Your Car
              </ButtonLink>
              <ButtonLink href={business.phoneHref} variant="outline" size="lg">
                <PhoneIcon className="h-5 w-5" />
                Call {business.phoneDisplay}
              </ButtonLink>
            </Reveal>
            <p className="mt-5 text-sm text-silver">
              Stage 1 remaps from <span className="font-semibold text-white">£200</span> · Health check included
            </p>
          </div>
          <RemapGauge />
        </div>
      </section>

      {/* ---------- Options ---------- */}
      <section id="options" aria-labelledby="options-title" className="relative border-y border-white/5 bg-ink-2 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="options-title"
            eyebrow="Remap Options"
            title={
              <>
                Choose your
                <br />
                <span className="text-racing">upgrade.</span>
              </>
            }
            intro="Not sure which is right for you? Send James your registration on Messenger and he'll tell you what's available for your car and what gains to expect."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {remapOptions.map((opt, i) => {
              const Icon = remapIcons[opt.icon];
              return (
                <Reveal key={opt.id} delay={(i % 4) * 0.07} className="h-full">
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-ink p-6 transition-all duration-300 hover:-translate-y-1 ${
                      opt.featured ? "border-racing/60" : "border-line hover:border-white/25"
                    }`}
                  >
                    <span className="speed-stripe absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                    {opt.featured && (
                      <span className="absolute right-0 top-0 rounded-bl-lg bg-racing px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        Most popular
                      </span>
                    )}
                    <span className="grid h-12 w-12 -skew-x-6 place-items-center rounded-lg border border-white/10 bg-ink-3 text-racing transition-colors group-hover:bg-racing group-hover:text-white">
                      <Icon className="h-6 w-6 skew-x-6" />
                    </span>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-silver">{opt.tagline}</p>
                    <h3 className="display mt-1 text-lg">{opt.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">{opt.description}</p>
                    <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                      {opt.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-sm text-white/85">
                          <CheckIcon className="h-4 w-4 shrink-0 text-racing" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-silver">
                          {opt.priceFrom === null ? "Priced per car" : "From"}
                        </p>
                        <p className="display text-2xl">{opt.priceFrom === null ? "Quote" : formatPrice(opt.priceFrom)}</p>
                      </div>
                      <a
                        href={business.messengerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${opt.name} on Messenger`}
                        className="grid h-11 w-11 place-items-center rounded-md border border-white/15 transition-colors hover:border-racing hover:bg-racing"
                      >
                        <MessengerIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-silver/80">
            Gains vary by vehicle, engine and condition. Remapping is a modification, so please tell your insurer.
          </p>
        </div>
      </section>

      {/* ---------- Process + FAQ ---------- */}
      <section aria-labelledby="process-title" className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              id="process-title"
              eyebrow="How It Works"
              title={
                <>
                  Four steps,
                  <br />
                  <span className="text-racing">one visit.</span>
                </>
              }
            />
            <RemapSteps />
          </div>

          <div>
            <SectionHeading eyebrow="Remap FAQs" title={<>Good questions.</>} />
            <div className="mt-12 space-y-3">
              {remapFaqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.06}>
                  <details className="group rounded-xl border border-line bg-ink-2 open:border-white/20">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <ArrowRightIcon className="h-4 w-4 shrink-0 rotate-90 text-racing transition-transform group-open:-rotate-90" />
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-silver">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Link
                href="/#services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wide [font-stretch:112.5%] text-white transition-colors hover:text-racing"
              >
                See all our other services
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
