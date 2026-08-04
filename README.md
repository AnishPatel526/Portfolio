# Anish Patel — Portfolio

Single-page Next.js portfolio. Dark, Carolina blue, animated wave background.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Files in `public/`

- `headshot.jpg` — headshot photo (square, ~600px works great)
- `AnishPatel_26_Resume.pdf` — resume PDF (path is set in `app/lib/site.ts`)
- `apexanalytix.png`, `sportsmedia.png`, `ncat.png`, `uncdentistry.jpg` — experience logos
- `favicon.ico` — **currently missing**, so `/favicon.ico` 404s in the console

## File structure

```
.
├── app/
│   ├── globals.css        # theme variables + font role registration
│   ├── layout.tsx         # root layout, next/font, Navbar
│   ├── page.tsx           # hero, about, experiences, projects, resume
│   ├── lib/
│   │   └── site.ts        # resume path + social URLs (single source of truth)
│   └── modules/
│       ├── navbar.tsx              # transparent top bar + scroll pill nav + Resume CTA
│       ├── experience-timeline.tsx # vertical timeline, 4 roles
│       ├── projects.tsx            # 6 project cards
│       ├── tech-icon.tsx           # icon + hover/focus tooltip
│       ├── footer.tsx              # social links + copyright
│       ├── cursor-glow.tsx         # spring-trailed pointer glow
│       └── chatbot.tsx             # preset Q&A
├── docs/superpowers/      # design specs and implementation plans
└── public/                # headshot, logos, resume PDF
```

## Theme

The Carolina Blue color is hard-coded as `#4B9CD3`. Search and replace if you ever want to change it.

Other tokens are in `app/globals.css`:
- `--background: #0A0B0D` (near-black)
- `--surface: #15171B` (card bg)
- `--border: #262A30`
- `--text-muted: #A8ADB5`

Fonts are loaded with `next/font/google` in `app/layout.tsx` (self-hosted, no
render-blocking request) and mapped to roles in the `@theme` block of
`globals.css`:

- `font-display` → Space Grotesk (headings, wordmark, buttons)
- `font-sans` → Manrope (body, default on `<body>`)
- `font-mono` → JetBrains Mono (timeline years, project index numbers, tooltips)

## What's working

- Particle canvas background with mouse-reactive blue glow
- Transparent navbar that swaps to a centered pill nav on scroll, with a
  persistent `Open Resume ↗` button that opens the PDF in a new tab
- Hero with name, tagline, social icons, View my work + Get in touch, headshot
- About section with bio + 15-tile tech grid
- Experiences as a vertical timeline (apexanalytix, Sports Media, NC A&T, UNC Dentistry)
- Projects: 6 cards (Praxis, KarvBill, SideLine, CodeScan, FairShare, SyncBoard)
  with hover/focus tooltips on every tech icon
- Resume section with download button + iframe preview
- Footer with GitHub / LinkedIn / Email
- Cursor glow that trails the pointer (fine pointers only, respects reduced motion)
- Chatbot bottom-right with preset Q&A
- Smooth scroll anchors via the navbar
- Scroll-triggered fade-in animations on each section

## Verifying changes

There is no test runner in this project. Verification is:

```bash
npx tsc --noEmit   # type check
npm run build      # production build
```

`npm run lint` is **broken** — the script calls `next lint`, which was removed
in Next 16, and there is no `eslint.config.js`. Either delete the script or
migrate to a flat ESLint config.
