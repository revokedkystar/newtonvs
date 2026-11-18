"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { business, navLinks } from "@/lib/site";
import { CloseIcon, MenuIcon, MessengerIcon, PhoneIcon } from "./icons";
import { BrandMark } from "./BrandMark";
import { ButtonLink } from "./ui/Button";

/** Locks page scroll behind the open mobile menu (works on iOS Safari, unlike overflow:hidden alone). */
function lockScroll(lock: boolean) {
  const html = document.documentElement;
  if (lock) {
    const y = window.scrollY;
    html.dataset.scrollY = String(y);
    Object.assign(document.body.style, { position: "fixed", top: `-${y}px`, left: "0", right: "0" });
  } else if (html.dataset.scrollY !== undefined) {
    const y = Number(html.dataset.scrollY);
    delete html.dataset.scrollY;
    Object.assign(document.body.style, { position: "", top: "", left: "", right: "" });
    // Restore instantly so it isn't animated by `scroll-behavior: smooth`.
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    html.style.scrollBehavior = "";
  }
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Close if the screen is widened past the mobile breakpoint.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  /**
   * Unlock scrolling *before* navigating — otherwise the browser tries to jump to the
   * section while the page is still locked, and nothing happens.
   */
  const navigate = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setOpen(false);
      lockScroll(false);
      const [path, hash] = href.split("#");
      const samePage = (path || "/") === pathname;
      if (hash && samePage) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${hash}`);
      } else {
        router.push(href);
      }
    },
    [pathname, router],
  );

  const isActive = (href: string) => !href.includes("#") && href === pathname;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${business.name} — home`}>
          <Image src="/images/logo.png" alt="" width={44} height={44} priority className="h-10 w-10 shrink-0 lg:h-11 lg:w-11" />
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => navigate(e, link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:-skew-x-12 after:bg-racing after:transition-all hover:text-white hover:after:w-full ${
                    isActive(link.href) ? "text-white after:w-full" : "text-white/80 after:w-0"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={business.phoneHref}
              aria-label={`Call ${business.phoneDisplay}`}
              title={`Call ${business.phoneDisplay}`}
              className="grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-white/5 transition-colors hover:border-white/40"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <ButtonLink href={business.messengerUrl}>
              <MessengerIcon className="h-4 w-4" />
              Message Us
            </ButtonLink>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={business.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on Facebook Messenger"
            className="grid h-11 w-11 place-items-center rounded-md bg-racing text-white active:scale-95"
          >
            <MessengerIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid h-11 w-11 touch-manipulation place-items-center rounded-md border border-white/15 bg-white/5 active:scale-95"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none"
              >
                {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </header>

      {/* Sibling of <header>, not a child: the header's backdrop-filter would otherwise trap this fixed panel inside it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-16 z-[49] flex flex-col overflow-y-auto overscroll-contain border-t border-white/10 bg-ink lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => navigate(e, link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="display flex min-h-14 items-center justify-between rounded-md px-3 py-3 text-xl active:bg-white/10"
                  >
                    {link.label}
                    <span className="text-racing">/</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 border-t border-white/10 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <ButtonLink href={business.messengerUrl} size="lg" className="w-full">
                <MessengerIcon className="h-5 w-5" />
                Message on Messenger
              </ButtonLink>
              <ButtonLink href={business.phoneHref} variant="outline" size="lg" className="w-full">
                <PhoneIcon className="h-5 w-5" />
                Call {business.phoneDisplay}
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
