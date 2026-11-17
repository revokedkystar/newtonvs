import type { SVGProps } from "react";
import type { ServiceIcon } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const QuoteMarkIcon = (p: IconProps) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="M9.5 6C6 7.4 4 10.3 4 14v4h6v-6H7c0-2.3 1.3-4 3.5-4.8L9.5 6zm10 0C16 7.4 14 10.3 14 14v4h6v-6h-3c0-2.3 1.3-4 3.5-4.8L19.5 6z" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const TagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7" cy="7" r="1.5" />
  </svg>
);

export const ThumbIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.5 22H7V10l4-8a3 3 0 0 1 4 3.9z" />
  </svg>
);

export const WrenchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  </svg>
);

export const CarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 17H3v-5l2-5h11l4 5h1a1 1 0 0 1 1 1v4h-2" />
    <circle cx="7.5" cy="17" r="2" />
    <circle cx="17.5" cy="17" r="2" />
    <path d="M9.5 17h6M5 12h15" />
  </svg>
);

/* ---------- Service icons ---------- */

const VanIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 6h11v11H2zM13 9h4l4 4v4h-8" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const DiagnosticIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M7 12l2-3 2 2 2-4 2 3h2M8 20h8M12 16v4" />
  </svg>
);

const BrakeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path d="M17.5 5.5a9 9 0 0 1 0 13" strokeWidth={3.5} />
  </svg>
);

const OilIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
);

const GaugeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 17a9 9 0 1 1 17 0" />
    <path d="m12 13 4.5-5" />
    <circle cx="12" cy="13" r="1.5" />
  </svg>
);

const ClipboardIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="4" width="14" height="18" rx="2" />
    <path d="M9 2h6v4H9zM9 12l2 2 4-4M9 18h6" />
  </svg>
);

const SuspensionIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2v3M12 19v3M8 5h8M8 19h8M8 7l8 2-8 2 8 2-8 2 8 2" />
  </svg>
);

export const serviceIcons: Record<ServiceIcon, (p: IconProps) => React.JSX.Element> = {
  callout: VanIcon,
  diagnostic: DiagnosticIcon,
  brakes: BrakeIcon,
  service: OilIcon,
  remap: GaugeIcon,
  fullService: ClipboardIcon,
  repairs: SuspensionIcon,
};
