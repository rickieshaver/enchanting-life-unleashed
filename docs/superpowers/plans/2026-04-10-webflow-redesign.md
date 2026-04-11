# ELU Webflow Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Enchanting Life Unleashed Webflow site using the Stitch "Grounded Oracle" design system, replacing all existing page layouts while preserving Kit form integrations and quiz logic.

**Architecture:** Design system first (global classes + symbols), then pages in priority order. Each page is rebuilt by reading its Stitch reference HTML, recreating the layout natively in Webflow via MCP, replacing placeholder content with real ELU copy, and wiring integrations. The Nav and Footer are Webflow Symbols applied to every page.

**Tech Stack:** Webflow MCP (site ID `69ab2b4bdb77a8f8f1df4fb6`), Tailwind design reference (Stitch HTML files), ConvertKit (Kit) forms, Google Fonts (Newsreader · Manrope · Plus Jakarta Sans · Allura)

---

## Critical Webflow MCP Rules (read before every task)

- **Two-stage build:** skeleton first → call `element_snapshot_tool` to get IDs → append children
- **Max 3 levels deep** per `element_builder` call — split deeper structures across multiple calls
- **Never `set_text` on a DivBlock** — use a String (RichText or Paragraph) child element
- **`get_all_elements` is 60–90KB** — pipe output to a file and parse with Python, never read raw
- **`set_style` returns empty `styles[]`** on success — this is normal, style IS applied
- **One Designer tab only** — ensure only one Webflow Designer tab is open before any MCP call
- **Designer wake-up link:** `https://enchanting-life-unleashed-f0b269.design.webflow.com/?pageId=69af237e7d5f78c15e8da78d`

## Reference Files

All Stitch source files live at:
`/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/website/stitch_enchanting_life_unleashed_site/`

| Page | Source Folder | Screenshot |
|---|---|---|
| Home | `home_boundary_quiz_cta/code.html` | `home_boundary_quiz_cta/screen.png` |
| Shop | `shop_enchanting_life_unleashed/code.html` | `shop_enchanting_life_unleashed/screen.png` |
| About | `about_enchanting_life_unleashed/code.html` | `about_enchanting_life_unleashed/screen.png` |
| Quiz | `quiz_the_descent_intro/code.html` | `quiz_the_descent_intro/screen.png` |
| Quiz Questions | `quiz_active_question_flow/code.html` | `quiz_active_question_flow/screen.png` |
| Quiz Results | `quiz_archetype_results/code.html` | `quiz_archetype_results/screen.png` |
| Product (template) | `product_strategic_deep_dive/code.html` | `product_strategic_deep_dive/screen.png` |
| Freebies | `freebies_enchanting_life_unleashed/code.html` | `freebies_enchanting_life_unleashed/screen.png` |
| Blog | `the_transmission_blog_variation_1/code.html` | `the_transmission_blog_variation_1/screen.png` |
| Blog Post | `blog_post_the_immersive_experience/code.html` | `blog_post_the_immersive_experience/screen.png` |
| Contact | `contact_enchanting_life_unleashed/code.html` | `contact_enchanting_life_unleashed/screen.png` |
| Design System | `ethereal_verity/DESIGN.md` | — |

## Existing Integrations to Preserve

| Integration | ID | Pages |
|---|---|---|
| KitLoader script | `kitloader` | All pages |
| KitFormWire script | `kitformwire` | Home, About, Blog, Freebies, Footer |
| Kit newsletter form | `8935231` | All email captures |
| Kit quiz gate form | `8924567` | Boundary Archetype Quiz |
| All 8 BBQ quiz scripts | `bbqcsspart1` through `bbqemailresults` | Quiz page only |
| MarqueeKeyframe CSS | `marqueekeyframe` | As needed |

---

## Task 1: Global Design System — Fonts & Color Variables

**Goal:** Add the 4 Google Fonts and all color variables to the Webflow site so every page can reference them.

**Files:**
- Webflow Site Settings → Fonts
- Webflow Site Settings → Custom Code (head)
- Webflow Style Guide → Color Swatches

- [ ] **Step 1: Open Webflow site settings**

  In Webflow Designer, go to **Site Settings → Fonts**. Verify the site ID is `69ab2b4bdb77a8f8f1df4fb6`.

- [ ] **Step 2: Add Google Fonts via site custom code**

  In **Site Settings → Custom Code → Head Code**, add (preserving any existing scripts):

  ```html
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:wght@200..800&family=Allura&display=swap" rel="stylesheet">
  ```

- [ ] **Step 3: Add color swatches to Webflow Style Guide**

  In Webflow Designer, open **Style Guide → Colors** and add each swatch:

  | Swatch Name | Hex |
  |---|---|
  | `primary` | `#521830` |
  | `primary-container` | `#6d2e46` |
  | `secondary` | `#864f51` |
  | `surface` | `#fcf9f4` |
  | `surface-container-low` | `#f6f3ee` |
  | `surface-container` | `#f0ede9` |
  | `surface-container-lowest` | `#ffffff` |
  | `gold` | `#EDB74D` |
  | `on-surface` | `#1c1c19` |
  | `on-surface-variant` | `#524347` |
  | `error` | `#ba1a1a` |

- [ ] **Step 4: Set site body defaults**

  In Webflow Designer, select the **Body** element on any page:
  - Font family: Manrope
  - Font size: 16px
  - Color: `#1c1c19`
  - Background: `#fcf9f4`

- [ ] **Step 5: Verify fonts load**

  Preview any page. Confirm body text renders in Manrope. If fonts don't load, check the Google Fonts link in head code is saved correctly.

---

## Task 2: Global Typography & Button Classes

**Goal:** Create all reusable Webflow classes so every page uses the same type scale and button styles.

- [ ] **Step 1: Create typography classes**

  On any page, create a temporary Heading element and apply each class. Save to Webflow Styleguide:

  | Class | Font | Size | Weight | Letter Spacing | Notes |
  |---|---|---|---|---|---|
  | `display` | Newsreader | 56px | 700 | -0.02em | Line height 1.1 |
  | `heading-1` | Newsreader | 40px | 600 | -0.01em | Line height 1.2 |
  | `heading-2` | Newsreader | 28px | 600 | 0 | Line height 1.3 |
  | `body` | Manrope | 16px | 400 | 0 | Line height 1.6 |
  | `body-lg` | Manrope | 18px | 400 | 0 | Line height 1.7 |
  | `label` | Plus Jakarta Sans | 14px | 500 | 0.1em | All caps, line height 1.4 |
  | `script` | Allura | 24px | 400 | 0 | Use sparingly |

- [ ] **Step 2: Create editorial-line utility class**

  Create a Div element, apply class `editorial-line`:
  - Width: 80px
  - Height: 2px
  - Background: `#EDB74D`
  - Display: block

- [ ] **Step 3: Create btn-primary class**

  Create a Link Block or Button element, apply class `btn-primary`:
  - Background: linear-gradient(`#521830`, `#6d2e46`)
  - Text color: `#EDB74D`
  - Font: Plus Jakarta Sans, 12px, uppercase, 0.15em tracking
  - Padding: 16px top/bottom, 32px left/right
  - Border radius: 0px
  - Hover state: opacity 90%

- [ ] **Step 4: Create btn-secondary class**

  Create a Link Block, apply class `btn-secondary`:
  - Background: `#fcf9f4`
  - Text color: `#521830`
  - Font: Plus Jakarta Sans, 12px, uppercase, 0.15em tracking
  - Padding: 16px top/bottom, 32px left/right
  - Border: 1px solid `rgba(237, 183, 77, 0.2)`
  - Border radius: 0px

- [ ] **Step 5: Create btn-ghost class**

  Create a Link Block, apply class `btn-ghost`:
  - Background: none
  - Text color: `#EDB74D`
  - Font: Plus Jakarta Sans, 12px, uppercase, 0.15em tracking
  - Padding: 8px 0px
  - Hover: text-decoration underline

- [ ] **Step 6: Verify classes in Styleguide**

  Open Webflow Styleguide. Confirm all 7 type classes, `editorial-line`, and 3 button classes are present with correct properties.

---

## Task 3: Navigation Symbol

**Goal:** Build the site-wide navigation as a Webflow Symbol so it can be applied to all 10 pages.

**Reference:** `home_boundary_quiz_cta/code.html` lines 92–113

- [ ] **Step 1: Read nav HTML from Stitch source**

  Read `/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/website/stitch_enchanting_life_unleashed_site/home_boundary_quiz_cta/code.html` lines 92–113 for exact structure reference.

- [ ] **Step 2: Build nav skeleton via Webflow MCP**

  Call `element_builder` on the Home page (`69ab2b4cdb77a8f8f1df4ff6`) to create:

  ```
  Nav (tag: nav)
  └── Container (max-width 1280px, px 48px, py 32px, flex, justify-between, align-center)
      ├── Logo Link (tag: a, href: /, font: Newsreader, 24px, bold, italic, color: #521830)
      ├── Nav Links (flex, gap 40px, hide on mobile)
      │   ├── Link: Home → /
      │   ├── Link: Shop → /shop
      │   ├── Link: Blog → /blog
      │   ├── Link: About → /about
      │   └── Link: Contact → /contact
      └── CTA Button (btn-primary class, "Take the Quiz" → /boundary-archetype-quiz)
  ```

  Nav styles:
  - Background: `#fcf9f4`
  - Position: sticky, top 0, z-index 50
  - Border-bottom: none (use bg color shift)

  Nav link styles:
  - Font: Newsreader, uppercase, wide tracking (0.15em)
  - Color: `#864f51` → `#521830` on hover
  - Active page: `#521830` with 2px gold underline (`#EDB74D`)

- [ ] **Step 3: Add mobile hamburger**

  Add a mobile menu button (visible below 768px, hidden above):
  - Icon: ☰ (hamburger)
  - Color: `#521830`
  - Below 768px: show hamburger, hide nav links and CTA

- [ ] **Step 4: Convert to Symbol**

  Select the entire nav element in Webflow → right-click → **Create Symbol** → name it `Nav`.

- [ ] **Step 5: Verify nav symbol**

  Preview the Home page. Confirm logo, all 5 links, and "Take the Quiz" button render correctly at desktop and mobile widths.

---

## Task 4: Footer Symbol

**Goal:** Build the site-wide footer as a Webflow Symbol.

**Reference:** Check `home_boundary_quiz_cta/code.html` for footer HTML (near end of file).

- [ ] **Step 1: Read footer HTML from source**

  Read the last 60 lines of `home_boundary_quiz_cta/code.html` for footer structure.

- [ ] **Step 2: Build footer skeleton**

  Call `element_builder` on Home page to create:

  ```
  Footer (tag: footer, bg: #521830, color: #fcf9f4, px: 48px, py: 64px)
  └── Container (max-width 1280px, grid 3-col on desktop, 1-col on mobile, gap 48px)
      ├── Col 1: Brand
      │   ├── Logo text: "Enchanting Life Unleashed" (Newsreader italic, 20px, cream)
      │   └── Tagline: "Where Soul Meets Strategy" (Manrope, 14px, #f6f3ee)
      ├── Col 2: Quick Links
      │   ├── Label: "Navigate" (label class, gold, uppercase)
      │   └── Links: Home · Shop · Blog · About · Contact · Take the Quiz
      └── Col 3: Email Signup
          ├── Label: "Join the Transmission" (label class, gold, uppercase)
          ├── Email input (bottom-border only: 1px #EDB74D, bg transparent, cream text)
          └── Submit button (btn-primary: "Subscribe")
  ```

  Footer bottom bar (separate row):
  - `© 2026 Enchanting Life Unleashed. All rights reserved.`
  - Font: Plus Jakarta Sans, 12px, `#864f51`
  - Border-top: none (bg color is sufficient separator)

- [ ] **Step 3: Wire email signup to Kit**

  The email form in the footer should have class `email-form-row` so the existing `kitformwire` script wires it to Kit form `8935231` automatically.

- [ ] **Step 4: Convert to Symbol**

  Select entire footer → **Create Symbol** → name it `Footer`.

- [ ] **Step 5: Verify footer**

  Preview Home page. Confirm 3 columns render, links are correct, email form is present.

---

## Task 5: Home Page

**Goal:** Rebuild the Home page (`/`) using `home_boundary_quiz_cta` as reference.

**Existing page ID:** `69ab2b4cdb77a8f8f1df4ff6`
**Reference:** `home_boundary_quiz_cta/code.html` + `screen.png`

- [ ] **Step 1: Read full Stitch source**

  Read `/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/website/stitch_enchanting_life_unleashed_site/home_boundary_quiz_cta/code.html` (full file) to identify all sections.

  Sections to build:
  1. Hero — "Your power doesn't need permission, it needs a plan"
  2. Featured products strip (3 cards)
  3. Quiz CTA — "Begin the descent"
  4. Brand philosophy statement
  5. Email capture section

- [ ] **Step 2: Clear existing Home page content**

  In Webflow Designer, open the Home page. Delete all existing sections (keep Nav and Footer symbols if already applied).

- [ ] **Step 3: Apply Nav and Footer symbols**

  Drag the `Nav` symbol to the top of the page and `Footer` symbol to the bottom.

- [ ] **Step 4: Build Hero section**

  Use `element_builder` (max 3 levels deep per call, split as needed):

  ```
  Section (min-height: 921px, bg: surface, flex, align-center, px: 48px, pt: 48px, pb: 96px)
  └── Container (max-width 1280px, grid 12-col, gap 48px, align-center)
      ├── Left col (col-span 7)
      │   ├── editorial-line div
      │   ├── H1 (display class): "Your power doesn't need permission,"
      │   │   └── Italic span: "it needs a plan."
      │   ├── Body-lg paragraph: "Soul meets strategy. Tools for the woman who refuses to choose between ambition and magic."
      │   └── btn-primary link: "Take the Boundary Archetype Quiz" → /boundary-archetype-quiz
      └── Right col (col-span 5)
          └── Image: hero editorial portrait (aspect 4:5, object-cover)
  ```

  Hero text exact copy:
  - H1: `Your power doesn't need permission,` *(italic)* `it needs a plan.`
  - Subtext: `Soul meets strategy. Tools for the woman who refuses to choose between ambition and magic.`
  - CTA: `Take the Boundary Archetype Quiz`

- [ ] **Step 5: Build featured products strip**

  3-column product preview cards (link to product pages):

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px)
      ├── Section label (label class): "The Implementation Shop"
      ├── H2 (heading-1): "Tools built for the Grounded Oracle."
      └── Product Grid (3 cols, gap: 48px)
          ├── Card 1: Lunar Boundary Planner ($37) → /lunar-boundary-planner
          ├── Card 2: Moon Cycle Life Planner ($47) → /moon-cycle-life-planner
          └── Card 3: Freebies → /freebies
  ```

  Each card:
  - Image: 4:5 aspect ratio, object-cover, bg: `surface-container`
  - Category tag: `label` class, uppercase, top-left overlay
  - Product name: `heading-2`
  - 1-line description: `body`
  - Price + "Shop Now" (btn-primary)

- [ ] **Step 6: Build Quiz CTA section**

  ```
  Section (bg: primary #521830, px: 48px, py: 96px, color: cream)
  └── Container (max-width 1280px, grid 2-col)
      ├── Left: editorial-line + H2 (heading-1, cream): "Identify the Leak in Your Power."
      │         Body (cream, 80% opacity): "The Boundary Archetype Quiz reveals which of 3 archetypes is costing you energy — and what to do about it."
      │         btn-secondary: "Begin the Descent" → /boundary-archetype-quiz
      └── Right: decorative image (dark editorial texture)
  ```

- [ ] **Step 7: Build email capture section**

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px, max-width 600px centered)
      ├── Script text (script class): "Join the Transmission"
      ├── H2 (heading-2): "Weekly strategy + magic. No fluff."
      ├── Email input (class: email-form-row, bottom-border only: 1px gold)
      └── btn-primary: "Subscribe"
  ```

  Ensure form div has class `email-form-row` for KitFormWire script.

- [ ] **Step 8: Verify page scripts**

  Confirm the following scripts are applied to the Home page:
  - `kitloader` (head)
  - `kitformwire` (footer)

  Use `data_scripts_tool` to check and add if missing.

- [ ] **Step 9: Preview and compare**

  Open preview. Side-by-side compare against `home_boundary_quiz_cta/screen.png`. Verify:
  - [ ] Hero layout matches (large left headline, right image)
  - [ ] editorial-line present above H1
  - [ ] Product cards show correct names and prices
  - [ ] Quiz CTA section has burgundy background
  - [ ] Email form present and has `email-form-row` class

---

## Task 6: Shop Page

**Goal:** Rebuild `/shop` using `shop_enchanting_life_unleashed` as reference.

**Existing page ID:** `69ae5e95ce2cb29d6976ea25`
**Reference:** `shop_enchanting_life_unleashed/code.html` + `screen.png`

- [ ] **Step 1: Read full Stitch source**

  Read `shop_enchanting_life_unleashed/code.html` in full. Key sections:
  1. Header — "The Implementation Shop" with script tagline
  2. Category filter tabs (All Products · Systems · Rituals · Sovereignty)
  3. Product grid (3 columns)
  4. Footer email capture

- [ ] **Step 2: Clear existing Shop page content**

  Delete existing sections, keep Nav/Footer symbols.

- [ ] **Step 3: Apply Nav and Footer symbols**

  Confirm `Nav` and `Footer` symbols are on page.

- [ ] **Step 4: Build shop header**

  ```
  Section (bg: surface, px: 48px, pt: 96px, pb: 48px)
  └── Container (max-width 1280px)
      └── Flex row (align: baseline, gap: 32px)
          ├── H1 (display class): "The Implementation Shop"
          ├── editorial-line div (horizontal, self-center)
          └── Script text (script class, 30px): "Tools for the Grounded Oracle"
  ```

- [ ] **Step 5: Build category filter tabs**

  ```
  Section (bg: surface, px: 48px, pb: 64px)
  └── Container (max-width 1280px)
      └── Flex row (gap: 48px, border-bottom: 1px solid rgba(132,115,119,0.3), pb: 24px)
          ├── Button "All Products" (label class, primary color, bold — active state)
          ├── Button "Systems" (label class, secondary color)
          ├── Button "Rituals" (label class, secondary color)
          └── Button "Sovereignty" (label class, secondary color)
  ```

  Note: Category filter is visual only in Webflow — wire active state with Webflow interactions if CMS is used.

- [ ] **Step 6: Build product grid**

  Products to show (real ELU products):

  | Product | Price | Category | URL |
  |---|---|---|---|
  | Lunar Boundary Planner | $37 | Sovereignty | /lunar-boundary-planner |
  | Moon Cycle Life Planner | $47 | Rituals | /moon-cycle-life-planner |

  ```
  Section (bg: surface, px: 48px, pb: 128px)
  └── Container (max-width 1280px)
      └── Grid (3-col on desktop, 2-col tablet, 1-col mobile, gap: 64px)
          ├── Product Card: Lunar Boundary Planner
          └── Product Card: Moon Cycle Life Planner
  ```

  Each product card structure:
  ```
  Div (flex-col, group)
  ├── Image wrapper (aspect 4:5, bg: surface-container-low, overflow-hidden)
  │   ├── Product image (object-cover, hover: scale 105% transition 700ms)
  │   └── Category tag overlay (label class, top-left, bg: surface, px: 16px, py: 4px)
  ├── Product name (heading-2, mt: 32px)
  ├── Description (body, secondary color, flex-grow)
  └── Price row (flex, justify-between, pt: 24px, border-top: 1px solid rgba(212,193,198,0.3))
      ├── Price (Newsreader, 20px, primary)
      └── btn-primary: "Add to Bag" → product page URL
  ```

- [ ] **Step 7: Verify page scripts**

  Confirm `kitloader` is applied to Shop page. Use `data_scripts_tool`.

- [ ] **Step 8: Preview and compare**

  Compare against `shop_enchanting_life_unleashed/screen.png`. Verify:
  - [ ] "The Implementation Shop" headline with script tagline
  - [ ] Category filter tabs present
  - [ ] Product cards with 4:5 images, price, and CTA
  - [ ] Sharp corners throughout, no rounded elements

---

## Task 7: About Page

**Goal:** Rebuild `/about` using `about_enchanting_life_unleashed` as reference.

**Existing page ID:** `69ab53fbeb47aea52d01f6df`
**Reference:** `about_enchanting_life_unleashed/code.html` + `screen.png`

- [ ] **Step 1: Read full Stitch source**

  Read `about_enchanting_life_unleashed/code.html` in full. Key sections:
  1. Hero — "Boundaries are doors with locks YOU control" + founder portrait
  2. Founder story — "Why magic needs systems"
  3. The Pillars of the Practice (3 columns)
  4. CTA strip — "Your evolution is not an accident. It is a strategy."

- [ ] **Step 2: Clear existing About page, apply symbols**

- [ ] **Step 3: Build hero section (12-col asymmetric layout)**

  ```
  Section (bg: surface-container-low, pt: 48px, overflow-hidden)
  └── Container (max-width 1280px, px: 48px, grid 12-col, align: end)
      ├── Left col (col-span 5, pb: 96px)
      │   ├── Flex row (align-center, gap: 16px, mb: 32px)
      │   │   ├── editorial-line div
      │   │   └── Label: "Founder's Statement"
      │   ├── H1 (display class, line-height 0.9):
      │   │   "Boundaries are doors with locks "
      │   │   Italic span: "YOU"
      │   │   " control."
      │   └── Body-lg (mt: 48px, secondary, max-width 384px):
      │       "Redefining the architecture of a spiritual life through the lens of authority, precision, and unapologetic self-governance."
      └── Right col (col-span 7)
          ├── Founder portrait (aspect 4:5, object-cover, grayscale 20%, contrast 110%)
          └── Editorial accent overlay (absolute, bottom-right, bg: surface, p: 48px)
              ├── Script text: "The Oracle"
              └── Label: "Established 2024 — A movement for the grounded mystic."
  ```

- [ ] **Step 4: Build founder story section**

  ```
  Section (bg: surface, py: 128px)
  └── Container (max-width 1280px, px: 48px, grid 2-col, gap: 96px, align: start)
      ├── Left col
      │   ├── H2 (heading-1): "Why magic needs systems."
      │   ├── Body-lg (secondary): [founder story paragraph 1 — see below]
      │   ├── Body-lg (secondary): [founder story paragraph 2 — see below]
      │   └── Pull-quote (border-left: 2px #EDB74D, pl: 32px)
      │       └── Heading-2 italic (primary): [pull quote — see below]
      └── Right col
          └── Image (aspect 3:4, object-cover)
  ```

  Copy:
  - P1: "For years, I watched the world of self-growth dissolve into a cloud of vague intentions and ungrounded rituals. It lacked the one thing that truly transforms a life: Structure."
  - P2: "Without a system, magic is just a wish. Without boundaries, energy is just a leak. Enchanting Life Unleashed was born from the necessity of bridging the ethereal with the industrial."
  - Pull quote: "Magic without structure is just noise. Structure without magic is just machinery."

- [ ] **Step 5: Build Pillars section**

  ```
  Section (bg: surface-container-low, py: 96px)
  └── Container (max-width 1280px, px: 48px)
      ├── Label: "The Pillars of the Practice"
      └── Grid (3-col on desktop, gap: 64px, mt: 64px)
          ├── Pillar 1: "Radical Clarity" — "Know exactly what you want and why. No borrowed goals."
          ├── Pillar 2: "Embodied Authority" — "Lead from your actual values, not your fear of disappointing others."
          └── Pillar 3: "Structural Luxury" — "Build systems beautiful enough to actually use."
  ```

  Each pillar:
  - editorial-line (mb: 24px)
  - Heading-2: pillar name
  - Body: pillar description

- [ ] **Step 6: Build CTA strip**

  ```
  Section (bg: primary #521830, py: 96px, px: 48px)
  └── Container (max-width 1280px)
      ├── Script text (gold, 36px): "It is a strategy."
      ├── H2 (heading-1, cream): "Your evolution is not an accident."
      └── btn-secondary: "Take the Quiz" → /boundary-archetype-quiz
  ```

- [ ] **Step 7: Verify page scripts**

  Confirm `kitloader` and `kitformwire` applied to About page.

- [ ] **Step 8: Preview and compare**

  Compare against `about_enchanting_life_unleashed/screen.png`. Verify:
  - [ ] Asymmetric 12-col hero with portrait
  - [ ] "YOU" italicized in headline
  - [ ] Editorial accent overlay on portrait
  - [ ] 3-pillar grid present
  - [ ] Burgundy CTA strip at bottom

---

## Task 8: Boundary Archetype Quiz

**Goal:** Create new `/boundary-archetype-quiz` page and migrate all existing quiz logic from `/boundary-blueprint`.

**New page:** Create new page at slug `/boundary-archetype-quiz`
**Reference:** `quiz_the_descent_intro/code.html` + `quiz_active_question_flow/code.html` + `quiz_archetype_results/code.html`

- [ ] **Step 1: Read all three quiz Stitch sources**

  Read the following files to understand full quiz flow:
  - `quiz_the_descent_intro/code.html`
  - `quiz_active_question_flow/code.html`
  - `quiz_archetype_results/code.html`

- [ ] **Step 2: Create new page**

  In Webflow, create new page:
  - Name: `Boundary Archetype Quiz`
  - Slug: `boundary-archetype-quiz`
  - Apply Nav and Footer symbols

- [ ] **Step 3: Build quiz intro hero**

  ```
  Section (bg: surface, px: 48px, pt: 48px, pb: 80px)
  └── Container (max-width 1280px, grid 12-col)
      ├── Left col (col-span 7)
      │   ├── Label: "Discovery Session 01"
      │   ├── H1 (display class): "The Boundary Archetype Quiz"
      │   ├── Pull-quote (Newsreader italic, secondary, 20px):
      │   │   "Your magic needs a map. Identify your archetype."
      │   ├── Body: "Stop wandering through the digital noise. The Boundary Archetype Quiz is a data-driven mirror designed to strip away the clutter and reveal the specific resonance of your influence. This is not a personality test. It is a strategic alignment."
      │   └── btn-primary: "Begin the Descent" → triggers quiz (id: start-quiz-btn)
      └── Right col (col-span 5)
          └── Product image (editorial dark photography)
  ```

- [ ] **Step 4: Build quiz feature callouts (3 columns)**

  ```
  Section (bg: surface-container-low, px: 48px, py: 64px)
  └── Container (max-width 1280px, grid 3-col, gap: 48px)
      ├── "Phase 01: Uproot" — "Uprooting the false narratives of your current workflow."
      ├── "Phase 02: Measure" — "Measuring the silence between your ambition and your output."
      └── "Phase 03: Define" — "Defining the authority only you are qualified to hold."
  ```

  Each callout:
  - editorial-line (mb: 16px)
  - Label (phase number, gold)
  - Body (description, secondary)

- [ ] **Step 5: Build "beyond the surface" section**

  ```
  Section (bg: surface, px: 48px, py: 96px, grid 2-col)
  └── Container (max-width 1280px)
      ├── Left: dark editorial image (aspect 4:5)
      └── Right
          ├── Script text (gold): "Beyond the surface"
          ├── H2 (heading-1): "This is the end of accidental living."
          ├── Body: "We provide the lexicon for your intuition. By identifying which of the four archetypes you currently embody, you gain access to a bespoke system of rituals and strategic containers."
          └── btn-ghost: "View Sample Archetypes →" (scroll to archetypes)
  ```

- [ ] **Step 6: Add quiz container div**

  Add a Div with ID `bbq-root` — this is where the existing BBQ quiz scripts inject the quiz HTML.

  ```
  Section (bg: surface-container-low, px: 48px, py: 96px)
  └── Div id="bbq-root" (min-height: 400px)
  ```

- [ ] **Step 7: Migrate quiz scripts to new page**

  Apply all 8 BBQ scripts + kitloader to the new `/boundary-archetype-quiz` page using `data_scripts_tool`:
  - `kitloader` (head)
  - `bbqcsspart1` (head)
  - `bbqcsspart2` (head)
  - `bbqquestions16` (footer)
  - `bbqquestions712` (footer)
  - `bbqarchetypes` (footer)
  - `bbqhtmlbuilder` (footer)
  - `bbqquizlogic` (footer)
  - `bbqemailresults` (footer)

- [ ] **Step 8: Verify quiz loads**

  Preview the page. Confirm:
  - [ ] Intro hero renders correctly
  - [ ] `#bbq-root` div is present in DOM
  - [ ] Quiz HTML injects into `#bbq-root` after page loads
  - [ ] 12 questions display
  - [ ] Email gate appears before results
  - [ ] Results page shows archetype (Open Door, Cracked Window, or Sacred Boundary Keeper)

- [ ] **Step 9: Add redirect from old URL**

  In Webflow Site Settings → 301 Redirects, add:
  - `/boundary-blueprint` → `/boundary-archetype-quiz`

---

## Task 9: Lunar Boundary Planner Page

**Goal:** Create `/lunar-boundary-planner` product page.

**Reference:** `product_strategic_deep_dive/code.html` + `screen.png`

- [ ] **Step 1: Read product page Stitch source**

  Read `product_strategic_deep_dive/code.html` in full. Key sections:
  1. Hero — product name, price, description, CTA
  2. What's inside — feature list
  3. Who it's for
  4. Testimonial / social proof
  5. Second CTA

- [ ] **Step 2: Create new page**

  - Name: `Lunar Boundary Planner`
  - Slug: `lunar-boundary-planner`
  - Apply Nav and Footer symbols

- [ ] **Step 3: Build product hero**

  ```
  Section (bg: surface-container-low, px: 48px, pt: 96px, pb: 80px)
  └── Container (max-width 1280px, grid 2-col, gap: 96px)
      ├── Left col: Product image (aspect 4:5, object-cover)
      └── Right col
          ├── Label: "Sovereignty · Digital Planner"
          ├── editorial-line
          ├── H1 (heading-1): "Lunar Boundary Planner"
          ├── Script text (gold): "From scattered to sovereign."
          ├── Body-lg: "A quarterly planner built on lunar cycles — designed to help you set and hold boundaries with clarity, rhythm, and intention. Q1 and Q2 ready. Full year in progress."
          ├── Price display (Newsreader, 48px, primary): "$37"
          └── btn-primary: "Get the Planner" → [Stripe link — placeholder until wired manually]
  ```

- [ ] **Step 4: Build "What's Inside" section**

  ```
  Section (bg: surface, px: 48px, py: 96px)
  └── Container (max-width 1280px)
      ├── Label: "What's Inside"
      ├── H2 (heading-2): "Everything you need to build boundaries that actually hold."
      └── Feature grid (2-col, gap: 48px)
          ├── "Quarterly Planning Framework" — Structured around the lunar cycle with daily, weekly, and monthly sections
          ├── "Boundary Mapping Worksheets" — Identify where your energy is leaking and close the gaps
          ├── "Moon Phase Ritual Prompts" — Align your planning with new moon intentions and full moon releases
          └── "Printable 8.5×11 PDF" — 85-page planner, print at home or send to a local printer
  ```

- [ ] **Step 5: Build "Who It's For" section**

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px, grid 2-col)
      ├── H2 (heading-2): "This is for you if..."
      └── List (body, secondary, gap: 24px)
          ├── "You say yes when you mean no — and you're exhausted by it."
          ├── "You want structure that honors your energy cycles, not fights them."
          ├── "You're spiritually aware but crave practical tools."
          └── "You're ready to stop leaking energy and start directing it."
  ```

- [ ] **Step 6: Build second CTA**

  ```
  Section (bg: primary #521830, px: 48px, py: 80px)
  └── Container (max-width 1280px, text-center)
      ├── H2 (heading-1, cream): "Your boundaries are the blueprint."
      ├── Body (cream, 80% opacity): "Q1 & Q2 available now. Full year coming soon."
      └── btn-secondary: "Get the Planner — $37" → [Stripe link]
  ```

- [ ] **Step 7: Preview and compare**

  Compare against `product_strategic_deep_dive/screen.png`. Verify layout, typography, and button styles match.

---

## Task 10: Moon Cycle Life Planner Page

**Goal:** Create `/moon-cycle-life-planner` product page using the same template as Task 9.

**Reference:** Same `product_strategic_deep_dive/code.html` template, different content.

- [ ] **Step 1: Duplicate Lunar Boundary Planner page**

  In Webflow, duplicate the `/lunar-boundary-planner` page.
  - New name: `Moon Cycle Life Planner`
  - New slug: `moon-cycle-life-planner`

- [ ] **Step 2: Update hero content**

  Replace all copy on the duplicated page:
  - Title: `Moon Cycle Life Planner`
  - Script tagline: `"Plan with the moon. Live with intention."`
  - Description: `"A full-year 2026 planner built around the lunar calendar — track moon phases, set monthly intentions, and align your life with natural rhythms. Premium redesign complete."`
  - Price: `$47`
  - Label: `"Rituals · Digital Planner"`

- [ ] **Step 3: Update "What's Inside"**

  - "2026 Full Moon Calendar" — All 13 full moons with dates, phase names, and intention prompts
  - "Monthly Ritual Framework" — New moon seeding + full moon releasing structure for each month
  - "Life Areas Planner" — Track relationships, work, health, creativity, and finances by lunar cycle
  - "151-Page Premium PDF" — Print at home or send to print shop

- [ ] **Step 4: Update "Who It's For"**

  - "You're ready to stop living reactively and start planning proactively."
  - "You want your calendar to reflect your actual values."
  - "You're interested in lunar rhythms but need a practical system."
  - "You want a planner that's beautiful enough to actually open every day."

- [ ] **Step 5: Update second CTA**

  - Headline: `"The moon doesn't wait. Neither should you."`
  - Body: `"2026 planner. 151 pages. Every lunar phase covered."`
  - Button: `"Get the Planner — $47"`

- [ ] **Step 6: Add redirect**

  In Webflow Site Settings → 301 Redirects:
  - `/planner` → `/moon-cycle-life-planner`

- [ ] **Step 7: Preview and verify**

  Confirm content updated, layout matches product template pattern.

---

## Task 11: Freebies Page

**Goal:** Rebuild `/freebies` (replaces `/moon-magic`) using `freebies_enchanting_life_unleashed` as reference.

**Reference:** `freebies_enchanting_life_unleashed/code.html` + `screen.png`

- [ ] **Step 1: Read Stitch source**

  Read `freebies_enchanting_life_unleashed/code.html` in full. Key sections:
  1. Hero — freebie name, description, opt-in form
  2. What's inside (3 bullets)
  3. Testimonial
  4. Secondary CTA

- [ ] **Step 2: Find or create Freebies page**

  Check if `/freebies` page exists in Webflow. If not, create it. If `/moon-magic` exists, rename it:
  - Name: `Freebies`
  - Slug: `freebies`

- [ ] **Step 3: Build freebie hero**

  ```
  Section (bg: surface, px: 48px, pt: 96px, pb: 80px)
  └── Container (max-width 1280px, grid 2-col, gap: 96px)
      ├── Left col
      │   ├── Label: "The Divine Best Friend Guide · FREE"
      │   ├── editorial-line
      │   ├── H1 (heading-1): "The Sovereignty Blueprint:"
      │   │   Script span (Allura, gold): "From Overwhelmed to Ordered Magic."
      │   ├── Body-lg: "Stop reacting to your life and start orchestrating it. This digital guide provides the high-frequency systems needed to command your schedule without sacrificing your soul."
      │   ├── Feature list (3 bullets, label class)
      │   │   ├── "Energy Auditing" — track where your energy actually goes
      │   │   ├── "The Ritual Framework" — consistent containers for your daily practices
      │   │   └── "Priority Hard Coding" — decide what moves the needle, what you can negotiate
      │   ├── Email input (class: email-form-row, bottom-border: 1px gold)
      │   └── btn-primary: "Download the Blueprint →"
      └── Right col
          └── Product mockup image (the Blueprint cover, aspect 3:4)
  ```

- [ ] **Step 4: Build testimonial section**

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px, max-width 720px)
      ├── Large quote mark (Newsreader, 96px, gold, opacity 30%)
      ├── Heading-2 italic (primary): "This isn't another PDF gathering dust, it's a fundamental rewrite of how I show up."
      └── Label: "— Elizabeth M., Founder of The Well"
  ```

- [ ] **Step 5: Wire Kit form**

  Ensure email form div has class `email-form-row`. Verify `kitloader` and `kitformwire` scripts are applied to this page.

- [ ] **Step 6: Add redirect**

  In Webflow Site Settings → 301 Redirects:
  - `/moon-magic` → `/freebies`

- [ ] **Step 7: Preview and compare**

  Compare against `freebies_enchanting_life_unleashed/screen.png`.

---

## Task 12: The Transmission (Blog)

**Goal:** Rebuild `/blog` using `the_transmission_blog_variation_1` as reference.

**Existing page ID:** `69b8bcdda19b158420952da1`
**Reference:** `the_transmission_blog_variation_1/code.html` + `screen.png`

- [ ] **Step 1: Read Stitch source**

  Read `the_transmission_blog_variation_1/code.html`. Key sections:
  1. Header — "The Transmission" with featured post hero
  2. Recent Intelligence — blog post grid
  3. Pull quote strip

- [ ] **Step 2: Clear existing Blog page, apply symbols**

- [ ] **Step 3: Build blog header + featured post**

  ```
  Section (bg: surface, px: 48px, pt: 96px, pb: 64px)
  └── Container (max-width 1280px)
      ├── Label class: "The Transmission"
      ├── editorial-line
      └── Featured post hero (grid 2-col, gap: 64px)
          ├── Left: Featured post image (aspect 16:9, object-cover)
          └── Right
              ├── Category label (label class, gold)
              ├── H2 (heading-1): [CMS: featured post title]
              ├── Body: [CMS: excerpt]
              └── btn-ghost: "Read More →"
  ```

- [ ] **Step 4: Build "Recent Intelligence" grid**

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px)
      ├── H2 (heading-2): "Recent Intelligence"
      └── Grid (3-col, gap: 48px)
          └── [CMS Collection: Blog Posts — repeat item]
              ├── Image (aspect 4:3, object-cover)
              ├── Category label
              ├── Post title (heading-2)
              ├── Excerpt (body, secondary)
              └── Author + date (label class)
  ```

  Connect to existing Webflow Blog CMS collection.

- [ ] **Step 5: Build pull quote strip**

  ```
  Section (bg: surface, px: 48px, py: 80px)
  └── Container (max-width 1280px, max-width 800px)
      ├── Large italic quote (Newsreader, 32px, primary):
      │   "True luxury is not the possession of objects, but the absolute control over how one spends their finite time."
      └── editorial-line (mt: 32px)
  ```

- [ ] **Step 6: Verify scripts**

  Confirm `kitloader` and `kitformwire` on Blog page.

- [ ] **Step 7: Preview and compare**

  Compare against `the_transmission_blog_variation_1/screen.png`.

---

## Task 13: Blog Post Template

**Goal:** Update the Blog Post CMS template using `blog_post_the_immersive_experience` as reference.

**Reference:** `blog_post_the_immersive_experience/code.html` + `screen.png`

- [ ] **Step 1: Read Stitch source**

  Read `blog_post_the_immersive_experience/code.html` in full.

- [ ] **Step 2: Open Blog Post CMS template in Webflow**

  In Webflow, navigate to **CMS → Blog Posts → Template page**.

- [ ] **Step 3: Rebuild post header**

  ```
  Section (bg: surface, px: 48px, pt: 96px, pb: 64px)
  └── Container (max-width 800px, mx-auto)
      ├── Category label (label class, gold)
      ├── H1 (display class): [CMS: Post Title]
      ├── Author + date row (label class, secondary)
      ├── editorial-line (mb: 48px)
      └── Hero image (aspect 16:9, full-width, object-cover)
  ```

- [ ] **Step 4: Rebuild post body**

  ```
  Section (bg: surface, px: 48px, py: 64px)
  └── Container (max-width 800px, mx-auto)
      └── Rich text block [CMS: Post Body]
          Styles for rich text:
          - h2: heading-2 class
          - h3: Newsreader, 22px, primary
          - p: body class, secondary
          - blockquote: border-left 2px gold, pl: 32px, Newsreader italic
          - a: primary color, underline
  ```

- [ ] **Step 5: Build related posts section**

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px)
      ├── H2 (heading-2): "More from The Transmission"
      └── Grid (3-col, gap: 48px)
          └── [CMS: Related posts — 3 items]
  ```

---

## Task 14: Contact Page

**Goal:** Create `/contact` using `contact_enchanting_life_unleashed` as reference.

**Reference:** `contact_enchanting_life_unleashed/code.html` + `screen.png`

- [ ] **Step 1: Read Stitch source**

  Read `contact_enchanting_life_unleashed/code.html` in full. Key sections:
  1. Hero — "Inquiries of Intent" with italic script
  2. Contact form (left) + editorial image (right)
  3. "The Anchor Points" — location/availability info

- [ ] **Step 2: Create Contact page**

  - Name: `Contact`
  - Slug: `contact`
  - Apply Nav and Footer symbols

- [ ] **Step 3: Build contact hero**

  ```
  Section (bg: surface, px: 48px, pt: 96px, pb: 64px)
  └── Container (max-width 1280px)
      ├── H1 (display class, line-height 0.9): "Inquiries"
      └── Script span (Allura, 72px, primary, italic): "of Intent."
  ```

- [ ] **Step 4: Build contact form + image split**

  ```
  Section (bg: surface-container-low, px: 48px, py: 80px)
  └── Container (max-width 1280px, grid 2-col, gap: 96px)
      ├── Left: Contact form
      │   ├── Name input (bottom-border: 1px gold, label: "Your Name")
      │   ├── Email input (bottom-border: 1px gold, label: "Email")
      │   ├── Subject input (bottom-border: 1px gold, label: "Nature of Inquiry")
      │   ├── Textarea (bottom-border: 1px gold, label: "Your Message", rows: 6)
      │   └── btn-primary: "Submit Inquiry"
      └── Right: Editorial dark image (aspect 4:5, object-cover)
  ```

  Form note: Wire `action` to `mailto:connect@enchantinglifeunleashed.com` OR Webflow form submissions (to be confirmed with user).

- [ ] **Step 5: Build "The Anchor Points" section**

  ```
  Section (bg: surface, px: 48px, py: 80px)
  └── Container (max-width 1280px, grid 2-col)
      ├── H2 (heading-2): "The Anchor Points"
      └── Info grid (2-col, gap: 48px)
          ├── "Email" — connect@enchantinglifeunleashed.com
          ├── "Response Time" — Within 48 hours
          ├── "Collaborations" — Open to aligned partnerships
          └── "Location" — Remote / Digital-first
  ```

- [ ] **Step 6: Preview and compare**

  Compare against `contact_enchanting_life_unleashed/screen.png`. Verify asymmetric headline, form layout, and anchor points section.

---

## Task 15: Final Redirects, QA, and Publish

**Goal:** Add all redirects, run cross-page QA, and publish.

- [ ] **Step 1: Add all 301 redirects**

  In Webflow Site Settings → 301 Redirects, confirm all redirects are present:
  - `/boundary-blueprint` → `/boundary-archetype-quiz`
  - `/moon-magic` → `/freebies`
  - `/planner` → `/moon-cycle-life-planner`

- [ ] **Step 2: Cross-page navigation QA**

  Click every nav link on every page. Verify:
  - [ ] Home link → `/`
  - [ ] Shop link → `/shop`
  - [ ] Blog link → `/blog`
  - [ ] About link → `/about`
  - [ ] Contact link → `/contact`
  - [ ] "Take the Quiz" CTA → `/boundary-archetype-quiz`

- [ ] **Step 3: Mobile QA**

  Preview each page at 375px width. Verify:
  - [ ] Nav collapses to hamburger
  - [ ] All grids stack to single column
  - [ ] No horizontal scroll
  - [ ] Buttons are full-width on mobile

- [ ] **Step 4: Kit forms QA**

  On each page with email capture (Home, About, Blog, Freebies, Footer), verify:
  - [ ] Input field renders with gold bottom border
  - [ ] Submit button is visible
  - [ ] `kitformwire` wires form to Kit `8935231` (check browser console — no JS errors)

- [ ] **Step 5: Quiz QA**

  On `/boundary-archetype-quiz`:
  - [ ] Page loads without JS errors
  - [ ] "Begin the Descent" button starts quiz
  - [ ] All 12 questions display
  - [ ] Email gate appears
  - [ ] One of 3 archetypes displays after submission

- [ ] **Step 6: Typography QA**

  Spot-check 3 pages. Verify:
  - [ ] All headlines render in Newsreader
  - [ ] All body copy renders in Manrope
  - [ ] No rounded corners anywhere
  - [ ] Gold (`#EDB74D`) used only as accent, never as background

- [ ] **Step 7: Publish**

  In Webflow, publish to `enchanting-life-unleashed-f0b269.webflow.io` (staging) first. Confirm all pages load. Then publish to custom domain.

---

## Script Reference (existing — do not recreate)

| Script ID | Location | Purpose |
|---|---|---|
| `kitloader` | Head | Loads ConvertKit `ck.5.js` |
| `kitformwire` | Footer | Wires `.email-form-row` → Kit form `8935231` |
| `bbqcsspart1` | Head | Quiz CSS part 1 |
| `bbqcsspart2` | Head | Quiz CSS part 2 |
| `bbqquestions16` | Footer | Quiz questions 1–6 |
| `bbqquestions712` | Footer | Quiz questions 7–12 |
| `bbqarchetypes` | Footer | Archetype data |
| `bbqhtmlbuilder` | Footer | Injects quiz into `#bbq-root` |
| `bbqquizlogic` | Footer | Quiz state and logic |
| `bbqemailresults` | Footer | Kit form submit + results display |
| `marqueekeyframe` | Head | Marquee animation CSS (apply if used) |
