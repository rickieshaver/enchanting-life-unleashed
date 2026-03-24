# ELU Design System
> Visual source of truth for all Webflow builds. Claude reads this before generating any layout, UI component, or section.
> Last updated: 2026-03-10 (Session 7 — full site design alignment)

---

## Design Direction

**Codename:** Editorial Luxe Mystic
**Feel:** Sophisticated witch with a business plan. Velvet chair meets vintage tarot. Editorial, grounded, premium — never boho-clipart.

---

## Color Tokens (exact hex — never approximate)

| Token | Hex | Use |
|-------|-----|-----|
| Warm Cream | `#FFFCF7` | Primary bg — 70% of every design |
| Deep Burgundy | `#6D2E46` | Headers, body text, authority |
| Dusty Rose | `#A26769` | Subtitles, borders, accents, dividers |
| Soft Pink | `#D5B9B2` | Fills, writing boxes, gentle backgrounds |
| Gold | `#EDB74D` | Stars ✦, badges, sparkle — jewelry only, use sparingly |
| Dark Plum | `#1E0A16` | Dark hero sections, CTA sections |
| Deep Plum | `#3D1A2B` | Dark cards on dark bg |

**Rule:** 70% Cream / 20% Burgundy / 10% everything else.

---

## Typography

| Use | Font | Weight | Notes |
|-----|------|--------|-------|
| H1 page titles | Playfair Display | 700 | letter-spacing: -0.5px |
| H2 section titles | Playfair Display | 700 | letter-spacing: -0.5px |
| H3 card titles | Playfair Display | 500–600 | |
| Body / UI | Poppins | 300–400 | line-height: 1.7 |
| Labels / eyebrows | Poppins | 600 | letter-spacing: 0.2–0.3em, uppercase |
| Accent / script | Allura | 400 | ONE use per section max — taglines, pull quotes |

---

## Spacing Rhythm

| Scale | Value | Use |
|-------|-------|-----|
| Section padding | `100px 24px` | All full-width sections |
| Inner max-width | `1100px` | Standard content container |
| Card padding | `32–40px` | Product and testimonial cards |
| Grid gap | `32px` | Between cards |
| Feature item gap | `16px` | Icon + text rows |

---

## Buttons

| Style | Shape | Use |
|-------|-------|-----|
| `btn-primary` | Pill (50px radius) | Standard CTA on light sections |
| `btn-hero-cta` | Pill (50px radius), Cream bg | Main hero CTA on dark sections |
| `btn-secondary` | Pill (50px radius), cream outline | Secondary actions **on dark sections only** — cream border + cream text |
| `glass-card-cta` | Pill (50px radius) | CTA inside product cards |
| `btn-gold` | 4px radius | Gold accent button |

**All buttons:** `cursor: pointer`, `transition: 0.3s ease`, hover: `translateY(-1px)` + elevated shadow.

---

## Cards

| Style | Use | Key Properties |
|-------|-----|----------------|
| `glass-card` | Product cards on cream bg | `rgba(255,252,247,0.7)`, `box-shadow: 0 4px 32px rgba(109,46,70,0.08)`, `border: 1px solid rgba(237,183,77,0.25)`, `border-radius: 20px` |
| `product-card` | General product cards | `border-radius: 20px`, `box-shadow: 0 4px 32px rgba(109,46,70,0.08)`, `border: 1px solid rgba(237,183,77,0.25)` — gold border matches glass-card |
| `planner-testimonial-card` | Testimonial cards | `border-radius: 16px`, `box-shadow: 0 4px 24px rgba(109,46,70,0.06)`, `border: 1px solid rgba(162,103,105,0.18)`, hover: `translateY(-2px)` |
| `planner-benefit-card` | Feature/benefit cards on dark bg | `rgba(255,252,247,0.04)`, gold border, `backdrop-filter: blur(10px)` |
| `shop-value-card` | Value cards on dark bg | `rgba(255,252,247,0.05)`, gold border |
| `freebie-card-gold` | Premium freebie cards | `#3D1A2B`, gold border `rgba(237,183,77,0.4)` |

---

## Section System

| Section Type | Style | Background |
|-------------|-------|------------|
| Light / content | `section-standard` or `planner-what-section` | Warm Cream + subtle radial gradient |
| Hero dark (all pages) | `hero-section`, `page-hero`, `planner-hero`, `shop-hero` | `#1E0A16` + radial gradient glow |
| Dark content section | `section-dark`, `shop-story-section` | `#1E0A16` + radial gradient |
| Testimonials | `planner-social-section` | Warm Cream + soft rose gradient |
| CTA dark | `planner-cta-section` | `#1E0A16` + radial gradient |
| Footer | `footer-bar` | Deep Burgundy |
| Email capture | `email-section` | Dusty Rose |

**IMPORTANT — Dark section headings:** Never use `heading-1`, `heading-2`, `about-heading` (Deep Burgundy) on dark sections — they disappear.
- H1 on dark → `page-hero-title` (Warm Cream, 56px)
- H2 on dark → `shop-story-title` (Warm Cream, 48px)
- H3 on dark → use inline style or `shop-value-title` (Gold)

**Dark section gradient pattern:**
```
background-image: radial-gradient(ellipse at 65% 0%, rgba(109,46,70,0.5) 0%, transparent 55%),
                  radial-gradient(ellipse at 20% 100%, rgba(237,183,77,0.1) 0%, transparent 45%);
```

---

## Ornamental Dividers

**Signature divider:** `■ ✦ ■` — Dusty Rose, Poppins, letter-spacing: 0.4em
**Use:** Before section headings as eyebrow labels, via `section-label` style

**Section label format:**
```
■ ✦ ■  [Section Name]
```
Style: `section-label` — Poppins 600, Gold color, 11px, letter-spacing: 3px, uppercase

---

## Section Building Rules

1. Always use the **two-stage build pattern**: create section skeleton → get fresh IDs → append children
2. Max 3 levels deep per `element_builder` call
3. `set_text` on DivBlocks (type Block) does NOT persist — use String child ID via `element_tool > set_text` after creation
4. `set_text` on TextBlock, Paragraph, Heading, Button, TextLink — works in schema
5. String child ID = Block ID with last hex char +1 (e.g., `...abc` → `...abd`)
6. Always snapshot after each section for visual QA
7. MCP cannot delete elements — note orphans for manual cleanup in Webflow UI

---

## /planner Page Key IDs

| Element | ID |
|---------|-----|
| Page | `69af237e7d5f78c15e8da78d` |
| Body | `69af237e7d5f78c15e8da793` |
| Nav section | `1fa7b299-4b38-05a2-b59a-b95eea85817b` |
| Hero section | `823d199a-9d7b-e30b-9547-53443ff7be0e` |
| Hero inner | `69a4d000-49d2-b133-e49c-fe4bffa9ef83` |
| What's Inside section | `012a61f8-080b-9639-1694-79e242921105` |
| Social Proof section | `c2d775dd-c281-b0b1-f47a-8eac0fe613a0` |
| CTA section | `f694acff` (see full in element tree) |
| Footer | `089a9411` (see full in element tree) |

**Manual fix needed:** Delete duplicate empty hero section `938fe636-fed9-24b1-b2c5-0fb092b4cbf5`

---

## Home Page Key IDs

| Element | ID |
|---------|-----|
| Page | `69ab2b4cdb77a8f8f1df4ff6` |
| Body | `69ab2b4cdb77a8f8f1df4ffb` |
| Hero section | `4397ff43-6cdb-9cf7-50bb-c0c72c1f8f9e` |
| Hero H1 | `de0ec38b-2136-edb5-9789-3ee7fd492595` → style: `page-hero-title` |
| Hero subtext | `5dacc9d8-3f01-92e6-9470-f6f9ad4ad004` → style: `hero-subtext` |
| Products section | `43efe8a8-5f13-bf4b-6fb3-5e44bccfc340` |
| Mission/dark section | `533c3fc4-cb8e-aad7-6a4f-a303b72939a3` |
| Mission H2 | `4e161631-67ae-762e-f4fe-78d30a71cc8a` → style: `shop-story-title` |
| Email section | `9fea09db-d0cf-1d31-f83d-2028e94e01fd` |
| Footer | `48d5a6f4-3076-0c2a-d09e-a67ea7aab6b5` |

---

## Shop Page Key IDs

| Element | ID |
|---------|-----|
| Page | `69ae5e95ce2cb29d6976ea25` |
| Body | `69ae5e95ce2cb29d6976ea2b` |
| Hero | `ef4abc1a-c516-9031-5354-4a8fccc5952a` |
| Products section | `214790c0-7e3a-eb02-e048-06843f7869ce` |
| Story/Values section | `74d7fdc3-0aa7-8d01-e2ae-6e3c6bf326f2` |
| Freebie section | `51eccd17-96a0-866e-fcca-b4cee1706bb8` |

---

## About Page Key IDs

| Element | ID |
|---------|-----|
| Page | `69ab53fbeb47aea52d01f6df` |
| Body | `69ab53fbeb47aea52d01f6e7` |
| Hero section | `e89de1e0-ac40-027d-5b38-82044569a673` |
| Story block | `cf4d4279-8770-3fe4-566e-89bd52f545c8` |
| Values section | `0fb490fa-4a02-d03c-67c3-933f0f13b2d6` |
| Value card 1 | `9fa41400-0998-cd7d-0907-2007fd9d6e55` |
| Value card 2 | `94ac1bb9-d89d-ef51-2714-f1f229791cf0` |
| Value card 3 | `03384bfb-0089-fc27-7a23-38c05dd9fcae` |
| Products teaser | `f9ca7f10-bcbb-a8fd-6126-59e038c36f36` |
| Email section | `f4b9ffdb-7216-28e1-6eee-004652c92466` |
| Footer | `02ab5951-b825-86e5-2280-755c5ce41b3a` |

---

## Variable Collection IDs

| Variable | ID | Value |
|----------|----|-------|
| Warm Cream | `variable-7ff33c32-0fd1-f855-8f6c-8f3c5e174544` | `#FFFCF7` |
| Deep Burgundy | `variable-33ffedbd-dc9b-7c8f-2693-82dc3f1c6dec` | `#6D2E46` |
| Dusty Rose | `variable-edee48fe-83cf-d070-b42d-4481ffe0828d` | `#A26769` |
| Soft Pink | `variable-b5a3b8b2-0999-530c-37d5-bd8f241be585` | `#D5B9B2` |
| Gold | `variable-2eebe701-491e-f59d-e3b1-a6bcf86bf1a7` | `#EDB74D` |
| Playfair Display | `variable-918e539a-be55-562e-524b-093d35b47195` | font |
| Poppins | `variable-d893d504-580e-86e2-23b2-eb1d9234c5d2` | font |
| Allura | `variable-2b5d17d6-834d-c246-e924-eab9186c9580` | font |
| Collection | `collection-0583fac4-8ef2-0ee2-71b0-cbe36e2665c2` | ELU Brand |

---

## PDF Planner — Weekly Day-by-Day Page

**Design reference files (read before editing any weekly layout in `generate_planner.py`):**
- `.superpowers/brainstorm/73816-1773941173/page-design.html`
- `.superpowers/brainstorm/73816-1773941173/cheatsheet-layout.html`

**Locked design decisions (Session 11):**
- Page background: `#FFFCF7` (Warm Cream)
- Header bar: `linear-gradient(135deg, #6D2E46 0%, #1E0A16 100%)` — full width, month name in cream Playfair, week/date in gold Poppins uppercase
- Day cards: `#f9eae1` background, `border-radius:6px`, burgundy text, 2 write lines spaced at `28px` margin
- Sidebar prompt boxes: `#D5B9B2` (Soft Pink), `border-radius:8px`, lines use `space-between` flex layout
- No quote bar at the bottom of weekly pages
- Working script backup: `Code/scripts/generate_planner_WORKING.py`
