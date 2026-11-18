"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Client-side providers: honours the OS "reduce motion" setting for every Framer Motion animation. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
