"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { QuoteProvider } from "./QuoteContext";

/** Client-side providers: honours the OS "reduce motion" setting and shares quote-form state. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <QuoteProvider>{children}</QuoteProvider>
    </MotionConfig>
  );
}
