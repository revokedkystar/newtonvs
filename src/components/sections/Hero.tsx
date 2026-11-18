"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/site";
import { HomeIcon, MessengerIcon, PhoneIcon, StarIcon, TagIcon, ThumbIcon, WrenchIcon } from "../icons";
import { ButtonLink } from "../ui/Button";
import { CountUp } from "../ui/CountUp";

const trustPoints = [
  { icon: WrenchIcon, label: `${business.yearsExperience}+ Years Experience` },
  { icon: HomeIcon, label: "Home & Workplace Visits" },
  { icon: ThumbIcon, label: "100% Recommended" },
  { icon: TagIcon, label: "Transparent Pricing" },
];

/** Diagonal light streaks that race across the hero, like headlights at speed. */
const streaks = [
  { top: "18%", w: "38%", delay: 0, dur: 2.6 },
  { top: "34%", w: "22%", delay: 1.1, dur: 2.1 },
  { top: "52%", w: "46%", delay: 0.4, dur: 3.2 },
  { top: "66%", w: "28%", delay: 1.8, dur: 2.4 },
  { top: "80%", w: "34%", delay: 0.9, dur: 2.9 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax layers: each moves at a different speed as the hero scrolls away.
  const bgWordX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const vanX = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const vanY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Parallax only on desktop: on phones the text and van are stacked, so moving them would make them overlap.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden pt-16 lg:pt-20">
      {/* ---------- Graphic background ---------- */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-racing/25 blur-[130px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-[44rem] rounded-full bg-racing/15 blur-[130px]" />

        {/* Slanted red livery bands, echoing the stripe down the side of the van */}
        <motion.div
          initial={{ x: "-110%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="absolute -right-[10%] bottom-[22%] h-24 w-[85%] -skew-x-[24deg] bg-gradient-to-r from-transparent via-racing/70 to-racing sm:h-28 lg:bottom-[20%] lg:h-36 lg:w-[70%]"
        />
        <motion.div
          initial={{ x: "-110%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="absolute -right-[10%] bottom-[calc(22%-1.25rem)] h-2 w-[70%] -skew-x-[24deg] bg-gradient-to-r from-transparent to-white/80 lg:bottom-[calc(20%-1.5rem)] lg:w-[55%]"
        />

        {/* Oversized outline lettering drifting behind everything */}
        <motion.p
          style={{ x: bgWordX }}
          className="display pointer-events-none absolute -left-4 top-[14%] select-none whitespace-nowrap text-[28vw] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:2px_white] lg:top-[8%] lg:text-[19vw]"
        >
          Newton
        </motion.p>

        {streaks.map((s) => (
          <span
            key={s.top}
            className="hero-streak absolute left-0 h-px"
            style={{ top: s.top, width: s.w, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto min-h-[calc(100svh-4rem)] max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16 lg:flex lg:min-h-[calc(100svh-5rem-5.5rem)] lg:flex-col lg:justify-center lg:px-8 lg:pb-16 lg:pt-10">
        <motion.div style={desktop ? { y: textY, opacity: fade } : undefined} className="relative z-10">
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Covering {business.town} &amp; Teignbridge
          </motion.p>

          <h1 className="display mt-6 max-w-4xl text-[2.3rem] sm:text-6xl lg:max-w-[46rem] lg:text-[4.1rem]">
            {["Expert", "Mobile", "Mechanic"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-1 pr-[0.25em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08 + i * 0.08, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="inline-block text-racing"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.36, ease }}
              >
                We Come to You
              </motion.span>
            </span>
          </h1>

          <motion.p {...fadeUp(0.45)} className="mt-6 max-w-2xl text-base leading-relaxed text-silver sm:text-lg lg:max-w-xl">
            Over <strong className="font-semibold text-white">{business.yearsExperience} years&apos; experience</strong> bringing
            dealership-level diagnostics, servicing, MOTs and remaps straight to your home or workplace in{" "}
            {business.town}. No garage drop-offs, just honest work done on your driveway.
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={business.messengerUrl} size="lg">
              <MessengerIcon className="h-5 w-5" />
              Message on Messenger
            </ButtonLink>
            <ButtonLink href={business.phoneHref} variant="outline" size="lg">
              <PhoneIcon className="h-5 w-5" />
              Call {business.phoneDisplay}
            </ButtonLink>
          </motion.div>

          <motion.p {...fadeUp(0.62)} className="mt-5 text-sm text-silver">
            Call-outs from <span className="font-semibold text-white">£40</span> · MOT from{" "}
            <span className="font-semibold text-white">£60</span> · Remaps from{" "}
            <span className="font-semibold text-white">£200</span>
          </motion.p>
        </motion.div>

        {/* The liveried van, driving in from the left over the red bands */}
        <motion.div
          style={desktop ? { x: vanX, y: vanY } : undefined}
          className="pointer-events-none relative -mx-4 mt-10 flex flex-col sm:-mx-6 lg:absolute lg:bottom-[8%] lg:right-[-6rem] lg:mx-0 lg:mt-0 lg:w-[58%] xl:right-[-8rem] xl:w-[60%]"
        >
          <motion.div
            initial={{ opacity: 0, x: -140 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
          >
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}>
              <Image
                src="/images/van.webp"
                alt="Newton Vehicle Solutions' black Mercedes mobile mechanic van"
                width={1175}
                height={345}
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)] [mask-image:linear-gradient(to_right,transparent,black_12%)]"
              />
            </motion.div>
          </motion.div>

          {/* Glass badges: a tidy row above the van on phones, floating over it on desktop */}
          <div className="order-first mb-4 flex items-center justify-between gap-2 px-4 sm:px-6 lg:order-none lg:mb-0 lg:block lg:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-ink/70 px-3 py-2 backdrop-blur-md sm:px-4 lg:absolute lg:-top-24 lg:left-[8%] lg:block lg:py-3"
          >
            <p className="display text-lg text-white sm:text-2xl lg:text-3xl">
              <CountUp to={business.yearsExperience} />+
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white lg:font-medium lg:text-xs lg:text-silver">
              Years<span className="hidden sm:inline"> in the trade</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease }}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-ink/70 px-3 py-2.5 backdrop-blur-md sm:px-4 lg:absolute lg:-top-8 lg:right-[16%] lg:py-3"
          >
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="h-3 w-3 sm:h-4 sm:w-4" />
              ))}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white sm:text-xs">100% recommended</span>
          </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Quick-trust strip */}
      <div className="relative border-y border-white/10 bg-ink-2/80 backdrop-blur">
        <div className="speed-stripe absolute inset-x-0 top-0 h-px" />
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ icon: Icon, label }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className={`flex items-center gap-3 px-4 py-4 sm:px-6 lg:justify-center lg:py-6 ${
                i % 2 === 0 ? "border-r border-white/10" : ""
              } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
            >
              <span className="grid h-9 w-9 shrink-0 -skew-x-6 place-items-center rounded-md bg-racing/15 text-racing">
                <Icon className="h-5 w-5 skew-x-6" />
              </span>
              <span className="display text-xs not-italic leading-tight sm:text-sm">{label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
