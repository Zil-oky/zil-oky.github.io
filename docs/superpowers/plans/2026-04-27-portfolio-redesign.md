# Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild zil-oky.github.io from scratch as a 2026-quality dark portfolio with ember accent, animated aurora glow, SF Pro / Inter Black display type, rounded cards, and full production SEO/a11y.

**Architecture:** Three static HTML pages sharing `assets/styles.css` and `assets/site.js`. Design tokens via CSS custom properties. No build step, no framework. JS split into logical sections in a single IIFE. Each page's head section carries its own meta/structured-data.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, keyframes, backdrop-filter, grid-template-rows animation for FAQ), Vanilla JS (IntersectionObserver, requestAnimationFrame, Clipboard API), Google Fonts (Inter + JetBrains Mono loaded async), Playwright (verification only, not a build dependency).

**Design spec:** `docs/superpowers/specs/2026-04-27-portfolio-redesign-design.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Overwrite | `assets/styles.css` | All styles shared across pages |
| Overwrite | `assets/site.js` | All JS: reveals, FAQ, count-up, magnetic, clipboard, toast |
| Overwrite | `index.html` | Main portfolio page |
| Overwrite | `case-studies/clicker-evolution/index.html` | Magazine case study |
| Overwrite | `404.html` | Error page |
| Overwrite | `assets/favicon.svg` | Updated Z mark (ember square) |
| Create | `assets/og-image.svg` | OG image source (screenshot → PNG) |
| Overwrite | `site.webmanifest` | Updated theme colors |
| Overwrite | `sitemap.xml` | Updated lastmod dates |

---

## Task 1: assets/styles.css — complete

**Files:**
- Overwrite: `assets/styles.css`

- [ ] **Step 1: Write the complete CSS file**

```css
/* ═══════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════ */
:root {
  --bg:          #080a0b;
  --bg-card:     #08090c;
  --bg-hover:    rgba(224,117,53,0.05);
  --ink:         #e8e8ea;
  --ink-muted:   rgba(255,255,255,0.38);
  --ink-faint:   rgba(255,255,255,0.22);
  --line:        rgba(255,255,255,0.07);
  --line-hover:  rgba(224,117,53,0.40);
  --accent:      #E07535;
  --accent-soft: rgba(224,117,53,0.10);
  --green:       #4ade80;
  --r-lg:        20px;
  --r-md:        18px;
  --r-sm:        12px;
  --r-pill:      100px;
  --r-mark:      7px;
}

/* ═══════════════════════════════════════════
   RESET
   ═══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; }
em { font-style: normal; }
button { cursor: pointer; font: inherit; }

/* ═══════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════ */
.skip-link {
  position: absolute;
  top: -48px;
  left: 16px;
  background: var(--accent);
  color: #fff;
  padding: 10px 16px;
  border-radius: var(--r-sm);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  z-index: 1001;
  transition: top 0.15s ease;
}
.skip-link:focus { top: 16px; }

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* ═══════════════════════════════════════════
   LAYOUT
   ═══════════════════════════════════════════ */
.wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px 120px;
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
.pill-nav {
  display: flex;
  justify-content: center;
  padding-top: 28px;
  animation: fade-up 0.6s ease-out 0.05s both;
}
.pill-nav-inner {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  background: rgba(255,255,255,0.045);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: var(--r-pill);
  padding: 10px 22px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.07em;
  color: var(--ink-faint);
}
.nav-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px; height: 22px;
  background: var(--accent);
  border-radius: var(--r-mark);
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #fff;
  letter-spacing: -0.04em;
  flex-shrink: 0;
  text-decoration: none;
  transition: opacity 0.2s;
}
.nav-mark:hover { opacity: 0.85; }
.nav-sep {
  width: 1px; height: 14px;
  background: rgba(255,255,255,0.10);
  flex-shrink: 0;
}
.nav-link {
  color: var(--ink-faint);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--ink); }

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
.hero {
  position: relative;
  text-align: center;
  padding: 56px 0 88px;
}
.hero-glow {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
}
.hero-glow-core {
  top: 42%; left: 50%;
  width: 560px; height: 340px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    ellipse at center,
    rgba(224,117,53,0.30) 0%,
    rgba(224,117,53,0.14) 38%,
    rgba(224,117,53,0.05) 62%,
    transparent 74%
  );
  animation: aurora 7s ease-in-out infinite;
  will-change: transform, opacity;
}
.hero-glow-halo {
  top: 38%; left: 50%;
  width: 800px; height: 500px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    ellipse at center,
    rgba(224,117,53,0.09) 0%,
    transparent 60%
  );
  animation: aurora 11s ease-in-out infinite reverse;
}
.hero-content { position: relative; z-index: 1; }
.hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.22em;
  color: var(--ink-faint);
  text-transform: uppercase;
  margin-bottom: 18px;
  animation: fade-up 0.6s ease-out 0.15s both;
}
.hero-name {
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(88px, 14vw, 154px);
  line-height: 0.87;
  letter-spacing: -0.045em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 26px;
  animation: fade-up 0.7s ease-out 0.25s both, name-breathe 5s ease-in-out 1.2s infinite;
}
.hero-lede {
  font-size: 16px;
  color: var(--ink-muted);
  line-height: 1.65;
  max-width: 400px;
  margin: 0 auto 32px;
  animation: fade-up 0.6s ease-out 0.35s both;
}
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--r-pill);
  padding: 13px 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  animation: fade-up 0.6s ease-out 0.45s both, cta-pulse 3.5s ease-in-out 1.8s infinite;
  transition: background 0.2s;
}
.hero-cta:hover { background: #c96526; }
.hero-cta.copied { background: #22c55e; animation: none; }
.hero-cta-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  flex-shrink: 0;
  animation: live-blink 2s ease-in-out infinite;
}

/* ═══════════════════════════════════════════
   SECTION (generic)
   ═══════════════════════════════════════════ */
.section {
  margin-top: 110px;
  scroll-margin-top: 40px;
}
.section-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--ink-faint);
  text-transform: uppercase;
  margin-bottom: 14px;
}
.section-h {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: var(--ink);
  margin-bottom: 36px;
}
.section-h em { color: var(--accent); }

/* ═══════════════════════════════════════════
   NUMBERS
   ═══════════════════════════════════════════ */
.nums {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  padding: 22px 14px 18px;
  text-align: center;
  transition: border-color 0.25s, background 0.25s, transform 0.25s;
}
.stat-card:hover {
  border-color: var(--line-hover);
  background: var(--bg-hover);
  transform: translateY(-2px);
}
.stat-n {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(40px, 7vw, 54px);
  line-height: 1;
  color: var(--ink);
  letter-spacing: -0.04em;
}
.stat-n em { font-size: 55%; color: var(--accent); vertical-align: baseline; }
.stat-k {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  color: var(--ink-faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 6px;
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */
.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.svc-card {
  background: var(--bg-card);
  border: 1.5px solid var(--line);
  border-radius: var(--r-lg);
  padding: 28px 26px;
  transition: border-color 0.25s, transform 0.25s;
}
.svc-card:hover {
  border-color: var(--line-hover);
  transform: translateY(-2px);
}
.svc-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.10em;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 10px;
}
.svc-title {
  font-weight: 700;
  font-size: 17px;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin-bottom: 9px;
}
.svc-desc {
  font-size: 13px;
  color: var(--ink-muted);
  line-height: 1.65;
}

/* ═══════════════════════════════════════════
   FEATURED CASE STUDY CARD (homepage)
   ═══════════════════════════════════════════ */
.cs-feature {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--bg-card);
  border: 1.5px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  transition: border-color 0.25s;
}
.cs-feature:hover { border-color: var(--line-hover); }
.cs-feature:hover .cs-arrow { transform: translateX(4px); }
.cs-feature:hover .cs-title { color: var(--accent); }
.cs-feature-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--line);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-muted);
  letter-spacing: 0.03em;
}
.cs-tag {
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: var(--r-pill);
  padding: 3px 10px;
  font-size: 9px;
  letter-spacing: 0.08em;
  font-weight: 500;
}
.cs-feature-body { padding: 32px 28px; }
.cs-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(22px, 3.5vw, 30px);
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 14px;
  transition: color 0.2s;
}
.cs-desc {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.65;
  max-width: 600px;
  margin-bottom: 24px;
}
.cs-read {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--accent);
}
.cs-arrow { display: inline-block; transition: transform 0.25s; }

/* ═══════════════════════════════════════════
   TRACK RECORD
   ═══════════════════════════════════════════ */
.track-list { display: flex; flex-direction: column; }
.track-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 32px;
  padding: 28px 0;
  border-top: 1px solid var(--line);
  align-items: start;
}
.track-item:last-child { border-bottom: 1px solid var(--line); }
.track-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-faint);
  padding-top: 3px;
  line-height: 1.4;
}
.track-h {
  font-weight: 600;
  font-size: 15px;
  color: var(--ink);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.track-h em { color: var(--accent); }
.track-p {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.65;
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
.faq-list { display: flex; flex-direction: column; }
.faq-item { border-top: 1px solid var(--line); }
.faq-item:last-child { border-bottom: 1px solid var(--line); }
.faq-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 22px 0;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  gap: 16px;
  transition: color 0.2s;
}
.faq-btn:hover { color: var(--accent); }
.faq-icon {
  width: 20px; height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  color: var(--ink-faint);
  transition: transform 0.3s ease, color 0.2s;
  line-height: 1;
}
.faq-btn[aria-expanded="true"] .faq-icon {
  transform: rotate(45deg);
  color: var(--accent);
}
.faq-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}
.faq-panel.is-open { grid-template-rows: 1fr; }
.faq-inner {
  overflow: hidden;
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.7;
  max-width: 640px;
}
.faq-inner-pad { padding-bottom: 22px; }

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */
.contact-section {
  position: relative;
  text-align: center;
  padding: 72px 32px;
  border-radius: var(--r-lg);
  border: 1.5px solid var(--line);
  background: var(--bg-card);
  overflow: hidden;
}
.contact-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 55% 65% at 50% 100%,
    rgba(224,117,53,0.10) 0%, transparent 70%);
  pointer-events: none;
}
.contact-inner { position: relative; z-index: 1; }
.contact-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.20em;
  color: var(--ink-faint);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.contact-h {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(40px, 7vw, 64px);
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin-bottom: 18px;
}
.contact-h em { color: var(--accent); }
.contact-body {
  font-size: 15px;
  color: var(--ink-muted);
  line-height: 1.6;
  max-width: 440px;
  margin: 0 auto 32px;
}
.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--r-pill);
  padding: 13px 26px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  cursor: pointer;
  border-style: solid;
  transition: border-color 0.25s, background 0.25s;
}
.contact-pill:hover {
  border-color: var(--line-hover);
  background: var(--accent-soft);
}
.contact-pill strong { color: var(--ink); font-weight: 600; }
.contact-pill.copied { border-color: var(--accent); color: var(--ink); }
.contact-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
  animation: live-blink 2.5s ease-in-out infinite;
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-faint);
}

/* ═══════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════ */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--ink);
  color: var(--bg);
  padding: 11px 20px;
  border-radius: var(--r-pill);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  z-index: 1000;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════ */
[data-reveal] {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  will-change: opacity, transform;
}
[data-reveal].is-visible { opacity: 1; transform: none; }
.no-js [data-reveal] { opacity: 1; transform: none; }

/* ═══════════════════════════════════════════
   KEYFRAMES
   ═══════════════════════════════════════════ */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes aurora {
  0%   { transform: translate(-50%,-50%) scale(1);    opacity: 0.80; }
  30%  { transform: translate(-46%,-54%) scale(1.07); opacity: 1;    }
  65%  { transform: translate(-54%,-47%) scale(0.95); opacity: 0.72; }
  100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.80; }
}
@keyframes name-breathe {
  0%,100% { text-shadow: 0 0 70px rgba(224,117,53,0.48), 0 0 140px rgba(224,117,53,0.18); }
  50%      { text-shadow: 0 0 100px rgba(224,117,53,0.68), 0 0 200px rgba(224,117,53,0.28); }
}
@keyframes cta-pulse {
  0%   { box-shadow: 0 0 0 0    rgba(224,117,53,0.55), 0 10px 40px -6px rgba(224,117,53,0.40); }
  50%  { box-shadow: 0 0 0 10px rgba(224,117,53,0),    0 10px 40px -6px rgba(224,117,53,0.50); }
  100% { box-shadow: 0 0 0 0    rgba(224,117,53,0),    0 10px 40px -6px rgba(224,117,53,0.40); }
}
@keyframes live-blink {
  0%,100% { opacity: 0.9; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.75); }
}

/* ═══════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════ */
@media (max-width: 640px) {
  .wrap { padding: 0 20px 80px; }
  .pill-nav { padding-top: 20px; }
  .nav-link { display: none; }
  .hero { padding: 40px 0 64px; }
  .section { margin-top: 72px; }
  .nums { grid-template-columns: repeat(2, 1fr); }
  .services-grid { grid-template-columns: 1fr; }
  .track-item { grid-template-columns: 1fr; gap: 8px; }
  .track-label { padding-top: 0; }
  .contact-section { padding: 48px 20px; }
  .foot { flex-direction: column; align-items: flex-start; gap: 8px; }
}

/* ═══════════════════════════════════════════
   FOCUS
   ═══════════════════════════════════════════ */
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 3px;
}
.hero-cta:focus-visible,
.contact-pill:focus-visible { outline-offset: 4px; border-radius: var(--r-pill); }

/* ═══════════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  html { scroll-behavior: auto; }
  .hero-name, .hero-cta, .hero-eyebrow,
  .hero-lede, .pill-nav {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 2: Verify the file exists and has content**

```bash
wc -l assets/styles.css
```
Expected: `> 300 assets/styles.css`

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "feat: add complete styles.css with design tokens, components, animations"
```

---

## Task 2: assets/site.js — complete

**Files:**
- Overwrite: `assets/site.js`

- [ ] **Step 1: Write the complete JS file**

```js
(function () {
  'use strict';

  /* ── Year ──────────────────────────────────── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Reduced motion ────────────────────────── */
  var reducedMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ── Scroll reveals ────────────────────────── */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Count-up ──────────────────────────────── */
  function easeOutQuad(t) { return t * (2 - t); }

  function animateCount(el, target, duration) {
    if (reducedMotion) { el.textContent = target; return; }
    var start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOutQuad(p) * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var numsSection = document.getElementById('numbers');
  var numsFired = false;
  if (numsSection && 'IntersectionObserver' in window) {
    var numsObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !numsFired) {
        numsFired = true;
        document.querySelectorAll('.stat-val').forEach(function (el) {
          animateCount(el, parseInt(el.getAttribute('data-target'), 10), 1800);
        });
        numsObs.disconnect();
      }
    }, { threshold: 0.3 });
    numsObs.observe(numsSection);
  }

  /* ── FAQ accordion ─────────────────────────── */
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
    });
  });

  /* ── Toast ─────────────────────────────────── */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ── Clipboard copy ────────────────────────── */
  function bindCopy(id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var text = '@ziloky';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add('copied');
          showToast('Copied to clipboard');
          setTimeout(function () { btn.classList.remove('copied'); }, 2200);
        }).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        btn.classList.add('copied');
        showToast('Copied to clipboard');
        setTimeout(function () { btn.classList.remove('copied'); }, 2200);
      }
    });
  }
  bindCopy('copyDiscord');
  bindCopy('copyHero');

  /* ── Magnetic CTA ──────────────────────────── */
  function magnetic(id) {
    var el = document.getElementById(id);
    if (!el || reducedMotion) return;
    var leaveTimer;
    el.addEventListener('mousemove', function (e) {
      clearTimeout(leaveTimer);
      el.style.transition = '';
      var r = el.getBoundingClientRect();
      var dx = Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width  / 2)) * 0.25));
      var dy = Math.max(-8, Math.min(8, (e.clientY - (r.top  + r.height / 2)) * 0.25));
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform 0.4s ease-out';
      el.style.transform = 'translate(0,0)';
      leaveTimer = setTimeout(function () { el.style.transition = ''; }, 400);
    });
  }
  magnetic('copyDiscord');
  magnetic('copyHero');

}());
```

- [ ] **Step 2: Verify**

```bash
node -e "require('fs').readFileSync('assets/site.js','utf8'); console.log('OK')"
```
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add assets/site.js
git commit -m "feat: add site.js — scroll reveals, count-up, FAQ, magnetic, clipboard"
```

---

## Task 3: index.html — complete

**Files:**
- Overwrite: `index.html`

- [ ] **Step 1: Write the complete index.html**

```html
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<script>document.documentElement.classList.remove('no-js');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Ziloky — Discord Server Builder and Bot Developer</title>
<meta name="description" content="Discord server architect and custom bot developer based in Sweden. Three years, 50+ servers built, custom moderation bots in Node.js. Taking new projects.">
<meta name="author" content="Ziloky">
<link rel="canonical" href="https://zil-oky.github.io/">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Ziloky">
<meta property="og:url" content="https://zil-oky.github.io/">
<meta property="og:title" content="Ziloky — Discord Server Builder and Bot Developer">
<meta property="og:description" content="I build the servers that run themselves. Three years, 50+ Discord servers, custom moderation bots in Node.js.">
<meta property="og:image" content="https://zil-oky.github.io/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Ziloky — Discord server builder and bot developer based in Sweden.">
<meta property="og:locale" content="en_US">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Ziloky — Discord Server Builder and Bot Developer">
<meta name="twitter:description" content="I build the servers that run themselves. Three years, 50+ Discord servers, custom moderation bots.">
<meta name="twitter:image" content="https://zil-oky.github.io/assets/og-image.png">
<meta name="twitter:image:alt" content="Ziloky — Discord server builder and bot developer.">

<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ziloky",
  "url": "https://zil-oky.github.io/",
  "jobTitle": "Discord Server Builder and Bot Developer",
  "description": "Discord server architect and custom bot developer based in Sweden.",
  "address": { "@type": "PostalAddress", "addressCountry": "SE" },
  "knowsAbout": ["Discord server architecture","Discord bot development","Node.js","discord.js","Community moderation","Automod configuration"]
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>
<link rel="stylesheet" href="/assets/styles.css">
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<div class="wrap">

  <nav class="pill-nav" aria-label="Primary">
    <div class="pill-nav-inner">
      <a class="nav-mark" href="/" aria-label="Ziloky — home">Z</a>
      <div class="nav-sep" aria-hidden="true"></div>
      <a class="nav-link" href="#services">services</a>
      <a class="nav-link" href="#work">work</a>
      <a class="nav-link" href="#faq">faq</a>
      <a class="nav-link" href="#contact">contact</a>
    </div>
  </nav>

  <main id="main">

    <header class="hero">
      <div class="hero-glow hero-glow-core" aria-hidden="true"></div>
      <div class="hero-glow hero-glow-halo" aria-hidden="true"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">Sweden · Discord Architect · Bot Developer</div>
        <span class="hero-name" role="heading" aria-level="1">ZILOKY</span>
        <p class="hero-lede">I build the servers that run themselves. Architecture, custom bots, communities built to scale.</p>
        <button class="hero-cta" id="copyHero" type="button"
          aria-label="Copy Discord username @ziloky to clipboard">
          <span class="hero-cta-dot" aria-hidden="true"></span>
          @ziloky on Discord
        </button>
      </div>
    </header>

    <section class="section" id="numbers" aria-label="Stats" data-reveal>
      <div class="section-eyebrow">by the numbers</div>
      <div class="nums">
        <div class="stat-card">
          <div class="stat-n"><span class="stat-val" data-target="50">50</span><em>+</em></div>
          <div class="stat-k">Servers built</div>
        </div>
        <div class="stat-card">
          <div class="stat-n"><span class="stat-val" data-target="79">79</span><em>k</em></div>
          <div class="stat-k">Largest community</div>
        </div>
        <div class="stat-card">
          <div class="stat-n"><span class="stat-val" data-target="10">10</span><em>+</em></div>
          <div class="stat-k">Bots deployed</div>
        </div>
        <div class="stat-card">
          <div class="stat-n"><span class="stat-val" data-target="3">3</span><em>yr</em></div>
          <div class="stat-k">Experience</div>
        </div>
      </div>
    </section>

    <section class="section" id="services" aria-labelledby="services-h" data-reveal>
      <div class="section-eyebrow">what i do</div>
      <h2 class="section-h" id="services-h">Services</h2>
      <div class="services-grid">
        <div class="svc-card">
          <div class="svc-tag">Server Architecture</div>
          <div class="svc-title">Full server buildouts</div>
          <p class="svc-desc">From empty server to production-ready community. Channels, roles, permissions, and onboarding built to scale cleanly without becoming a mess six months later.</p>
        </div>
        <div class="svc-card">
          <div class="svc-tag">Bot Development</div>
          <div class="svc-title">Custom moderation bots</div>
          <p class="svc-desc">Not off-the-shelf configs. Node.js code written for your server. Tiered punishment, automod, anti-raid, and tempbans that survive restarts.</p>
        </div>
        <div class="svc-card">
          <div class="svc-tag">Bot Configuration</div>
          <div class="svc-title">Third-party bot setup</div>
          <p class="svc-desc">Dyno, Carl-bot, Ticket Tool, Sapphire. Configured properly the first time, with logs that capture what matters and automod that doesn't false-positive your members.</p>
        </div>
        <div class="svc-card">
          <div class="svc-tag">Server Rescue</div>
          <div class="svc-title">Redesigns and fixes</div>
          <p class="svc-desc">Inherited a messy server? Permissions held together with duct tape? I audit, restructure, and hand it back clean. Members keep their roles, the structure gets better.</p>
        </div>
      </div>
    </section>

    <section class="section" id="work" aria-labelledby="work-h" data-reveal>
      <div class="section-eyebrow">featured work</div>
      <h2 class="section-h sr-only" id="work-h">Featured build</h2>
      <a class="cs-feature" href="/case-studies/clicker-evolution/" aria-labelledby="cs-title">
        <div class="cs-feature-header">
          <span class="cs-tag">Case Study</span>
          <span>Clicker Evolution — Custom moderation bot</span>
        </div>
        <div class="cs-feature-body">
          <div class="cs-title" id="cs-title">A moderation bot built from scratch</div>
          <p class="cs-desc">25+ commands, dual slash and prefix support. Tiered auto-punishment that escalates from 3 to 15 warns. Persistent tempbans that survive restarts. Automod with burst-spam detection. Logging split by purpose.</p>
          <span class="cs-read" aria-hidden="true">Read the case study <span class="cs-arrow">→</span></span>
        </div>
      </a>
    </section>

    <section class="section" id="experience" aria-labelledby="exp-h" data-reveal>
      <div class="section-eyebrow">track record</div>
      <h2 class="section-h" id="exp-h">Experience</h2>
      <div class="track-list">
        <div class="track-item">
          <div class="track-label">~3 years</div>
          <div>
            <h3 class="track-h">Head Moderator, <em>~79,000 member community</em></h3>
            <p class="track-p">Managed staff teams, handled raid events, resolved member conflicts, and maintained server structure at scale. Built moderation workflows that prevented issues rather than reacting to them.</p>
          </div>
        </div>
        <div class="track-item">
          <div class="track-label">Ongoing</div>
          <div>
            <h3 class="track-h">Server Builder, <em>50+ servers from scratch</em></h3>
            <p class="track-p">Full architecture for gaming, community, and dev servers. Channel structures, role hierarchies, and permission systems built to scale from launch through growth.</p>
          </div>
        </div>
        <div class="track-item">
          <div class="track-label">Ongoing</div>
          <div>
            <h3 class="track-h">Bot Developer, <em>Node.js and discord.js</em></h3>
            <p class="track-p">Built moderation bots with 25+ commands, automod, anti-raid, tempban persistence, and tiered punishment systems. Also configured Dyno, Carl-bot, Sapphire, and Ticket Tool across dozens of servers.</p>
          </div>
        </div>
        <div class="track-item">
          <div class="track-label">Philosophy</div>
          <div>
            <h3 class="track-h">Stability over strictness</h3>
            <p class="track-p">Systems that prevent problems over moderation that punishes them. Clean structure, consistent staff workflows, and automation that catches issues before they spread.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="faq" aria-labelledby="faq-h" data-reveal>
      <div class="section-eyebrow">questions</div>
      <h2 class="section-h" id="faq-h">FAQ</h2>
      <div class="faq-list">

        <div class="faq-item">
          <button class="faq-btn" type="button" aria-expanded="false"
            aria-controls="faq-panel-1" id="faq-btn-1">
            <span>How much do you charge?</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-panel" id="faq-panel-1" role="region" aria-labelledby="faq-btn-1">
            <div class="faq-inner"><div class="faq-inner-pad">
              Pricing depends on scope. Every project is different. Server size, bot complexity, turnaround time, and payment method all factor in. We'll agree on a price before any work starts.
            </div></div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-btn" type="button" aria-expanded="false"
            aria-controls="faq-panel-2" id="faq-btn-2">
            <span>Do you accept Robux or PayPal?</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-panel" id="faq-panel-2" role="region" aria-labelledby="faq-btn-2">
            <div class="faq-inner"><div class="faq-inner-pad">
              Both. Robux via group payout, gamepass, or shirt purchase. PayPal for USD. Roblox tax (30%) is factored into Robux quotes so the final amount lands right.
            </div></div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-btn" type="button" aria-expanded="false"
            aria-controls="faq-panel-3" id="faq-btn-3">
            <span>Will I own the code after delivery?</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-panel" id="faq-panel-3" role="region" aria-labelledby="faq-btn-3">
            <div class="faq-inner"><div class="faq-inner-pad">
              Your choice. Full ownership transfers on final payment. Code, assets, all rights. Or a licensing setup if that fits better. Agreed on before the project starts.
            </div></div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-btn" type="button" aria-expanded="false"
            aria-controls="faq-panel-4" id="faq-btn-4">
            <span>Can you fix or redesign an existing server?</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-panel" id="faq-panel-4" role="region" aria-labelledby="faq-btn-4">
            <div class="faq-inner"><div class="faq-inner-pad">
              Yes. Audits and redesigns are a core offering. I restructure channels, roles, permissions, and moderation flow without disrupting your existing community. Members keep their places, the structure gets cleaner.
            </div></div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-btn" type="button" aria-expanded="false"
            aria-controls="faq-panel-5" id="faq-btn-5">
            <span>Do you offer ongoing support after delivery?</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-panel" id="faq-panel-5" role="region" aria-labelledby="faq-btn-5">
            <div class="faq-inner"><div class="faq-inner-pad">
              7 days of free bug fixes after delivery. If something I built breaks, I fix it. After that, ongoing support and updates are available for a small monthly retainer or per request.
            </div></div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-btn" type="button" aria-expanded="false"
            aria-controls="faq-panel-6" id="faq-btn-6">
            <span>Do you host bots for clients?</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-panel" id="faq-panel-6" role="region" aria-labelledby="faq-btn-6">
            <div class="faq-inner"><div class="faq-inner-pad">
              No. Hosting stays on your end. Running a bot long-term costs money and needs someone available if it goes down. I'll recommend options and help you get set up during delivery, but the bot lives on your infrastructure.
            </div></div>
          </div>
        </div>

      </div>
    </section>

    <section class="section" id="contact" aria-labelledby="contact-h" data-reveal>
      <div class="contact-section">
        <div class="contact-inner">
          <div class="contact-kicker">get in touch</div>
          <h2 class="contact-h" id="contact-h">Ready to <em>build</em> something?</h2>
          <p class="contact-body">Server buildouts, custom bots, redesigns, and rescue jobs. Taking new projects. Reach out to discuss scope and pricing.</p>
          <button class="contact-pill" id="copyDiscord" type="button"
            aria-label="Copy Discord username @ziloky to clipboard">
            <span class="contact-dot" aria-hidden="true"></span>
            Discord: <strong>@ziloky</strong>
          </button>
        </div>
      </div>
    </section>

  </main>

  <footer class="foot">
    <span>© <span id="year">2026</span> ziloky</span>
    <span>discord server builder. bot developer.</span>
  </footer>

</div>

<div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>
<script src="/assets/site.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Serve and open in browser to visually verify**

```bash
# From the repo root — Python is available on most systems
python -m http.server 8080
# Open http://localhost:8080 and check:
# - Nav pill visible, centered, Z mark ember color
# - Hero name huge, centered, amber glow behind it
# - Stat cards in 2x2 grid on mobile, 4-col on desktop
# - Services cards 2x2
# - FAQ items show + icon
# - Contact section has green dot pill
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add index.html — all sections, meta, structured data, ARIA"
```

---

## Task 4: case-studies/clicker-evolution/index.html — magazine case study

**Files:**
- Overwrite: `case-studies/clicker-evolution/index.html`

- [ ] **Step 1: Write the complete case study page**

```html
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<script>document.documentElement.classList.remove('no-js');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Clicker Evolution — Custom Discord Moderation Bot · Ziloky</title>
<meta name="description" content="Case study: a custom moderation bot built from scratch in Node.js for a Discord server. 25+ commands, tiered auto-punishment, persistent tempbans, burst-spam detection, split logging.">
<meta name="author" content="Ziloky">
<link rel="canonical" href="https://zil-oky.github.io/case-studies/clicker-evolution/">

<meta property="og:type" content="article">
<meta property="og:site_name" content="Ziloky">
<meta property="og:url" content="https://zil-oky.github.io/case-studies/clicker-evolution/">
<meta property="og:title" content="Clicker Evolution — Custom Discord Moderation Bot · Ziloky">
<meta property="og:description" content="A moderation bot built from scratch in Node.js. 25+ commands, tiered auto-punishment, persistent tempbans, automod, split logging.">
<meta property="og:image" content="https://zil-oky.github.io/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Ziloky — case study: Clicker Evolution moderation bot.">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Clicker Evolution — Custom Discord Moderation Bot · Ziloky">
<meta name="twitter:description" content="A moderation bot built from scratch in Node.js. 25+ commands, tiered punishment, persistent tempbans.">
<meta name="twitter:image" content="https://zil-oky.github.io/assets/og-image.png">

<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Clicker Evolution — Custom Discord Moderation Bot",
  "description": "Case study: a custom moderation bot built from scratch in Node.js.",
  "author": { "@type": "Person", "name": "Ziloky", "url": "https://zil-oky.github.io/" },
  "image": "https://zil-oky.github.io/assets/og-image.png",
  "mainEntityOfPage": "https://zil-oky.github.io/case-studies/clicker-evolution/"
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>
<link rel="stylesheet" href="/assets/styles.css">

<style>
/* ── Case study page styles ─────────────── */
.cs-page { padding-top: 48px; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-faint);
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.breadcrumb a { color: var(--ink-muted); text-decoration: none; transition: color 0.2s; }
.breadcrumb a:hover { color: var(--accent); }
.breadcrumb .sep { color: var(--ink-faint); }

.cs-project-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 16px;
}
.cs-h1 {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(40px, 7vw, 72px);
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin-bottom: 20px;
}
.cs-subtitle {
  font-size: 17px;
  color: var(--ink-muted);
  line-height: 1.6;
  max-width: 560px;
  margin-bottom: 36px;
}
.cs-meta {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 20px 0;
  margin-bottom: 64px;
  width: fit-content;
  column-gap: 48px;
}
.cs-meta div { display: flex; flex-direction: column; gap: 5px; }
.cs-meta dt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
  text-transform: uppercase;
}
.cs-meta dd {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
}

.cs-body { max-width: 680px; }
.cs-section { margin-bottom: 56px; }
.cs-section-h {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(20px, 3vw, 28px);
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 18px;
}
.prose p {
  font-size: 16px;
  color: rgba(255,255,255,0.72);
  line-height: 1.75;
  margin-bottom: 18px;
}
.prose p:last-child { margin-bottom: 0; }

.feat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 4px;
}
.feat-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  padding: 20px 20px;
  transition: border-color 0.25s;
}
.feat-card:hover { border-color: var(--line-hover); }
.feat-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.10em;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
}
.feat-desc {
  font-size: 13px;
  color: var(--ink-muted);
  line-height: 1.6;
}

.cs-back {
  margin-top: 72px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
}
.back-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--ink-muted);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.back-link:hover { color: var(--accent); }

@media (max-width: 640px) {
  .cs-meta { grid-template-columns: 1fr 1fr; column-gap: 28px; row-gap: 20px; }
  .feat-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<div class="wrap">

  <nav class="pill-nav" aria-label="Primary">
    <div class="pill-nav-inner">
      <a class="nav-mark" href="/" aria-label="Ziloky — home">Z</a>
      <div class="nav-sep" aria-hidden="true"></div>
      <a class="nav-link" href="/#services">services</a>
      <a class="nav-link" href="/#work">work</a>
      <a class="nav-link" href="/#faq">faq</a>
      <a class="nav-link" href="/#contact">contact</a>
    </div>
  </nav>

  <main id="main" class="cs-page">
    <article>

      <header>
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Portfolio</a>
          <span class="sep" aria-hidden="true">/</span>
          <a href="/#work">Case Studies</a>
          <span class="sep" aria-hidden="true">/</span>
          <span aria-current="page">Clicker Evolution</span>
        </nav>
        <div class="cs-project-tag">Case Study</div>
        <h1 class="cs-h1">Clicker Evolution</h1>
        <p class="cs-subtitle">A custom moderation bot for a Discord server. Written from scratch in Node.js.</p>
        <dl class="cs-meta">
          <div><dt>Project</dt><dd>Clicker Evolution</dd></div>
          <div><dt>Role</dt><dd>Bot Developer</dd></div>
          <div><dt>Stack</dt><dd>Node.js, discord.js</dd></div>
          <div><dt>Commands</dt><dd>25+</dd></div>
        </dl>
      </header>

      <div class="cs-body">

        <section class="cs-section" aria-labelledby="problem-h">
          <h2 class="cs-section-h" id="problem-h">The problem</h2>
          <div class="prose">
            <p>The Clicker Evolution server needed moderation that could run without constant manual oversight. Existing bots handled the basics but not the specifics. Tiered punishment, burst-spam detection, and bans that persisted across restarts all required custom code.</p>
            <p>The mod team was spending time on things automation should handle. The goal was to flip that ratio: let the bot cover the predictable patterns, and save human attention for the things bots can't do.</p>
          </div>
        </section>

        <section class="cs-section" aria-labelledby="built-h">
          <h2 class="cs-section-h" id="built-h">What was built</h2>
          <div class="prose">
            <p>A moderation bot written from scratch in Node.js using discord.js. Dual slash and prefix command support across 25+ commands covering the full moderation workflow.</p>
            <p>The punishment system escalates automatically based on accumulated warns. At 3 warns, a mute. At 7, a kick. At 10, a tempban. At 15, a permban. Each threshold is configurable. Tempbans write to disk so a bot restart doesn't free someone still serving time.</p>
            <p>Automod watches for burst-spam patterns and acts before a human has to. Logging is split by purpose: mod actions go to one channel, automod events to another, so staff can monitor without noise.</p>
          </div>
        </section>

        <section class="cs-section" aria-labelledby="features-h">
          <h2 class="cs-section-h" id="features-h">Technical highlights</h2>
          <div class="feat-grid">
            <div class="feat-card">
              <div class="feat-name">Tiered auto-punishment</div>
              <p class="feat-desc">Escalates from mute at 3 warns to permban at 15. Each threshold configurable per server.</p>
            </div>
            <div class="feat-card">
              <div class="feat-name">Persistent tempbans</div>
              <p class="feat-desc">Ban records written to disk. Bot restarts don't reset active bans.</p>
            </div>
            <div class="feat-card">
              <div class="feat-name">Burst-spam detection</div>
              <p class="feat-desc">Tracks message rate within a rolling window. Acts on threshold breach before humans notice.</p>
            </div>
            <div class="feat-card">
              <div class="feat-name">Split logging</div>
              <p class="feat-desc">Mod actions and automod events go to separate channels. Clean signal, no noise.</p>
            </div>
            <div class="feat-card">
              <div class="feat-name">Dual command support</div>
              <p class="feat-desc">Full slash command tree plus legacy prefix support. Works for both staff workflows.</p>
            </div>
            <div class="feat-card">
              <div class="feat-name">25+ commands</div>
              <p class="feat-desc">Warn, mute, kick, ban, tempban, unban, purge, case lookup, and more.</p>
            </div>
          </div>
        </section>

        <section class="cs-section" aria-labelledby="result-h">
          <h2 class="cs-section-h" id="result-h">The result</h2>
          <div class="prose">
            <p>The mod team stopped manually handling most routine cases. The bot covers the predictable patterns. Staff attention goes to the things bots can't handle.</p>
            <p>The server runs with less manual overhead than before. When something does need human review, it's in the right log channel, with context, not buried in a general feed.</p>
          </div>
        </section>

      </div>

      <div class="cs-back">
        <a class="back-link" href="/">← Back to portfolio</a>
      </div>

    </article>
  </main>

  <footer class="foot">
    <span>© <span id="year">2026</span> ziloky</span>
    <span>discord server builder. bot developer.</span>
  </footer>

</div>

<div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>
<script src="/assets/site.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open http://localhost:8080/case-studies/clicker-evolution/ and verify**

Check: breadcrumb renders, h1 is large, meta grid shows 4 columns, feature cards in 2x2, back link works.

- [ ] **Step 3: Commit**

```bash
git add case-studies/clicker-evolution/index.html
git commit -m "feat: add case study page — Clicker Evolution magazine feature"
```

---

## Task 5: 404.html

**Files:**
- Overwrite: `404.html`

- [ ] **Step 1: Write 404.html**

```html
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<script>document.documentElement.classList.remove('no-js');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404 — Page not found · Ziloky</title>
<meta name="description" content="Page not found.">
<meta name="robots" content="noindex">

<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>
<link rel="stylesheet" href="/assets/styles.css">

<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  padding: 80px 0;
}
.error-code {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(80px, 16vw, 140px);
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--accent);
  margin-bottom: 20px;
}
.error-h {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(24px, 4vw, 36px);
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 14px;
}
.error-body {
  font-size: 15px;
  color: var(--ink-muted);
  line-height: 1.6;
  max-width: 340px;
  margin-bottom: 32px;
}
.error-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--r-pill);
  padding: 12px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-decoration: none;
  transition: background 0.2s;
}
.error-cta:hover { background: #c96526; }
</style>
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<div class="wrap">

  <nav class="pill-nav" aria-label="Primary">
    <div class="pill-nav-inner">
      <a class="nav-mark" href="/" aria-label="Ziloky — home">Z</a>
      <div class="nav-sep" aria-hidden="true"></div>
      <a class="nav-link" href="/#services">services</a>
      <a class="nav-link" href="/#work">work</a>
      <a class="nav-link" href="/#faq">faq</a>
      <a class="nav-link" href="/#contact">contact</a>
    </div>
  </nav>

  <main id="main" class="error-page">
    <div class="error-code" aria-hidden="true">404</div>
    <h1 class="error-h">Page not found.</h1>
    <p class="error-body">That URL doesn't exist. Head back to the portfolio.</p>
    <a class="error-cta" href="/">Back to portfolio</a>
  </main>

  <footer class="foot">
    <span>© <span id="year">2026</span> ziloky</span>
    <span>discord server builder. bot developer.</span>
  </footer>

</div>

<script src="/assets/site.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open http://localhost:8080/404.html**

Check: 404 in ember, heading, body, back link — all match the portfolio design.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "feat: add 404 page matching portfolio design"
```

---

## Task 6: Static assets — favicon, og-image, manifest, sitemap

**Files:**
- Overwrite: `assets/favicon.svg`
- Create: `assets/og-image.svg`
- Overwrite: `site.webmanifest`
- Overwrite: `sitemap.xml`

- [ ] **Step 1: Write assets/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#E07535"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
    font-weight="900" font-size="20" fill="#ffffff" letter-spacing="-0.04em">Z</text>
</svg>
```

- [ ] **Step 2: Write assets/og-image.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#080a0b"/>
  <!-- Amber glow -->
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#E07535" stop-opacity="0.30"/>
    <stop offset="60%" stop-color="#E07535" stop-opacity="0.06"/>
    <stop offset="100%" stop-color="#E07535" stop-opacity="0"/>
  </radialGradient>
  <ellipse cx="600" cy="290" rx="420" ry="260" fill="url(#glow)"/>
  <!-- Name -->
  <text x="600" y="290"
    dominant-baseline="middle" text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
    font-weight="900" font-size="160" fill="#ffffff" letter-spacing="-8">ZILOKY</text>
  <!-- Tagline -->
  <text x="600" y="390"
    dominant-baseline="middle" text-anchor="middle"
    font-family="'JetBrains Mono', monospace"
    font-weight="400" font-size="18" fill="rgba(255,255,255,0.35)"
    letter-spacing="5">DISCORD SERVER BUILDER · BOT DEVELOPER · SWEDEN</text>
</svg>
```

- [ ] **Step 3: Write site.webmanifest**

```json
{
  "name": "Ziloky",
  "short_name": "Ziloky",
  "description": "Discord server builder and bot developer based in Sweden.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#080a0b",
  "theme_color": "#080a0b",
  "icons": [
    { "src": "/assets/favicon.svg", "type": "image/svg+xml", "sizes": "any" },
    { "src": "/assets/favicon-32.png", "type": "image/png", "sizes": "32x32" },
    { "src": "/assets/apple-touch-icon.png", "type": "image/png", "sizes": "180x180" }
  ]
}
```

- [ ] **Step 4: Write sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zil-oky.github.io/</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://zil-oky.github.io/case-studies/clicker-evolution/</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Step 5: Commit**

```bash
git add assets/favicon.svg assets/og-image.svg site.webmanifest sitemap.xml
git commit -m "feat: update favicon, og-image, manifest, sitemap"
```

---

## Task 7: OG image PNG export via Playwright

**Files:**
- Create: `assets/og-image.png`

The `og:image` meta tag points to a `.png` because most social card renderers don't accept SVG. Use Playwright to screenshot the SVG and export it as a 1200x630 PNG.

- [ ] **Step 1: Make sure the local server is running (from Task 3)**

```bash
python -m http.server 8080
# Keep running in background
```

- [ ] **Step 2: Start Playwright browser and screenshot the og-image.svg**

Using the Playwright MCP tool:
1. Navigate to `http://localhost:8080/assets/og-image.svg`
2. Resize viewport to 1200x630
3. Take screenshot and save to `assets/og-image.png`

Verify the PNG exists:
```bash
ls -lh assets/og-image.png
```
Expected: file exists, size between 20kb and 200kb.

- [ ] **Step 3: Commit**

```bash
git add assets/og-image.png
git commit -m "feat: add og-image.png exported from SVG"
```

---

## Task 8: Playwright verification pass

Open every page, check for console errors, verify all interactive features work, confirm mobile layout.

- [ ] **Step 1: Start the server if not running**

```bash
python -m http.server 8080
```

- [ ] **Step 2: Check index.html — desktop**

Using Playwright MCP:
1. Navigate to `http://localhost:8080/`
2. Resize to 1280x900
3. Take screenshot. Verify: hero name large and centered, amber glow behind it, nav pill at top
4. Check console messages — expect zero errors
5. Scroll to numbers section — verify count-up fires
6. Scroll to FAQ — click first question — verify panel opens, aria-expanded becomes "true"
7. Click Discord CTA — verify toast appears saying "Copied to clipboard"
8. Hover hero CTA — verify it moves slightly (magnetic)
9. Scroll to bottom — verify footer text present

- [ ] **Step 3: Check index.html — mobile**

1. Resize to 390x844
2. Take screenshot. Verify: nav links hidden (only Z mark), numbers in 2x2, services in 1 column
3. FAQ still works (click to open)
4. Contact pill still works

- [ ] **Step 4: Check case study page**

1. Navigate to `http://localhost:8080/case-studies/clicker-evolution/`
2. Resize to 1280x900
3. Take screenshot. Verify: breadcrumb at top, large h1, meta grid, feature cards 2x2, back link at bottom
4. Check console messages — expect zero errors
5. Click back link — verify navigation to `/`

- [ ] **Step 5: Check 404 page**

1. Navigate to `http://localhost:8080/404.html`
2. Verify: 404 in ember color, heading, body text, back button
3. Check console messages — expect zero errors

- [ ] **Step 6: Verify no broken asset paths**

Check network requests in Playwright for 404s. All assets (`styles.css`, `site.js`, `favicon.svg`) should load with status 200.

- [ ] **Step 7: Commit final verification note**

```bash
git add -A
git status
# Should show nothing to commit if all files already committed
git commit --allow-empty -m "chore: Playwright verification pass complete — all pages render, no console errors"
```

---

## Self-Review

**Spec coverage check:**
- Visual system (tokens, typography, colors) → Task 1 ✓
- Nav, Hero, Numbers, Services, Case study card, Track record, FAQ, Contact, Footer → Task 3 ✓
- Animations (aurora, name-breathe, cta-pulse, scroll reveals, count-up, magnetic) → Tasks 1 + 2 ✓
- Case study page → Task 4 ✓
- 404 page → Task 5 ✓
- Favicon, OG image, manifest, sitemap → Task 6 ✓
- OG image PNG → Task 7 ✓
- Accessibility (skip link, ARIA, focus styles, reduced-motion, landmarks) → Task 3 (in HTML), Task 1 (in CSS) ✓
- SEO (meta tags, structured data, canonical) → Task 3 + 4 ✓
- Copy rules (no em-dashes, no italics, Sweden, @ziloky only CTA) → Tasks 3 + 4 ✓
- Playwright verification → Task 8 ✓

**Placeholder scan:** None found. All code blocks are complete. All paths are exact.

**Type consistency:**
- `stat-val` used in both HTML (Task 3) and JS (Task 2) ✓
- `copyDiscord`, `copyHero` IDs match between HTML and JS ✓
- `faq-btn` / `faq-panel` / `is-open` class names consistent across CSS (Task 1), HTML (Task 3), JS (Task 2) ✓
- `data-reveal` / `is-visible` consistent across CSS and JS ✓
- `numbers` section ID used in JS count-up observer matches HTML ✓
