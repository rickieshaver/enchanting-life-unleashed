# ELU Webflow Redesign — "The Grounded Oracle"
**Date:** 2026-04-10
**Approach:** Option C — Design system first, then pages

---

## 1. Overview

Complete visual rebuild of the Enchanting Life Unleashed Webflow site using the Stitch-generated "Ethereal Verity / The Grounded Oracle" design system as the reference. All pages are rebuilt natively in Webflow (no HTML injection). Existing Kit form integrations, quiz logic, and CMS collections are preserved and migrated into the new design.

**Webflow Site ID:** `69ab2b4bdb77a8f8f1df4fb6`

---

## 2. Global Design System

### Fonts
All four fonts loaded via Google Fonts:

| Token | Font | Use |
|---|---|---|
| `font-headline` | Newsreader (serif) | Nav, headings, display text |
| `font-body` | Manrope (sans-serif) | All body copy |
| `font-label` | Plus Jakarta Sans (sans-serif) | Labels, tags, form labels |
| `font-script` | Allura (cursive) | Signature accents only — use sparingly |

### Colors (Webflow Swatches/Variables)

| Token | Hex | Role |
|---|---|---|
| `primary` | `#521830` | Deep burgundy — headers, authority CTAs |
| `primary-container` | `#6d2e46` | Lighter burgundy — CTA gradient end |
| `secondary` | `#864f51` | Dusty rose — subtitles, accents |
| `surface` | `#fcf9f4` | Warm cream — page canvas (70% of backgrounds) |
| `surface-container-low` | `#f6f3ee` | Section separation (no border lines) |
| `surface-container` | `#f0ede9` | Card fills |
| `surface-container-lowest` | `#ffffff` | Cards on container sections |
| `gold` | `#EDB74D` | Surgical accent — icons, thin rules, button text |
| `on-surface` | `#1c1c19` | Primary body text |
| `on-surface-variant` | `#524347` | Secondary/muted text |
| `error` | `#ba1a1a` | Form error states |

### Typography Classes

| Class | Font | Size | Weight | Notes |
|---|---|---|---|---|
| `.display` | Newsreader | 3.5rem (56px) | 700 | Hero moments, tight tracking |
| `.heading-1` | Newsreader | 2.5rem (40px) | 600 | Section headers |
| `.heading-2` | Newsreader | 1.75rem (28px) | 600 | Sub-headers |
| `.body` | Manrope | 1rem (16px) | 400 | All body copy |
| `.body-lg` | Manrope | 1.125rem (18px) | 400 | Intro paragraphs |
| `.label` | Plus Jakarta Sans | 0.875rem (14px) | 500 | All-caps, 0.1rem tracking |
| `.script` | Allura | 1.5rem (24px) | 400 | Signature accents only |

### Button Styles

| Class | Background | Text | Border | Radius | Padding |
|---|---|---|---|---|---|
| `.btn-primary` | `#521830` → `#6d2e46` gradient | `#EDB74D` (gold) | None | 0px | 16px / 32px |
| `.btn-secondary` | `#fcf9f4` (cream) | `#521830` (burgundy) | 1px gold at 20% opacity | 0px | 16px / 32px |
| `.btn-ghost` | None | `#EDB74D` (gold) | None | — | Underline on hover |

### Utility Classes

| Class | Style |
|---|---|
| `.editorial-line` | 80px wide, 2px height, `#EDB74D` gold — used above headlines |
| `.section-divider` | 40% width, 1px, gold — left-aligned, never centered |

### Design Rules
- **0px border radius** everywhere (sharp corners = authority)
- **No 1px divider lines** for sections — use background color shifts only
- **Gold is surgical** — never as a background, never on soft pink
- **Section separation** via `surface-container-low` (#f6f3ee) on `surface` (#fcf9f4)
- **Asymmetric layouts** — heavy left-aligned typography, off-balance imagery
- **Ambient shadows only** — 40–60px blur, 4% opacity, tinted burgundy

---

## 3. Navigation (Global Symbol)

**Logo:** "Enchanting Life Unleashed" — Newsreader italic, `#521830`

**Nav Links:** Home · Shop · Blog · About · Contact
- Font: Newsreader uppercase, wide tracking
- Color: `#864f51` (dusty rose) → `#521830` (burgundy) on hover

**CTA Button:** "Take the Quiz" → `/boundary-archetype-quiz`
- Style: `.btn-primary`

**Mobile:** Hamburger menu, same links

---

## 4. Footer (Global Symbol)

- **Background:** `#521830` (primary burgundy)
- **Text:** `#fcf9f4` (cream)
- **3 columns:** Brand tagline (left) · Quick links (center) · Email signup (right)
- **No borders** — color shift creates separation from page
- **Email signup** wired to Kit form `8935231`

---

## 5. Page Map

| # | Page | URL | Stitch Source | Build Priority |
|---|---|---|---|---|
| 1 | Home | `/` | `home_boundary_quiz_cta` | 1 |
| 2 | Shop | `/shop` | `shop_enchanting_life_unleashed` | 2 |
| 3 | About | `/about` | `about_enchanting_life_unleashed` | 3 |
| 4 | Boundary Archetype Quiz | `/boundary-archetype-quiz` | `quiz_the_descent_intro` + question/results | 4 |
| 5 | Lunar Boundary Planner | `/lunar-boundary-planner` | `product_strategic_deep_dive` | 5 |
| 6 | Moon Cycle Life Planner | `/moon-cycle-life-planner` | `product_strategic_deep_dive` | 6 |
| 7 | Freebies | `/freebies` | `freebies_enchanting_life_unleashed` | 7 |
| 8 | The Transmission (Blog) | `/blog` | `the_transmission_blog_variation_1` | 8 |
| 9 | Blog Post | `/blog/:slug` | `blog_post_the_immersive_experience` | 9 |
| 10 | Contact | `/contact` | `contact_enchanting_life_unleashed` | 10 |

**Redirects:**
- `/moon-magic` → `/freebies`
- `/boundary-blueprint` → `/boundary-archetype-quiz`
- `/planner` → `/moon-cycle-life-planner`

---

## 6. Technical Approach

### Per-Page Build Pattern
1. Read Stitch `code.html` for the page
2. Recreate layout in Webflow using native elements + global design system classes
3. Replace placeholder content with real ELU copy and product details
4. Wire Kit forms / quiz scripts as needed

### Existing Integrations — Preserved
| Integration | Details |
|---|---|
| Kit newsletter form | ID `8935231`, UID `715224c213` — Home, About, Blog, Freebies, Footer |
| Quiz Kit gate | ID `8924567`, UID `6d956e4759` — Boundary Archetype Quiz |
| Quiz logic scripts | All 8 BBQ scripts migrated to `/boundary-archetype-quiz` |
| KitLoader script | Stays site-wide |
| Marquee keyframe | Preserved |

### Content Sources
| Page | Content Source |
|---|---|
| Product pages | Existing `/planner` and `/boundary-blueprint` page copy |
| Quiz | Existing 12 questions, 3 archetypes (Open Door, Cracked Window, Sacred Boundary Keeper) |
| Blog | Existing Webflow CMS collection — new template applied |
| Freebies | Existing `/moon-magic` content |

### What Stays the Same
- Webflow site ID: `69ab2b4bdb77a8f8f1df4fb6`
- All Kit form IDs and script IDs
- Existing page IDs reused where possible (Home, Shop, About, Blog)
- Webflow CMS blog collection

---

## 7. Build Order

**Phase 0:** Global design system — swatches, fonts, typography classes, buttons, utilities, Nav symbol, Footer symbol

**Phase 1:** Home, Shop, About (high-traffic, establishes patterns)

**Phase 2:** Boundary Archetype Quiz (complex — quiz logic migration)

**Phase 3:** Lunar Boundary Planner, Moon Cycle Life Planner (product pages using shared template)

**Phase 4:** Freebies, The Transmission (Blog), Blog Post template

**Phase 5:** Contact + redirects + final QA
