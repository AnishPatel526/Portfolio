# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync the portfolio to the new resume, redesign Experiences into a timeline and Projects into editorial cards with hover tooltips, rebuild the navbar as transparent with a persistent Resume CTA, add a footer, contact CTA, and a pointer glow, and replace Inter with a three-role type system.

**Architecture:** Single-page Next.js App Router site. All content stays as literals in JSX — no CMS, no data layer. Two large sections (Experiences, Projects) get extracted from the 477-line `app/page.tsx` into focused components under `app/modules/`, each owning its own typed data array. Shared URLs move into `app/lib/site.ts` so the navbar, hero, footer, and resume section cannot drift apart.

**Tech Stack:** Next.js 16.2.4 (App Router, Turbopack), React 19, TypeScript 5 (strict), Tailwind CSS 4.2.4, framer-motion 12.38.0, react-icons 5.5.0, `next/font/google`.

## Global Constraints

- **No new npm dependencies.** `framer-motion@^12.22.0` is already installed and exports `motion`, `useMotionValue`, `useSpring`, `AnimatePresence`. Do NOT install `motion` — it is the same library under its post-rebrand name and would ship a duplicate copy.
- **Import motion primitives from `framer-motion`**, never from `motion/react`, matching every existing file.
- **This project has no test runner.** There is no Jest, Vitest, or Playwright config and no `test` script in `package.json`. Do NOT add one — verification is `npx tsc --noEmit`, `npm run lint`, `npm run build`, plus the explicit manual browser checks in each task. Never write a step that runs a test command that does not exist.
- **Resume path is `/AnishPatel_26_Resume.pdf`.** The old `/AnishP_Resume.pdf` was deleted and any reference to it 404s.
- **Carolina blue is `#4B9CD3`**, hover `#5FAEE0`. Other tokens live in `app/globals.css`: `--background: #0A0B0D`, `--surface: #15171B`, `--surface-2: #1C1F24`, `--border: #262A30`, `--border-strong: #3A3F47`, `--text-muted: #A8ADB5`, `--text-subtle: #6B7079`.
- **`app/page.tsx` is a client component** (`'use client'` at line 1). Every new component it renders must also be a client component.
- **Verified icon names** (checked against the installed `react-icons@5.5.0`): `SiVite`, `SiGitlab`, `SiSlack`, `SiGooglegemini`, `SiGo`, `SiSwift`, `SiPytorch`, `SiExpress` all exist. `SiPlaywright` does **not** exist — never import it.
- **Every task ends with a commit.** Run `npx tsc --noEmit` before every commit; it must exit 0.

---

### Task 1: Typography system

Replaces Inter with Space Grotesk (display) / Manrope (body) / JetBrains Mono (accent), loaded via `next/font/google` instead of a render-blocking `<link>`. Everything downstream uses the `font-display` and `font-mono` utilities this task creates, so it goes first.

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utility classes `font-display`, `font-sans`, `font-mono`, available globally. `font-sans` is the inherited default on `<body>`.

- [ ] **Step 1: Add the three fonts to `app/layout.tsx`**

Add these imports and declarations above `export const metadata`:

```tsx
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

Note the variable names are the **font names**, not the role names. The role names (`--font-display` etc.) are defined in `globals.css` in Step 3 and would collide if reused here.

- [ ] **Step 2: Apply the variables and delete the Google Fonts `<link>`**

In `app/layout.tsx`, change the `<html>` tag to carry all three variable classes:

```tsx
<html
  lang="en"
  className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
>
```

Then delete these four lines from `<head>` (currently `app/layout.tsx:21-26`) — `next/font` self-hosts the files, so the preconnects and the stylesheet request are all dead weight:

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

Keep `<link rel="icon" href="/favicon.ico" />`.

- [ ] **Step 3: Register the font roles in `app/globals.css`**

Add an `@theme` block directly after the `@import "tailwindcss";` line. In Tailwind v4 the `--font-*` namespace generates `font-*` utilities:

```css
@theme {
  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}
```

Then delete this line from the `:root` block:

```css
--font-sans: 'Inter', sans-serif;
```

Leave `body { font-family: var(--font-sans); }` exactly as it is — `@theme` emits `--font-sans` into `:root`, so it resolves to Manrope now.

- [ ] **Step 4: Apply the display font to headings**

In `app/page.tsx`, add `font-display` to the four section `<h2>` elements (About, Featured Experiences, Featured Projects, Resume) and to the hero `<h1>`. Example — the hero heading becomes:

```tsx
<h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
```

And each section heading, e.g.:

```tsx
<h2 className="font-display text-4xl lg:text-5xl font-bold mb-12 text-center">
```

- [ ] **Step 5: Verify no Inter remains and the build passes**

```bash
grep -rn "Inter" app/ --include=*.tsx --include=*.css
```
Expected: no output.

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all three exit 0.

- [ ] **Step 6: Manual check**

Run `npm run dev`, open http://localhost:3000. Confirm headings render in Space Grotesk (squared bowls, flat-sided `a`) and the About paragraphs in Manrope. Open DevTools → Network, filter `Font` — confirm fonts are served from `localhost/_next/`, **not** `fonts.gstatic.com`.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/globals.css app/page.tsx
git commit -m "feat: replace Inter with Space Grotesk / Manrope / JetBrains Mono"
```

---

### Task 2: Shared site constants, resume 404 fix, and navbar rebuild

Fixes the live 404, then makes the navbar transparent and adds a persistent `Resume ↗` CTA. Bundled because all three depend on one resume path that must not be duplicated as a string literal.

**Files:**
- Create: `app/lib/site.ts`
- Modify: `app/modules/navbar.tsx`
- Modify: `app/page.tsx` (resume section, lines ~451 and ~462)

**Interfaces:**
- Consumes: `font-display` from Task 1.
- Produces: `app/lib/site.ts` exporting `RESUME_PATH: string` and `SOCIALS: { github: string; linkedin: string; email: string }`. Tasks 7 and 8 import both.

- [ ] **Step 1: Create `app/lib/site.ts`**

```ts
export const RESUME_PATH = "/AnishPatel_26_Resume.pdf";

export const SOCIALS = {
  github: "https://github.com/AnishPatel526",
  linkedin: "https://www.linkedin.com/in/anish-patel1/",
  email: "mailto:abpatel1@unc.edu",
} as const;
```

- [ ] **Step 2: Confirm the 404 exists before fixing it**

```bash
grep -rn "AnishP_Resume" app/
```
Expected: two hits in `app/page.tsx` — the download `href` and the iframe `src`. Both point at a file that no longer exists in `public/`.

```bash
ls public/AnishP_Resume.pdf
```
Expected: `No such file or directory`. This is the bug.

- [ ] **Step 3: Fix both references**

In `app/page.tsx`, import the constant at the top:

```tsx
import { RESUME_PATH } from './lib/site';
```

Replace `href="/AnishP_Resume.pdf"` with `href={RESUME_PATH}` and `src="/AnishP_Resume.pdf"` with `src={RESUME_PATH}`.

- [ ] **Step 4: Verify the old path is gone**

```bash
grep -rn "AnishP_Resume" app/
```
Expected: no output.

- [ ] **Step 5: Make the top bar transparent**

In `app/modules/navbar.tsx`, replace the `navClass` definition (currently line 25):

```tsx
const navClass =
  'flex items-center justify-between p-6 lg:px-8 bg-gradient-to-b from-black/40 via-black/10 to-transparent ' +
  (scrolled ? 'pointer-events-none' : '');
```

The `bg-[#0A0B0D]/70`, `backdrop-blur-md`, and `border-b border-[#262A30]` are all removed. The gradient replaces the hard-edged fill so there is no visible seam against the hero.

- [ ] **Step 6: Space the wordmark and add a text shadow to the links**

Replace the wordmark anchor:

```tsx
<a href="#home" className="font-display text-xl font-bold [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)]">
  <span className="text-white">Anish</span>{' '}
  <span className="text-[#4B9CD3]">Patel</span>
</a>
```

Add `lg:mr-32` and the shadow to the nav links container so the links clear the fixed CTA added in Step 7:

```tsx
<div className="hidden lg:mr-32 lg:flex lg:gap-x-12">
  {navigation.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="text-base font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)] hover:text-[#4B9CD3] transition-colors duration-200"
    >
      {item.name}
    </a>
  ))}
</div>
```

- [ ] **Step 7: Add the persistent Resume CTA**

Import the constant at the top of `navbar.tsx`:

```tsx
import { RESUME_PATH } from '../lib/site';
```

Add this as the **last child of `<header>`**, a sibling of both `<motion.nav>` and the pill-nav `<motion.div>`. Being outside `<motion.nav>` is what keeps it visible after the top bar fades out:

```tsx
<a
  href={RESUME_PATH}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed top-5 right-6 lg:right-8 z-50 rounded-full border border-[#4B9CD3]/60 bg-[#0A0B0D]/60 px-4 py-2 font-display text-sm font-medium text-[#4B9CD3] backdrop-blur-md transition-colors hover:bg-[#4B9CD3] hover:text-white"
>
  Resume ↗
</a>
```

Do **not** modify `PillNav`, `PillTab`, `PillCursor`, or the `scrolled > 100` logic. The pill nav's `Resume` tab keeps anchor-scrolling to `#resume`; this button opens the PDF. They are visually distinct enough (corner button with `↗` vs. centered pill tab) that the differing behavior reads as intentional.

- [ ] **Step 8: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

- [ ] **Step 9: Manual check**

With `npm run dev` running:
1. At scroll 0 the navbar has **no** solid bar and no bottom border — the Vanta waves are visible edge to edge behind it, fading softly at the top.
2. The wordmark reads `Anish Patel` with a space, `Patel` in blue.
3. Scroll past 100px: top bar fades out, the pill nav fades in centered, **and `Resume ↗` stays in the top-right corner**.
4. Click `Resume ↗` — the PDF opens in a **new tab** and renders (no 404).
5. Scroll to the Resume section — both the Download PDF button and the iframe preview load the PDF. Check DevTools → Network for zero 404s.
6. At 1024px width, confirm the nav links do not overlap the `Resume ↗` button.

- [ ] **Step 10: Commit**

```bash
git add app/lib/site.ts app/modules/navbar.tsx app/page.tsx
git commit -m "fix: repoint resume to new PDF; feat: transparent navbar with persistent Resume CTA"
```

---

### Task 3: Cursor glow

**Files:**
- Create: `app/modules/cursor-glow.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: default-exported `CursorGlow` component taking no props.

- [ ] **Step 1: Create `app/modules/cursor-glow.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 200, damping: 30, mass: 0.5 };

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  // Start far off-screen so the glow does not flash at (0,0) on mount.
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    let rafId = 0;
    const handleMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed z-[2] pointer-events-none"
      style={{
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 320,
        height: 320,
        borderRadius: '9999px',
        background:
          'radial-gradient(circle, rgba(75,156,211,0.18) 0%, rgba(75,156,211,0.06) 40%, transparent 70%)',
        filter: 'blur(60px)',
        mixBlendMode: 'plus-lighter',
        willChange: 'transform',
      }}
    />
  );
}
```

Two things that matter here and are easy to get wrong:
- The `mousemove` handler writes **only motion values**, never React state. Writing state per mouse move would re-render the whole page on every frame.
- `matchMedia` is read inside `useEffect`, not during render, so the server and first client render agree (`enabled` starts `false`) and hydration does not mismatch.

- [ ] **Step 2: Render it in `app/page.tsx`**

Import it alongside the existing `Chatbot` import:

```tsx
import CursorGlow from './modules/cursor-glow';
```

Render it immediately after the `bg-dim` overlay div (the one with `id="bg-dim"`), so it lands between the background layers and the content:

```tsx
<CursorGlow />
```

The `z-[2]` in the component puts it above the Vanta canvas (`z-0`) and the dim overlay (`z-[1]`) but below `<main>` and all sections (`z-10`). It is therefore occluded by the opaque cards — intended, so it never blends over body text.

- [ ] **Step 3: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

- [ ] **Step 4: Verify no dependency was added**

```bash
git diff --exit-code package.json package-lock.json
```
Expected: exit 0, no output. If this fails, a package was installed — revert it.

```bash
grep -rn "motion/react" app/
```
Expected: no output.

- [ ] **Step 5: Manual check**

1. Move the mouse over the hero — a soft blue glow trails the pointer by a beat and lights the waves.
2. **The native cursor is still visible.** Hover the About paragraph → I-beam. Hover `Get in touch` / any link → hand pointer. If the system cursor disappeared, something set `cursor: none` — that is a bug.
3. DevTools → Rendering → check "Emulate CSS `prefers-reduced-motion: reduce`", reload. The glow must not appear.
4. DevTools → toggle device toolbar (touch emulation), reload. The glow must not appear.
5. DevTools → Performance: record while moving the mouse. Confirm no per-frame React commits.

- [ ] **Step 6: Commit**

```bash
git add app/modules/cursor-glow.tsx app/page.tsx
git commit -m "feat: add spring-trailed cursor glow, gated to fine pointers"
```

---

### Task 4: TechIcon tooltip component

**Files:**
- Create: `app/modules/tech-icon.tsx`

**Interfaces:**
- Consumes: `font-mono` from Task 1.
- Produces: default-exported `TechIcon` with props `{ icon: IconType; label: string; className?: string }`. Task 6 renders it for every project tech glyph.

- [ ] **Step 1: Create `app/modules/tech-icon.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';

export default function TechIcon({
  icon: Icon,
  label,
  className = '',
}: {
  icon: IconType;
  label: string;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex outline-none"
      tabIndex={0}
      aria-label={label}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <Icon className={`h-6 w-6 ${className}`} aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#4B9CD3]/50 bg-[#1C1F24] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white shadow-lg"
          >
            {label}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#4B9CD3]/50 bg-[#1C1F24]"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
```

Why this replaces `title="Python"`: native SVG tooltips have a ~1s delay, cannot be styled, and never fire on keyboard focus. This fires instantly on both `mouseenter` and `focus`, and `aria-label` on the wrapper means screen readers announce the technology whether or not the tooltip is visible.

- [ ] **Step 2: Confirm `IconType` is exported where the import expects**

```bash
grep -rn "IconType" node_modules/react-icons/lib/index.d.ts
```
Expected: a line declaring/exporting `IconType`. If the import in Step 1 fails to resolve, change it to `import type { IconType } from 'react-icons/lib';`.

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```
Expected: exit 0. (No visual check yet — nothing renders `TechIcon` until Task 6.)

- [ ] **Step 4: Commit**

```bash
git add app/modules/tech-icon.tsx
git commit -m "feat: add TechIcon with hover and keyboard-focus tooltips"
```

---

### Task 5: Experiences timeline

Replaces the three identical full-width cards with a vertical timeline carrying four roles, newest first.

**Files:**
- Create: `app/modules/experience-timeline.tsx`
- Modify: `app/page.tsx` (Experiences section, currently lines ~227-277)

**Interfaces:**
- Consumes: `font-display` / `font-mono` from Task 1.
- Produces: default-exported `ExperienceTimeline` taking no props. `app/page.tsx` keeps the `<section>`, the `<h2>`, and the `motion.div` scroll animation; only the card list moves.

- [ ] **Step 1: Create `app/modules/experience-timeline.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';

type Experience = {
  company: string;
  role: string;
  year: string;
  period: string;
  logo: string;
  logoBg: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    company: 'apexanalytix',
    role: 'Application Development Intern',
    year: '2026',
    period: 'May – Aug 2026 · Greensboro, NC',
    logo: '/apexanalytix.png',
    logoBg: 'bg-white',
    bullets: [
      'Built a QA automation suite in Python and Playwright, cutting a 2 hour manual regression cycle to 17 minutes, an ~85% reduction',
      'Adapted the framework across 5 Fortune 500 client portals, extending coverage to distinct enterprise environments',
      'Scaled the tooling to 200+ employees, standardizing test execution across teams',
    ],
  },
  {
    company: 'Sports Media Inc.',
    role: 'Software Engineering Intern',
    year: '2025',
    period: 'Jun – Aug 2025 · Remote',
    logo: '/sportsmedia.png',
    logoBg: 'bg-white',
    bullets: [
      'Built a token based authentication system in Python and Java that increased login success by 30% and reduced reported issues by 25%',
      'Cut page load times by 1.2 seconds by optimizing API calls and shipping mobile first updates across the platform',
      'Deployed features to over 5,000 accounts working with a team of 5 engineers in Agile sprints',
    ],
  },
  {
    company: 'NC A&T State University',
    role: 'Research Intern',
    year: '2023',
    period: 'Aug 2023 – May 2024 · Greensboro, NC',
    logo: '/ncat.png',
    logoBg: 'bg-white',
    bullets: [
      'Achieved 95% classification accuracy detecting CAN bus cyberattacks across 5 ML models including Random Forest, KNN, SVM, and Isolation Forest',
      'Boosted detection performance by 20% through feature engineering and cross validation pipelines',
      'Co authored a peer reviewed paper presented at the 2024 icABCD Conference on automotive cybersecurity',
    ],
  },
  {
    company: 'UNC School of Dentistry',
    role: 'Computer Support Technician',
    year: '2023',
    period: 'Greensboro, NC',
    logo: '/uncdentistry.jpg',
    logoBg: 'bg-[#4B9CD3]',
    bullets: [
      '90% first contact resolution rate across 150 plus faculty, staff, and students',
      'Reduced new user downtime by 35% by completing 100 plus hardware and software setups',
      'Led onboarding sessions for 50+ users on personal and university issued devices',
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <ol className="relative">
      {experiences.map((exp, i) => {
        const isLast = i === experiences.length - 1;
        const isCurrent = i === 0;

        return (
          <li key={exp.company} className="relative flex gap-4 pb-10 last:pb-0 lg:gap-6">
            {/* Year gutter — desktop only */}
            <span className="hidden w-14 shrink-0 pt-6 text-right font-mono text-xs text-[#6B7079] lg:block">
              {exp.year}
            </span>

            {/* Spine column */}
            <div className="relative flex w-3 shrink-0 justify-center">
              <span className="absolute top-7 h-[10px] w-[10px] rounded-full bg-[#4B9CD3] shadow-[0_0_0_4px_rgba(75,156,211,0.15)]" />
              {isCurrent && (
                <motion.span
                  className="absolute top-7 h-[10px] w-[10px] rounded-full bg-[#4B9CD3]"
                  animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              {!isLast && (
                <span className="absolute top-11 bottom-[-2.5rem] w-px bg-[#262A30]" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 rounded-xl border-l-2 border-[#4B9CD3]/40 bg-[#15171B]/80 p-6 transition-all duration-300 hover:translate-x-1 hover:border-[#4B9CD3]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold">{exp.company}</h3>
                  <p className="mt-0.5 text-sm italic text-[#A8ADB5]">{exp.role}</p>
                  <p className="mt-1 font-mono text-xs text-[#6B7079]">{exp.period}</p>
                </div>
                <div
                  className={`flex h-14 w-28 shrink-0 items-center justify-center rounded p-2 ${exp.logoBg}`}
                >
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[#A8ADB5]">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
```

Note the connector line is rendered **per item** and skipped on the last one, rather than as one absolutely-positioned rule spanning the whole `<ol>`. That avoids brittle offset math against the year gutter and keeps each `<li>` self-contained.

- [ ] **Step 2: Swap the section body in `app/page.tsx`**

Import it at the top:

```tsx
import ExperienceTimeline from './modules/experience-timeline';
```

In the Experiences section, delete the entire `<div className="space-y-6">…</div>` block containing the three hand-written cards (Sports Media, NC A&T, UNC Dentistry) and replace it with:

```tsx
<ExperienceTimeline />
```

Keep the `<section id="experiences">`, the `motion.div` with `expRef` / `expControls`, and the `<h2>` exactly as they are.

- [ ] **Step 3: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

- [ ] **Step 4: Manual check**

1. Four entries render in order: apexanalytix → Sports Media Inc. → NC A&T → UNC School of Dentistry.
2. All four logos load. Check DevTools → Network for 404s; `apexanalytix.png` is a 200×200 white square so it should sit flush on its white tile.
3. The blue spine connects the dots and stops after the last node (no line dangling below UNC Dentistry).
4. The top node (apexanalytix) has a slow expanding pulse ring; the others do not.
5. Hovering a card shifts it right slightly and brightens its left edge.
6. At 375px width: the year gutter is hidden, cards are full width, no horizontal scrollbar.

- [ ] **Step 5: Commit**

```bash
git add app/modules/experience-timeline.tsx app/page.tsx
git commit -m "feat: replace experience cards with vertical timeline, add apexanalytix"
```

---

### Task 6: Editorial project cards with Praxis

**Files:**
- Create: `app/modules/projects.tsx`
- Modify: `app/page.tsx` (Projects section, currently lines ~292-438)

**Interfaces:**
- Consumes: `TechIcon` from Task 4 (`{ icon, label, className }`); `font-display` / `font-mono` from Task 1.
- Produces: default-exported `Projects` taking no props.

- [ ] **Step 1: Create `app/modules/projects.tsx`**

```tsx
'use client';

import type { IconType } from 'react-icons';
import { FaGithub, FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import {
  SiPandas,
  SiScikitlearn,
  SiPostgresql,
  SiFlask,
  SiTypescript,
  SiJavascript,
  SiVite,
  SiGitlab,
  SiSlack,
  SiGooglegemini,
} from 'react-icons/si';
import TechIcon from './tech-icon';

type Tech = { icon: IconType; label: string; className: string };

type Project = {
  name: string;
  blurb: string;
  bullets: string[];
  tech: Tech[];
  repo: string;
};

const REPO = 'https://github.com/AnishPatel526';

const projects: Project[] = [
  {
    name: 'Praxis',
    blurb:
      'AI native incident response pipeline that auto triages server crashes and drafts its own fixes.',
    bullets: [
      'Node.js and Express backend with a React and Vite frontend',
      'Google Vertex AI agents analyze logs and auto generate GitLab patch and rollback merge requests',
      'Human in the loop Slack approval flow enabling one click deployment',
      'Cut simulated mean time to recovery',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: SiVite, label: 'Vite', className: 'text-purple-400' },
      { icon: SiGooglegemini, label: 'Gemini', className: 'text-blue-400' },
      { icon: SiGitlab, label: 'GitLab', className: 'text-orange-500' },
      { icon: SiSlack, label: 'Slack', className: 'text-pink-400' },
    ],
    repo: REPO,
  },
  {
    name: 'KarvBill',
    blurb:
      'AI medical bill auditor. End to end pipeline that ingests itemized bills and surfaces pricing anomalies, duplicate charges, and overbilling.',
    bullets: [
      'Built with Python, AWS Textract, Pandas, scikit learn',
      'Hosted on AWS Elastic Beanstalk with S3 backed storage',
      'Combines ML based and rule driven validation checks',
      'Handles multiple claim formats end to end',
    ],
    tech: [
      { icon: FaPython, label: 'Python', className: 'text-blue-400' },
      { icon: FaAws, label: 'AWS', className: 'text-orange-400' },
      { icon: SiPandas, label: 'Pandas', className: 'text-white' },
      { icon: SiScikitlearn, label: 'scikit-learn', className: 'text-orange-500' },
      { icon: FaDocker, label: 'Docker', className: 'text-blue-500' },
    ],
    repo: REPO,
  },
  {
    name: 'SideLine',
    blurb:
      'Real time NBA analytics dashboard. Aggregates live game data and betting odds across 3 plus APIs and surfaces favorable prop bet opportunities.',
    bullets: [
      'Built with React, Node.js, WebSockets, Python, PostgreSQL',
      'Python pipeline normalizes data across 1,200 plus games',
      'Prop bet screener cross references live performance against book lines',
      'Tracks line movement in real time',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: FaPython, label: 'Python', className: 'text-blue-400' },
      { icon: SiPostgresql, label: 'PostgreSQL', className: 'text-blue-300' },
    ],
    repo: REPO,
  },
  {
    name: 'CodeScan',
    blurb:
      'Full stack AI code review tool. Analyzes code via the OpenAI API and surfaces bugs, security issues, and style improvements across 10 plus languages.',
    bullets: [
      'Built with Python, Flask, React, OpenAI API',
      'REST API backend with structured feedback rendering',
      'Syntax highlighted input across 10 plus languages',
      'Real time analysis on submission',
    ],
    tech: [
      { icon: FaPython, label: 'Python', className: 'text-blue-400' },
      { icon: SiFlask, label: 'Flask', className: 'text-white' },
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: SiTypescript, label: 'TypeScript', className: 'text-blue-500' },
    ],
    repo: REPO,
  },
  {
    name: 'FairShare',
    blurb:
      'Full stack platform that calculates optimized payment splits across any group size. Eliminates manual balance tracking with an O(n) debt resolution algorithm.',
    bullets: [
      'Built with React, Node.js, Express, REST APIs',
      'O(n) debt resolution algorithm for instant payment splits',
      'Modular React interface with 10 plus reusable components',
      'Standardized UI consistency across all devices',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: SiJavascript, label: 'JavaScript', className: 'text-yellow-400' },
    ],
    repo: REPO,
  },
  {
    name: 'SyncBoard',
    blurb:
      'Real time collaborative task management platform. Reduced sync latency from seconds to milliseconds for concurrent users with WebSocket based updates.',
    bullets: [
      'Built with React, Node.js, WebSockets, Google Calendar API',
      'Real time updates across collaborative task management',
      'Google Calendar API integration syncs 100 percent of deadlines',
      '5 plus core collaboration features including shared notes',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: SiJavascript, label: 'JavaScript', className: 'text-yellow-400' },
    ],
    repo: REPO,
  },
];

export default function Projects() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <div
          key={project.name}
          className="group relative flex min-h-[440px] flex-col justify-between rounded-2xl border border-[#262A30] bg-[#15171B] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3A3F47]"
        >
          {/* Hover glow, sits behind content and never clips the tooltips */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(75,156,211,0.18), transparent 70%)',
            }}
          />

          <div>
            <span
              aria-hidden="true"
              className="font-mono text-2xl font-medium text-[#6B7079]/40"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold">{project.name}</h3>
            <p className="mb-4 mt-3 text-sm leading-relaxed text-[#A8ADB5]">
              {project.blurb}
            </p>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-[#6B7079]">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="mb-4 flex flex-wrap gap-3">
              {project.tech.map((t) => (
                <TechIcon
                  key={t.label}
                  icon={t.icon}
                  label={t.label}
                  className={t.className}
                />
              ))}
            </div>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className="inline-block text-[#4B9CD3]"
            >
              <FaGithub className="h-6 w-6 transition-opacity hover:opacity-70" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
```

The card must **never** get `overflow-hidden` — the tooltips from Task 4 escape the top of the tech icon row and would be clipped. The hover glow is a separate absolutely-positioned span at `-z-10` for the same reason.

- [ ] **Step 2: Swap the section body in `app/page.tsx`**

Import it:

```tsx
import Projects from './modules/projects';
```

Delete the entire `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">…</div>` block containing all five hand-written project cards and replace it with:

```tsx
<Projects />
```

Keep the `<section id="projects">`, the `motion.div` with `projectRef` / `projectControls`, and the `<h2>`.

- [ ] **Step 3: Clean up now-unused imports in `app/page.tsx`**

Removing the project cards orphans several icon imports. `npm run lint` will flag them. Delete from the `react-icons/fa` and `react-icons/si` import statements any icon no longer referenced in `page.tsx`. After Task 7 the About tech grid still needs: `FaPython`, `FaJava`, `SiJavascript`, `SiTypescript`, `FaReact`, `FaNodeJs`, `SiPostgresql`, `FaAws`, `FaDocker`, `FaGitAlt`, `FaHtml5`, `FaCss3Alt`, plus `SiGo`, `SiSwift`, `SiPytorch`. The hero still needs `FaGithub`, `FaLinkedin`, `FaEnvelope`. `SiPandas`, `SiScikitlearn`, and `SiFlask` become unused in `page.tsx` — remove them.

- [ ] **Step 4: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0, with no unused-import warnings.

- [ ] **Step 5: Manual check**

1. Six cards render, Praxis first, numbered `01` through `06`.
2. Hover the Python glyph on KarvBill → a dark tooltip reading `PYTHON` appears instantly above it in mono type, **not clipped** by the card edge.
3. Repeat for a card in the **top row** — confirm the tooltip is not cut off by the section boundary.
4. Press Tab repeatedly to walk the tech icons — each shows its tooltip on focus.
5. Hover a card → it lifts and a faint blue glow appears behind it.
6. Every GitHub link opens `github.com/AnishPatel526` in a new tab.

- [ ] **Step 6: Commit**

```bash
git add app/modules/projects.tsx app/page.tsx
git commit -m "feat: editorial project cards with Praxis and hover tooltips"
```

---

### Task 7: Hero CTA and About tech grid

**Files:**
- Modify: `app/page.tsx` (hero buttons ~line 129-136; tech grid ~line 187-200)

**Interfaces:**
- Consumes: `SOCIALS` from Task 2.
- Produces: nothing consumed downstream.

- [ ] **Step 1: Add the Get in touch button**

Import `SOCIALS` (extend the existing Task 2 import):

```tsx
import { RESUME_PATH, SOCIALS } from './lib/site';
```

Replace the hero's single-button `<div className="mt-10">…</div>` with a two-button row:

```tsx
<div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
  <a
    href="#experiences"
    className="inline-block rounded-md border border-[#4B9CD3] px-5 py-2.5 font-display text-lg font-bold text-[#4B9CD3] transition-colors hover:bg-[#4B9CD3] hover:text-white"
  >
    View my work ↓
  </a>
  <a
    href={SOCIALS.email}
    className="inline-block rounded-md border border-[#4B9CD3] bg-[#4B9CD3] px-5 py-2.5 font-display text-lg font-bold text-white transition-colors hover:bg-[#5FAEE0] hover:border-[#5FAEE0]"
  >
    Get in touch
  </a>
</div>
```

`Get in touch` is filled and `View my work ↓` outlined, so the pair reads as primary/secondary rather than two identical buttons.

- [ ] **Step 2: Add Go, Swift, and PyTorch to the tech grid**

Add to the `react-icons/si` import in `page.tsx`: `SiGo`, `SiSwift`, `SiPytorch`.

Append these three entries to the end of the tech-stack array (after `['CSS', FaCss3Alt, 'text-blue-400']`), bringing it to 15 tiles — exactly 5 rows at `grid-cols-3`:

```tsx
['Go', SiGo, 'text-cyan-400'],
['Swift', SiSwift, 'text-orange-500'],
['PyTorch', SiPytorch, 'text-orange-600'],
```

- [ ] **Step 3: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

- [ ] **Step 4: Manual check**

1. The hero shows two buttons side by side; `Get in touch` is solid blue, `View my work ↓` outlined.
2. Clicking `Get in touch` opens a mail composer addressed to `abpatel1@unc.edu`.
3. The tech grid shows 15 tiles in 5 even rows of 3 with no orphan tile.
4. At 375px the two hero buttons wrap cleanly and stay centered.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add Get in touch CTA and Go/Swift/PyTorch to tech grid"
```

---

### Task 8: Footer

**Files:**
- Create: `app/modules/footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SOCIALS` from Task 2; `font-display` from Task 1.
- Produces: default-exported `Footer` taking no props.

- [ ] **Step 1: Create `app/modules/footer.tsx`**

```tsx
'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SOCIALS } from '../lib/site';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#262A30] px-6 py-12 text-white lg:px-8">
      <div className="container mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">
            <span className="text-white">Anish</span>{' '}
            <span className="text-[#4B9CD3]">Patel</span>
          </p>
          <p className="mt-1 text-sm text-[#A8ADB5]">I build things that work.</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-[#A8ADB5] transition-colors hover:text-[#4B9CD3]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex gap-5">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6 text-white transition-colors hover:text-[#4B9CD3]" />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6 text-white transition-colors hover:text-[#4B9CD3]" />
          </a>
          <a href={SOCIALS.email} aria-label="Email">
            <FaEnvelope className="h-6 w-6 text-white transition-colors hover:text-[#4B9CD3]" />
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-10 max-w-6xl">
        <p className="text-xs text-[#6B7079]">© 2026 Anish Patel</p>
      </div>
    </footer>
  );
}
```

No background colour is set, so the Vanta waves show through; the single `border-t` is the only separator.

- [ ] **Step 2: Render it in `app/page.tsx`**

Import:

```tsx
import Footer from './modules/footer';
```

Render it after the closing `</section>` of the Resume section and **before** `<Chatbot />`:

```tsx
<Footer />
<Chatbot />
```

- [ ] **Step 3: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

- [ ] **Step 4: Manual check**

1. Scroll to the bottom — the footer shows the wordmark, tagline, five section links, three social icons, and the copyright.
2. The waves are visible through the footer; only a hairline rule separates it from the Resume section.
3. All three icons hover to Carolina blue, matching the hero.
4. The email icon opens a composer to `abpatel1@unc.edu`; GitHub and LinkedIn open in new tabs.
5. The chatbot button still floats above the footer and is not covered by it.
6. At 375px the three groups stack vertically without overflow.

- [ ] **Step 5: Commit**

```bash
git add app/modules/footer.tsx app/page.tsx
git commit -m "feat: add site footer with social links"
```

---

### Task 9: Chatbot content sync

The `questions` array contains three factual errors against the new resume plus one stale framing.

**Files:**
- Modify: `app/modules/chatbot.tsx` (the `questions` array, lines 7-36)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Replace the `questions` array**

Replace the whole array with this. Changes: graduation 2027 → **2028**, GPA 3.75 → **3.7**, the "last summer" answer now describes apexanalytix, the summer-2026 recruiting line is gone, Praxis is added, and Playwright / Go / Swift join the tools answer.

```tsx
const questions = [
  {
    q: "Where did Anish intern last summer?",
    a: "apexanalytix as an Application Development Intern. He built a QA automation suite in Python and Playwright that cut a 2 hour manual regression cycle down to 17 minutes, adapted it across 5 Fortune 500 client portals, and scaled it to over 200 employees!!"
  },
  {
    q: "What is Anish working on right now?",
    a: "He is building multiple projects! Praxis, an AI native incident response pipeline that auto triages server crashes and drafts its own GitLab fixes, and KarvBill, an AI tool that audits medical bills and surfaces pricing errors. He is also grinding LeetCode in Python and Java."
  },
  {
    q: "What does Anish study?",
    a: "Computer Science and Statistics and Analytics at UNC Chapel Hill, class of 2028. GPA 3.7. Three time Dean's List."
  },
  {
    q: "What languages and tools does he use?",
    a: "Python, Java, Swift, C, C++, JavaScript, TypeScript, SQL, and Go. Comfortable with React, Node.js, Express, Vite, Flask, Playwright, Docker, AWS, Google Vertex AI, Git, and the standard data stack of Pandas, scikit learn, and PyTorch."
  },
  {
    q: "What does Anish do for fun?",
    a: "Football, chess, and boxing. Plenty of NBA 2K, Rocket League, and Fortnite. Big fan of How I Met Your Mother, Breaking Bad, House M.D, and the Pitt."
  },
  {
    q: "Has he done research?",
    a: "Yes. A year at NC A&T State University researching CAN bus cyberattack detection. Built and evaluated 5 ML models, hit 95 percent accuracy, and co authored a peer reviewed paper at the 2024 icABCD Conference."
  },
  {
    q: "How can I reach Anish?",
    a: "Email is fastest at abpatel1@unc.edu. He is also reachable via number and LinkedIn."
  }
];
```

- [ ] **Step 2: Verify the stale facts are gone**

```bash
grep -nE "2027|3\.75|summer 2026 software" app/modules/chatbot.tsx
```
Expected: no output.

- [ ] **Step 3: Build and type-check**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

- [ ] **Step 4: Manual check**

Open the chatbot and click through all seven questions. Confirm the intern answer names apexanalytix, the study answer says class of 2028 and GPA 3.7, and the current-work answer mentions Praxis.

- [ ] **Step 5: Commit**

```bash
git add app/modules/chatbot.tsx
git commit -m "fix: correct stale chatbot facts and add Praxis"
```

---

### Task 10: README update and full verification sweep

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: everything.
- Produces: nothing.

- [ ] **Step 1: Update the file-structure block in `README.md`**

Replace the file structure section with:

```
.
├── app/
│   ├── globals.css        # theme variables + font role registration
│   ├── layout.tsx         # root layout, next/font, Navbar
│   ├── page.tsx           # hero, about, experiences, projects, resume
│   ├── lib/
│   │   └── site.ts        # resume path + social URLs (single source of truth)
│   └── modules/
│       ├── navbar.tsx             # transparent top bar + scroll pill nav + Resume CTA
│       ├── experience-timeline.tsx # vertical timeline, 4 roles
│       ├── projects.tsx           # 6 project cards
│       ├── tech-icon.tsx          # icon + hover/focus tooltip
│       ├── footer.tsx             # social links + copyright
│       ├── cursor-glow.tsx        # spring-trailed pointer glow
│       └── chatbot.tsx            # preset Q&A
├── docs/superpowers/      # specs and plans
└── public/                # headshot, logos, AnishPatel_26_Resume.pdf
```

- [ ] **Step 2: Update the Theme and "What's working" sections**

Under Theme, add:

```markdown
Fonts are loaded with `next/font/google` in `app/layout.tsx` and mapped to
roles in the `@theme` block of `globals.css`:

- `font-display` → Space Grotesk (headings, wordmark, buttons)
- `font-sans` → Manrope (body, default on `<body>`)
- `font-mono` → JetBrains Mono (timeline years, project index numbers, tooltips)
```

Replace the "What's working" list with:

```markdown
- Particle canvas background with mouse-reactive blue glow
- Transparent navbar that swaps to a centered pill nav on scroll, with a
  persistent `Resume ↗` button that opens the PDF in a new tab
- Hero with name, tagline, social icons, View my work + Get in touch, headshot
- About section with bio + 15-tile tech grid
- Experiences as a vertical timeline (apexanalytix, Sports Media, NC A&T, UNC Dentistry)
- Projects: 6 cards (Praxis, KarvBill, SideLine, CodeScan, FairShare, SyncBoard)
  with hover/focus tooltips on every tech icon
- Resume section with download button + iframe preview
- Footer with GitHub / LinkedIn / Email
- Cursor glow that trails the pointer (fine pointers only, respects reduced motion)
- Chatbot bottom-right with preset Q&A
```

Delete the "Things to iterate on next" section — every item in it is now done.

Also fix the stale filename under "Files to add to `public/`": `AnishPatel_Resume.pdf` → `AnishPatel_26_Resume.pdf`.

- [ ] **Step 3: Run the full verification sweep**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all exit 0.

```bash
grep -rn "Inter" app/ --include=*.tsx --include=*.css
grep -rn "AnishP_Resume" app/
grep -rn "motion/react" app/
```
Expected: no output from any of the three.

```bash
git diff --exit-code package.json package-lock.json
```
Expected: exit 0 — no dependency was added anywhere in this plan.

- [ ] **Step 4: Full manual pass against the spec's verification list**

With `npm run dev` running, confirm all twelve:

1. Build clean, no type or lint errors ✓ (Step 3)
2. Navbar transparent at scroll 0; pill nav swaps in past 100px; `Resume ↗` persists in both states and opens the PDF in a new tab
3. Download PDF and the iframe both load `AnishPatel_26_Resume.pdf` — zero 404s in the Network panel
4. Hovering **and** tab-focusing each project tech icon reveals the correct label, unclipped
5. Timeline renders 4 entries newest-first with all 4 logos loading
6. Praxis renders first as `01`
7. `Get in touch` and all footer mail links open `mailto:abpatel1@unc.edu`
8. No `Inter` anywhere ✓ (Step 3)
9. Layout holds at 375px, 768px, and 1440px with no horizontal overflow
10. Cursor glow trails the pointer; **native cursor still visible** — I-beam over About text, hand over links
11. Glow does not mount under emulated touch or forced `prefers-reduced-motion: reduce`
12. `package.json` unchanged; `motion` absent from the lockfile ✓ (Step 3)

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: update README for portfolio refresh"
```

---

## Self-Review

**Spec coverage:** §1 Typography → Task 1. §2 Navbar → Task 2. §3 Timeline → Task 5. §4 Project cards → Task 6. §5 Tooltips → Tasks 4 + 6. §6 Footer → Task 8. §7 Hero CTA → Task 7. §8 Content sync → Tasks 2 (resume paths), 7 (tech grid), 9 (chatbot). §9 Cursor glow → Task 3. Live 404 bug → Task 2. README → Task 10. No gaps.

**Placeholder scan:** No TBD/TODO, no "similar to Task N", no "add error handling". Every code step carries complete, runnable code.

**Type consistency:** `TechIcon` props `{ icon: IconType; label: string; className?: string }` defined in Task 4 match the call sites in Task 6. `RESUME_PATH` and `SOCIALS` defined in Task 2 match consumption in Tasks 7 and 8. The `Tech`, `Project`, and `Experience` types are local to their own modules and used only there. Font utility names `font-display` / `font-sans` / `font-mono` are consistent from Task 1 through Task 10.

**Known adaptation:** this project has no test runner, so the TDD write-failing-test-first cycle does not apply. Each task instead ends with type-check, lint, build, and an explicit enumerated manual browser check — plus grep-based assertions where a fact can be checked mechanically (dead resume path, `Inter` removal, no new dependency).
