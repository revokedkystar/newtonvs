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
public/images/            logo, van, and recent-work photos
src/
├─ app/
│  ├─ layout.tsx          fonts, SEO metadata, LocalBusiness JSON-LD
│  ├─ page.tsx            assembles the sections
│  └─ globals.css         brand theme tokens (colours, fonts), shared utilities
├─ lib/site.ts            ★ all business details, services, prices and reviews
└─ components/
   ├─ Navbar.tsx          sticky nav + mobile menu
   ├─ MobileActionBar.tsx sticky Call / Quote bar on phones
   ├─ Footer.tsx
   ├─ Providers.tsx       MotionConfig + QuoteProvider
   ├─ QuoteContext.tsx    shared "selected service" state ("Book This Service" → form)
   ├─ icons.tsx
   ├─ ui/                 Button, Reveal, SectionHeading
   ├─ quote/              QuoteForm, ContactCard, form fields + UK plate input
   └─ sections/           Hero, Services, About, Reviews, QuoteSection
```

To change prices, services, reviews or contact details, edit `src/lib/site.ts`.

## Quote form (FormSubmit)

The form posts JSON to `https://formsubmit.co/ajax/jamesperryman4767@gmail.com`.

1. Deploy the site and submit the form once.
2. FormSubmit emails an **activation link** to that inbox — click it. Submissions won't be delivered until you do.
3. Optional: the activation email also gives a random alias. Set it in `NEXT_PUBLIC_FORM_ENDPOINT`
   (see `.env.example`) to keep the email address out of the page source.

## Before going live

- Set `facebookUrl` in `src/lib/site.ts` to the exact Facebook page URL (currently a Facebook search link).
- Set `siteUrl` in `src/lib/site.ts` to the real domain.
- Check the short service descriptions and "includes" bullets with James.
