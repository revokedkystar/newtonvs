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
  town: "Newton Abbot",
  county: "Devon",
  serviceAreas: [
    "Newton Abbot",
    "Kingsteignton",
    "Kingskerswell",
    "Denbury",
    "Teignbridge",
  ],
  /** Primary contact: m.me opens a Messenger chat with the Facebook page (page ID 100093484747646). */
  messengerUrl: "https://m.me/100093484747646",
  facebookUrl: "https://www.facebook.com/p/Newton-vehicle-solutions-100093484747646/",
  siteUrl: "https://www.newtonvehiclesolutions.co.uk",
} as const;

export type ServiceIcon =
  | "callout"
  | "mot"
  | "diagnostic"
  | "brakes"
  | "service"
  | "remap"
  | "fullService"
  | "repairs";

export interface Service {
  id: string;
  /** Optional page with more detail (e.g. the remapping page). */
  href?: string;
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
    id: "mot",
    name: "MOT",
    priceFrom: 60,
    description:
      "Get your MOT sorted without the hassle. A thorough pre-MOT check, any fixes done first, and the test arranged for you.",
    includes: ["Pre-MOT inspection", "Advisories & repairs handled"],
    icon: "mot",
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
    includes: ["Pre-remap health check", "Stage 1, Stage 2 & Eco options"],
    icon: "remap",
    href: "/ecu-remapping",
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
  { href: "/#services", label: "Services" },
  { href: "/ecu-remapping", label: "ECU Remapping" },
  { href: "/#examples", label: "Example Jobs" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
] as const;

/* ---------- ECU remapping page ---------- */

export type RemapIcon = "stage1" | "stage2" | "eco" | "gearbox" | "limiter" | "coding" | "restore" | "health";

export interface RemapOption {
  id: string;
  name: string;
  /** Starting price in GBP; `null` means quoted per vehicle. */
  priceFrom: number | null;
  tagline: string;
  description: string;
  points: string[];
  icon: RemapIcon;
  featured?: boolean;
}

// TODO: confirm with James which of these he offers and the prices for each.
export const remapOptions: RemapOption[] = [
  {
    id: "stage-1",
    name: "Stage 1 Remap",
    priceFrom: 200,
    tagline: "The most popular upgrade",
    description:
      "Software-only tune for a standard car. More power and torque, sharper throttle response and a smoother drive, with no hardware changes.",
    points: ["Typically +15–30% power", "No parts required", "Ideal for daily drivers"],
    icon: "stage1",
    featured: true,
  },
  {
    id: "stage-2",
    name: "Stage 2 Remap",
    priceFrom: null,
    tagline: "For modified cars",
    description:
      "A bespoke tune for cars with supporting upgrades such as an intake, intercooler or exhaust, so the extra hardware is properly used.",
    points: ["Tuned to your hardware", "Bigger gains than Stage 1", "Health check first"],
    icon: "stage2",
  },
  {
    id: "eco",
    name: "Economy Remap",
    priceFrom: 200,
    tagline: "Built for MPG",
    description:
      "Tuned for efficiency rather than outright power. Great for high-mileage drivers, vans and fleets looking to cut fuel costs.",
    points: ["Improved fuel economy", "More low-down torque", "Popular for vans"],
    icon: "eco",
  },
  {
    id: "gearbox",
    name: "Gearbox (TCU) Remap",
    priceFrom: null,
    tagline: "DSG & automatic boxes",
    description:
      "Quicker, firmer shifts and gearbox limits raised to match the engine remap. Recommended alongside a Stage 1 or 2 on automatics.",
    points: ["Faster gear changes", "Torque limiters matched", "Launch control on some models"],
    icon: "gearbox",
  },
  {
    id: "limiter",
    name: "Speed Limiter Set / Adjust",
    priceFrom: null,
    tagline: "Vans & commercial",
    description:
      "Set or adjust the top-speed limiter on vans and commercial vehicles, ideal for fleets and company policies.",
    points: ["Set to your chosen speed", "Fleet-friendly", "Fully reversible"],
    icon: "limiter",
  },
  {
    id: "coding",
    name: "Feature Coding",
    priceFrom: null,
    tagline: "Small tweaks, big difference",
    description:
      "Turn off automatic start/stop, enable hidden comfort features and customise settings supported by your vehicle.",
    points: ["Start/stop disable", "Hidden features enabled", "Vehicle-specific options"],
    icon: "coding",
  },
  {
    id: "restore",
    name: "Return to Stock",
    priceFrom: null,
    tagline: "Peace of mind",
    description:
      "Your original software is saved before every remap, so your car can be put back to factory settings at any time.",
    points: ["Original file kept on record", "Quick to restore", "Ideal before selling"],
    icon: "restore",
  },
  {
    id: "health-check",
    name: "Pre-Remap Health Check",
    priceFrom: 40,
    tagline: "Included with every remap",
    description:
      "Full diagnostic scan and live-data check before any tuning, so your engine is healthy enough for the extra power.",
    points: ["Fault-code scan", "Live data logging", "Honest advice if it isn't ready"],
    icon: "health",
  },
];

export const remapSteps = [
  { title: "Health check", text: "Diagnostic scan and live data to make sure the engine is in good shape." },
  { title: "Read & back up", text: "Your original factory software is read and saved safely on record." },
  { title: "Custom tune", text: "The file is tuned for your car, your fuel and how you drive." },
  { title: "Flash & test", text: "The new software is written to the ECU and checked on a road test." },
] as const;

export const remapFaqs = [
  {
    q: "Is remapping safe for my engine?",
    a: "A good remap stays within the safe limits of your engine and gearbox. That's why every job starts with a health check. If your car isn't ready, James will tell you.",
  },
  {
    q: "Do I need to tell my insurer?",
    a: "Yes. A remap is a modification, so you should let your insurance company know. Many insurers cover remapped cars for little or no extra cost.",
  },
  {
    q: "Can it be reversed?",
    a: "Yes. Your original software is saved before any changes are made, so your car can be returned to standard whenever you like.",
  },
  {
    q: "How long does it take?",
    a: "Most remaps are done in a couple of hours on your driveway, including the health check and road test.",
  },
] as const;

export const formatPrice = (price: number | null) =>
  price === null ? "POA" : `£${price}`;

/* ---------- Example jobs (home page) ---------- */

export interface ExampleJob {
  service: string;
  vehicle: string;
  problem: string;
  fix: string;
  time: string;
  priceFrom: number | null;
  icon: ServiceIcon;
  image?: { src: string; w: number; h: number };
}

// Illustrative examples built from the price list. Swap in real jobs (and photos) as they come in.
export const exampleJobs: ExampleJob[] = [
  {
    service: "Brake Pads",
    vehicle: "Family hatchback",
    problem: "Grinding noise from the front when braking.",
    fix: "New front pads fitted on the driveway, discs and calipers checked, road tested.",
    time: "About 1 hour",
    priceFrom: 80,
    icon: "brakes",
  },
  {
    service: "Diagnostic Plug-In",
    vehicle: "SUV with warning light",
    problem: "Engine management light came on during the school run.",
    fix: "Fault codes read and explained, faulty sensor identified and quoted before any work.",
    time: "30–45 minutes",
    priceFrom: 40,
    icon: "diagnostic",
    image: { src: "/images/bmw-x5.webp", w: 1599, h: 1178 },
  },
  {
    service: "ECU Remap",
    vehicle: "Performance car",
    problem: "Owner wanted sharper response and more mid-range torque.",
    fix: "Health check, original file backed up, Stage 1 tune flashed and road tested.",
    time: "2–3 hours",
    priceFrom: 200,
    icon: "remap",
    image: { src: "/images/ferrari-360.webp", w: 1628, h: 1154 },
  },
  {
    service: "Full Service",
    vehicle: "Classic van",
    problem: "Needed a full going-over before the busy summer season.",
    fix: "Oil and filters changed, fluids topped up and a full multi-point safety check.",
    time: "Half a day",
    priceFrom: 220,
    icon: "fullService",
    image: { src: "/images/classic-van.webp", w: 622, h: 324 },
  },
  {
    service: "MOT",
    vehicle: "Daily commuter",
    problem: "MOT due, with a couple of advisories from last year.",
    fix: "Pre-MOT check, bulbs and wipers replaced, advisories fixed and the test booked in.",
    time: "1–2 hours",
    priceFrom: 60,
    icon: "mot",
  },
  {
    service: "Mobile Call-Out",
    vehicle: "Van at a workplace",
    problem: "Wouldn't start in the work car park first thing in the morning.",
    fix: "Battery and charging system tested on site, new battery fitted and back on the road.",
    time: "Same day",
    priceFrom: 40,
    icon: "callout",
  },
  {
    service: "Stage 2 Remap",
    vehicle: "Mercedes-AMG C63 coupe",
    problem: "Modified C63 needed a tune to match the hardware, plus its MOT and brakes doing.",
    fix: "Stage 2 remap flashed and road tested, brakes done and the car taken through its MOT.",
    time: "1 day",
    priceFrom: null,
    icon: "remap",
    image: { src: "/images/mercedes-c63-remap.webp", w: 2000, h: 1500 },
  },
  {
    service: "Clutch Replacement",
    vehicle: "Manual car",
    problem: "Worn clutch slipping under load.",
    fix: "Gearbox dropped, new clutch fitted, everything refitted and road tested.",
    time: "1–2 days",
    priceFrom: null,
    icon: "repairs",
    image: { src: "/images/clutch-replacement.webp", w: 2000, h: 1500 },
  },
];
