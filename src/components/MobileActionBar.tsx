"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { business } from "@/lib/site";
import { MessengerIcon, PhoneIcon } from "./icons";

/**
 * Thumb-reachable Messenger / Call bar for phones. Appears once you scroll past the
 * first screen and hides while the contact section itself is on screen.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let contactInView = false;
    const update = () => setVisible(pastHero && !contactInView);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        contactInView = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    const contact = document.getElementById("contact");
    if (contact) observer.observe(contact);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const btn =
    "flex h-12 items-center justify-center gap-2 rounded-md text-sm font-display font-bold uppercase tracking-wide [font-stretch:112.5%] active:scale-[0.97]";

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
          <div className="grid grid-cols-[1.6fr_1fr] gap-2">
            <a href={business.messengerUrl} target="_blank" rel="noopener noreferrer" className={`${btn} bg-racing`}>
              <MessengerIcon className="h-4 w-4" />
              Message Us
            </a>
            <a href={business.phoneHref} className={`${btn} border border-white/20 bg-white/5`}>
              <PhoneIcon className="h-4 w-4" />
              Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
