"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { business } from "@/lib/site";
import { PhoneIcon } from "./icons";

/**
 * Thumb-reachable Call / Quote bar for phones. Appears once the hero CTAs
 * scroll out of view and hides while the quote form itself is on screen.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const quote = document.getElementById("quote");
    let pastHero = false;
    let quoteInView = false;
    const update = () => setVisible(pastHero && !quoteInView);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        quoteInView = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    if (quote) observer.observe(quote);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            <a
              href={business.phoneHref}
              className="flex h-12 items-center justify-center gap-2 rounded-md bg-racing text-sm font-semibold uppercase tracking-wide active:scale-[0.97]"
            >
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>
            <a
              href="#quote"
              className="flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/5 text-sm font-semibold uppercase tracking-wide active:scale-[0.97]"
            >
              Free Quote
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
