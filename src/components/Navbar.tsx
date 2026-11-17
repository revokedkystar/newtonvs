"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { business, navLinks } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { BrandMark } from "./BrandMark";
import { ButtonLink } from "./ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label={`${business.name} — back to top`}>
          <Image src="/images/logo.png" alt="" width={44} height={44} priority className="h-10 w-10 shrink-0 lg:h-11 lg:w-11" />
          <BrandMark />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-white/80 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:-skew-x-12 after:bg-racing after:transition-all hover:text-white hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={business.phoneHref} aria-label={`Call ${business.phoneDisplay}`}>
            <PhoneIcon className="h-4 w-4" />
            Call {business.phoneDisplay}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.phoneDisplay}`}
            className="grid h-11 w-11 place-items-center rounded-md bg-racing text-white active:scale-95"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-white/5 active:scale-95"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-ink lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-center justify-between rounded-md px-3 py-3 text-xl hover:bg-white/5"
                  >
                    {link.label}
                    <span className="text-racing">/</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-white/10 px-4 py-5">
              <ButtonLink href={business.phoneHref} size="lg" className="w-full">
                <PhoneIcon className="h-5 w-5" />
                Call {business.phoneDisplay}
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
