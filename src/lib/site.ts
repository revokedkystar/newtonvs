/**
 * Single source of truth for business details, services and reviews.
 * Update copy and prices here — every component reads from this file.
 */

export const business = {
  name: "Newton Vehicle Solutions",
  tagline: "Mobile Mechanic",
  owner: "James Perryman",
  yearsExperience: 14,
  phoneDisplay: "07715 610775",
  phoneHref: "tel:07715610775",
  // Not shown on the site — only used as the quote form's delivery inbox (FormSubmit)
  email: "jamesperryman4767@gmail.com",
  town: "Newton Abbot",
  county: "Devon",
  serviceAreas: [
    "Newton Abbot",
    "Kingsteignton",
    "Kingskerswell",
    "Denbury",
    "Teignbridge",
  ],
  whatsappHref:
    "https://wa.me/447715610775?text=" +
    encodeURIComponent("Hi James, I found you on your website and I'd like a quote."),
  // Facebook page ID 100093484747646 — m.me opens a Messenger chat with the page
  messengerUrl: "https://m.me/100093484747646",
  facebookUrl: "https://www.facebook.com/p/Newton-vehicle-solutions-100093484747646/",
  siteUrl: "https://www.newtonvehiclesolutions.co.uk",
} as const;

export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  `https://formsubmit.co/ajax/${business.email}`;

export type ServiceIcon =
  | "callout"
  | "diagnostic"
  | "brakes"
  | "service"
  | "remap"
  | "fullService"
  | "repairs";

export interface Service {
  id: string;
  name: string;
  /** Starting price in GBP; `null` means quoted per job. */
  priceFrom: number | null;
  description: string;
  includes: string[];
  icon: ServiceIcon;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "call-out",
    name: "Mobile Call-Out",
    priceFrom: 40,
    description:
      "Broken down on the drive or stuck at work? James comes to you with a fully equipped van.",
    includes: ["Home or workplace visit", "On-the-spot assessment"],
    icon: "callout",
  },
  {
    id: "diagnostic",
    name: "Diagnostic Plug-In",
    priceFrom: 40,
    description:
      "Warning light on the dash? Dealer-level diagnostics to read fault codes and pinpoint the problem.",
    includes: ["Full fault-code scan", "Clear explanation of findings"],
    icon: "diagnostic",
  },
  {
    id: "brake-pads",
    name: "Brake Pads",
    priceFrom: 80,
    description:
      "Squealing, grinding or a soft pedal? Quality pads fitted at your door, with discs checked as standard.",
    includes: ["Quality branded pads", "Disc & caliper inspection"],
    icon: "brakes",
  },
  {
    id: "small-service",
    name: "Small Service",
    priceFrom: 130,
    description:
      "An interim service to keep your car healthy between annual services — ideal for higher mileage.",
    includes: ["Oil & filter change", "Fluid top-ups & safety checks"],
    icon: "service",
  },
  {
    id: "remap",
    name: "ECU Remap",
    priceFrom: 200,
    description:
      "Unlock extra power, smoother torque and potential fuel savings with a professional engine remap.",
    includes: ["Pre-remap health check", "Custom-tuned software"],
    icon: "remap",
  },
  {
    id: "full-service",
    name: "Full Service",
    priceFrom: 220,
    description:
      "A comprehensive annual service covering filters, fluids and a thorough multi-point inspection.",
    includes: ["Oil, air & fuel filters", "Comprehensive vehicle health check"],
    icon: "fullService",
    featured: true,
  },
  {
    id: "repairs-suspension",
    name: "Repairs & Suspension",
    priceFrom: null,
    description:
      "From clunks and knocks to worn springs, shocks and general mechanical repairs — honest, tailored quotes.",
    includes: ["Suspension & steering", "General mechanical repairs"],
    icon: "repairs",
  },
];

export const otherServiceOption = "Something else / not sure";

export interface Review {
  name: string;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    name: "Kirk Osc Newman",
    date: "May 2025",
    text: "Top guy who will always go the extra mile to keep you moving. Super trustworthy and very knowledgeable.",
  },
  {
    name: "Kasi Jankowski",
    date: "March 2025",
    text: "James is absolutely brilliant, really trustworthy and excellent value for money. Highly recommended.",
  },
  {
    name: "Amie Williams",
    date: "February 2025",
    text: "James has been out to my car a couple of times now, super friendly and knowledgeable! Couldn't recommend more.",
  },
  {
    name: "Natasha Woodward",
    date: "February 2024",
    text: "Amazing service, so helpful, friendly and efficient. Thank you so much.",
  },
];

export const navLinks = [
  { href: "#services", label: "Services & Pricing" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Book / Quote" },
] as const;

export const formatPrice = (price: number | null) =>
  price === null ? "POA" : `£${price}`;
