# zil-oky.github.io

Personal portfolio for **Ziloky** — Discord architect & bot developer.

Live: <https://zil-oky.github.io/>

---

## Stack

- **Vanilla HTML, CSS, and JS.** No framework, no build step, no
  dependencies in the deployed artifact.
- **GitHub Pages** serves the repo root.
- Three Google Fonts via the Fonts CDN: *Instrument Serif*, *Inter*,
  *JetBrains Mono*. Loaded async (preload + onload swap) with a
  `<noscript>` fallback so they don't block first paint, and with
  full system-font fallbacks in the CSS stack.

## Layout

```
.
├── index.html                              # homepage
├── 404.html                                # not-found page
├── case-studies/
│   └── clicker-evolution/index.html        # case study
├── assets/
│   ├── styles.css                          # shared stylesheet
│   ├── site.js                             # shared JS (theme, FAQ, IO reveal, copy, testimonials loader)
│   ├── favicon.svg / favicon-32.png
│   ├── apple-touch-icon.png
│   ├── og-image.svg / og-image.png         # 1200×630 social card
├── data/
│   └── testimonials.json                   # JSON-driven testimonial cards (currently empty)
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── AUDIT.md                                # pre-polish site audit
├── CHANGES.md                              # what changed in the polish pass
└── README.md
```

## Run locally

Any static file server works. A couple of one-shot options:

```sh
# Node (no install — uses npx)
npx -y http-server -p 8765 -s .

# Python 3
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

> Pages link to `/case-studies/...` and `/data/testimonials.json` with
> absolute paths, so make sure the server serves the repo root (not a
> sub-directory) and that absolute paths resolve as expected. Opening
> `index.html` directly via `file://` will not work for the
> testimonials fetch or for sub-page navigation.

## Adding testimonials

Drop entries into `data/testimonials.json`:

```json
{
  "testimonials": [
    {
      "name": "Jamie Park",
      "role": "Server Owner",
      "server": "Cosmic Roleplay",
      "quote": "Working with ziloky was…",
      "initials": "JP"
    }
  ]
}
```

`avatar` (image URL) and `link` (URL wrapping the meta block) are
optional. If neither `avatar` nor `initials` is provided, the renderer
derives initials from `name`. If the array is empty, the homepage
shows a graceful "Testimonials coming soon — references available on
request" empty state instead.

## Deploy

Pushes to `main` are published by GitHub Pages automatically. Branch
`claude/polish-portfolio-site-rUVju` holds the in-progress polish
work — open a PR against `main` when ready.

## Outstanding TODOs

The polish pass leaves a small number of items requiring ziloky's
input. Search the repo for `[TODO: confirm with ziloky]` to find them.
At time of writing those are:

- Case study quantitative metrics (member count, raid events handled,
  mod-hour reduction, uptime).
- Email address for the contact section.
- Other social handles to list (Twitter / X, Bluesky, Telegram, etc.).