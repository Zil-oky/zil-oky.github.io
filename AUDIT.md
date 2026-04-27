# Site Audit — Pre-Polish Snapshot

_Date: 2026-04-26_
_Scope: `https://zil-oky.github.io/` — single-page portfolio in one `index.html`._

This document captures the state of the site **before** the polish pass. Items
marked with `[FIX]` are addressed in subsequent task commits; a "Resolved"
section is appended at the end of the polish pass.

---

## 1. File structure

```
.
├── README.md   (1 line — placeholder)
└── index.html  (1031 lines — HTML + inline <style> + inline <script>)
```

No build step, no dependencies, no images, no assets directory, no `.gitignore`,
no `.editorconfig`, no `robots.txt`, no `sitemap.xml`, no `404.html`, no
favicon.

## 2. Tech stack

- Vanilla HTML5, no framework.
- All CSS in a single `<style>` block (~600 lines).
- All JS in a single `<script>` block (~65 lines) — theme toggle, copy-to-
  clipboard, FAQ accordion.
- Google Fonts: `Instrument Serif`, `Inter` (5 weights), `JetBrains Mono`
  (2 weights), loaded via `<link rel="stylesheet">` with `display=swap`.
- Hosted on GitHub Pages from the repo root.
- Theme toggle (dark/light) persisted to `localStorage`.

## 3. Accessibility issues

- **[FIX]** No skip-to-content link for keyboard users.
- **[FIX]** FAQ accordion buttons set `aria-expanded` but do not use
  `aria-controls`/`id` to associate the answer panel; answer panel is not
  marked as a region. Keyboard activation works (native `<button>`) but the
  relationship is invisible to assistive tech.
- **[FIX]** FAQ "+" / rotated "x" icon is rendered as raw text inside the
  button — read aloud as "plus" by screen readers. Should be `aria-hidden`.
- **[FIX]** Theme toggle has `aria-label="Toggle theme"` but does not expose
  current state (`aria-pressed` or label text indicating "switch to light").
- **[FIX]** Decorative pulsing dots (nav logo, "Taking new projects" indicator,
  contact pill) lack `aria-hidden="true"`.
- **[FIX]** Toast notification ("Copied ziloky to clipboard") has no
  `role="status"` / `aria-live` — copy success is not announced.
- **[FIX]** `prefers-reduced-motion` is **not** respected. Reveal animation,
  pulse animations, FAQ rotate, and hover transforms all run unconditionally.
- **[FIX]** No visible focus styles beyond a 2px outline on `:focus-visible`;
  the FAQ buttons are full-width and need a clearer focus indicator.
- **[FIX]** Color contrast — `--ink-faint` (`#9a9ba1`) on light-mode
  background (`#fafaf8`) measures ~2.8:1, **failing WCAG AA** for normal text.
  Used on hero meta labels, section numbering, footer text.
- **[FIX]** Heading hierarchy is mostly fine (one `h1`, `h2`s per section,
  `h3`s within), but the contact section uses `<h2>` while it's logically a
  CTA — acceptable but worth verifying.
- **[FIX]** No `lang` attribute issues — `<html lang="en">` is set. ✓
- **[FIX]** Copy-to-clipboard button has no accessible name describing the
  action ("Copy Discord username ziloky").

## 4. Performance issues

- **[FIX]** Five Inter weights loaded (`300;400;500;600;700`); only 400/500/600
  appear used. Trimming saves bytes.
- **[FIX]** No `<link rel="preload">` for fonts — first paint waits on the CSS
  `@font-face` chain.
- **[FIX]** CSS/JS not minified (small impact at this size, but trivial to do).
- **[FIX]** No `theme-color` meta — mobile browser chrome stays default.
- No images at all → no lazy-loading needed yet, but the upcoming OG image
  must be optimized.
- Inline CSS is appropriate for a single-page site of this size — no need to
  externalize critical CSS.

## 5. SEO gaps

- **[FIX]** No Open Graph tags (`og:title`, `og:description`, `og:image`,
  `og:url`, `og:type`). Discord/Slack/Twitter previews fall back to plain URL.
- **[FIX]** No Twitter Card meta.
- **[FIX]** No JSON-LD structured data (Person schema).
- **[FIX]** No `robots.txt`.
- **[FIX]** No `sitemap.xml`.
- **[FIX]** No `<link rel="canonical">`.
- **[FIX]** No `theme-color` meta.
- **[FIX]** No `author` meta.
- **[FIX]** No favicon / apple-touch-icon / web manifest.
- Title is functional (`ziloky, discord architect & bot developer`) but could
  be sharper — **[FIX]**.

## 6. Mobile responsiveness issues

- **[FIX]** At <780px the nav links are hidden entirely with no replacement
  (no hamburger, no alternative jump-to-section affordance). Users on mobile
  can only scroll.
- Hero `clamp()` typography scales sensibly. ✓
- Stats grid collapses 4→2 cols. ✓
- Services grid collapses 2→1 col. ✓
- Contact pill wraps via `flex-wrap`. ✓
- **[FIX]** No tested viewport at 320px (very small phones); padding may be
  tight.

## 7. Broken / dead code

- **[FIX][BUG]** `.service ul li::before` (lines 288–293) declares
  `position: absolute; left: 0; color: var(--ink-faint);` but **never sets
  `content:`**, so the pseudo-element is not generated. The `padding-left: 18px`
  on each `li` reserves space for an invisible bullet. Service feature lists
  currently render with no bullet glyph at all.
- No `console.log` calls.
- No commented-out blocks.
- `<noscript>` not provided (script is non-essential — theme defaults to dark,
  copy-to-clipboard fails silently — acceptable).

## 8. Other observations

- "Coming soon" testimonials placeholder is a dashed box — design-coherent but
  needs to become structurally ready for real data **[FIX]**.
- Featured build (Clicker Evolution) is rich enough to deserve its own page
  **[FIX]**.
- Contact section offers only one channel (Discord) and no qualification
  prompt — invites low-quality inquiries **[FIX]**.
- Footer text "designed in one sitting" is charming and on-brand — keep.

---

## Resolved

Every `[FIX]` item from the audit was addressed during the polish pass.
Mapping below; see `CHANGES.md` for the full per-task narrative.

### SEO (Task 2)

- ✓ Sharper `<title>`, fuller `<meta description>`, added `author` and
  `keywords`, `<link rel="canonical">`.
- ✓ Open Graph (`og:type`/`title`/`description`/`url`/`image`/
  `image:width`/`image:height`/`image:alt`/`locale`/`site_name`) +
  Twitter Card (`summary_large_image`).
- ✓ Generated 1200×630 OG image (SVG source + rendered PNG) matching
  the site aesthetic.
- ✓ JSON-LD Person schema with job title, country, offers, knowsAbout.
- ✓ `robots.txt` with sitemap reference.
- ✓ `sitemap.xml` (homepage + case study).
- ✓ Favicon (SVG + 32px PNG fallback), Apple touch icon (180px), and
  `site.webmanifest`.
- ✓ `theme-color` for both color schemes.

### Accessibility (Task 3)

- ✓ Skip-to-content link.
- ✓ FAQ accordion: WAI-ARIA pattern with button-in-h3,
  `aria-controls`, `aria-labelledby`, `[hidden]`-driven panel state,
  panel promoted from `<div role="region">` to `<section>` (Task 10).
- ✓ FAQ "+" / rotate icon: `aria-hidden`.
- ✓ Theme toggle: `aria-pressed` + dynamic `aria-label`, SVG
  `aria-hidden`/`focusable=false`.
- ✓ Decorative dots and section numbers: `aria-hidden`.
- ✓ Toast: `role="status"` + `aria-live="polite"` + `aria-atomic`.
- ✓ Light-mode contrast: `--ink-faint` `#9a9ba1` → `#6e6f74`,
  `--ink-muted` darkened, `--line` strengthened, `--accent` deepened
  (now WCAG AA across the surfaces audited).
- ✓ Heading hierarchy: still one `h1`, `h2`s per section, FAQ items
  now use `h3` (was previously a button without heading scope).
- ✓ `prefers-reduced-motion` media query disables animations,
  transitions, scroll smoothing, and hover-transform.
- ✓ Focus styles: stronger 3-4–6px offset depending on element class.
- ✓ Copy-to-clipboard accessible name now describes the action and
  the value being copied.

### Performance (Task 4)

- ✓ Inter weights trimmed from 5 to 3 (only 400/500/600 are used).
- ✓ Google Fonts CSS now non-blocking (`rel="preload"` + onload swap +
  `<noscript>` fallback).
- ✓ CSS/JS not minified — see Task 4 commit message for the
  deliberate rationale.
- ✓ `theme-color` meta added.
- ✓ Removed unused `--line-soft` and `--accent-deep` variables.

### Mobile responsiveness

- ✓ 375px viewport verified: no horizontal overflow on any page;
  cards collapse to single column; tap targets remain comfortable.
  (Task 5 + Task 8 added new responsive rules for the new sections.)
- Note: the nav-links group is still hidden under 780px. This was
  already the case pre-polish; given that the homepage is short
  enough to scroll comfortably and the breadcrumb / 404 / case-study
  pages provide their own navigation, a hamburger menu was not added
  in this pass. Worth revisiting if the site grows more pages.

### Broken / dead code

- ✓ `.service ul li::before` missing `content:` value — bullet glyph
  (`›`) restored.
- ✓ `--line-soft` / `--accent-deep` unused vars removed.
- ✓ HTML validation now exits clean (encoded six raw `&` to `&amp;`,
  promoted FAQ panels to `<section>`).

### Plus, beyond the original audit

- Built `/case-studies/clicker-evolution/` and reduced the homepage
  Featured Build block to a teaser linking to it.
- Replaced the dashed-box "COMING SOON" testimonials placeholder with
  a structured JSON-driven section that gracefully shows an empty
  state until real testimonials are added.
- Reworked the Contact section: added a secondary-channels block and
  a five-row "what to include in your first message" checklist.
- Added `/404.html` matching the site aesthetic.
- Extracted the inline `<style>` and `<script>` to
  `/assets/styles.css` and `/assets/site.js`, so the new sub-pages
  share styles/JS without duplication.
- Added `README.md` and `.editorconfig`.
- Subtle scroll-driven reveal animation on six major content blocks,
  driven by a single `IntersectionObserver`, honoring
  `prefers-reduced-motion`.

### Outstanding (non-`[FIX]`) items requiring ziloky's input

- **Email** for the Contact section.
- **Other social handles** (Twitter / X, Bluesky, Telegram, etc.).
- **Quantitative case-study metrics** (member count, raid events,
  mod-hour reduction, uptime). Marked inline as
  `[TODO: confirm with ziloky]`.
- **Real testimonials** (drop into `/data/testimonials.json`).