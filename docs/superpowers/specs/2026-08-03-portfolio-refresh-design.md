# Portfolio Refresh — Design

**Date:** 2026-08-03
**Scope:** Sync site content to the new resume, redesign the Experience/Project sections, rebuild the navbar, add a footer, add contact/resume CTAs, and replace the typeface.

---

## Context

The portfolio is a single-page Next.js App Router site. Nearly all markup lives in one file, [`app/page.tsx`](../../../app/page.tsx) (477 lines), with `Navbar` and `Chatbot` extracted into `app/modules/`. Styling is Tailwind v4 with design tokens in `app/globals.css`. A Vanta WAVES canvas renders fixed behind everything, with a scroll-driven dim overlay above it.

A new resume (`AnishPatel_26_Resume.pdf`) has landed in `public/`, adding one role and one project, and changing several education facts.

### Live bug to fix

`public/AnishP_Resume.pdf` was **deleted** when the new resume was added, but two references still point at it:

- [`page.tsx:451`](../../../app/page.tsx#L451) — the Download PDF `href`
- [`page.tsx:462`](../../../app/page.tsx#L462) — the preview `<iframe src>`

Both 404 in production right now. Repoint both to `/AnishPatel_26_Resume.pdf`.

---

## Goals

1. Site content matches the new resume.
2. Experiences and Projects stop looking like the same component.
3. The navbar stops reading as a heavy black slab over the hero.
4. Hovering a project's tech icon reveals that technology's name.
5. Contact and resume access are reachable without scrolling or hunting.
6. The site no longer uses Inter.

## Non-goals

- No CMS, no data layer, no routing changes. Content stays as literals in JSX.
- No changes to the Vanta background, the scroll-dim overlay, or the pill nav's scroll behavior.
- No new projects beyond Praxis. CodeScan, FairShare, and SyncBoard stay.

---

## 1. Typography

Replace Inter with a three-role type system, all loaded via `next/font/google`.

| Role | Family | Used for |
|---|---|---|
| Display | **Space Grotesk** (600/700) | `h1`–`h3`, wordmark, buttons, card titles |
| Body | **Manrope** (400/500) | Paragraphs, bullets, descriptions |
| Accent | **JetBrains Mono** (500, uppercase, tracked) | Project index numbers, timeline years, section eyebrows, `scroll` cue, tooltips |

**Loading:** delete the render-blocking Google Fonts `<link>` at [`layout.tsx:21-26`](../../../app/layout.tsx#L21-L26). Use `next/font/google` with `display: 'swap'`, each font exposing a CSS variable (`--font-display`, `--font-sans`, `--font-mono`). Apply the variable classes to `<html>`.

**Tokens:** in `globals.css`, replace `--font-sans: 'Inter', sans-serif` with the three variables wired to the `next/font` output, and register them in Tailwind v4's `@theme` block so `font-display` / `font-sans` / `font-mono` utilities resolve.

Rationale: Space Grotesk's squared bowls and flat-sided `a` read technical next to the Carolina blue without the coldness of a pure geometric; Manrope keeps the About paragraphs warm at 16px; the mono accent ties the index numbers and eyebrows into an engineering idiom.

---

## 2. Navbar — `app/modules/navbar.tsx`

### Problem

[`navbar.tsx:25`](../../../app/modules/navbar.tsx#L25) applies `bg-[#0A0B0D]/70 backdrop-blur-md border-b border-[#262A30]`. The 70%-opaque fill plus a hard bottom border produces an opaque strip that visually clips the hero.

### Changes

- **Transparent at rest.** Drop the background fill and the bottom border entirely. Replace with a soft top-down scrim (`bg-gradient-to-b from-black/40 via-black/10 to-transparent`) so there is no hard edge, plus a subtle `text-shadow` on the links for legibility over the moving waves.
- **Wordmark:** `AnishPatel` → `Anish Patel`, rendered as two spans — `Anish` in `--foreground`, `Patel` in `--carolina`. The space becomes intentional rather than a gap.
- **Resume CTA:** an outlined `Resume ↗` button at top-right linking to `/AnishPatel_26_Resume.pdf` with `target="_blank" rel="noopener noreferrer"`.
  - It renders in **its own fixed layer**, a sibling of both the top bar and the pill nav — so it persists across both scroll states rather than fading out with the top bar.
  - The pill nav's existing `Resume` item keeps its current behavior (anchor-scroll to `#resume`). The two are visually distinct enough — one is a corner button with an `↗`, the other a pill tab — that the differing behavior is not confusing.
- **Scroll behavior unchanged.** The `scrolled > 100` threshold, the fade/translate transition, and `PillNav` stay exactly as they are.

### Mobile

The nav links are already `hidden lg:flex`. The Resume CTA stays visible at all breakpoints (it is the highest-value action); the wordmark shrinks below `sm`.

---

## 3. Experiences → vertical timeline

Replace the three identical full-width cards with a timeline.

```
        ┌─────────────────────────────────────────────┐
 2026   │  apexanalytix                    [logo]     │
   ●────│  Application Development Intern              │
   │    │  · QA suite: 2hr regression → 17min (~85%)   │
   │    │  · Adapted across 5 Fortune 500 portals      │
   │    │  · Scaled to 200+ employees                  │
   │    └─────────────────────────────────────────────┘
   │    ┌─────────────────────────────────────────────┐
 2025   │  Sports Media Inc.               [logo]     │
   ●────│  Software Engineering Intern                 │
   │    └─────────────────────────────────────────────┘
 2023   ...
```

**Structure:** a `<ol>` with a 1px Carolina-blue spine (an absolutely positioned vertical rule) running its full height. Each `<li>` carries a node dot on the spine and a content card offset to the right.

**Node dot:** 10px filled circle in `--carolina` with a soft outer glow (`box-shadow: 0 0 0 4px rgba(75,156,211,0.15)`). The topmost node (most recent role) gets a slow pulse to mark it as current.

**Year label:** `JetBrains Mono`, `--text-subtle`, positioned outside the spine on the left at `lg`; inline above the card title below `lg`.

**Card:** loses the heavy `border border-[#262A30]` all-around treatment. Becomes `bg-[--surface]` with a 2px left edge in `--carolina` at 40% opacity that goes to 100% on hover, plus a small `translate-x` on hover. This makes the card feel attached to the spine.

**Logo:** moves from a 192×128 block on the right to a smaller ~112×56 tile at the card's top-right. All four logos have baked-in white/light backgrounds (`apexanalytix.png` is a 200×200 white square with teal "apex" + near-black "analytix"), so they keep the existing `bg-white p-2 rounded` tile treatment. UNC Dentistry keeps its `bg-[#4B9CD3]` tile.

### Entries (newest first)

1. **apexanalytix** — Application Development Intern · May – Aug 2026 · Greensboro, NC *(new)*
   - Built a QA automation suite in Python and Playwright, cutting a 2-hour manual regression cycle to 17 minutes (~85% reduction)
   - Adapted the framework across 5 Fortune 500 client portals
   - Scaled the tooling to 200+ employees, standardizing test execution across teams
2. **Sports Media Inc.** — Software Engineering Intern · Jun – Aug 2025 · Remote *(existing copy retained)*
3. **NC A&T State University** — Research Intern · Aug 2023 – May 2024 · Greensboro, NC *(existing copy retained)*
4. **UNC School of Dentistry** — Computer Support Technician *(retained by explicit decision, though absent from the new resume)*

### Mobile

Spine shifts to `left-0`, cards go full width with a smaller left offset, year moves inline above the title.

---

## 4. Projects → editorial cards

Six cards in the existing responsive grid (`1 / 2 / 3` columns), reordered so **Praxis is first**.

**Card anatomy:**

- Large index number (`01`–`06`) top-left in JetBrains Mono at ~2rem, `--text-subtle` at low opacity — decorative, `aria-hidden`
- Title (Space Grotesk 700)
- Description paragraph (Manrope)
- Bullet list
- Tech icon row *(see §5)*
- GitHub link, bottom-right

**Hover:** border brightens `--border` → `--border-strong`, card lifts `-4px`, and a faint Carolina-blue radial glow fades in behind it. Single transition group, `duration-300`.

**Order:** `01` Praxis · `02` KarvBill · `03` SideLine · `04` CodeScan · `05` FairShare · `06` SyncBoard

### Praxis (new)

> AI-native incident-response pipeline that auto-triages server crashes and ships its own fixes.

- Node.js/Express + React/Vite pipeline that auto-triages server crashes
- Google Vertex AI agents analyze logs and auto-generate GitLab patch and rollback merge requests
- Human-in-the-loop Slack approval flow enabling one-click deployment
- Cut simulated MTTR

Tech icons: React, Node.js, Vite, Gemini/Vertex AI, GitLab, Slack.

**Implementation note:** verify each icon exists in the installed `react-icons` version before use (`SiVite`, `SiGitlab`, `SiSlack`, `SiGooglegemini` / `SiGooglecloud`). Substitute the nearest available glyph if any is missing rather than adding a dependency.

---

## 5. Tech icon tooltips

### Problem

Icons currently pass `title="Python"` to the SVG element ([`page.tsx:310-314`](../../../app/page.tsx#L310-L314)). Native tooltips on SVG are slow (~1s delay), inconsistently rendered across browsers, unstyleable, and never fire on touch or keyboard.

### Solution

A `TechIcon` component (new file, `app/modules/tech-icon.tsx`):

```tsx
<TechIcon icon={FaPython} label="Python" className="text-blue-400" />
```

- Wraps the glyph in a `relative` container with a `group`-scoped tooltip positioned above it
- Tooltip: `--surface-2` background, `--carolina` hairline border, JetBrains Mono uppercase label, small downward caret, `rounded-md`
- Motion: framer-motion fade + 4px rise, `duration-150`, via `AnimatePresence`
- **Accessibility:** the wrapper is `tabIndex={0}`; the tooltip shows on `focus-visible` as well as hover. The label is also exposed as `aria-label` so it is announced regardless of tooltip visibility. The decorative SVG gets `aria-hidden`.
- Tooltips are clipped by nothing — the card must not set `overflow-hidden` on the axis the tooltip escapes.

This replaces raw icons in the **project cards only**. The About tech grid already renders visible text labels beneath each icon, so it needs no tooltip.

---

## 6. Footer — `app/modules/footer.tsx` (new)

Rendered inside `page.tsx` after the Resume section, above `<Chatbot />`.

```
────────────────────────────────────────────────────────
  Anish Patel          Home  About  Experiences        
  I build things            Projects  Resume            
  that work.                                            
                                    [gh] [in] [mail]    
  © 2026 Anish Patel                                     
────────────────────────────────────────────────────────
```

- Transparent background so the Vanta waves show through; a single hairline `border-t border-[#262A30]` separates it
- Wordmark matching the navbar treatment (`Anish` white / `Patel` blue) plus the tagline
- Section quick-links reusing the same anchor targets as the navbar
- The same three icon buttons as the hero — GitHub, LinkedIn, Email — with identical `hover:text-[#4B9CD3]` treatment, so the top and bottom of the page rhyme
- `© 2026 Anish Patel` in `--text-subtle`

Links reuse the existing URLs: `github.com/AnishPatel526`, `linkedin.com/in/anish-patel1/`, `mailto:abpatel1@unc.edu`.

---

## 7. Hero CTAs

The hero currently has one outlined button, `View my work ↓` ([`page.tsx:130-136`](../../../app/page.tsx#L130-L136)).

Add a second, `Get in touch` → `mailto:abpatel1@unc.edu`, placed beside it in a flex row that wraps on mobile.

**Hierarchy:** `Get in touch` is the **filled** Carolina-blue button (primary), `View my work ↓` becomes the **outlined** secondary. Two identical outlined buttons would read as a flat, undifferentiated pair; filled-vs-outlined makes the intended action obvious.

---

## 8. Content sync

### Resume paths

Both references updated to `/AnishPatel_26_Resume.pdf` (see *Live bug* above). The navbar CTA uses the same path.

### About tech grid

12 → 15 tiles (5 clean rows of 3 at `grid-cols-3`). Add **Go**, **Swift**, **PyTorch** to reflect the resume's language and framework lists. Existing 12 are unchanged.

### Chatbot — `app/modules/chatbot.tsx`

The `questions` array ([`chatbot.tsx:7-36`](../../../app/modules/chatbot.tsx#L7-L36)) contains three factual errors and one stale framing:

| Current | Corrected |
|---|---|
| "class of 2027" | class of **2028** (resume: Aug 2024 – May 2028) |
| "GPA 3.75" | **3.7** |
| "recruiting for summer 2026 internships" | Remove — that cycle is past |
| "Where did Anish intern last summer?" → Sports Media | → **apexanalytix**, with the QA-automation results |

Additional edits:

- Fold **Praxis** into the "what is Anish working on right now" answer alongside KarvBill
- Add **Playwright**, **Go**, and **Swift** to the languages-and-tools answer
- "Three time Dean's List" remains correct (Fall '24, Spring '25, Fall '25)

---

## 9. Cursor glow — `app/modules/cursor-glow.tsx` (new)

A soft Carolina-blue light that trails the pointer, lighting the Vanta waves as it moves. The **native cursor is preserved** — this augments the pointer rather than replacing it.

### Why not a replacement cursor

A rotating custom cursor was considered and rejected. Replacing the pointer requires `document.body.style.cursor = "none"`, which removes the I-beam over selectable text (including the email address) and the hand over every link and button. The site's primary conversions are the `Resume ↗` and `Get in touch` buttons; removing their hover affordance works against the page's purpose. Vanta also already runs `mouseControls: true`, so a second pointer-driven effect competes for the same gesture.

### Implementation

- A single `position: fixed` div: a `radial-gradient` from `rgba(75,156,211,0.18)` to transparent, ~320px square, `blur(60px)`, `pointer-events: none`
- Position driven by two `useMotionValue`s piped through `useSpring` (`stiffness: 200, damping: 30, mass: 0.5`) so the glow lags the cursor by roughly 80ms
- `mousemove` listener throttled with a single in-flight `requestAnimationFrame`; the handler only writes motion values, never React state, so it triggers no re-renders
- `mix-blend-mode: plus-lighter` so it adds light to the dark background instead of painting a flat blue disc

### Layering

Renders at `z-[2]` — above the Vanta canvas (`z-0`) and the scroll-dim overlay (`z-[1]`), but **below** all content (`z-10`).

Consequence: the glow is occluded by the opaque section cards, so it reads in the open areas — the hero, the gutters, and the space between sections. This is deliberate. Placing it above content would require blending over body text, which risks washing out paragraphs at exactly the moment the reader's cursor is near them.

### Gating

The component returns `null` unless **both** hold, checked inside `useEffect` so SSR and hydration stay consistent:

- `window.matchMedia('(pointer: fine)').matches` — no mount on touch/coarse pointers
- `!window.matchMedia('(prefers-reduced-motion: reduce)').matches`

Cleanup removes the listener and cancels any pending `requestAnimationFrame`.

### Dependencies

**None added.** `framer-motion@^12.22.0` is already a dependency and exports `motion`, `useMotionValue`, and `useSpring`. The `motion` package is the same library under its post-rebrand name — installing it alongside framer-motion v12 would ship two copies of the same code. Imports come from `framer-motion`, matching every other file in the project.

Rendered in `page.tsx` alongside the other fixed background layers.

---

## Files touched

| File | Change |
|---|---|
| `app/layout.tsx` | Swap Google Fonts `<link>` for `next/font/google`; apply the three font variable classes to `<html>` |
| `app/globals.css` | Replace `--font-sans`; add `--font-display` / `--font-mono`; register in Tailwind `@theme` |
| `app/modules/navbar.tsx` | Transparent bar, scrim, spaced wordmark, persistent Resume ↗ CTA |
| `app/modules/tech-icon.tsx` | **New** — hover/focus tooltip component |
| `app/modules/footer.tsx` | **New** — footer with social buttons |
| `app/modules/cursor-glow.tsx` | **New** — spring-trailed pointer glow, gated to fine pointers |
| `app/modules/chatbot.tsx` | Correct stale facts, add Praxis |
| `app/page.tsx` | Timeline rewrite, project card rewrite + Praxis, tech grid additions, hero CTA, resume paths, render `<Footer />` and `<CursorGlow />` |
| `README.md` | Update the "What's working" and file-structure sections |

`app/page.tsx` is already at 477 lines and grows with this work. Extracting the timeline and project card into small presentational components under `app/modules/` — each taking a typed props object and driven by a local data array — keeps the page file readable and each unit independently understandable. This is a targeted improvement to code being edited anyway, not a general refactor; the About, Hero, and Resume sections stay inline.

---

## Verification

No test suite exists in this project. Verification is manual against `npm run dev`:

1. `npm run build` completes with no type errors and no lint failures
2. Navbar is fully transparent at scroll 0 with waves visible edge to edge; pill nav still swaps in past 100px; Resume ↗ persists in both states and opens the PDF in a new tab
3. Download PDF and the iframe preview both load `AnishPatel_26_Resume.pdf` (no 404 in the network panel)
4. Hovering **and** tab-focusing each project tech icon reveals the correct label; tooltip is not clipped by the card
5. Timeline renders 4 entries newest-first with all 4 logos loading
6. Praxis renders first in the project grid as `01`
7. `Get in touch` and all footer mail links open `mailto:abpatel1@unc.edu`
8. No occurrence of `Inter` remains in the codebase
9. Layout holds at 375px, 768px, and 1440px with no horizontal overflow
10. Cursor glow trails the pointer in open areas; the **native cursor is still visible** — I-beam over the About paragraphs, hand over every link and button
11. Cursor glow does not mount under emulated touch, nor with `prefers-reduced-motion: reduce` forced in DevTools
12. `package.json` gains no new dependency; `motion` is absent from the lockfile
