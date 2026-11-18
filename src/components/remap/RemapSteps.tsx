"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { remapSteps } from "@/lib/site";

/** Numbered process timeline whose connecting line draws itself as you scroll. */
export function RemapSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative mt-12 space-y-10 pl-16 sm:pl-20">
      <span className="absolute bottom-4 left-[1.4rem] top-4 w-0.5 bg-line sm:left-[1.9rem]" />
      <motion.span
        style={{ scaleY }}
        className="absolute bottom-4 left-[1.4rem] top-4 w-0.5 origin-top bg-gradient-to-b from-racing to-racing-hot sm:left-[1.9rem]"
      />
      {remapSteps.map((step, i) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <span className="display absolute -left-16 top-0 grid h-12 w-12 -skew-x-6 place-items-center rounded-lg border border-racing/50 bg-ink text-lg sm:-left-20 sm:h-16 sm:w-16 sm:text-2xl">
            <span className="skew-x-6">{i + 1}</span>
          </span>
          <h3 className="display pt-2 text-xl sm:pt-3 sm:text-2xl">{step.title}</h3>
          <p className="mt-2 max-w-md text-silver">{step.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
