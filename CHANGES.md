# Polish pass — what changed

A 2-minute summary of every meaningful change, organized by task. The
underlying audit is in `AUDIT.md`; one git commit per task section
makes the diff easy to follow.

> **Branch:** `claude/polish-portfolio-site-rUVju` — open a PR against
> `main` when you're ready to ship.

---

## Task 1 — Audit (`4c260b0`)

`AUDIT.md` documents the pre-polish state of the site: file structure,
tech stack, accessibility / performance / SEO / mobile / dead-code
issues found. Each line item is tagged `[FIX]` so it can be matched
against later commits. A `Resolved` section was appended at the end of
the polish pass.

## Task 2 — SEO and metadata (`41ee90b`)

- Sharper `<title>` ("Ziloky — Discord Architect & Bot Developer"),
  fuller meta description, added `author` and `keywords`,
  `<link rel="canonical">`.
- Full Open Graph (`og:title`/`description`/`url`/`image`/`image:width`/
  `image:height`/`image:alt`/`type`/`site_name`/`locale`) and Twitter
  Card (`summary_large_image`).
- Created `assets/og-image.svg` (1200×630, dark editorial aesthetic
  matching the site) and rendered to `assets/og-image.png` via sharp.
- JSON-LD `Person` schema with `jobTitle`, `address` (SE), `knowsAbout`,
  and `makesOffer` array.
- Created `robots.txt`, `sitemap.xml` (homepage + case-study URL),
  `site.webmanifest`.
- Added SVG favicon, 32px PNG fallback, 180px Apple touch icon.
- `theme-color` meta for both color schemes.
- Trimmed Inter font weights from 5 to 3 (only 400/500/600 are used).

## Task 3 — Accessibility pass (`6de13ba`)

- **Skip-to-content** link as first focusable element; `<main id="main">`
  landmark wraps the homepage content.
- **Section landmarks**: every `<section>` now has `aria-labelledby`
  pointing at its heading.
- **Logo** upgraded from `<div>` to `<a href="/">` with descriptive
  `aria-label`.
- **Theme toggle**: `aria-pressed` reflects the active theme; the
  `aria-label` swaps between "Switch to light/dark theme"; SVG icon
  is `aria-hidden`. First-visit theme respects
  `prefers-color-scheme`.
- **FAQ accordion** rebuilt to the WAI-ARIA pattern:
  - Each question is wrapped in `<h3>` so it's announced as both a
    heading and a button.
  - `aria-controls` + matching `id` pair the button with its panel.
  - Panel uses the `[hidden]` attribute (not the previous `max-height`
    hack), with a small opacity fade-in.
  - Animation respects `prefers-reduced-motion`.
- **Copy-to-clipboard**: full descriptive `aria-label`; toast is now a
  `role="status"` `aria-live="polite"` region so the success message
  is announced; failure path surfaces a fallback hint.
- **Decorative elements** (pulsing dots, section numbers, rule lines,
  FAQ icon) marked `aria-hidden="true"`.
- **Light-theme contrast**: `--ink-faint` darkened from `#9a9ba1` to
  `#6e6f74`, `--ink-muted` darkened, `--line` strengthened, `--accent`
  deepened — now meets WCAG AA on the audited surfaces.
- **Bullet bug fix**: `.service ul li::before` was missing `content:`
  so the bullet never rendered. Now shows `›`.
- **`prefers-reduced-motion`** media query disables animations,
  transitions, scroll smoothing, and hover-transform.
- Stronger focus styles (3px offset, 4–6px on FAQ / contact pill).
- Footer copyright year is now JS-driven.

## Task 4 — Performance (`407dd67`)

- Switched the Google Fonts `<link>` from a render-blocking stylesheet
  to a non-blocking pattern: `rel="preload"` with an `onload` swap to
  `rel="stylesheet"`, plus a `<noscript>` fallback. With system-font
  fallbacks already in the CSS stack and `font-display=swap`, FCP no
  longer waits on the Fonts CDN round-trip.
- Removed unused `--line-soft` and `--accent-deep` CSS custom
  properties.
- **Deliberately did not minify** the inline CSS/JS. The site is
  ~40 KB raw / ~10 KB gzipped already; minification would shave a
  couple hundred gzipped bytes at the cost of readability. GitHub
  Pages applies gzip automatically. If a build step is added later,
  minification can come along for the ride.

## Task 5 — Subtle motion (`3c6bb2a`)

- Six major content blocks (stats grid, services grid, bot teaser,
  experience list, FAQ list, contact card) now fade and rise into
  view as they enter the viewport, driven by a single
  `IntersectionObserver`.
- Each block reveals once and is then unobserved — no churn.
- `prefers-reduced-motion` users see content immediately, no
  transition.
- An inline `class="no-js"` on `<html>` is removed by a tiny inline
  script in `<head>`, so non-JS visitors never see hidden content.
- Service cards subtly accent their `<h3>` on hover in addition to
  the existing background change.
- No parallax, no stagger, no cursor-chasing. Restraint was the goal.

## Task 6 — Clicker Evolution case study (`4a258b3`)

- New page at `/case-studies/clicker-evolution/`:
  - Hero with one-line summary and a meta strip (type, stack,
    commands, status).
  - Section 1: **The problem** — generalizable framing of why
    off-the-shelf moderation bots fall short, drawing on language
    already on the homepage. No invention.
  - Section 2: **The solution** — three-layer architecture (command
    surface, automation surface, persistence layer).
  - Section 3: **Feature breakdown** — expands the homepage's six-cell
    grid into prose. Drawn entirely from the homepage copy.
  - Section 4: **Tech stack** — Node.js, discord.js, JSON-backed
    storage, self-hosted, with a one-sentence reason per choice.
  - Section 5: **Outcomes** — only verifiable items (persistence
    survives restarts, policy encoded, log split, 25+ commands
    shipped). A clearly-marked `[TODO: confirm with ziloky]` block
    asks for the quantitative metrics that aren't documented on the
    site (member count, raid events handled, mod-hour reduction,
    uptime).
  - Breadcrumb at the top, "← Back to portfolio" link at the bottom.
- Page-specific JSON-LD `Article` schema, full OG / Twitter, matching
  favicon / theme-color setup.
- Homepage Featured Build block became a teaser: same `.bot-box` look,
  trimmed body copy, no longer renders the 6-cell feature grid (lives
  on the case study now). The whole card is now an `<a>` linking to
  the case study, with a "Read the case study →" CTA whose arrow
  nudges right on hover.
- **Refactor that made this clean**: extracted the inline `<style>`
  to `/assets/styles.css` and the inline `<script>` to
  `/assets/site.js` (loaded with `defer`). Both pages share the same
  source of truth.
- Updated `sitemap.xml` to include the case-study URL.

## Task 7 — Testimonials structured empty state (`f1ea839`)

- New `/data/testimonials.json` with an empty `testimonials: []` and
  a documented `_template` entry showing the expected shape (name,
  role, server, quote, avatar, initials, link). Fields starting with
  `_` are ignored by the renderer.
- The homepage section's default markup is the empty state itself —
  no flash of unstyled content, no JS dependency on the baseline
  message: *"Testimonials coming soon — recently delivered work,
  references available on request."*
- When the JSON has entries, JS replaces the empty state with a
  two-column grid of cards: serif italic quote with accent curly
  quotes, attribution row with avatar (image or two-letter initials),
  name, role, server. Optional `link` per testimonial wraps the meta
  block.
- Mobile: cards collapse to single column under 780px.
- Hover: card border picks up the accent — same micro-pattern as
  service cards and the case study teaser.
- **Verified both branches** with Playwright route-stubbing: empty
  state shows by default; stubbing two entries produces two cards.

## Task 8 — Contact improvements (`6b65284`)

- Primary Discord pill remains the headline CTA, with a small mono
  caption underneath: *"Discord is the fastest path. Other channels
  below."*
- New two-column block (single column on mobile) under the primary
  card:
  - **Other channels** — Email and "Other socials" rows are explicit
    `[TODO: confirm with ziloky]` placeholders so addresses aren't
    invented. GitHub points to `github.com/zil-oky` (already public).
  - **What to include in your first message** — a five-row checklist
    (server purpose, size, timeline, budget range, payment) styled
    with checkbox glyphs to set the right tone. Filters away
    "hi can u make me a bot" inquiries before the conversation starts.
- The accessible toast announcement on copy success was already wired
  in Task 3; verified end-to-end here.

## Task 9 — 404 page (`70d8980`)

- `/404.html` matches the site aesthetic and shares the stylesheet
  so theme/contrast/motion fixes apply automatically.
- Concise copy: *404 · NOT FOUND* eyebrow, *"No page here."*
  headline, one-sentence explanation, a primary "Back to home" button
  and a secondary "Contact" button. Three jump cards below to
  Services / Work / FAQ.
- `<meta name="robots" content="noindex">`.
- GitHub Pages serves `/404.html` for any unmatched path automatically.

## Task 10 — Code quality (`b7f5276`)

- Replaced the one-line `README.md` with a proper project overview
  (stack, file layout, run-local, deploy, outstanding TODOs).
- New `.editorconfig` enforces utf-8 / lf / final-newline / 2-space
  indent.
- HTML validation now exits clean on all three pages
  (`npx html-validate`):
  - Encoded six raw `&` → `&amp;` in service-list bullets.
  - Promoted FAQ answer panels from `<div role="region">` to
    `<section>` (more semantic and silences the
    `prefer-native-element` rule). The `aria-labelledby` pairing with
    the question buttons is preserved.
- **Did not run `prettier --write`**: the existing CSS uses an
  intentional compact style (`*{box-sizing:border-box;margin:0;padding:0}`,
  multi-property single-line declarations) that the user asked to
  preserve. `.editorconfig` will guide future edits without rewriting
  the existing source.

## Task 11 — Final pass (this commit)

- Re-read every change.
- Mobile (375px): all three pages render with no horizontal overflow,
  no JS errors, no broken layout.
- Keyboard: tab order on the homepage is sensible (skip-link → logo →
  4 nav links → theme toggle → bot card → 6 FAQ buttons → contact
  pill → external link). Skip link works, FAQ Enter/Space toggles
  correctly, theme toggle aria-pressed updates.
- Internal links: every internal `<a href>` across the three pages
  resolves with HTTP 200 to a target with the matching anchor (where
  one is given).
- Git history: ten commits, one per task section, all with
  descriptive messages — nothing to squash.
- `AUDIT.md` updated with a `Resolved` section.

---

## Bonus — Visual polish (after you opened up the design)

Once you said I had latitude on the look, I made four restrained changes
that lift the whole site without altering its voice:

- **Z monogram in the nav** — the small pulsing dot was replaced with a
  22 px rounded square containing an italic serif Z, gradient-filled
  in the accent color with a soft blue glow. Tilts slightly on logo
  hover. Now the brand has a real footprint on every page.
- **Hand-drawn flourish under the headline** — an SVG squiggle in the
  accent color sweeps under "run themselves." Uses the same italic
  serif voice as the rest of the type. Inline SVG, no extra request.
- **Bigger, more confident stat numbers** — bumped from 48 px to 56 px
  serif with tighter tracking; unit modifiers (+, k, yr) now render
  in accent italic for emphasis; added a 28 px accent baseline tick
  above each stat where the dividing line meets the column.
- **Subtle dot-grid backdrop** — a 28 px-spaced radial-dot pattern
  sits behind everything at 35% opacity, masked to fade at the edges
  so it never competes with content. Adds depth without noise. Both
  themes auto-adapt because the dot color uses `var(--line)`.

All four respect `prefers-reduced-motion` (only the monogram has a
transition; the flourish and stat treatments are static).

---

## Items needing your input

Search the repo for `[TODO: confirm with ziloky]` to find these
inline. At time of writing:

1. **Case study metrics** — member count where Clicker Evolution
   runs, raid events handled, mod-hour reduction, uptime. Currently
   in a highlighted block at the bottom of the case study; send the
   numbers and I'll drop them in.
2. **Email** for the Contact section secondary channels list.
3. **Other social handles** to list (Twitter / X, Bluesky, Telegram,
   anything else).
4. **Real testimonials** — drop them into `data/testimonials.json` to
   replace the empty state. The template inside that file documents
   the expected shape.