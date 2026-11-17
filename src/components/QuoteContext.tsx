"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface QuoteContextValue {
  selectedService: string;
  setSelectedService: (service: string) => void;
  /** Pre-selects a service in the quote form and scrolls the form into view. */
  bookService: (service: string) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState("");

  const bookService = useCallback((service: string) => {
    setSelectedService(service);
    const target = document.getElementById("quote");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Move focus to the next empty field after the scroll settles, for keyboard and screen-reader users.
    window.setTimeout(() => {
      document.getElementById("quote-name")?.focus({ preventScroll: true });
    }, 600);
  }, []);

  const value = useMemo(
    () => ({ selectedService, setSelectedService, bookService }),
    [selectedService, bookService],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
