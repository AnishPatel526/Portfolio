# Anish Patel — Portfolio

Simple starter version. Iterate from here.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Files to add to `public/`

Place these in `/public/`:

- `headshot.jpg` — your headshot photo (square, ~600px works great)
- `AnishPatel_Resume.pdf` — your resume PDF
- `favicon.ico` — optional

## File structure

```
.
├── app/
│   ├── globals.css        # theme variables (Carolina Blue, dark bg, etc.)
│   ├── layout.tsx         # root layout, loads Inter font and Navbar
│   ├── page.tsx           # main portfolio page (hero, about, experiences, projects, resume)
│   └── modules/
│       ├── navbar.tsx     # top fixed navbar
│       └── chatbot.tsx    # bottom-right chatbot with preset Q&A
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

## Theme

The Carolina Blue color is hard-coded as `#4B9CD3`. Search and replace if you ever want to change it.

Other tokens are in `app/globals.css`:
- `--background: #0A0B0D` (near-black)
- `--surface: #15171B` (card bg)
- `--border: #262A30`
- `--text-muted: #A8ADB5`

## What's working

- Particle canvas background with mouse-reactive blue glow
- Hero with name, roles, social icons, View My Work button, headshot, scroll cue
- About section with bio + info card
- Experiences (3 cards: Sports Media, NC A&T, UNC Dentistry)
- Projects (3 cards: KarvBill, SideLine, CodeScan) with tech stack icons
- Resume section with download button + iframe preview
- Chatbot bottom-right with preset Q&A
- Smooth scroll anchors via the navbar
- Scroll-triggered fade-in animations on each section

## Things to iterate on next

- Swap the experience logo placeholders for real company logos
- Adjust spacing on the hero (currently full-screen flex center)
- Add more projects or swap the stack icons
- Tighten up mobile spacing
- Add any extra Q&A to the chatbot
