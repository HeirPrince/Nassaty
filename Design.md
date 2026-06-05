# Home Page Design System

Design reference for the Nassaty Technologies home page (`app/routes/home/`). This document covers layout, visual language, motion, and component patterns used exclusively on the landing page.

---

## Page Structure

The home page is a single vertical scroll experience with snap-aligned sections:

```
Home
├── Intro          (#intro)     — Full-viewport hero
├── Featured       (#featured)  — Featured product spotlight
├── Projects       (#projects) — Scroll-pinned project carousel
├── Profile        (#details)  — Company overview
└── Footer
```

**Entry point:** `app/routes/home/home.jsx`

**Scroll behavior:**
- `scroll-snap-type: y proximity` on `html/body`
- Each direct child of `.home` uses `scroll-snap-align: start`
- Intersection observers reveal sections as they enter the viewport (Featured, Profile)
- Intro scroll indicator hides once the user scrolls past the hero

---

## Design Philosophy

- **Premium & technical** — Large typography, restrained palette, subtle 3D and WebGL accents
- **Motion-forward** — Staggered reveals, decoder text, GSAP scroll pinning; respects `prefers-reduced-motion`
- **Conversion-aware** — Clear CTAs (Download App, View More, Contact) without breaking the editorial feel
- **Dark-first, theme-aware** — Full light/dark theme support via CSS custom properties

---

## Color & Theme

Tokens live in `app/components/theme-provider/theme.js` and are injected as CSS variables at runtime.

### Dark theme (default)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(17.76% 0 0)` | Page background |
| `--backgroundLight` | `oklch(21.78% 0 0)` | Elevated surfaces |
| `--surfaceLight` | `oklch(21.78% 0 0)` | Cards, badges |
| `--text` | `#FFEEDB` | Primary text |
| `--textTitle` | `var(--text)` | Headings |
| `--textBody` | 80% text mix | Body copy |
| `--textLight` | 60% text mix | Subtle labels (e.g. company name) |
| `--accent` | `rgb(237 155 64)` | CTAs, highlights, active states |
| `--primary` | `oklch(84.42% 0.19 202.24)` | Tag labels (Profile section) |

### Light theme

| Token | Value |
|-------|-------|
| `--background` | `#FFEEDB` |
| `--text` | `#272727` |
| `--accent` | `rgb(237 155 64)` (unchanged) |

### Project accent tints (Projects section)

Each pinned project crossfades a subtle background tint:

| Project | Tint |
|---------|------|
| QBot | `rgba(0, 229, 255, 0.05)` |
| Digital Commerce Platform | `rgba(237, 155, 64, 0.05)` |
| CIVO Construction | `rgba(100, 100, 255, 0.05)` |

### Selection & focus

- Text selection: `--accent` background, `--black` foreground
- Focus ring: 4px solid `--text`, 4px offset; removed for `:focus:not(:focus-visible)`

---

## Typography

**Primary stack:** `Gotham, system-ui, …` (`--fontStack`)

**Monospace:** `--monoFontStack` (code only)

### Scale (desktop base → responsive overrides)

| Token | Desktop | Laptop | Tablet | Mobile |
|-------|---------|--------|--------|--------|
| `--fontSizeH0` | 140px | 100px | 80px | 56px |
| `--fontSizeH1` | 100px | 70px | 60px | 40px |
| `--fontSizeH2` | 58px | 50px | 48px | 34px |
| `--fontSizeH3` | 38px | 36px | 32px | 28px |
| `--fontSizeBodyL` | 20px | 20px | 20px | 17px |
| `--fontSizeBodyM` | 18px | 18px | 18px | 16px |
| `--fontSizeBodyS` | 16px | 16px | 16px | 14px |

**Line heights:**
- Titles: `--lineHeightTitle` (1.1)
- Body: `--lineHeightBody` (1.6)

**Heading letter-spacing:** Tight on large sizes (`-0.05em` at H0/H1, loosening at smaller levels)

**Special treatments:**
- Company name (Intro): uppercase, `0.3em` letter-spacing, `--textLight`
- Rotating discipline words: accent wipe reveal animation
- DecoderText: character-by-character scramble reveal on headings and descriptions

---

## Spacing & Layout

### Spacing scale

| Token | Value |
|-------|-------|
| `--spaceXS` | 4px |
| `--spaceS` | 8px |
| `--spaceM` | 16px |
| `--spaceL` | 24px |
| `--spaceXL` | 32px |
| `--space2XL` | 48px |
| `--space3XL` | 64px |
| `--space4XL` | 96px |
| `--space5XL` | 128px |
| `--spaceOuter` | 64px (48px laptop, 24px mobile) |

### Content widths

| Token | Desktop | Laptop |
|-------|---------|--------|
| `--maxWidthS` | 540px | 480px |
| `--maxWidthM` | 720px | 640px |
| `--maxWidthL` | 1096px | 1000px |
| `--maxWidthXL` | 1680px | 1100px |

### Section padding

Global `Section` component: asymmetric left padding (`calc(var(--space4XL) * 2)`) collapsing to `--spaceOuter` on mobile.

### Breakpoints

| Media query | Max width |
|-------------|-----------|
| `--mediaDesktop` | 2080px |
| `--mediaLaptop` | 1680px |
| `--mediaTablet` | 1040px |
| `--mediaMobile` | 696px |
| `--mediaMobileS` | 400px |

---

## Motion & Animation

### Timing

| Token | Duration |
|-------|----------|
| `--durationXS` | 200ms |
| `--durationS` | 300ms |
| `--durationM` | 400ms |
| `--durationL` | 600ms |
| `--durationXL` | 800ms |

**Easing:** `--bezierFastoutSlowin` — `cubic-bezier(0.4, 0.0, 0.2, 1)`

### Libraries

- **Framer Motion** — `Transition`, `AnimatePresence`, decoder-adjacent enter/exit states
- **GSAP + ScrollTrigger** — Projects section scroll pinning and project transitions

### Patterns

| Pattern | Where | Behavior |
|---------|-------|----------|
| Fade + slide up | Featured, Profile | `translateY(20–30px)` → `0`, staggered delays |
| Decoder reveal | Intro name, Profile title, descriptions | Scramble-decode on enter |
| Accent wipe | Intro discipline words | Orange bar sweeps left-to-right, text fades in |
| Scroll indicator | Intro | Mouse-style pill (desktop) / chevron bounce (touch) |
| Intersection reveal | Featured, Profile | Triggered once at 10% visibility |
| GSAP pin + wheel | Projects | Section pins for 1.5× viewport height; wheel advances projects |
| Breathe / pulse glow | Project artwork SVGs | Subtle scale animation + radial accent glow |
| Image carousel | Featured phone | 3 screenshots, 4s auto-rotate |

**Reduced motion:** Animations gated behind `@media (--mediaUseMotion)` or disabled via `prefers-reduced-motion`.

---

## Shared UI Patterns

### Badge / label pill

Used in Intro, Featured, and conceptually across the site.

```css
background: color-mix(in lab, var(--accent) 15%, transparent);
border: 1px solid color-mix(in lab, var(--accent) 30%, transparent);
border-radius: 0;           /* Square corners — intentional */
text-transform: uppercase;
letter-spacing: 0.1em;
color: var(--accent);
font-weight: medium/bold;
backdrop-filter: blur(10px); /* Intro only */
```

### Primary button

- Height: 56px (`--buttonSize`)
- Background: `--accent` with clipped bottom-right corner (8px chamfer)
- Hover: `scale(1.05)` when motion allowed
- Text: `--background` color on accent fill

### Secondary button

- Text-only with `--accent` color
- Hover: accent-tinted background wipe (`scale3d` transform)
- Used for "View More", "Send us a message"

### Divider + index number (Projects)

- 64×8px notched divider beside project index (`01`, `02`, `03`)
- Index in `--accent`, slides in from left on reveal
- Alternate layout mirrors divider to the right

### Phone mockup frame

Shared pattern in Featured and Project Summary:

```css
border-radius: 40–48px;
border: 4–8px solid #111;
background: #111 or var(--background);
box-shadow: 0 40–50px 80–100px rgba(0, 0, 0, 0.5);
```

Featured adds 3D perspective: `rotateY(-15deg) rotateX(10deg)` → flattens on hover/tablet.

### Browser frame (Project Summary — laptop-flat type)

- Traffic-light dots (`#ff5f56`, `#ffbd2e`, `#27c93f`)
- Dark chrome (`#1a1a1a` / `#111`)
- Screenshot fills content area with `object-fit: cover`

### Decorative SVG artwork

- Katakana-style background SVGs (`gng_1`, `gng_2`, `gng_3`) cycle per project index
- Theme variants: dark/light × desktop/mobile
- Opacity: 0.5 (light) / 0.7 (dark)
- Radial `--accent` glow behind SVG, pulsing at 0.2–0.4 opacity

---

## Section Breakdown

### 1. Intro (`intro.jsx`)

**Purpose:** Brand hero — company name, rotating value proposition, ambient particle field.

**Layout:**
- `100vh`, centered flex column
- Max content width: 1024px (scales down at laptop/tablet)
- Left-aligned desktop → centered on tablet/mobile

**Content hierarchy:**
1. Company name — `DecoderText`, uppercase, light weight
2. Badge — "We are here to"
3. Rotating headline — disciplines from `config.json`: "Integrate.", "Automate.", "Scale."
4. Matching description — cycles every 8s with discipline
5. Scroll indicator — links to `#featured`

**Background:** Lazy-loaded `Dots` canvas (WebGL particle field), full-bleed behind text.

**Key files:** `intro.jsx`, `intro.module.css`, `dots.jsx`

---

### 2. Featured (`featured.jsx`)

**Purpose:** Spotlight for Aether Notes app with download CTA.

**Layout:**
- `100vh` two-column grid (`1fr 1fr`), stacks on tablet
- Max width: `--maxWidthL`
- Subtle radial accent gradients at corners

**Content:**
- Badge: "Featured"
- H2: "Turn Conversations Into Progress"
- Body copy (~540px max)
- CTA: "Download App" (primary button, APK download)
- Phone mockup with 3 rotating screenshots (chat, tasks, reminders)

**Motion:** Staggered fade-up on scroll into view; phone images crossfade every 4s.

**Responsive:** Actions move below phone on tablet (`mobileActions`).

**Key files:** `featured.jsx`, `featured.module.css`

---

### 3. Projects (`projects.jsx` + `project-summary.jsx`)

**Purpose:** Interactive showcase of three portfolio projects with scroll-pinned transitions.

**Layout:**
- Full viewport pin (`ScrollTrigger`, `end: +=150vh`)
- One project visible at a time, absolutely positioned
- Progress dots on right edge (accent when active, scale 1.4×)
- Each project: ~36% text column + preview column (reversed for alternate/even projects)

**Projects data:**

| # | Title | Route | Preview type |
|---|-------|-------|--------------|
| 01 | QBot | `/projects/slice` | SVG image |
| 02 | Digital Commerce Platform | `/projects/business-management-platform` | Laptop-flat + phone |
| 03 | CIVO Construction | `/projects/civo` | SVG image |

**Interaction:**
- Wheel threshold: 40px accumulated delta
- Keyboard: ArrowUp/Down, PageUp/Down
- 600ms lock window between transitions
- Outgoing: fade up/down + scale; incoming: opposite direction + scale from 0.95

**Project Summary anatomy:**
- Index divider + number
- H2 title + description (supports `\n\n` paragraphs)
- "View More" secondary button with arrow
- Preview: 3D model (laptop/phone), flat browser+phone, or image frame

**Key files:** `projects.jsx`, `projects.module.css`, `project-summary.jsx`, `project-summary.module.css`, `project-summary-artwork.module.css`

---

### 4. Profile / Details (`profile.jsx`)

**Purpose:** Company introduction and contact prompt.

**Layout:**
- Min `100vh`, two-column grid (`1fr 50%`)
- Left: text + CTA; Right: "About us" tag + logo
- Max width: `--maxWidthL`; single column centered on tablet

**Content:**
- H3: "Who we are" (DecoderText)
- Two body paragraphs about Nassaty Technologies
- Secondary button: "Send us a message" → `/contact`
- Theme-aware logo (`logo_dark.svg` / `logo_light.svg`)

**Motion:** Opacity fade with `--durationXL` delays; divider notch expands on reveal.

**Key files:** `profile.jsx`, `profile.module.css`

---

## Responsive Summary

| Section | Desktop | Tablet (≤1040px) | Mobile (≤696px) |
|---------|---------|------------------|-----------------|
| Intro | Left-aligned, 100vh | Centered text | Smaller H0 clamp, shorter badge |
| Featured | Side-by-side grid | Stacked, CTA below phone | Reduced padding/gaps |
| Projects | Pinned scroll, side-by-side | Preview above text, 80% width | Smaller progress dots |
| Profile | Two columns | Single centered column | `--spaceOuter` padding |

---

## Accessibility

- Semantic landmarks: `<section>`, `<header>`, `<article>`, `<nav>`
- `aria-labelledby` on sections with visible headings
- `aria-hidden` on decorative/animated duplicates
- `VisuallyHidden` for scroll indicator labels
- `tabIndex={-1}` on focusable sections for programmatic focus
- Progress dots: `aria-label`, `aria-current="step"`
- Project items: `aria-hidden` when not active
- Touch vs. no-touch scroll indicators (mouse pill hidden on touch, chevron hidden on fine pointer)

---

## File Map

```
app/routes/home/
├── home.jsx              # Page shell, observers, section composition
├── home.module.css       # Snap scroll, pin overrides
├── intro.jsx             # Hero
├── intro.module.css
├── dots.jsx              # WebGL particle background
├── dots.module.css
├── featured.jsx          # Featured product
├── featured.module.css
├── projects.jsx          # GSAP pinned carousel
├── projects.module.css
├── project-summary.jsx   # Individual project slide
├── project-summary.module.css
├── project-summary-artwork.module.css
├── profile.jsx           # About / details
├── profile.module.css
└── route.js              # Remix route export

app/config.json           # Intro disciplines & descriptions
app/components/theme-provider/theme.js  # Design tokens
app/global.module.css     # Breakpoints, base styles
```

---

## Extending the Home Page

When adding a new section or project:

1. **Match spacing** — Use `--space*` tokens and `--maxWidthL` content constraint
2. **Use existing components** — `Section`, `Heading`, `Text`, `Button`, `Transition`, `DecoderText`
3. **Follow reveal pattern** — Intersection observer + `data-visible` attribute + CSS transitions
4. **Respect motion preferences** — Gate transforms behind `--mediaUseMotion`
5. **Keep accent usage disciplined** — Orange for CTAs, active states, and decorative glow only
6. **Square corners on badges** — Do not round badge/label pills; border-radius stays `0`
7. **Register in `home.jsx`** — Add ref + observer if scroll-triggered animation is needed
