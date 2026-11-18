# Newton Vehicle Solutions — Website

Marketing site for Newton Vehicle Solutions, a mobile mechanic based in Newton Abbot, Devon.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## File structure

```
public/images/              logo, van, and recent-work photos
src/
├─ app/
│  ├─ layout.tsx            fonts, SEO metadata, JSON-LD, shared navbar/footer/action bar
│  ├─ template.tsx          page-transition animation
│  ├─ page.tsx              home page sections
│  ├─ ecu-remapping/        ECU remapping options page
│  ├─ sitemap.ts
│  └─ globals.css           brand theme tokens (colours, fonts), shared utilities & keyframes
├─ lib/site.ts              ★ business details, services, prices, remap options, example jobs, reviews
└─ components/
   ├─ Navbar.tsx            sticky nav + full-screen mobile menu
   ├─ MobileActionBar.tsx   sticky Messenger / Call bar on phones
   ├─ ScrollProgress.tsx    red scroll-progress bar
   ├─ Footer.tsx, icons.tsx, Providers.tsx
   ├─ ui/                   Button, Reveal, SectionHeading, CountUp, Marquee
   ├─ remap/                animated gauge + process timeline for the remap page
   └─ sections/             Hero, Services, ExampleJobs, About, Reviews, Contact
```

To change prices, services, remap options, example jobs, reviews or contact details, edit `src/lib/site.ts`.

## Contact

There is no contact form or email. Customers are sent to **Facebook Messenger** (`messengerUrl`, the
primary call to action everywhere) or can **call** (`phoneHref`, the secondary option).

## Before going live

- Set `siteUrl` in `src/lib/site.ts` to the real domain.
- Confirm the remap options and prices (`remapOptions`) and the MOT description with James.
- Replace the illustrative `exampleJobs` with real jobs and photos when available.
- Check the short service descriptions and "includes" bullets with James.
