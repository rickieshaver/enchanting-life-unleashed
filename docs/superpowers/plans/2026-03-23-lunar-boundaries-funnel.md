# Lunar Boundaries Product Funnel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Lunar Boundaries product funnel — fix the planner, generate branded PDFs, build the Webflow sales page, wire Stripe at $17, and set up Kit email delivery.

**Architecture:** Fix-in-place approach — patch the existing `COMPLETE.html` to add missing Q2 months, generate PDFs via Chrome headless from the polished HTML source, build the Webflow sales page via MCP, and connect the purchase-to-delivery pipeline through Zapier + Kit.

**Tech Stack:** HTML/CSS, Chrome headless (`/Applications/Google Chrome.app`), python-docx (installed), Webflow MCP, Stripe, Zapier, Kit/ConvertKit

---

## File Map

| Action | File |
|--------|------|
| Delete (8 files) | See Task 1 |
| Modify | `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html` |
| Create | `Content/Products/Lunar Boundaries/ELU_Empowered_Boundary_Blueprint_BRANDED.html` |
| Create | `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Setting_Guide_BRANDED.html` |
| Create | `Code/scripts/generate_lunar_pdfs.sh` |
| Output | `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026.pdf` |
| Output | `Content/Products/Lunar Boundaries/ELU_Empowered_Boundary_Blueprint.pdf` |
| Output | `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Setting_Guide.pdf` |
| Webflow | New page `/lunar-boundaries` |
| Webflow | New page `/thank-you` |
| Webflow | Update `/boundary-blueprint` upsell button |

---

## Task 1: File Cleanup

**Files:** `Content/Products/Lunar Boundaries/` (deletions only)

- [ ] **Step 1: Delete the 8 obsolete files**

```bash
cd "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries"
rm "ELU Jan-March WEB.html"
rm "ELU Quarter 2 WEB.html"
rm "ELU Quarter 3 WEB.html"
rm "ELU Quarter 4 WEB.html"
rm "ELU_Lunar_Boundary_System_2026.html"
rm "Empowered_Boundary_Blueprint_Part1.docx"
rm "The_Empowered_Boundary_Blueprint.docx"
rm "The-Empowered-Boundary-Blueprint.pdf"
```

- [ ] **Step 2: Verify only expected files remain**

```bash
ls "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/"
```

Expected output (7 items):
```
ELU_2026_Planner_Master_FULLYEAR.xlsx
ELU_Lunar_Boundary_Planner_2026_COMPLETE.html
ELU_Planner_Landing_Page.html
Empowered_Boundary_Blueprint_COMPLETE_PACKAGE.docx
Images/
Lunar_Boundary_Setting_Guide_with_Page_Breaks.docx
```

---

## Task 2: Verify Q2 2026 Lunar Dates

**Files:** No file changes — research only. Dates hardcoded in Task 3.

- [ ] **Step 1: Verify dates at timeanddate.com/moon/phases**

Check 2026 lunar calendar. Confirm or correct these dates:

| Month | Event | Claimed Date | Sign |
|-------|-------|-------------|------|
| April | Full Moon (Pink Moon) | Apr 12 | Libra |
| April | New Moon | Apr 27 | Taurus |
| May | Full Moon (Flower Moon) | May 12 | Scorpio |
| May | New Moon | May 26 | Gemini |
| June | Full Moon (Strawberry Moon) | Jun 11 | Sagittarius |
| June | New Moon | Jun 25 | Cancer |

- [ ] **Step 2: Check Blue Moon**

Determine if May 2026 has a seasonal Blue Moon (4th full moon in spring). Spring 2026 runs Mar 20 – Jun 21. Count full moons in that window using verified dates. If a Blue Moon exists, note the date and which month it falls in.

- [ ] **Step 3: Record verified dates**

Write down all 6+ confirmed dates with signs before proceeding to Task 3. These will be hardcoded into the HTML.

---

## Task 3: Add Q2 Months to Planner HTML

**Files:**
- Modify: `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html`

**Context:** The file jumps from the Q1→Q2 transition block (line ~1475) straight to the Q2→Q3 transition (line ~1675). April, May, June are entirely absent. Each month follows Q1's 7-page structure. Insert the 3 months between the Q1→Q2 transition section and the Q2→Q3 transition section.

**Q1 month page structure (replicate for each Q2 month):**
1. Month cover — dark gradient, Allura-style title, moon phase row
2. Monthly calendar — table with FM/NM dates highlighted
3. Lunar activity page — NM and FM two-column panels
4. New Moon intentions — 5 prompt boxes
5. Weeks 1 & 2 — day-by-day rows, hint text, moon task notes
6. Weeks 3 & 4 — same structure
7. Month close — wins list, upgrade prompt for next month

- [ ] **Step 1: Open the COMPLETE.html and locate the insertion point**

Find the comment `<!-- ===== Q1 → Q2 TRANSITION ===== -->` (around line 1475) and the comment `<!-- ===== Q2 → Q3 TRANSITION ===== -->` (around line 1675). All Q2 month pages go between these two blocks.

- [ ] **Step 2: Add a Q2 section header comment before the April block**

```html
<!-- ===== QUARTER 2 BUILD: APRIL · MAY · JUNE ===== -->
```

Insert this immediately before the April month cover page, after the last Q1→Q2 transition section.

- [ ] **Step 3: Build April month pages (7 pages)**

Copy the January block structure (lines ~811–1031) as the template. Replace all January-specific content:
- Month name: `January` → `April`
- Quarter label: `Q1` → `Q2`
- Full Moon: use verified Apr full moon date, name (Pink Moon), sign
- New Moon: use verified Apr new moon date, sign
- Week date ranges: Apr 1–7, Apr 8–14, Apr 15–21, Apr 22–30
- Month close forward reference: `February` → `May`
- Carry-forward hints: update to Q2 context ("two months down in Q2")

- [ ] **Step 4: Build May month pages (7 pages)**

Same process. Replace with May data:
- Full Moon: verified May FM date, name (Flower Moon), sign
- New Moon: verified May NM date, sign
- Week date ranges: May 1–7, May 8–15 (note May has 31 days), May 16–22, May 23–31
- If Blue Moon confirmed: add a gold callout banner on the monthly overview page (match the pattern already in the Moon Magic planner's May page)
- Month close forward reference: `March` → `June`

- [ ] **Step 5: Build June month pages (7 pages)**

Same process. Replace with June data:
- Full Moon: verified Jun FM date, name (Strawberry Moon), sign
- New Moon: verified Jun NM date, sign
- Week date ranges: Jun 1–7, Jun 8–14, Jun 15–21, Jun 22–30
- Month close forward reference: next month → `July` (Q3 begins)
- Add note: "Q2 complete — you've held the line for 6 months"

- [ ] **Step 6: Verify insertion**

```bash
grep -n "April\|May\|June\|QUARTER 2\|Q2" "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html" | grep -v "style\|color\|background\|pill\|font" | head -30
```

Expected: Lines for April, May, June month covers and section headers appear between Q1→Q2 and Q2→Q3 transition comments.

---

## Task 4: Audit Q3 and Q4 for Consistency

**Files:**
- Modify: `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html`

- [ ] **Step 1: Check section comment structure**

```bash
grep -n "<!-- =====" "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html"
```

Expected: One comment per quarter header, one per month, one per transition. No duplicates.

- [ ] **Step 2: Count page sections per month**

```bash
grep -n "page-section" "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html" | wc -l
```

With Q2 added, expected total: ~100+ sections (cover + back cover + intro pages + 12 months × 7 pages + 4 quarterly transitions ~5 pages each).

- [ ] **Step 3: Spot-check July, October**

Read the July and October month covers. Verify:
- Quarter label is correct (Q3, Q4)
- Moon phase dates reference the correct month
- Month close forward-references the correct next month
- No copy-paste errors (e.g., wrong month name left from a template)

- [ ] **Step 4: Fix any issues found**

Apply targeted edits with the Edit tool. Document what was fixed.

- [ ] **Step 5: Remove duplicate transition comments**

The Q2→Q3 transition comment appears twice (lines ~1675 and ~1677). Remove the duplicate:

```html
<!-- ===== Q2 → Q3 TRANSITION ===== -->

<!-- ===== Q2 → Q3 TRANSITION ===== -->
```

Should become:

```html
<!-- ===== Q2 → Q3 TRANSITION ===== -->
```

Same check for Q3→Q4 transition.

---

## Task 5: Create PDF Generation Script

**Files:**
- Create: `Code/scripts/generate_lunar_pdfs.sh`

- [ ] **Step 1: Write the shell script**

```bash
cat > "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Code/scripts/generate_lunar_pdfs.sh" << 'EOF'
#!/bin/bash
# ELU Lunar Boundaries — PDF Generator
# Usage: ./generate_lunar_pdfs.sh [planner|blueprint|guide|all]
# Requires: Google Chrome

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries"

generate_pdf() {
  local input="$1"
  local output="$2"
  local label="$3"
  echo "Generating $label..."
  "$CHROME" \
    --headless \
    --disable-gpu \
    --print-to-pdf="$output" \
    --no-pdf-header-footer \
    --print-to-pdf-no-header \
    "file://$input"
  echo "Saved: $output"
}

case "${1:-all}" in
  planner)
    generate_pdf "$BASE/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html" \
                 "$BASE/ELU_Lunar_Boundary_Planner_2026.pdf" \
                 "Planner"
    ;;
  blueprint)
    generate_pdf "$BASE/ELU_Empowered_Boundary_Blueprint_BRANDED.html" \
                 "$BASE/ELU_Empowered_Boundary_Blueprint.pdf" \
                 "Blueprint"
    ;;
  guide)
    generate_pdf "$BASE/ELU_Lunar_Boundary_Setting_Guide_BRANDED.html" \
                 "$BASE/ELU_Lunar_Boundary_Setting_Guide.pdf" \
                 "Setting Guide"
    ;;
  all)
    generate_pdf "$BASE/ELU_Lunar_Boundary_Planner_2026_COMPLETE.html" \
                 "$BASE/ELU_Lunar_Boundary_Planner_2026.pdf" \
                 "Planner"
    generate_pdf "$BASE/ELU_Empowered_Boundary_Blueprint_BRANDED.html" \
                 "$BASE/ELU_Empowered_Boundary_Blueprint.pdf" \
                 "Blueprint"
    generate_pdf "$BASE/ELU_Lunar_Boundary_Setting_Guide_BRANDED.html" \
                 "$BASE/ELU_Lunar_Boundary_Setting_Guide.pdf" \
                 "Setting Guide"
    ;;
  *)
    echo "Usage: $0 [planner|blueprint|guide|all]"
    exit 1
    ;;
esac
EOF
chmod +x "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Code/scripts/generate_lunar_pdfs.sh"
```

- [ ] **Step 2: Verify script is executable**

```bash
ls -la "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Code/scripts/generate_lunar_pdfs.sh"
```

Expected: `-rwxr-xr-x`

---

## Task 6: Generate Planner PDF

**Files:**
- Output: `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026.pdf`

- [ ] **Step 1: Run Chrome headless for the planner**

```bash
cd "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed"
bash Code/scripts/generate_lunar_pdfs.sh planner
```

Expected: `Saved: .../ELU_Lunar_Boundary_Planner_2026.pdf`

- [ ] **Step 2: Verify PDF exists and is a reasonable size**

```bash
ls -lh "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026.pdf"
```

Expected: File exists, size > 1MB (a full-year branded planner should be substantial)

- [ ] **Step 3: Open and spot-check**

```bash
open "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Planner_2026.pdf"
```

Verify: Cover page renders, January looks correct, April section exists, December closes the year. Check one weekly page for layout integrity. Fix any page-break or rendering issues in the HTML before regenerating.

---

## Task 7: Build Empowered Boundary Blueprint Branded HTML

**Files:**
- Create: `Content/Products/Lunar Boundaries/ELU_Empowered_Boundary_Blueprint_BRANDED.html`

**Context:** The source DOCX (`Empowered_Boundary_Blueprint_COMPLETE_PACKAGE.docx`) contains:
- A fully written Chapter 1 (~2,500 words)
- Content frameworks for Chapters 2–8 (outlines, scripts, rituals — not expanded prose)
- 25+ boundary scripts
- Energy audit worksheets

**Important content decision before building:** The freebie can be positioned as either (a) just Chapter 1 as a teaser, or (b) the full framework document as a "complete blueprint." Option (b) is more valuable — the frameworks, scripts, and worksheets give it real utility even without full chapter prose. Build with option (b) unless Rickie says otherwise.

- [ ] **Step 1: Extract all content from the DOCX**

```python
# Run this to see full content structure:
python3 << 'EOF'
from docx import Document
doc = Document('/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/Empowered_Boundary_Blueprint_COMPLETE_PACKAGE.docx')
for para in doc.paragraphs:
    if para.text.strip():
        style = para.style.name if para.style else 'Normal'
        print(f'[{style}] {para.text}')
EOF
```

- [ ] **Step 2: Build the branded HTML**

Create `ELU_Empowered_Boundary_Blueprint_BRANDED.html` as a single self-contained file. Design rules:
- Background: Warm Cream `#FFFCF7`
- Headers (H1/H2): Deep Burgundy `#6D2E46`, Playfair Display Bold
- Body text: `#3A1525`, Poppins 11pt
- Accent/section dividers: Dusty Rose `#A26769`
- Callout boxes (scripts, worksheets): Soft Pink `#D5B9B2` background
- Gold `#EDB74D`: sparingly for bullet points or section stars
- Print: `@page { size: 8.5in 11in; margin: 0.75in; }` — freebie can have margins unlike the planner
- Page structure: Cover page → Welcome → Chapter 1 (full) → Chapter frameworks (2–8) → Scripts section → Worksheets

- [ ] **Step 3: Open and review in browser**

```bash
open "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Empowered_Boundary_Blueprint_BRANDED.html"
```

Check: Cover looks on-brand, Chapter 1 text is readable, frameworks section is clean and structured.

---

## Task 8: Build Lunar Boundary Setting Guide Branded HTML

**Files:**
- Create: `Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Setting_Guide_BRANDED.html`

**Context:** This is a complete, polished document about using moon phases for boundary work. Already has clear sections per phase. Use the same design rules as Task 7.

- [ ] **Step 1: Extract content**

```python
python3 << 'EOF'
from docx import Document
doc = Document('/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/Lunar_Boundary_Setting_Guide_with_Page_Breaks.docx')
for para in doc.paragraphs:
    if para.text.strip():
        print(f'[{para.style.name if para.style else "Normal"}] {para.text}')
EOF
```

- [ ] **Step 2: Build the branded HTML**

Same design system as Task 7. Structure:
- Cover page — "Lunar Boundary Setting Guide: How to Use Moon Phases for Stronger Boundaries"
- Welcome / intro section
- One section per moon phase (8 phases) — each with ritual, journal prompts, boundary guidance
- Lunar boundary calendar reference

- [ ] **Step 3: Open and review**

```bash
open "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Setting_Guide_BRANDED.html"
```

---

## Task 9: Generate Blueprint and Guide PDFs

**Files:**
- Output: `ELU_Empowered_Boundary_Blueprint.pdf`
- Output: `ELU_Lunar_Boundary_Setting_Guide.pdf`

- [ ] **Step 1: Generate both PDFs**

```bash
cd "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed"
bash Code/scripts/generate_lunar_pdfs.sh blueprint
bash Code/scripts/generate_lunar_pdfs.sh guide
```

- [ ] **Step 2: Verify both files**

```bash
ls -lh "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/"*.pdf
```

Expected: 3 PDF files, all > 500KB

- [ ] **Step 3: Open and review each**

```bash
open "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Empowered_Boundary_Blueprint.pdf"
open "/Users/rickieshaver/Ai/Projects/Enchanting Life Unleashed/Content/Products/Lunar Boundaries/ELU_Lunar_Boundary_Setting_Guide.pdf"
```

---

## Task 10: Upload PDFs to Google Drive

**Files:** No code changes — manual upload step.

- [ ] **Step 1: Upload all 3 PDFs to Google Drive**

Upload to a dedicated ELU Products folder. Files:
- `ELU_Lunar_Boundary_Planner_2026.pdf`
- `ELU_Empowered_Boundary_Blueprint.pdf`
- `ELU_Lunar_Boundary_Setting_Guide.pdf`

- [ ] **Step 2: Get direct download URLs**

For each file: Right-click → Share → "Anyone with the link" can view → Copy link.

Convert each share URL to direct download format:
- Share URL: `https://drive.google.com/file/d/FILE_ID/view`
- Direct download: `https://drive.google.com/uc?export=download&id=FILE_ID`

- [ ] **Step 3: Test all 3 download URLs in an incognito browser window**

Verify each URL downloads the correct file without requiring a Google login.

- [ ] **Step 4: Record the 3 URLs**

Save them — needed for Kit email in Task 13.

```
PLANNER_URL = https://drive.google.com/uc?export=download&id=___
BLUEPRINT_URL = https://drive.google.com/uc?export=download&id=___
GUIDE_URL = https://drive.google.com/uc?export=download&id=___
```

---

## Task 11: Build Webflow `/lunar-boundaries` Page

**Files:** Webflow (via MCP) — new page

**Design reference:** `Content/Products/Lunar Boundaries/ELU_Planner_Landing_Page.html` — dark burgundy gradient hero, cream body sections, editorial aesthetic. Study this file before building.

**Webflow site ID:** `69ab2b4bdb77a8f8f1df4fb6`

**Note:** Build page structure first. Wire Stripe CTA button URL as the final step of this task, after Stripe product is created in Task 12.

- [ ] **Step 1: Create the page**

Via Webflow MCP: create new page with name "Lunar Boundaries" and slug `/lunar-boundaries`.

- [ ] **Step 2: Build Hero section**

Dark burgundy gradient background (match `ELU_Planner_Landing_Page.html` hero style). Content:
- Eyebrow pill: "2026 Planner"
- H1: "Set Boundaries That Actually Stick"
- Subtext (Poppins, dusty rose): "A full-year lunar planner for modern mystics who are done apologizing for having standards."
- CTA button: "Get the Planner — $17" (Stripe URL goes here — leave placeholder for now)

- [ ] **Step 3: Build What's Inside section**

Cream background. 4 feature cards:
- Full Year Coverage — all 12 months, every lunar phase mapped
- Lunar-Aligned Work — boundary prompts timed to the moon's natural rhythm
- Print + Digital — crisp 8.5×11 PDF you can print or annotate on tablet
- Bonus Guide — Lunar Boundary Setting Guide ($17 value) included free

- [ ] **Step 4: Build How It Works section**

Cream-accent background. 3 numbered steps:
1. Take the Quiz — discover where your boundaries break down
2. Get the Blueprint — your free personalized boundary guide
3. Work the Planner — 12 months of lunar-aligned boundary practice

- [ ] **Step 5: Build Social Proof section**

2–3 testimonial cards (placeholder copy — Rickie replaces with real testimonials). Use ELU card style.

- [ ] **Step 6: Build CTA strip**

Burgundy background. Repeat headline + buy button + "One-time payment. Instant download."

- [ ] **Step 7: Build Footer**

Standard ELU footer (copy pattern from existing pages).

- [ ] **Step 8: Take snapshot and verify**

Use `element_snapshot_tool` to review. Check hero, cards, and CTA visually.

- [ ] **Step 9: Wire Stripe CTA (after Task 12)**

Once Stripe checkout URL is known, update both CTA buttons on this page.

---

## Task 12: Build Webflow `/thank-you` Page

**Files:** Webflow (via MCP) — new page

- [ ] **Step 1: Create the page**

Via Webflow MCP: create new page with name "Thank You" and slug `/thank-you`.

- [ ] **Step 2: Build the page content**

Simple, warm, on-brand. One section:
- Dark burgundy hero (smaller — not full-height)
- H1: "Your planner is on its way ✦"
- Subtext: "Check your inbox — we've sent your download links to [your email]. Add connect@enchantinglifeunleashed.com to your contacts so it doesn't land in spam."
- Secondary CTA: "While you wait, explore the blog →" (links to `/blog`)

- [ ] **Step 3: Snapshot and verify**

---

## Task 13: Update `/boundary-blueprint` Upsell Button

**Files:** Webflow (via MCP) — modify existing page

**Page ID:** `69b8c9b768bfae65d0b47a1f`

- [ ] **Step 1: Find the upsell CTA button on the boundary-blueprint page**

Use `get_all_elements` or `element_snapshot_tool` to locate the quiz results upsell section and the CTA button that currently links to the old planner page.

- [ ] **Step 2: Update the button URL**

Change the upsell button href from whatever it currently is to `/lunar-boundaries`.

- [ ] **Step 3: Verify**

Snapshot the quiz results section to confirm the button text and link are correct.

---

## Task 14: Create Stripe Product

**Files:** No code — Stripe dashboard configuration

- [ ] **Step 1: Create the product in Stripe**

In Stripe dashboard → Products → Add product:
- Name: "2026 Lunar Boundary Planner"
- Description: "Full-year lunar boundary planner PDF + Lunar Boundary Setting Guide bonus"
- Price: $17.00 USD, one-time payment

- [ ] **Step 2: Copy the Payment Link or Checkout URL**

Create a Payment Link for this product. Copy the URL.

- [ ] **Step 3: Wire the Stripe URL to Webflow**

Go back to the `/lunar-boundaries` page (Task 11, Step 9). Update both CTA buttons with the Stripe Payment Link URL.

- [ ] **Step 4: Set the Stripe success URL**

In the Payment Link settings, set the confirmation page URL to: `https://enchantinglifeunleashed.com/thank-you`

---

## Task 15: Set Up Zapier Automation (Stripe → Kit)

**Files:** No code — Zapier configuration

- [ ] **Step 1: Create a new Zap**

Trigger: Stripe → "Payment Intent Succeeded" (or "Checkout Session Completed")
Filter: product name contains "Lunar Boundary Planner"

- [ ] **Step 2: Add Kit action**

Action: Kit (ConvertKit) → "Add Tag to Subscriber"
Tag: `purchased-lunar-planner` (create this tag in Kit if it doesn't exist)
Subscriber email: map from Stripe customer email field

- [ ] **Step 3: Test the Zap**

Use a Stripe test payment ($17 test card) to verify the Zap fires and applies the tag in Kit.

---

## Task 16: Set Up Kit Delivery Email

**Files:** No code — Kit automation configuration

- [ ] **Step 1: Create the automation in Kit**

Trigger: Tag applied → `purchased-lunar-planner`

- [ ] **Step 2: Write the delivery email**

Subject: "Your 2026 Lunar Boundary Planner is here ✦"

Body (on-brand voice — wise, direct, warm):
```
Hey [First Name],

You made a solid call. Here's everything that's yours:

→ 2026 Lunar Boundary Planner (full year)
[PLANNER_DOWNLOAD_URL]

→ Bonus: Lunar Boundary Setting Guide
[GUIDE_DOWNLOAD_URL]

→ Bonus: Print-at-Home HTML version (for custom print settings)
[HTML_FILE_DOWNLOAD_URL]

Save these links somewhere you won't lose them.

Print it, annotate it on your tablet, or just open it every month when the moon shifts. However you use it — use it.

The boundaries you keep are the ones you plan for.

— Rickie
Enchanting Life Unleashed
```

Replace `[PLANNER_DOWNLOAD_URL]` and `[GUIDE_DOWNLOAD_URL]` with the verified Google Drive direct download URLs from Task 10.

- [ ] **Step 3: Send a test email to yourself**

Verify: both download links work, email renders correctly on mobile, sender name shows as "Rickie from Enchanting Life Unleashed"

---

## Task 17: Update Kit Freebie Sequence (Blueprint URL)

**Files:** No code — Kit sequence configuration

**Context:** The quiz → email gate flow already delivers the Empowered Boundary Blueprint. That sequence currently points to the old (deleted) 18MB PDF. It must be updated to use the new branded PDF.

- [ ] **Step 1: Find the freebie delivery email in Kit**

Locate the automation triggered by the quiz email gate (form `8924567` / uid `6d956e4759`).

- [ ] **Step 2: Update the Blueprint download link**

Replace the old PDF download link with the new Google Drive direct download URL for `ELU_Empowered_Boundary_Blueprint.pdf` (from Task 10).

- [ ] **Step 3: Send test email**

Trigger the freebie sequence manually for a test subscriber. Verify the Blueprint PDF downloads correctly.

---

## Task 18: End-to-End Test

- [ ] **Step 1: Test the freebie funnel**

Go to `/boundary-blueprint`. Complete the quiz. Submit email at the gate. Verify:
- Kit freebie email arrives
- Blueprint PDF download link works
- Upsell CTA at end points to `/lunar-boundaries`

- [ ] **Step 2: Test the purchase funnel**

Click through to `/lunar-boundaries`. Click "Get the Planner — $17". Complete checkout with Stripe test card `4242 4242 4242 4242`.

Verify:
- Stripe success → redirects to `/thank-you`
- `/thank-you` page renders correctly
- Zapier fires and applies `purchased-lunar-planner` tag in Kit
- Kit delivery email arrives with both working download links

- [ ] **Step 3: Switch Stripe to live mode**

Once test passes: disable Stripe test mode. Payment Link now charges real $17.

- [ ] **Step 4: Final checklist**

- [ ] Old draft files deleted
- [ ] Q2 lunar dates verified
- [ ] All 12 months complete and consistent in planner HTML
- [ ] 3 PDFs generated and saved
- [ ] 3 PDFs on Google Drive with tested download URLs
- [ ] Kit freebie sequence updated with new Blueprint PDF URL
- [ ] `/lunar-boundaries` page live
- [ ] `/thank-you` page live
- [ ] `/boundary-blueprint` upsell button → `/lunar-boundaries`
- [ ] Stripe product at $17 with correct success URL
- [ ] Kit delivery email with working download links
- [ ] Full end-to-end test passed
