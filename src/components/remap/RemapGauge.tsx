"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const START = -120; // degrees
const END = 120;
const R = 120;
const STOCK = 0.62;
const PEAK = 0.86;

const polar = (deg: number, r = R) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: 160 + r * Math.cos(rad), y: 160 + r * Math.sin(rad) };
};

const arc = (from: number, to: number, r = R) => {
  const a = polar(from, r);
  const b = polar(to, r);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
};

/**
 * Rev-counter graphic: the needle sweeps to "stock", pauses, then climbs into the
 * red "remapped" zone while the readout counts up.
 */
export function RemapGauge() {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0); // 0 → 1 across the dial
  const rotate = useTransform(progress, (p) => START + p * (END - START));
  const [readout, setReadout] = useState(0);
  const [stage, setStage] = useState<"stock" | "remap">("stock");

  useEffect(() => {
    // Readout shows the power gain over stock: 0 until the needle passes "stock", then up to +30%.
    const unsub = progress.on("change", (p) => setReadout(Math.max(0, Math.round(((p - STOCK) / (PEAK - STOCK)) * 30))));
    if (reduce) {
      progress.set(PEAK);
      setStage("remap");
      return unsub;
    }
    let cancelled = false;
    (async () => {
      await animate(progress, STOCK, { duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] });
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;
      setStage("remap");
      await animate(progress, PEAK, { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] });
    })();
    return () => {
      cancelled = true;
      unsub();
    };
  }, [progress, reduce]);

  const ticks = Array.from({ length: 25 }, (_, i) => START + (i * (END - START)) / 24);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]" aria-hidden>
      <div className="absolute inset-[12%] rounded-full bg-racing/20 blur-3xl" />
      <svg viewBox="0 0 320 320" className="relative h-full w-full">
        <defs>
          <linearGradient id="gauge-red" x1="0" x2="1">
            <stop offset="0" stopColor="#dc2626" stopOpacity="0.4" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <circle cx="160" cy="160" r="150" fill="#141414" stroke="#262626" strokeWidth="2" />
        <path d={arc(START, END)} fill="none" stroke="#262626" strokeWidth="14" strokeLinecap="round" />
        <motion.path
          d={arc(START, END)}
          fill="none"
          stroke="url(#gauge-red)"
          strokeWidth="14"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
        {ticks.map((t, i) => {
          const major = i % 4 === 0;
          const a = polar(t, 100);
          const b = polar(t, major ? 86 : 92);
          return (
            <line
              key={t}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={i >= 18 ? "#dc2626" : "#a3a3a3"}
              strokeWidth={major ? 3 : 1.5}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {/* Needle lives in its own HTML layer so it rotates reliably around the dial centre. */}
      <motion.div style={{ rotate }} className="absolute inset-0">
        <svg viewBox="0 0 320 320" className="h-full w-full">
          <path d="M156 160 L160 62 L164 160 Z" fill="#fff" />
        </svg>
      </motion.div>
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
        <circle cx="160" cy="160" r="14" fill="#dc2626" />
        <circle cx="160" cy="160" r="5" fill="#0a0a0a" />
      </svg>
      <div className="absolute inset-x-0 bottom-[9%] text-center">
        <p className="display text-3xl tabular-nums sm:text-4xl">
          +{readout}
          <span className="text-lg text-silver">%</span>
        </p>
        <p
          className={`mt-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
            stage === "remap" ? "text-racing" : "text-silver"
          }`}
        >
          {stage === "remap" ? "Remapped · typical gain" : "Stock"}
        </p>
      </div>
    </div>
  );
}
