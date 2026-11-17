"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { business } from "@/lib/site";
import { ArrowRightIcon, HomeIcon, PhoneIcon, TagIcon, ThumbIcon, WrenchIcon } from "../icons";
import { ButtonLink } from "../ui/Button";

const trustPoints = [
  { icon: WrenchIcon, label: `${business.yearsExperience}+ Years Experience` },
  { icon: HomeIcon, label: "Home & Workplace Visits" },
  { icon: ThumbIcon, label: "100% Recommended" },
  { icon: TagIcon, label: "Transparent Pricing" },
];

export function Hero() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative isolate overflow-hidden pt-16 lg:pt-20">
      {/* Atmosphere: grid + red glow */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-racing/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-10 h-72 w-[40rem] rounded-full bg-racing/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Covering {business.town} &amp; Teignbridge
        </motion.p>

        <motion.h1 {...fadeUp(0.08)} className="display mt-6 max-w-4xl text-[2.9rem] sm:text-6xl lg:max-w-[46rem] lg:text-[5.25rem]">
          Expert Mobile Mechanic in {business.town}
          <span className="mt-2 block text-racing">
            — We Come to You
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.16)} className="mt-6 max-w-2xl text-base leading-relaxed text-silver sm:text-lg lg:max-w-xl">
          Over <strong className="font-semibold text-white">{business.yearsExperience} years&apos; experience</strong> bringing
          dealership-level diagnostics, servicing and repairs straight to your home or workplace. No garage
          drop-offs, no lifts to arrange — just honest work done on your driveway.
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#quote" size="lg">
            Get a Free Quote
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href={business.phoneHref} variant="outline" size="lg">
            <PhoneIcon className="h-5 w-5" />
            Call {business.phoneDisplay}
          </ButtonLink>
        </motion.div>

        <motion.p {...fadeUp(0.3)} className="mt-5 text-sm text-silver">
          Call-outs from <span className="font-semibold text-white">£40</span> · Diagnostics from{" "}
          <span className="font-semibold text-white">£40</span>
        </motion.p>

        {/* The actual liveried van — blends in from the right on desktop, sits below the CTAs on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none relative -mx-4 mt-10 sm:-mx-6 lg:absolute lg:bottom-10 lg:right-[-6rem] lg:mx-0 lg:mt-0 lg:w-[56%] xl:right-[-10rem] xl:w-[62%]"
        >
          <Image
            src="/images/van.webp"
            alt="Newton Vehicle Solutions' black Mercedes mobile mechanic van"
            width={1175}
            height={345}
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_25%,black_85%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] lg:[mask-composite:intersect]"
          />
        </motion.div>
      </div>

      {/* Quick-trust strip */}
      <div className="relative border-y border-white/10 bg-ink-2/80 backdrop-blur">
        <div className="speed-stripe absolute inset-x-0 top-0 h-px" />
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ icon: Icon, label }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className={`flex items-center gap-3 px-4 py-4 sm:px-6 lg:justify-center lg:py-6 ${
                i % 2 === 0 ? "border-r border-white/10" : ""
              } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
            >
              <span className="grid h-9 w-9 shrink-0 -skew-x-6 place-items-center rounded-md bg-racing/15 text-racing">
                <Icon className="h-5 w-5 skew-x-6" />
              </span>
              <span className="display text-base not-italic leading-tight sm:text-lg">{label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
