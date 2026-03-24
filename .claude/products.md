# ELU Product Catalog

> Update this file whenever a new product launches, a price changes, or a product goes live.

---

## Active / Sellable Products

### 1. 2026 Lunar Boundary Mastery Planner
- **Type:** Digital planner (PDF, 8.5×11, print + GoodNotes/Notability compatible)
- **Audience:** Modern mystic women who want moon-aligned boundary work across a full year
- **Status:** ✅ COMPLETE — all 12 months built, PDFs generated, Google Drive hosted, funnel in progress
- **Price:** $17 (one-time)
- **Files (current names):**
  - `Content/Products/Lunar Boundaries/2026 Lunar Boundary Planner.html` — full-year source HTML (print-ready)
  - `Content/Products/Lunar Boundaries/2026 Lunar Boundary Mastery Planner.pdf` — **FINAL PDF (delivered to buyers)**
  - `Content/Products/Lunar Boundaries/Planner Landing Page.html` — sales page design reference
  - `Content/Products/Lunar Boundaries/ELU_2026_Planner_Master_FULLYEAR.xlsx` — source data
  - `Code/scripts/generate_lunar_pdfs.sh` — regenerate PDFs via Chrome headless
- **Google Drive download URL:** `https://drive.google.com/uc?export=download&id=1T9dODFzMvzVXveiDZQdCZ8ZCSW3RmVpR`
- **Includes:** Full-year planner PDF + Lunar Boundary Setting Guide (bonus)
- **Funnel:** `/boundary-blueprint` quiz → email gate → Blueprint freebie → upsell to this planner
- **Delivery:** Stripe $17 → Zapier → Kit tag `purchased-lunar-planner` → Kit email with download links
- **Webflow page:** `/lunar-boundaries` — pending build

---

### 2. Empowered Boundary Blueprint
- **Type:** Guide / workbook (PDF) — **FREEBIE** (quiz lead magnet)
- **Audience:** Women who just took the boundary quiz and want to understand their boundary patterns
- **Status:** ✅ Redesigned to ELU brand standard — delivered via Kit after quiz email gate
- **Price:** Free (lead magnet)
- **Files (current names):**
  - `Content/Products/Lunar Boundaries/Empowered Boundary Blueprint.html` — branded source HTML
  - `Content/Products/Lunar Boundaries/The Empowered Boundary Blueprint.pdf` — **FINAL PDF (delivered as freebie)**
  - `Content/Products/Lunar Boundaries/Empowered_Boundary_Blueprint_COMPLETE_PACKAGE.docx` — source content
- **Google Drive download URL:** `https://drive.google.com/uc?export=download&id=1nbRptHwflbOYCc0yKa1hviUayM9NZfhu`
- **Delivery:** Kit freebie sequence (triggered by quiz email gate, form `8924567`)
- **Notes:** Replaces old 18MB unbranded PDF. Kit sequence URL needs updating to new Google Drive link.

---

### 3. Lunar Boundary Setting Guide
- **Type:** Guide (PDF) — **BONUS** bundled with planner purchase
- **Audience:** Planner buyers — explains how to use moon phases for boundary timing
- **Status:** ✅ Built and hosted — included free with planner purchase
- **Price:** Free bonus (included with $17 planner)
- **Files:**
  - `Content/Products/Lunar Boundaries/Lunar Boundary Setting Guide.html` — branded source HTML
  - `Content/Products/Lunar Boundaries/Lunar Boundary Setting Guide.pdf` — **FINAL PDF (delivered to buyers)**
- **Google Drive download URL:** `https://drive.google.com/uc?export=download&id=10-UzlxgTTQFVQ0DUcSDE8bYYmrtMxecq`
- **Delivery:** Kit delivery email alongside planner PDF (triggered by `purchased-lunar-planner` tag)

---

### 4. Moon Magic Quick Start Guide
- **Type:** Short guide / intro product
- **Audience:** Entry-level — women new to moon cycle living
- **Status:** Active — used as freebie / lead magnet
- **Files:**
  - `Content/Products/Moon Magic/Moon_Magic_Quick_Start_Guide_v2.pdf` — current version
  - `Code/scripts/generate_quickstart_guide.py` — generator script
- **Notes:** Primary lead magnet / email list builder for Moon Magic product line

---

### 5. 12 Full Moon Rituals 2026
- **Type:** Guide / ritual workbook
- **Audience:** Women who want a complete year of full moon practice
- **Status:** Active
- **Files:** `Products/Moon Magic/12_Full_Moon_Rituals_2026.docx`

---

### 6. Wolf Moon Ritual Freebie
- **Type:** Single ritual guide (freebie)
- **Status:** Active — lead magnet
- **Files:** `Products/Moon Magic/Wolf_Moon_Ritual_Freebie.docx`

---

### 7. Moon Cycle Life Planner 2026
- **Type:** Digital planner (PDF, 8.5×11, 163 pages, full year)
- **Status:** ✅ FINAL — needs long-week overflow spot-check before publishing
- **Files:**
  - `Content/Products/Moon Magic/ELU_Moon_Planner_2026_FINAL.pdf` — **FINAL PDF (163 pages)**
  - `Code/scripts/generate_planner.py` — generator script (source of truth — edit this only)
  - `Code/scripts/generate_planner_WORKING_BACKUP.py` — locked working backup (never edit)
  - `Code/scripts/gen_test_pdf.py` — 5-worksheet test renderer (use when iterating)
  - `Code/scripts/preview_moon_icons.py` — standalone moon icon preview (all 8 phases × 4 sizes)
- **Design reference:** `.superpowers/brainstorm/73816-1773941173/page-design.html` + `cheatsheet-layout.html`
- **Session 13 changes:**
  - Custom SVG moon phase icons (`phase_icon_svg()` + `pi()` helper) — replaced all emoji throughout
  - Worksheet redesign: `.wl-s` line spacing 13px → 28px, Boundaries I'm Setting section (4 lines, no border, padding-top:28px)
  - Icon colors: gold lit `#EDB74D`, burgundy dark `#6D2E46`, no ring border
- **Notes:** 12 pages/month × 12 months + 19 front/back matter. Includes First Quarter worksheet every month. Read superpowers reference files before editing layout.

---

## In Progress / Coming Soon

### 8. 90-Day ELU Template
- **Type:** 90-day planner/tracker
- **Status:** In progress — image assets built (22 pages of PNGs), content TBD
- **Files:** `Products/ELU Template 90-Day/` — contains 1.png through 22.png (page designs)
- **Next step:** Convert image designs to HTML/PDF format

---

## Internal Tools

### ELU Digital Product Builder
- **Type:** Streamlit web app
- **Purpose:** Upload brand assets + content → auto-generate branded PDF products
- **Status:** MVP built, needs improvements
- **Files:** `app.py`, `requirements.txt`
- **Next improvements:**
  - Stripe / Gumroad export pipeline
  - AI brand voice rewrite for uploaded content
  - Social promo mockups from final PDF
  - Drag-drop template editor

---

## Product Ecosystem Map

```
── LUNAR BOUNDARIES FUNNEL ──────────────────────────────────
QUIZ (/boundary-blueprint)
  └── FREEBIE: Empowered Boundary Blueprint (email gate)
        ↓
ENTRY PRODUCT ($17)
  └── 2026 Lunar Boundary Mastery Planner
        + BONUS: Lunar Boundary Setting Guide (free with purchase)

── MOON MAGIC FUNNEL ────────────────────────────────────────
FREEBIE (email capture)
  └── Wolf Moon Ritual / Moon Magic Quick Start Guide
        ↓
ENTRY PRODUCT (~$17–27)
  └── Moon Cycle Life Planner 2026 / 12 Full Moon Rituals

── FUTURE ───────────────────────────────────────────────────
Course / Coaching / Community
```

---

## Platforms & Delivery (fill in when live)

| Platform | Purpose | URL/Status |
|----------|---------|------------|
| Stripe | Payment processing | Pending — create $17 product for Lunar Planner |
| Zapier | Stripe → Kit automation | Pending — trigger: Stripe payment → Kit tag `purchased-lunar-planner` |
| Kit (ConvertKit) | Email list + delivery | Active — quiz form `8924567`; freebie sequence needs Blueprint URL update |
| Google Drive | PDF file hosting | Active — 3 Lunar Boundaries PDFs hosted, direct download URLs in products above |
| Webflow | Sales + content hub | Active — site ID `69ab2b4bdb77a8f8f1df4fb6`; /lunar-boundaries page pending build |
| Instagram | Primary social | @enchantinglifeunleashed |
| TikTok | Discovery | @enchantinglifeunleashed |
