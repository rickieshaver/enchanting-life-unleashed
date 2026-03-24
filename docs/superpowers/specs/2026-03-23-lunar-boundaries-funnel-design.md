# Lunar Boundaries Product Funnel — Design Spec
**Date:** 2026-03-23
**Status:** Approved

---

## Overview

Complete the Lunar Boundaries product funnel from quiz to paid product delivery. Two product lines exist (Lunar Boundaries and Moon Magic); this spec covers Lunar Boundaries only.

**Funnel shape:**
Quiz (`/boundary-blueprint`) → email gate → freebie (Empowered Boundary Blueprint PDF) → upsell to Lunar Boundary Planner ($17) → Stripe → Kit delivers download

---

## Section 1 — File Cleanup

Delete from `Content/Products/Lunar Boundaries/`:
- `ELU Jan-March WEB.html`
- `ELU Quarter 2 WEB.html`
- `ELU Quarter 3 WEB.html`
- `ELU Quarter 4 WEB.html`
- `ELU_Lunar_Boundary_System_2026.html`
- `Empowered_Boundary_Blueprint_Part1.docx`
- `The_Empowered_Boundary_Blueprint.docx`
- `The-Empowered-Boundary-Blueprint.pdf`

Keep:
- `ELU_Lunar_Boundary_Planner_2026_COMPLETE.html` — product source (to be fixed)
- `ELU_Planner_Landing_Page.html` — Webflow page design reference
- `ELU_2026_Planner_Master_FULLYEAR.xlsx` — source data
- `Empowered_Boundary_Blueprint_COMPLETE_PACKAGE.docx` — freebie source
- `Lunar_Boundary_Setting_Guide_with_Page_Breaks.docx` — bonus content source
- `Images/` — watercolor product assets

---

## Section 2 — Planner HTML Fixes

File: `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html`

**Missing content to add:**
- April, May, June month sections (Q2) — currently absent entirely
- Each month follows the Q1 structure: month cover → calendar → lunar activity → new moon intentions → weeks 1&2 → weeks 3&4 → month close (7 pages per month, 21 pages total for Q2)
- Lunar dates for Q2 2026 to hardcode — **verify against timeanddate.com or USNO before coding**:
  - April: Full Moon Apr 12 (Pink Moon, Libra), New Moon Apr 27 (Taurus)
  - May: Full Moon May 12 (Flower Moon, Scorpio), New Moon May 26 (Gemini)
  - June: Full Moon Jun 11 (Strawberry Moon, Sagittarius), New Moon Jun 25 (Cancer)
  - Note: A "Blue Moon" (4th full moon in a season) may occur in May/June 2026 — confirm before adding; the Moon Magic planner includes a May 31 Blue Moon entry, verify this is astronomically accurate

**Consistency audit:**
- Verify Q3 (Jul/Aug/Sep) and Q4 (Oct/Nov/Dec) each have all 7 page types per month
- Fix any mislabeled section comments (e.g., "Q3 PLAN" appearing inside Q1→Q2 transition block)
- Ensure quarterly transition pages (Q1→Q2, Q2→Q3, Q3→Q4) all follow the same template structure
- Remove duplicate comment headers (e.g., Q2→Q3 transition block appears twice)

---

## Section 3 — PDF Generation

**Approach:** Chrome headless print-to-PDF from fixed HTML files.

**Outputs:**

| File | Source | Path |
|------|--------|------|
| `ELU_Lunar_Boundary_Planner_2026.pdf` | Fixed COMPLETE.html | `Content/Products/Lunar Boundaries/` |
| `ELU_Empowered_Boundary_Blueprint.pdf` | New branded HTML from COMPLETE_PACKAGE.docx | `Content/Products/Lunar Boundaries/` |
| `ELU_Lunar_Boundary_Setting_Guide.pdf` | New branded HTML from Setting_Guide.docx | `Content/Products/Lunar Boundaries/` |

**Script:** `Code/scripts/generate_lunar_pdfs.sh` — wraps Chrome headless commands, one line per PDF, regenerable on demand.

**Design standard for Blueprint + Guide HTMLs:** ELU brand (warm cream backgrounds, deep burgundy headers, dusty rose accents, gold sparingly, Playfair Display headings, Poppins body).

**Planner delivery:** PDF (primary) + HTML file as print-at-home bonus — both delivered via Kit email.

---

## Section 4 — Webflow Product Page

**Page:** `/lunar-boundaries` (new page)

**Design reference:** `Content/Products/Lunar Boundaries/ELU_Planner_Landing_Page.html` — dark burgundy gradient hero, cream sections, editorial luxe aesthetic.

**Sections:**
1. **Hero** — dark gradient background, Playfair headline, gold accent subtext, single CTA button "Get the Planner — $17"
2. **What's Inside** — 3–4 feature cards: full year coverage, lunar-aligned boundary work, print + digital, bonus guide included
3. **How It Works** — 3 steps: Take the quiz → Get the Blueprint → Upgrade to the Planner
4. **Social proof** — 2–3 testimonial placeholders
5. **CTA strip** — final buy button, price anchor, low-risk copy
6. **Footer** — standard ELU footer
7. **Thank-you page** (`/thank-you`) — simple Webflow page: "Your planner is on its way — check your inbox." Stripe success URL points here.

**Additional change:** Update the upsell button on `/boundary-blueprint` quiz results to point to `/lunar-boundaries`.

---

## Section 5 — Stripe + Kit Delivery

**Stripe:**
- Product: "2026 Lunar Boundary Planner", one-time payment, $17
- CTA buttons on `/lunar-boundaries` → Stripe checkout URL
- Success URL → `/thank-you` page in Webflow ("Check your email — your planner is on its way")

**Kit automation:**
- Stripe purchase → Zapier → applies Kit tag (e.g., `purchased-lunar-planner`)
- Kit sequence fires on tag: branded delivery email with download links to planner PDF + bonus guide PDF
- Freebie Blueprint delivery is handled by existing quiz → email gate flow — **but the existing Kit freebie sequence must be updated to point to the new `ELU_Empowered_Boundary_Blueprint.pdf` URL once it is uploaded** (the old unbranded PDF is being deleted)

**File hosting:** PDFs hosted via Google Drive (public share link → direct download). Webflow Assets has a 10MB cap and doesn't support clean direct download links. Google Drive public links must be converted to direct download format (`https://drive.google.com/uc?export=download&id=FILE_ID`). Decision: confirm all Google Drive download URLs are live and tested before writing Kit email copy — URLs must be stable before the Kit sequence is activated.

**Dependency note:** The Webflow CTA button needs the Stripe checkout URL before it can be fully wired. Build the page structure first, then add the Stripe link as a final step once the Stripe product is created.

---

## Out of Scope

- Moon Magic product line (separate funnel, separate spec)
- Stripe Connect or subscription billing
- Course or community products
- $7 tripwire product (deprioritized — bundle Guide as free bonus instead)

---

## Success Criteria

- [ ] Old draft files deleted from Lunar Boundaries folder
- [ ] Lunar dates for Q2 2026 verified against USNO / timeanddate.com
- [ ] Planner HTML has all 12 months complete and consistent
- [ ] Three branded PDFs generated and saved to correct paths
- [ ] All three PDFs uploaded to Google Drive with stable public download URLs confirmed
- [ ] Kit freebie sequence updated to use new Blueprint PDF URL
- [ ] `/lunar-boundaries` Webflow page live and visually approved
- [ ] `/boundary-blueprint` upsell button updated to `/lunar-boundaries`
- [ ] Stripe product created at $17
- [ ] `/thank-you` Webflow page built
- [ ] Kit delivery email copy written with download links verified as live
- [ ] Kit automation delivers both PDFs on purchase
- [ ] End-to-end test: quiz → email → freebie → purchase → delivery email received
