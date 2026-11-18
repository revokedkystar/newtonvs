"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin red bar across the top of the screen that fills as you scroll the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="speed-stripe fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
    />
  );
}
