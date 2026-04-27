# Portfolio Redesign — Design Spec
**Date:** 2026-04-27
**Project:** zil-oky.github.io
**Author:** Ziloky

---

## 1. Overview

Full rebuild of the portfolio from scratch. The current site is functional but generic. The new site should feel like a 2026 design-studio portfolio — confident, minimal, alive. Every page belongs to the same visual system.

**Constraints:**
- Static HTML + CSS + vanilla JS only. No build step, no framework, no bundler.
- Deployable to GitHub Pages as-is.
- No third-party scripts (analytics, cookie banners, chat widgets).
- No em-dashes or hyphen-as-dash in copy. Periods or rephrasing.
- Location: "Sweden" only. Not a city, not a time zone, not a clock.
- The Discord handle @ziloky is the only CTA in the contact section. No form.
- No `prettier --write`.

**Pages to build:**
1. `index.html` — main portfolio
2. `case-studies/clicker-evolution/index.html` — magazine-feature case study
3. `404.html` — matching design, not generic

**Files to carry over or update:**
- `assets/styles.css` — rebuilt from scratch
- `assets/site.js` — rebuilt from scratch
- `assets/favicon.svg` — update mark to match new design
- `assets/og-image.svg` (or `.png`) — new design
- `sitemap.xml` — update
- `site.webmanifest` — update theme colors
- `robots.txt` — keep as-is
- `data/testimonials.json` — keep (testimonials section is removed from the page but the file stays)

---

## 2. Visual System

### 2.1 Color Palette

```
--bg:          #080a0b        /* near-black background */
--bg-card:     #08090c        /* card surfaces */
--bg-hover:    rgba(224,117,53,0.05)  /* card hover fill */

--ink:         #e8e8ea        /* primary text */
--ink-muted:   rgba(255,255,255,0.38) /* secondary text */
--ink-faint:   rgba(255,255,255,0.22) /* labels, mono small */

--line:        rgba(255,255,255,0.07) /* borders, dividers */
--line-hover:  rgba(224,117,53,0.40) /* border on hover/focus */

--accent:      #E07535        /* ember orange — used sparingly */
--accent-soft: rgba(224,117,53,0.10)  /* accent fills */
--accent-glow: rgba(224,117,53,0.28)  /* glow/shadow */

--green:       #4ade80        /* live indicator dot only */
```

Dark theme only. No light-mode toggle on the new site. The existing theme toggle is removed.

### 2.2 Typography

**Display (hero name, section headings, large numbers):**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
font-weight: 900;
```
Renders SF Pro Display on macOS/iOS, Segoe UI Bold on Windows, Inter 900 as web fallback. No font embedding needed for this stack. Used for the hero name, contact heading, and stat numbers.

**Body:**
```css
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400 / 500 / 600;
```
Loaded from Google Fonts (Inter, weights 400 500 600 700 900). Non-blocking: preload + onload pattern.

**Mono:**
```css
font-family: 'JetBrains Mono', monospace;
font-weight: 400 / 500;
```
Used for: nav links, eyebrows, section labels, stat subtitles, FAQ small text, footer. Loaded from Google Fonts alongside Inter.

**Sizing scale:**
```
Hero name:    clamp(88px, 14vw, 154px)   weight 900, ls -0.045em
Section h2:   clamp(32px, 5vw, 52px)     weight 900, ls -0.035em
Stat number:  clamp(42px, 7vw, 54px)     weight 900, ls -0.04em
Contact h:    clamp(44px, 7vw, 64px)     weight 900, ls -0.04em
Card title:   17-18px                     weight 700, ls -0.02em
Body:         15px                        weight 400
Body large:   17px                        weight 400
Mono label:   9-11px                      ls 0.08-0.22em uppercase
```

**Italics:** Avoid entirely. No `font-style: italic` in the design. The only exception is the accent color on certain em-style words in headings (`<em>` used for color treatment, not italic style — set `font-style: normal` on em tags).

### 2.3 Border Radius

```
Container / main preview card:  24px
Section cards (services, FAQ):  20px
Stat cards:                      18px
Contact section:                 20px
Case study card:                 20px
Nav pill:                        100px
CTA buttons:                     100px
Nav logo mark:                   7-8px
Tags / badges:                   100px
```

### 2.4 Shadows and Glows

- Cards: no drop-shadow by default. Only border + hover glow.
- Hover: `box-shadow: 0 0 0 1px var(--line-hover)` on cards.
- CTA active: `box-shadow: 0 10px 40px -6px rgba(224,117,53,0.40)`.
- Text glow on hero name: `text-shadow: 0 0 70px rgba(224,117,53,0.48), 0 0 140px rgba(224,117,53,0.18)` (animated).
- Aurora: two radial-gradient layers, absolutely positioned behind hero name, animated.

### 2.5 Spacing

Max content width: 900px, centered, horizontal padding 32px (20px on mobile).
Section gap: 110px (72px on mobile).
Card gap: 10-12px.
Vertical rhythm inside cards: multiples of 8px.

---

## 3. Pages

### 3.1 index.html — Section Order

1. **Navigation** — floating pill, centered
2. **Hero** — name, tagline, CTA
3. **Numbers** — 4 stat cards, count-up animation
4. **Services** (What I do) — 2x2 grid, rounded cards
5. **Featured Case Study** — single large card, magazine treatment
6. **Track Record** — experience list (timeline-style)
7. **FAQ** — accordion
8. **Contact** — centered CTA section
9. **Footer** — minimal

The testimonials section is removed. The section numbers from the old site (01, 02...) are also removed.

---

## 4. Component Specs

### 4.1 Navigation

Centered floating pill. Floats over the page content; not sticky (no position:fixed). Sits at the top of the page.

Structure:
```
[ Z mark ] [ | ] services  work  faq  contact
```

- Outer container: `display:flex; justify-content:center; padding-top:28px`
- Inner pill: `background: rgba(255,255,255,0.045)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.10)`, `border-radius: 100px`, padding 10px 22px
- Z mark: 22x22px, `background: #E07535`, `border-radius: 7px`, display font weight 900
- Nav links: JetBrains Mono 9.5px, `letter-spacing: 0.07em`, `color: rgba(255,255,255,0.38)`, hover `color: rgba(255,255,255,0.85)`, transition 0.2s
- Separator: 1px x 14px, `rgba(255,255,255,0.10)` between Z mark and links
- Load animation: `fade-up 0.6s ease-out 0.05s both`
- Keyboard: all links are `<a>` tags, focus styles apply

On mobile (<640px): hide nav links, show only the Z mark pill (just the mark and separator removed). Or keep links but reduce gap.

### 4.2 Hero Section

Centered layout. No card wrapper. Background is the page itself with the aurora behind it.

**Eyebrow** (above name):
- Text: "Sweden · Discord Architect · Bot Developer"
- JetBrains Mono, 9px, `letter-spacing: 0.22em`, uppercase, `color: rgba(255,255,255,0.27)`
- `animation: fade-up 0.6s ease-out 0.15s both`

**Hero name:**
- Text: "ZILOKY"
- `font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif`
- `font-weight: 900`, `font-size: clamp(88px, 14vw, 154px)`, `letter-spacing: -0.045em`, `line-height: 0.87`
- Color: `#fff`
- Animations: `fade-up 0.7s ease-out 0.25s both, name-breathe 5s ease-in-out 1.2s infinite`
- `name-breathe`: oscillates text-shadow between base glow and peak glow over 5s

**Lede:**
- Text: "I build the servers that run themselves. Architecture, custom bots, communities built to scale." (short, punchy, human)
- Inter 15px, `color: rgba(255,255,255,0.36)`, `max-width: 400px`, centered
- `animation: fade-up 0.6s ease-out 0.35s both`

**CTA pill:**
- Text: "@ziloky on Discord" with a green live dot
- `background: #E07535`, `color: #fff`, `border-radius: 100px`, padding 13px 28px
- JetBrains Mono 11px, `letter-spacing: 0.07em`
- Animations: `fade-up 0.6s ease-out 0.45s both, cta-pulse 3.5s ease-in-out 1.8s infinite`
- `cta-pulse`: expanding ring (box-shadow 0 to 10px and fade to transparent)
- Hover: magnetic effect (JS — see 5.3)
- Click: copies "@ziloky" to clipboard, shows toast "Copied to clipboard"
- Live dot: 6px circle, `#4ade80`, blinks slowly with CSS animation
- ARIA: `aria-label="Copy Discord username @ziloky to clipboard"`, `role="button"` or `<button>`

**Aurora / glow:**
- Two absolutely positioned divs behind the hero content (z-index 0)
- `.glow-core`: 560px x 340px elliptical radial gradient (ember orange), `animation: aurora 7s ease-in-out infinite`
- `.glow-halo`: 800px x 500px softer layer, `animation: aurora 11s ease-in-out infinite reverse`
- `aurora` keyframes: translate and scale drift, opacity oscillation (0.72 to 1.0)
- Both `pointer-events: none`

### 4.3 Numbers Section

4 stat cards in a CSS grid (4 columns desktop, 2 columns mobile).

Each card:
- `background: rgba(255,255,255,0.028)`, `border: 1px solid rgba(255,255,255,0.07)`, `border-radius: 18px`
- Padding 22px 14px 18px, text-align center
- Hover: `border-color: rgba(224,117,53,0.4)`, `background: rgba(224,117,53,0.05)`, `transform: translateY(-2px)`

Number display:
- Value: display font stack weight 900, `font-size: clamp(42px, 7vw, 54px)`, `letter-spacing: -0.04em`, `color: #fff`
- Suffix (k, +, yr): `color: #E07535`, `font-size: 60%`, `font-style: normal`
- Label: JetBrains Mono 8.5px, `letter-spacing: 0.12em`, uppercase, `rgba(255,255,255,0.26)`

Count-up animation: triggered when section enters viewport (IntersectionObserver, threshold 0.3). Numbers count up over 1.8s with easeOutQuad. Suffixes are appended as static strings, not animated. Only fires once.

Stats:
- 50+ Servers built
- 79k Largest community
- 10+ Bots deployed
- 3yr Experience

### 4.4 Services Section

Section heading: display font stack weight 900, clamp(32px, 5vw, 52px), with section label in JetBrains Mono above it.

2x2 grid of cards (1 column on mobile). Gap: 10px.

Each card:
- `background: #08090c`, `border: 1.5px solid rgba(255,255,255,0.07)`, `border-radius: 20px`, padding 28px 26px
- Hover: `border-color: rgba(224,117,53,0.42)`, `transform: translateY(-2px)`, transition 0.25s
- Tag: JetBrains Mono 9px, `color: #E07535`, uppercase, `letter-spacing: 0.10em`
- Title: display font or Inter 700, 17-18px, `letter-spacing: -0.02em`, `color: #e8e8ea`
- Description: Inter 13px, `color: rgba(255,255,255,0.36)`, line-height 1.6

**No bullet lists.** Each service gets tag + title + 2-3 sentence description. Clean and scannable.

The four services and copy (human voice, preserved from existing site):
1. **Server Architecture** — "Full server buildouts" — From empty server to production-ready community. Built to scale cleanly without becoming a permissions mess six months later.
2. **Bot Development** — "Custom moderation bots" — Not off-the-shelf configs. Node.js code written for your server. Tiered punishment, automod, persistent tempbans.
3. **Bot Configuration** — "Third-party bot setup" — Dyno, Carl-bot, Ticket Tool, Sapphire. Configured properly the first time, not reverse-engineered after the fact.
4. **Server Rescue** — "Redesigns and fixes" — Inherited a messy server? Permissions held together with duct tape. I audit, restructure, and hand it back clean.

### 4.5 Featured Case Study (Homepage Card)

A single large card that links to `/case-studies/clicker-evolution/`. Treated as a magazine feature, not a project tile.

Card structure:
- Full width, `border-radius: 20px`, `border: 1.5px solid rgba(255,255,255,0.07)`
- Header bar: "CASE STUDY" badge in ember + "Clicker Evolution" in mono, separated
- Body: large project title in display font (24-28px), feature description paragraph, "Read the case study →" link in ember mono
- Hover: border becomes ember, arrow shifts right 4px

This is a link (`<a>`) wrapping the whole card. Keyboard accessible.

### 4.6 Track Record

Timeline-style list. No timeline line — just a label + content layout.

Four entries:
1. **~3 years** — Head Moderator, ~79,000 member community. Managed staff teams, handled raid events, maintained server structure at scale. Built workflows that prevented problems instead of reacting to them.
2. **Ongoing** — Server Builder, 50+ servers from scratch. Gaming, community, dev servers. Channel structures and role hierarchies that scale from launch through growth.
3. **Ongoing** — Bot Developer. Custom bots with 25+ commands, automod, anti-raid, tempban persistence. Also configured Dyno, Carl-bot, Sapphire, Ticket Tool across dozens of servers.
4. **Philosophy** — Stability over strictness. Systems that prevent problems over moderation that punishes them.

Layout: each entry is a horizontal row. Left: year/label in JetBrains Mono 12px faint. Right: `<h4>` title + `<p>` body. Separated by a top border line. Stacks to single column on mobile.

Highlight color (ember) is used on the key facts in each `<h4>` (e.g., "~79,000 member community" in the title).

### 4.7 FAQ

Accordion. Each item: question as a `<button>` (full width), answer in a collapsible `<div>`.

- 6 questions (existing content, preserved as-is — already human-written)
- Dividers: `border-top: 1px solid rgba(255,255,255,0.07)` between items
- Question: Inter 16px weight 500, left-aligned, "+" icon right-aligned
- "+" rotates to "×" when open: `transform: rotate(45deg)`
- Answer: Inter 14px, `color: rgba(255,255,255,0.40)`, `line-height: 1.7`, max-width 640px
- Open/close animation: height transition with JS (set max-height on open, 0 on close), plus `opacity` fade
- ARIA: `aria-expanded`, `aria-controls` on button; `id` on answer panel
- Keyboard: Enter/Space to toggle, Tab navigation between questions

Questions (keep existing copy — no AI rewrite):
1. How much do you charge?
2. Do you accept Robux or PayPal?
3. Will I own the code after delivery?
4. Can you fix or redesign an existing server?
5. Do you offer ongoing support after delivery?
6. Do you host bots for clients?

### 4.8 Contact Section

Centered section. No card border. Warm bottom-glow effect.

- Background: the page bg with a `radial-gradient(ellipse 55% 65% at 50% 100%, rgba(224,117,53,0.10), transparent 70%)` positioned at the bottom
- Section label: JetBrains Mono 9px, uppercase, `letter-spacing: 0.20em`, faint
- Heading: "Ready to build something?" in display font, `clamp(44px, 7vw, 64px)`, weight 900, `letter-spacing: -0.04em`. The word "build" is in ember (`color: #E07535`, `font-style: normal`)
- Body text: "Server buildouts, custom bots, redesigns, and rescue jobs. Taking new projects, reach out to discuss scope and pricing." — 15px, muted
- CTA: the Discord pill

**Discord CTA pill:**
- `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.12)`, `border-radius: 100px`
- Structure: green dot + "Discord: @ziloky" (`strong` for the handle)
- Hover: `border-color: rgba(224,117,53,0.5)`, `background: rgba(224,117,53,0.06)`
- Hover: magnetic effect (JS — the element follows cursor within ~60px, max displacement ~8px)
- Click: copies "@ziloky" to clipboard. Pill shows "Copied." for 2s then resets.
- Toast: bottom-center fixed toast, Inter 13px, same behavior as current site
- ARIA: button with `aria-label="Copy @ziloky to clipboard"`

### 4.9 Footer

Minimal. Two lines in JetBrains Mono 11px, `color: rgba(255,255,255,0.22)`:
- Left: "© 2026 ziloky"
- Right: "discord server builder. bot developer."
- `display: flex; justify-content: space-between`
- `border-top: 1px solid rgba(255,255,255,0.07)`, margin-top 80px, padding-top 28px
- On mobile: stack vertically, gap 8px

---

## 5. Animation System

### 5.1 Load Reveals (index.html)

Staggered fade-up on page load, CSS animation. Each element:
```css
animation: fade-up Xs ease-out Ys both;
```
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Stagger sequence (delay in seconds):
- Nav pill: 0.05s
- Eyebrow: 0.15s
- Hero name: 0.25s
- Hero lede: 0.35s
- Hero CTA: 0.45s
- Numbers grid: 0.55s (whole grid, not per-card)

### 5.2 Scroll Reveals

All sections below the hero use IntersectionObserver. When section root enters viewport (threshold 0.15), add `.is-visible` class which transitions:
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
```

Applies to: each section (services, case study, track record, FAQ, contact). Not staggered per-item for simplicity (whole section reveals as unit).

### 5.3 Magnetic CTA (Discord pill)

On the contact Discord pill:
- `mousemove` within the element's bounding rect + 60px padding
- Compute cursor offset from element center
- Apply `transform: translate(dx, dy)` where dx/dy are dampened (factor 0.25) and clamped to ±8px
- `mouseleave`: reset to `transform: translate(0, 0)` with a short transition (0.4s ease-out)

Magnetic effect also applies to the hero CTA button.

### 5.4 Count-up Numbers

Triggered once when the numbers section enters viewport. JS animation loop using `requestAnimationFrame`:
- Duration: 1800ms, easing: easeOutQuad
- Each number animates from 0 to its target (50, 79, 10, 3)
- Suffix (k, +, yr) is always visible — not animated
- `Math.ceil` or `Math.round` for integer display

### 5.5 Aurora Glow

CSS keyframes on two absolutely positioned div layers behind the hero name. Drifts slowly with translate + scale changes. Period: 7s and 11s respectively (prime numbers = no visual sync). `animation-timing-function: ease-in-out`.

### 5.6 Name Glow Breathing

CSS keyframe on the hero name `text-shadow`. Period: 5s ease-in-out. Goes from base glow to ~40% more intense and back.

### 5.7 CTA Pulsing Ring

CSS keyframe on the hero CTA `box-shadow`. An expanding ring fades out from the button edge. Period: 3.5s, starts after 1.8s load delay.

### 5.8 prefers-reduced-motion

All animation and transition durations set to 0.001ms:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```
JS count-up: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — if true, skip the animation and set final values immediately.
JS magnetic: same check — if true, skip the effect entirely.

---

## 6. Case Study Page — Clicker Evolution

URL: `/case-studies/clicker-evolution/`

### Structure

Full-page magazine-feature treatment. Sections:

**Header:**
- Breadcrumb: `Portfolio → Case Studies → Clicker Evolution`
- Project tag: "CASE STUDY" in ember mono
- Title: "Clicker Evolution" in display font, large (clamp 48-80px)
- Subtitle: "A moderation bot built from scratch in Node.js" — body size, muted
- Meta row: client, role, stack (JetBrains Mono table-style)

**The Problem:**
- 1-2 paragraph lede, editorial style
- "The server needed moderation that didn't rely on manual action."

**What Was Built:**
- Feature summary: 25+ commands, dual slash/prefix support
- Key capabilities described in prose (not bullet list): tiered auto-punishment, persistent tempbans, automod with burst-spam detection, split logging

**Technical Highlights (feature grid):**
- A 2-3 column grid of feature cards (rounded 16px)
- Each: feature name (ember mono), short description
- Features: Tiered auto-punishment (3→15 warns), Persistent tempbans (survive restarts), Burst-spam detection, Split logging by purpose, Dual slash + prefix support

**The Result / Outcome:**
- Short paragraph on what improved
- No metrics invented — honest, human

**Navigation:**
- Back link to portfolio at top and bottom
- Same nav pill as homepage

### Styles

The case study page shares `assets/styles.css`. Page-specific styles in a `<style>` block in the `<head>`.

The prose section uses:
- `max-width: 640px; margin: 0 auto` for readability
- Inter 16px, line-height 1.75
- `color: rgba(255,255,255,0.75)` (slightly brighter than homepage body to aid reading)
- Section subheadings: display font 22-28px weight 900

No scrollspy, no table of contents. Single flow read.

---

## 7. 404 Page

Simple, centered, matching design. Same nav and footer as homepage.

Content:
- Large "404" in display font (ember `#E07535`)
- Heading: "Page not found."
- Body: "That URL doesn't exist. Head back to the portfolio."
- CTA: pill link to homepage — "Back to portfolio"
- No illustrations, no humor, no emoji

---

## 8. SEO, Performance, Accessibility

### 8.1 SEO

All three pages carry full `<head>` metadata:
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Open Graph: type, url, title, description, image, image:alt, locale
- Twitter Card: summary_large_image, title, description, image
- Structured data (JSON-LD): Person schema on index, Article schema on case study
- `<meta name="author" content="Ziloky">`

OG image: `assets/og-image.png` (1200x630). Rebuild as SVG-generated PNG matching new design (ember background accent, ZILOKY name, short tagline). Size under 150kb.

### 8.2 Sitemap and Robots

`sitemap.xml`: update `<lastmod>` dates. Include all three pages.
`robots.txt`: keep current (allow all).

### 8.3 Web Manifest

`site.webmanifest`: update `theme_color` to `#080a0b`, `background_color` to `#080a0b`.

### 8.4 Favicons

Keep `assets/favicon.svg` (update icon mark to match new Z mark style — square with rounded 7px corners, ember fill). Keep PNG fallbacks.

### 8.5 Font Loading

Non-blocking font strategy:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="[google-fonts-url]"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="[google-fonts-url]"></noscript>
```

Load: `Inter:wght@400;500;600;700;900` and `JetBrains+Mono:wght@400;500` in a single request. No Instrument Serif.

### 8.6 Script Loading

All JS in a single `assets/site.js`, loaded with `defer` in the `<body>` before `</body>`. No inline scripts except the `no-js` removal snippet in `<head>`.

### 8.7 Accessibility

- Skip link: `<a class="skip-link" href="#main">Skip to content</a>` — visually hidden, reveals on focus
- Landmark roles: `<nav>`, `<main id="main">`, `<footer>`
- All interactive elements are either `<a>` or `<button>` — no div-as-button
- Focus styles: `outline: 2px solid #E07535; outline-offset: 3px; border-radius: 3px` on `:focus-visible`
- FAQ accordion: `aria-expanded`, `aria-controls`, `id` pairing
- Discord CTA: `aria-label="Copy Discord username @ziloky to clipboard"`
- Color contrast: `#E07535` on `#080a0b` = 4.55:1 (passes AA). Primary text `#e8e8ea` on `#080a0b` = 15:1. ✓
- Smooth scroll: `scroll-behavior: smooth` on `html`, overridden by `prefers-reduced-motion`
- `<html lang="en">` on all pages
- Images/SVGs: `aria-hidden="true"` on decorative, `alt` on meaningful

---

## 9. Copy Rules

- No em-dashes. No hyphen as dash. Use periods or rephrase.
- No italics used for emphasis — upright text only. `<em>` can be used but with `font-style: normal` and `color: #E07535` for a word that needs highlighting.
- Location: "Sweden" only. Never "Stockholm," never a time zone, never a live clock.
- Contact: "@ziloky on Discord" is the only CTA. No email, no form.
- Voice: direct, confident, human. The existing copy on the current site is good — preserve it with minimal edits. Do not rewrite in a way that sounds polished/corporate/AI. Short sentences. No hedging language.

---

## 10. File Structure After Build

```
zil-oky.github.io/
├── index.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── site.webmanifest
├── .gitignore
├── assets/
│   ├── styles.css
│   ├── site.js
│   ├── favicon.svg
│   ├── favicon-32.png        (keep existing)
│   ├── apple-touch-icon.png  (keep existing)
│   └── og-image.png          (rebuild)
├── case-studies/
│   └── clicker-evolution/
│       └── index.html
├── data/
│   └── testimonials.json     (keep, unused in new design)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-27-portfolio-redesign-design.md
```

---

## 11. Implementation Order

Build and commit one logical unit at a time:

1. Design tokens + base styles (CSS custom properties, reset, typography, utilities)
2. Nav component
3. Hero section (aurora, name, lede, CTA)
4. Numbers section (stat cards, count-up JS stub)
5. Services section
6. Case study card (homepage version)
7. Track record section
8. FAQ section (accordion JS)
9. Contact section (magnetic CTA JS)
10. Footer
11. JS (site.js: theme removed, count-up, magnetic, scroll reveal, clipboard, FAQ)
12. Case study page (full magazine layout)
13. 404 page
14. SEO: all meta tags, structured data, OG image, sitemap update, manifest
15. Accessibility pass: skip link, ARIA, focus styles, reduced-motion
16. Playwright verification pass
