# DaliDev-IA — Portfolio

**[🇫🇷 Français](#francais) · [🇬🇧 English](#english)**

Portfolio professionnel mono-page de **Mohamed Ali Chamsa** — Entrepreneur, concepteur logiciel &amp; IA, architecte en automatisation et formateur.

Site statique. Aucun framework, aucune étape de build, aucune dépendance externe, aucun traceur. On ouvre `index.html` directement dans un navigateur et ça fonctionne.

---

<a id="francais"></a>

## 🇫🇷 Français

### Stack technique

- **HTML5** — sémantique (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — une seule feuille de style, design tokens dans `:root`, aucun préprocesseur
- **JavaScript vanilla** — un petit fichier, amélioration progressive uniquement

Pas de React / Vue / Next / Tailwind / Bootstrap. Pas de gestionnaire de paquets. Aucun appel CDN.

### Structure

```
/
  index.html          Balisage et contenu
  styles.css          Design system + mise en page + responsive
  script.js           État du header, menu mobile, apparition au défilement, année
  README.md
  /assets
    portrait-cutout.webp      Portrait détouré, fond transparent (servi en premier)
    portrait-cutout.png       Portrait détouré, repli PNG transparent
    mohamed-ali-chamsa.jpg    Portrait original — uniquement pour l'aperçu social / OG
    logo-dalidev.webp         Logo DaliDev-IA, transparent (servi en premier)
    logo-dalidev.png          Logo DaliDev-IA, repli PNG transparent
    favicon.png               Logo sur pastille sombre (icône d'onglet)
```

### Lancer le site

Il suffit d'ouvrir `index.html`. Pour un serveur local (recommandé, afin que les chemins relatifs se comportent comme en production) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

### Design system

Les couleurs et la mise en page vivent sous forme de variables CSS en haut de `styles.css`.

| Token | Valeur | Rôle |
|---|---|---|
| `--bg` | `#0b0d10` | Fond de base |
| `--paper` | `#f4f1ea` | Sections ivoire éditoriales |
| `--accent` | `#d5a35d` | Accent bronze / champagne |
| `--accent-2` | `#8ea7ff` | Bleu barbeau froid (usage parcimonieux) |
| `--active` | `#5ce394` | Points d'état actif uniquement |

Typographie : une pile **sans-serif système** pour les titres et le corps, et une pile **monospace système** pour les eyebrows, les index de section, les tags et les libellés des boucles d'exécution — la signature ingénierie, à coût réseau nul.

### Bilingue — français par défaut, anglais en option

Le site se charge en **français** (natif dans le HTML, donc fonctionnel et indexable sans JS). Un sélecteur **FR / EN** dans le header bascule en anglais ; le choix est mémorisé (`localStorage`) et peut être forcé par l'URL : `?lang=en`.

Fonctionnement, pour garder les modifications simples :

- Chaque élément traduisible porte son **texte français en contenu** et l'anglais dans un attribut `data-en="..."` — les deux côte à côte sur la même ligne.
- Les attributs utilisent `data-en-alt` (`alt` d'image) et `data-en-aria` (`aria-label`).
- `script.js` capture le français au chargement, puis bascule textes et attributs, et met à jour `<html lang>`, `<title>`, la meta description et les balises Open Graph.

Pour modifier un texte, changer le français visible **et** son `data-en` sur le même élément. Les noms de produits, de projets et les termes techniques (C, C++98, n8n…) sont volontairement laissés non traduits.

### Accessibilité & performance

- Lien d'évitement, focus visible, repères sémantiques, texte alternatif sur le portrait.
- `prefers-reduced-motion` pleinement respecté (apparitions et défilement doux désactivés).
- Aucun décalage de mise en page : le portrait est servi avec `width`/`height` intrinsèques ; WebP + JPEG via `<picture>`.
- Aucune police web bloquante, aucune requête tierce.

### Notes de contenu (ne pas s'en écarter)

- Les produits sont présentés **en tant que produits**. Leur source et leur logique propriétaire restent **privées**. Rien ne laisse entendre qu'ils sont open source.
- `ft_irc` est indiqué **en cours**, pas terminé. `Inception` et `Transcendence` sont **à venir**.
- Combium AI est le produit ; **n8n** est actuellement l'une des technologies utilisées pour le construire — ce n'est pas « un workflow n8n ».
- Aucune adresse e-mail n'est publiée pour l'instant — le CTA de contact pointe vers GitHub, avec « Adresse e-mail professionnelle bientôt disponible ».

<p align="right"><a href="#english">English version ↓</a></p>

---

<a id="english"></a>

## 🇬🇧 English

Single-page professional portfolio for **Mohamed Ali Chamsa** — Entrepreneur, Software &amp; AI Builder, Automation Architect and Educator.

Static site. No framework, no build step, no external dependencies, no trackers. Open `index.html` directly in any browser and it works.

### Stack

- **HTML5** — semantic (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — one stylesheet, design tokens in `:root`, no preprocessor
- **Vanilla JavaScript** — one small file, progressive enhancement only

No React / Vue / Next / Tailwind / Bootstrap. No package manager. No CDN calls.

### Structure

```
/
  index.html          Markup and content
  styles.css          Design system + layout + responsive
  script.js           Header state, mobile menu, scroll reveal, year
  README.md
  /assets
    portrait-cutout.webp      Hero portrait — cut out, transparent bg (served first)
    portrait-cutout.png       Hero portrait fallback (transparent PNG)
    mohamed-ali-chamsa.jpg    Original portrait — used only for the social / OG preview
    logo-dalidev.webp         DaliDev-IA logo, transparent (served first)
    logo-dalidev.png          DaliDev-IA logo fallback (transparent PNG)
    favicon.png               Logo on a dark tile (browser tab icon)
```

### Run

Just open `index.html`. For a local server (recommended so relative paths behave like production):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Design system

Colours and layout live as CSS custom properties at the top of `styles.css`.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0b0d10` | Base background |
| `--paper` | `#f4f1ea` | Ivory editorial sections |
| `--accent` | `#d5a35d` | Bronze / champagne accent |
| `--accent-2` | `#8ea7ff` | Cool periwinkle (used sparingly) |
| `--active` | `#5ce394` | Active-state dots only |

Type: a modern **system sans** stack for display and body, and a **system monospace** stack for eyebrows, section indices, tags and the execution-loop labels — the engineering signature, at zero network cost.

### Bilingual — French by default, English optional

The site loads in **French** (native in the HTML, so it works and is indexable with no JS). A **FR / EN** switch in the header swaps to English; the choice is remembered (`localStorage`) and can be forced with a URL: `?lang=en`.

How it works, so edits stay simple:

- Each translatable element carries its **French text as content** and the English in a `data-en="..."` attribute — both live side by side on the same line.
- Attributes use `data-en-alt` (image `alt`) and `data-en-aria` (`aria-label`).
- `script.js` snapshots the French at load, then swaps text/attributes, and updates `<html lang>`, `<title>`, the meta description and Open Graph tags.

To edit a string, change the visible French **and** its `data-en` on the same element. Product names, project names and tech terms (C, C++98, n8n…) are intentionally left untranslated.

### Accessibility & performance

- Skip link, visible focus, semantic landmarks, alt text on the portrait.
- `prefers-reduced-motion` fully respected (reveals and smooth scroll disabled).
- No layout shift: portrait ships with intrinsic `width`/`height`; WebP + JPEG via `<picture>`.
- No render-blocking web fonts, no third-party requests.

### Content notes (do not drift from these facts)

- Products are shown **as products**. Their source and proprietary logic are **private**. Nothing implies open source.
- `ft_irc` is marked **in progress**, not finished. `Inception` and `Transcendence` are **next**.
- Combium AI is the product; **n8n** is currently one of the technologies used to build it — it is not "an n8n workflow".
- No email is published yet — the contact CTA points to GitHub, with "Professional email coming soon."

<p align="right"><a href="#francais">Version française ↑</a></p>

---

© Mohamed Ali Chamsa · Développé de A à Z. / Built from scratch.
