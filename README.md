# DaliDev-IA — Portfolio

Personal portfolio for **Mohamed Ali Chamsa** — Entrepreneur, Software &amp; AI Builder,
Automation Architect and Educator.

Single-page site. No framework, no build step, no external dependencies, no trackers.
Open `index.html` directly in any browser and it works.

---

## Stack

- **HTML5** — semantic (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — one stylesheet, design tokens in `:root`, no preprocessor
- **Vanilla JavaScript** — one small file, progressive enhancement only

No React / Vue / Next / Tailwind / Bootstrap. No package manager. No CDN calls.

## Structure

```
/
  index.html          Markup and content
  styles.css          Design system + layout + responsive
  script.js           Header state, mobile menu, scroll reveal, year
  README.md
  /assets
    mohamed-ali-chamsa.jpg    Portrait (JPEG fallback, ~900px)
    mohamed-ali-chamsa.webp   Portrait (WebP, served first via <picture>)
    favicon.svg               Brand monogram
```

## Run

Just open `index.html`. For a local server (recommended so relative paths behave like production):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Design system

Colours and layout live as CSS custom properties at the top of `styles.css`.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0b0d10` | Base background |
| `--paper` | `#f4f1ea` | Ivory editorial sections |
| `--accent` | `#d5a35d` | Bronze / champagne accent |
| `--accent-2` | `#8ea7ff` | Cool periwinkle (used sparingly) |
| `--active` | `#5ce394` | Active-state dots only |

Type: a modern **system sans** stack for display and body, and a **system monospace**
stack for eyebrows, section indices, tags and the execution-loop labels — the engineering
signature, at zero network cost.

## Content notes (do not drift from these facts)

- Products are shown **as products**. Their source and proprietary logic are **private**.
  Nothing implies open source.
- `ft_irc` is marked **in progress**, not finished. `Inception` and `Transcendence` are **next**.
- Combium AI is the product; **n8n** is currently one of the technologies used to build it —
  it is not "an n8n workflow".
- No email is published yet — the contact CTA points to GitHub, with
  "Professional email coming soon."

## Adding a French version later

The markup is structured for it. Two low-friction paths:

1. Duplicate `index.html` as `index.fr.html`, translate the visible copy, add a small
   language switch in the header. Fastest, fully static.
2. Or keep one file and swap text nodes via a `lang` toggle in `script.js` using
   `data-en` / `data-fr` attributes.

`lang="en"` on `<html>` and `og:locale` should be updated per version.

## Accessibility & performance

- Skip link, visible focus, semantic landmarks, alt text on the portrait.
- `prefers-reduced-motion` fully respected (reveals and smooth scroll disabled).
- No layout shift: portrait ships with intrinsic `width`/`height`; WebP + JPEG via `<picture>`.
- No render-blocking web fonts, no third-party requests.

## Self-audit checklist

- [x] Responsive at ~1440 / ~980 / ~760 / ~380 — no horizontal overflow
- [x] Mobile navigation opens/closes, closes on link, Escape, and resize
- [x] All GitHub links point to the `DaliDev-IA` organisation
- [x] No private architecture or temporary email exposed
- [x] Branding, hierarchy and spelling consistent
- [x] Keyboard focus visible throughout

---

© Mohamed Ali Chamsa · Built from scratch.
