"use client";

import { motion } from "framer-motion";
import { business, formatPrice, services, type Service } from "@/lib/site";
import { useQuote } from "../QuoteContext";
import { ArrowRightIcon, CheckIcon, PhoneIcon, serviceIcons } from "../icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { bookService } = useQuote();
  const Icon = serviceIcons[service.icon];
  const quoted = service.priceFrom === null;

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-ink-2 p-6 transition-colors sm:p-7 ${
          service.featured ? "border-racing/60" : "border-line hover:border-white/25"
        }`}
      >
        {/* Red speed-stripe that sweeps in on hover */}
        <span className="speed-stripe absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
        {service.featured && (
          <span className="absolute right-0 top-0 rounded-bl-lg bg-racing px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            Most popular
          </span>
        )}

        <div className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 -skew-x-6 place-items-center rounded-lg border border-white/10 bg-ink-3 text-racing transition-colors group-hover:bg-racing group-hover:text-white">
            <Icon className="h-6 w-6 skew-x-6" />
          </span>
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-widest text-silver">
              {quoted ? "Priced per job" : "From"}
            </p>
            <p className="display text-4xl text-white sm:text-5xl">
              {quoted ? "Quote" : formatPrice(service.priceFrom)}
            </p>
          </div>
        </div>

        <h3 className="display mt-6 text-2xl sm:text-[1.7rem]">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-silver">{service.description}</p>

        <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
          {service.includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-white/85">
              <CheckIcon className="h-4 w-4 shrink-0 text-racing" />
              {item}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => bookService(service.name)}
          className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-racing"
        >
          {quoted ? "Request a Quote" : "Book This Service"}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services & Pricing"
            title={
              <>
                Honest prices.<br />
                <span className="text-racing">No surprises.</span>
              </>
            }
            intro="Clear starting prices for the jobs drivers ask for most. Every quote is confirmed with you before any work begins — parts and labour explained in plain English."
          />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-silver lg:text-right">
              Diagnostics &bull; Repairs &bull; Services &bull; Brakes &bull; Suspension
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}

          {/* Final grid tile: direct call CTA */}
          <Reveal delay={0.16} className="h-full lg:col-span-2">
            <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl bg-racing p-6 sm:p-7 lg:flex-row lg:items-end lg:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative max-w-md">
                <p className="display text-3xl sm:text-4xl lg:text-5xl">Not sure what&apos;s wrong?</p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Describe the noise, the warning light or the symptom and James will tell you the likely cause
                  and a fair price — no obligation.
                </p>
              </div>
              <a
                href={business.phoneHref}
                className="relative inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-ink px-6 font-semibold uppercase tracking-wide text-white transition-transform active:scale-[0.97] hover:bg-ink-3"
              >
                <PhoneIcon className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-xs text-silver/80">
          Prices shown are starting prices and may vary by vehicle make, model and parts required.
        </p>
      </div>
    </section>
  );
}
