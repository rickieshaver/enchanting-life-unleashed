# ELU Brain — Claude's Briefing Doc
> Read this at the start of every session. It covers 90% of what you need.
Claude must follow the ELU design-system.md when generating layouts, UI components, or Webflow sections.

---

## ⚡ Webflow Designer — Wake-Up Link

If the Webflow Designer MCP connection is timing out, use this link to open the Designer on the correct page:

**https://enchanting-life-unleashed-f0b269.design.webflow.com/?pageId=69af237e7d5f78c15e8da78d**

The Designer tab must be the **active, foreground tab** in the browser. Once clicked and in focus, retry the MCP call immediately.

---

## The Founder

**Enchanting Life Unleashed** — Founder & Creator
- Mom of two (age 20 & 8)
- ADHD + Autism Level 1 — direct communication, no fluff, no walls of text
- Building Enchanting Life Unleashed to exit the "matrix hamster wheel" and create freedom + travel for the family
- Expert, skeptical, does own research — don't oversell, just be accurate
- Works across Cowork (files/builds) and Claude Code (development)

**Brand Persona:** Ren — the AI avatar, face, and identity of Enchanting Life Unleashed

**Contact:**
- Email: connect@enchantinglifeunleashed.com
- Location: Desktop → ELU Cowork folder

---

## The Business

**Enchanting Life Unleashed (ELU)**
- Tagline: *"Where Soul Meets Strategy"*
- Mission: "Where modern mystics learn real magic—rooted in intention, guided by intuition, and sprinkled with just the right amount of sparkle."
- Audience: Women 30s–40s, spiritually aware + seriously ambitious, building businesses or reclaiming their lives — the "modern mystic" who doesn't want to choose between woo and work
- Business model: Digital products (planners, guides, workbooks) + future: courses, coaching, community
- Stage: Building product suite, establishing online presence, pre-scale

**Social handles:** @enchantinglifeunleashed on all platforms
→ Full social URLs: `.claude/memory/context/socials.md`

---

## Brand at a Glance

**Voice:** Wise witty high-vibe best friend. Direct. Empowering. No toxic positivity. Sprinkle of mysticism — never performative.
**NOT:** Preachy, sugarcoated, overly woo, girlboss clichés, clip art energy

**Colors (exact hex — use these every time):**
| Name | Hex | Use |
|------|-----|-----|
| Warm Cream | `#FFFCF7` | Primary backgrounds (70%) |
| Deep Burgundy | `#6D2E46` | Headers, body text, authority (20%) |
| Dusty Rose | `#A26769` | Subtitles, accents, borders |
| Soft Pink | `#D5B9B2` | Writing boxes, gentle fills |
| Gold | `#EDB74D` | Stars, sparkle, bullets — use sparingly, it's the jewelry |

**Fonts:** Playfair Display (headers/editorial) + Poppins (body/UI) + Allura (accent/script — use sparingly) — ONLY these three
**Aesthetic:** Modern mystic · editorial luxe · autumn tones · velvet-chair cozy · "sophisticated witch with a business plan"
→ Full brand rules: `.claude/brand-voice.md`

---

## Products

| Product | Type | Status | Notes |
|---------|------|--------|-------|
| **Lunar Boundary Setting Planner** | PDF Planner (8.5×11) | Active | Q1 (Jan–Mar) + Q2 (Apr–Jun) built; full year in progress |
| **Empowered Boundary Blueprint** | Workbook/Guide | Active | Complete package + Part 1 standalone |
| **Moon Magic Quick Start Guide** | Freebie/Intro | Active | Entry-point product / lead magnet |
| **12 Full Moon Rituals 2026** | Guide | Active | Moon Magic folder |
| **Wolf Moon Ritual** | Freebie | Active | Lead magnet |
| **90-Day Template** | Planner | In Progress | ELU Template 90-Day folder |
| **ELU Digital Product Builder** | Internal Tool | In Progress | Streamlit app in Code/scripts/app.py — generates branded PDFs |

→ Full product details: `.claude/products.md`

---

## Folder Structure (your workspace)

Claude should treat this folder structure as the source of truth when navigating the ELU workspace.
```text
Ai/Projects/Enchanting Life Unleashed/
├── .claude/                    ← THIS BRAIN — Claude reads this first every session
│   ├── CLAUDE.md               ← master briefing doc; project overview, priorities, session logs
│   ├── brand-voice.md          ← full ELU brand rules: voice, colors, fonts, tone, aesthetic
│   ├── products.md             ← master catalog of ELU products with status, pricing, and notes
│   └── memory/
│       ├── glossary.md         ← internal terms, shorthand, decoder ring
│       ├── context/            ← socials, tools, platforms, tech stack, accounts
│       ├── people/             ← collaborators, contractors, VAs, partners (future)
│       └── projects/           ← active project briefs, plans, launches, and build notes
├── Agents/                     ← specialized AI agents or workflows
├── Ai Avatar Ren/              ← Ren avatar assets: images, prompts, voice, persona files
├── Assets/                     ← shared design assets: Images-Background, Images-Elements, Images-Misc, Images-Watercolor
├── Brand/                      ← core brand documents, logos, PDFs, brand guides, fonts, reference files
├── Code/                       ← scripts and development tools
│   └── scripts/                ← Python scripts: generate_planner.py, generate_quickstart_guide.py, app.py
├── Content/                    ← all content organized by product/topic
│   ├── Products/
│   │   ├── Moon Magic/         ← Moon Magic Quick Start Guide, planners, rituals, spec docs
│   │   └── Lunar Boundaries/   ← ELU Lunar Boundary System, ELU Planner files, Boundary Blueprint
│   └── Social Media/           ← social content, highlight covers
├── Plugins/                    ← Claude plugins, integrations, MCP tools
├── Video/                      ← brand video clips, reels, b-roll
├── Website/                    ← website files, landing pages, Webflow-related assets
└── README.md
```

**Workspace Root:**
All ELU work happens inside `Ai/Projects/Enchanting Life Unleashed/`.
Claude should assume this is the root directory when reading or creating files.

---

## Product Folder Guide — What Goes Where

**Moon Magic folder** (`Content/Products/Moon Magic/`):
- Moon Planner 2026 — all versions and PDFs
- `generate_planner.py` and `generate_planner_WORKING_BACKUP.py`
- Moon Magic Quick Start Guide
- 12 Full Moon Rituals
- Any moon phase content, rituals, or guides

**Lunar Boundaries folder** (`Content/Products/Lunar Boundaries/`):
- Boundary Setting Planner
- Empowered Boundary Blueprint
- ELU Lunar Boundary System
- Any boundary work products

These are two separate product lines. Never save moon planner files to Lunar Boundaries or boundary files to Moon Magic.

---

## Superpowers Reference Files — Read Before Editing Planner

Any time Rickie asks to edit, fix, or regenerate the moon planner, read these files BEFORE touching `generate_planner.py`:

- `.superpowers/brainstorm/73816-1773941173/page-design.html`
- `.superpowers/brainstorm/73816-1773941173/cheatsheet-layout.html`

These are the original design specs. They are the source of truth for all weekly page layout, card styling, colors, spacing, and structure. Never redesign from scratch — always reference these first.

---

## Key Terms (Decoder Ring)

| Shorthand | Means |
|-----------|-------|
| ELU | Enchanting Life Unleashed |
| the planner | 2026 Lunar Boundary Setting Planner |
| boundary blueprint | Empowered Boundary Blueprint workbook |
| moon magic guide | Moon Magic Quick Start Guide (freebie) |
| Ren | AI avatar persona for ELU |
| the builder / app.py | ELU Digital Product Builder (Streamlit app) in Code/scripts/ |
| landing page | ELU_Planner_Landing_Page.html in Content/Products/ |
| on-brand | Matches brand-voice.md exactly |
| the brain / .claude | This folder system |

→ Full glossary: `.claude/memory/glossary.md`

---

## Working Preferences

- **No fluff** — skip preamble, get to the work
- **No bullet walls** — use prose or tight tables, not endless nested lists
- **ADHD-friendly** — clear structure, bold what matters, short chunks
- **Always save final outputs** to the workspace folder so Rickie can open them
- **Ask clarifying questions upfront** — don't build the wrong thing and waste time
- **When building HTML/web** — single file, self-contained, no external dependencies except Google Fonts
- **When in doubt about brand** — check `.claude/brand-voice.md` before generating anything visual
- **Assume expert-level** — Rickie knows her stuff, no need to over-explain basics

---

## End-of-Session Protocol

**At the end of every session, Claude MUST update this file with:**

1. Move completed items out of Active Priorities (or mark done)
2. Add any new priorities that came up
3. Append a session log entry at the bottom of this file (see Session Log section)
4. Update any other `.claude/` files that changed (products, glossary, etc.)

**The session log entry format:**
```
### [Date] — [1-line session summary]
**Completed:** what got built/finished
**In Progress:** what's partially done, file paths, where it was left
**What Worked:** approaches, patterns, wins to repeat
**What Didn't:** anything to avoid next time
**Next Session:** top 1-3 things to pick up immediately
```

This is a self-improving loop. Every session makes the next one faster.

---

## Active Priorities (update this section as projects evolve)

1. **Webflow Home page** — ✅ Built + ✅ Design upgraded (Session 7). Needs: Body bg fix (manual), real photo in About placeholder, email form wired to Kit
2. **Webflow Shop page** — ✅ Built + ✅ Design upgraded (Session 7). Needs: Body bg fix (manual), Stripe links wired to CTAs, delete old orphan elements, Kit form on email capture
3. **Webflow About page** — ✅ Built + ✅ Design upgraded (Session 7). Needs: Body bg fix (manual), real brand photo, Kit form wiring, delete orphan elements
4. **Webflow /planner page** — 🔄 IN PROGRESS. All sections built (hero, what's inside, social proof, CTA, footer). Needs: Stripe link on CTA buttons, delete duplicate empty hero section `938fe636`, rename slug to `/planner`, set Body bg to Warm Cream. See Session 6 log.
5. **Webflow remaining pages** — Blog, /boundary-blueprint, /moon-magic need building (after /planner done)
6. **Connect tech stack** — Stripe → Webflow checkout, Kit email sequences, Namecheap DNS → Webflow
7. **Moon Planner 2026** — ✅ FINAL PDF updated (163 pages, Session 13). Custom SVG moon icons + worksheet redesign (wider lines, Boundaries I'm Setting section). Saved to `Content/Products/Moon Magic/ELU_Moon_Planner_2026_FINAL.pdf`. Still needs: long-week overflow spot-check before publishing.
8. **Lunar Boundaries Funnel** — 🔄 IN PROGRESS (Session 14). PDFs generated, HTML fixed. Needs: Google Drive upload + URLs, Webflow /lunar-boundaries + /thank-you pages, Stripe $17, Zapier, Kit delivery email. See Session 14 log.
9. **ELU Digital Product Builder** — Streamlit app (Code/scripts/app.py), needs Stripe export + AI brand voice rewrite

---
*Last updated: 2026-03-23 (Session 14) — update whenever new products launch or priorities shift*

---

## Session Log

---

### 2026-03-06 — Brain system built + landing page created

**Completed:**
- Built full `.claude/` memory architecture (CLAUDE.md, brand-voice.md, products.md, memory/ subdirectory)
- Distilled all brand docs (Brand Voice Guide, Content Pillars, Brand Vibe, Social Bios, Misc Info) into clean markdown
- Created `Content/Products/ELU_Planner_Landing_Page.html` — full on-brand landing page for the 2026 Lunar Boundary Setting Planner
- Added End-of-Session Protocol to CLAUDE.md (this entry is the first run of it)

**In Progress:**
- Landing page — built but needs: confirmed price (placeholder $37), real testimonials, live Stripe checkout link, nav links to real pages

**What Worked:**
- Reading multiple brand source docs before building anything visual — produced accurate on-brand output first try
- Two-tier memory structure (hot cache in CLAUDE.md + deep reference in memory/) — efficient session startup
- Single-file self-contained HTML approach — no build tools, opens directly in browser

**What Didn't:**
- Hidden `.claude/` folder confused Rickie in Finder — she couldn't see it without Cmd+Shift+. to reveal hidden files. Worth mentioning this proactively next time a hidden folder is created.

**Next Session:**
1. Refine landing page — confirm price, swap in real testimonials, add Stripe link
2. Continue full-year planner (Q3/Q4 remaining)
3. Or pivot to whatever Rickie wants to tackle first

---

### 2026-03-06 (Session 2) — Full ELU Home page built in Webflow

**Completed:**
- Updated `.claude/memory/context/tools-and-stack.md` with finalized tech stack (Webflow, Stripe, Supabase, Kit, Metricool, Zapier, Namecheap) + Webflow setup status table
- Built entire ELU Home page in Webflow (site ID: `69ab2b4bdb77a8f8f1df4fb6`, page ID: `69ab2b4cdb77a8f8f1df4ff6`) — all 6 sections complete and visually verified via snapshots:
  - **Nav:** Logo + Shop/Blog/About links + "Get the Planner" CTA
  - **Hero:** Allura tagline, H1 "Real Magic for the Modern Mystic", subtext, dual CTAs
  - **Products:** 3-card grid (Lunar Planner, Boundary Blueprint, Moon Magic Guide)
  - **About/Mission:** Dark burgundy 2-col section (image placeholder + brand copy)
  - **Email capture:** Dusty Rose bg, input + "Send It ✦" button
  - **Footer:** Logo, nav links, copyright
- Created 30+ Webflow styles — all color/font properties bound to ELU Brand variable collection (token-driven, not hardcoded)
- Fixed footer links running together by creating `footer-links` style (flex, gap: 32px) applied to footer nav DivBlock

**In Progress:**
- Home page is live in Webflow but needs:
  - Body background manually set to Warm Cream in Webflow UI
  - About section image placeholder needs Rickie's real brand photo
  - Email form needs wiring to Kit/ConvertKit

**What Worked:**
- Building all styles first, then assembling elements — clean separation of concerns, easy to reuse styles across future pages
- Variable-linked styles (not hardcoded hex) — any brand color change propagates instantly across all styles
- element_snapshot_tool for visual QA mid-build — caught footer spacing issue before finishing

**What Didn't:**
- Default Webflow starter elements left on canvas from template — orphaned, should be manually deleted
- Body element bg can't be set via MCP — must remind Rickie to do this manually every time

**Key IDs:**
- Body: `69ab2b4cdb77a8f8f1df4ffb` | Nav: `fe2ccfad` | Hero: `4397ff43`
- Products: `43efe8a8` | About: `533c3fc4` | Email: `9fea09db` | Footer: `48d5a6f4`
- Variable collection: `collection-0583fac4-8ef2-0ee2-71b0-cbe36e2665c2`

**Next Session:**
1. Build the Planner landing page in Webflow (/planner)
2. Manual fix: Body background → Warm Cream in Webflow UI
3. Or: Wire email form to Kit if Rickie sets up Kit account

---

### 2026-03-06 (Session 3) — Full About page built in Webflow

**Completed:**
- Built complete About page in Webflow (page ID: `69ab53fbeb47aea52d01f6df`, slug: `/about`) — all 6 sections: Hero, Story, Values, Products teaser, Email capture, Footer
- Applied `section-cream` combo class to force Warm Cream bg on sections nested inside Dark Burgundy `page-hero`
- Full visual QA via element snapshot

**In Progress:**
- Body background manually set to Warm Cream needed
- `about-image-box` needs real brand photo
- Email form needs wiring to Kit
- Orphan elements to delete: `4b825c84`, `89e805a2`

**What Worked:**
- `section-cream` combo class pattern for overriding inherited dark bg — reusable across all future pages
- Two-stage section build (skeleton → get IDs → append children) — reliable workaround for 3-level nesting depth limit

**What Didn't:**
- `section-title` style consistently doesn't persist on H2 elements after context resets — must re-apply every session
- MCP cannot delete elements — orphan cleanup always requires manual Webflow UI action

**Key IDs (About page):**
- Page: `69ab53fbeb47aea52d01f6df` | Hero: `e89de1e0` | Story: `cf4d4279`
- Values: `0fb490fa` | Products: `f9ca7f10` | Email: `f4b9ffdb` | Footer: `02ab5951`

**Next Session:**
1. Build /planner page in Webflow
2. Manual fixes before next session: Body bg, delete orphans, add real photo to About

---

### 2026-03-09 (Session 4) — Full ELU Shop page built in Webflow

**Completed:**
- Built complete Shop page (page ID: `69ae5e95ce2cb29d6976ea25`) — luxury glassmorphism e-commerce design, 4 sections: Hero, Products grid, Brand Values/Story, Freebies

**In Progress:**
- Body bg needs manual Warm Cream set
- All product CTA buttons need real Gumroad/Stripe links
- Old orphan elements from prior shop build — manual delete needed

**What Worked:**
- Two-stage section build pattern — rock solid
- Snapshotting each section immediately after build — caught freebie card title color bug

**What Didn't:**
- Pre-existing styles with light colors invisible on light bg — always check style colors before reusing on different bg context
- `Link` is not a valid `element_builder` type — always use `Button` for CTAs

**Key IDs (Shop page):**
- Page: `69ae5e95ce2cb29d6976ea25` | Hero: `ef4abc1a` | Products: `214790c0`
- Card 1: `5e2a5833` | Card 2: `67d28941` | Card 3: `8ddf6c93`
- Story/Values: `74d7fdc3` | Freebie section: `51eccd17`

**Next Session:**
1. Build /planner page in Webflow — most revenue-critical

---

### 2026-03-10 (Session 5) — /planner page started; MCP connection troubleshooting

**Completed:**
- Added Webflow Designer wake-up link to top of CLAUDE.md
- Created /planner page (page ID: `69af237e7d5f78c15e8da78d`)
- Nav section built, 21 planner-specific styles created

**In Progress:**
- /planner body sections NOT yet built — only nav exists
- MCP Designer connection repeatedly timing out — root cause: two Webflow Designer tabs open simultaneously

**What Worked:**
- Style-first approach: created all 21 styles before any element building

**What Didn't:**
- MCP Designer connection fails with two Webflow tabs open — always have exactly ONE tab open

**Key IDs (/planner):**
- Page: `69af237e7d5f78c15e8da78d` | Body: `69af237e7d5f78c15e8da793`
- Nav: `1fa7b299` | Duplicate empty nav (delete): `4f60cd0c`

**Next Session:**
1. Build /planner hero section immediately
2. Ensure only ONE Webflow Designer tab open before starting

---

### 2026-03-10 (Session 6) — /planner page fully built + design system created

**Completed:**
- Built all 5 remaining /planner sections: Hero, What's Inside, Social Proof, CTA, Footer
- Created `.claude/design-system.md` — comprehensive visual system documentation
- Upgraded ELU UI design system across site (pill buttons, glassmorphism cards, layered radial gradients)

**In Progress:**
- /planner needs manual fixes: delete duplicate hero `938fe636`, rename slug to `/planner`, set Body bg → Warm Cream, wire CTA buttons to Stripe

**What Worked:**
- Two-stage build pattern — essential, never skip
- `design-system.md` as persistent cross-session reference — eliminates design drift

**What Didn't:**
- `set_text` on DivBlock (type Block) NEVER works — always target the String child
- MCP cannot delete elements — always note orphan IDs for manual cleanup

**Key IDs (/planner full set):**
- Page: `69af237e7d5f78c15e8da78d` | Body: `69af237e7d5f78c15e8da793`
- Hero: `823d199a` | What's Inside: `012a61f8` | Social Proof: `c2d775dd`
- Duplicate empty hero (DELETE): `938fe636-fed9-24b1-b2c5-0fb092b4cbf5`

**Next Session:**
1. Manual fixes first: delete `938fe636`, rename slug, set Body bg, wire Stripe links
2. Build /boundary-blueprint page

---

### 2026-03-10 (Session 7) — Full site design upgrade: Home, Shop, About aligned to planner aesthetic

**Completed:**
- Upgraded all three existing pages (Home, Shop, About) to match "Editorial Luxe Mystic" dark-hero aesthetic
- All 4 pages now share same visual language: dark plum hero + radial gradient glow, gold accents, cream typography, pill buttons, gold-bordered cards

**In Progress:**
- All 4 Webflow pages visually complete. Remaining work is manual/wiring only (see Active Priorities)

**What Worked:**
- Site-wide style updates — highest-leverage action, one change propagates to all pages simultaneously
- Snapshotting each section after changes for visual QA

**Key style relationships:**
- Dark section headings → `page-hero-title` (56px) or `shop-story-title` (48px) — both Warm Cream
- Cream section headings → `section-title`, `about-heading`, `heading-1`, `heading-2` — all Deep Burgundy
- All hero sections gradient: `radial-gradient(ellipse at 65% 0%, rgba(109,46,70,0.5) 0%, transparent 55%), radial-gradient(ellipse at 20% 100%, rgba(237,183,77,0.1) 0%, transparent 45%)`

**Next Session:**
1. Manual Webflow UI tasks: set Body bg on all 4 pages, delete orphans, rename planner slug, wire Stripe CTAs
2. Build /boundary-blueprint page

---

### 2026-03-19 (Session 8) — Moon Planner PDF polish: layout fixes + page numbers + smart Moon Tasks

**Completed:**
- Full Moon card text overflow fixed — increased inner padding
- "This Month's Intention" writing area expanded to fill full available space (~270pt, 11 writing lines)
- Reflect & Release box removed from all weekly pages
- January Week 1 day blocks corrected via WEEK_DAY_OVERRIDES
- "This Week's Moon Tasks" auto-populated with moon events + page references
- Page numbers added to every interior page

**In Progress:**
- PDF saved to `~/Downloads/ELU_MoonPlanner_2026_Premium.pdf`
- Known remaining issues: phase education page spacing, phase worksheet blurb extraction

**What Worked:**
- Pre-pass over all 151 pages before rendering to build `weekly_resources` dict
- Calculating writing box height dynamically from available space

**What Didn't:**
- PDF extraction for Jan Week 1 day names was broken — needed WEEK_DAY_OVERRIDES; check any week where day names look wrong

**Next Session:**
1. Review full PDF for other weeks with broken day name parsing
2. Fix phase education page spacing
3. Fix phase worksheet blurb extraction

---

### 2026-03-19 (Session 9) — Moon Magic Quick Start Guide v2 built

**Completed:**
- Built Moon Magic Quick Start Guide v2 as fully branded 12-page PDF
- Playfair Display TTFs copied to `Brand/Fonts/` and registered in ReportLab
- Generator script: `Code/scripts/generate_quickstart_guide.py`
- Output: `Content/Products/Moon Magic/Moon_Magic_Quick_Start_Guide_v2.pdf`
- Spec + plan docs saved to `Content/Products/Moon Magic/`

**In Progress:**
- CTA page `[INSERT PRODUCT LINK]` placeholders need replacing with live Gumroad/Stripe URLs

**What Worked:**
- Brainstorming → spec → plan → execution flow worked cleanly end to end
- Font path: 3 levels up from `Content/Products/Moon Magic/` → `../../../Brand/Fonts/`

**What Didn't:**
- Font path initially computed with only 2 `..` levels instead of 3 — easy fix once caught

**Next Session:**
1. Replace `[INSERT PRODUCT LINK]` placeholders with live URLs
2. Build /moon-magic Webflow page
3. Wire Kit opt-in to deliver the PDF

---

### 2026-03-20 (Session 10) — Folder structure cleanup + CLAUDE.md updated

**Completed:**
- Renamed `Brand Info/` → `Brand/`
- Created `Code/scripts/` folder
- Moved `generate_planner.py` and `generate_quickstart_guide.py` from `Content/Products/Moon Magic/` into `Code/scripts/`
- Moved Moon Magic spec docs from `docs/superpowers/` into `Content/Products/Moon Magic/`
- Deleted `docs/` folder entirely — now empty and gone
- Updated CLAUDE.md folder structure to reflect all changes
- Updated font path reference from `Brand Info/Fonts/` → `Brand/Fonts/`

**What Worked:**
- Step-by-step Terminal commands with `ls` verification after each move — no mistakes
- Cleaning up floating scripts into `Code/scripts/` — now everything has one logical home

**What Didn't:**
- Nothing broke — clean session

**Next Session:**
1. Continue Webflow builds — /boundary-blueprint page or /moon-magic page
2. Wire Stripe checkout links to all CTA buttons across existing pages
3. Or set up autonomous Claude workflows
### 2026-03-20 (Session 11) — Weekly planner page redesign + First Quarter worksheet added

**Completed:**
- Restored weekly day-by-day page design to match brainstorm HTML specs (`.superpowers/brainstorm/73816-1773941173/`)
- Header bar: full-width gradient (`#6D2E46 → #1E0A16`) with cream month name + gold week range
- Day cards: `#f9eae1` background, rounded corners, burgundy text, evenly spaced write lines
- Sidebar prompt boxes (`#D5B9B2`): Goals This Week + Gratitude with space-between line layout
- Removed Reflect & Release section; removed week quote from footer
- Added First Quarter Worksheet to every month (+1 page/month, now 12 pages × 12 months = 163 total)
- All three preserved bug fixes intact: FEB 0 date fix, sidebar label overlap, day index skip
- Backed up working script to `Code/scripts/generate_planner_WORKING.py`
- Generated full 163-page PDF → `Content/Products/Lunar Boundaries/ELU_2026_Planner_FINAL.pdf`

**What Worked:**
- Iterative CSS tweaks with gen_test_pdf.py (2-page test) — fast feedback loop, no need to render all 163 pages each time
- `flex:1` + `space-between` on line wrapper for perfectly even write line spacing

**What Didn't:**
- Attempting to make Gratitude smaller to create task overflow room — made it worse; reverted

**Next Session:**
1. Review full PDF for any overflow issues on long weeks (8+ day spans)
2. Wire Stripe checkout links to Webflow CTA buttons
3. Build /boundary-blueprint or /moon-magic Webflow page

### 2026-03-20 (Session 12) — Moon Planner weekly page redesign locked + FINAL PDF generated

**Completed:**
- Restored weekly day-by-day page design from brainstorm HTML specs (`.superpowers/brainstorm/73816-1773941173/`)
  - Header bar: full-width gradient `#6D2E46 → #1E0A16`, cream Playfair month name, gold Poppins week range
  - Day cards: `#f9eae1` background, rounded corners, burgundy/rose text, 2 evenly-spaced write lines
  - Sidebar: `#D5B9B2` prompt boxes (Goals + Gratitude) with `space-between` flex line layout
  - Removed Reflect & Release; removed week quote footer bar
- Added First Quarter Worksheet to every month — now 12 pages/month, 163 pages total
- Three bug fixes preserved throughout: FEB 0 date, sidebar label overlap, day index skip
- Generated full 163-page PDF → `Content/Products/Moon Magic/ELU_Moon_Planner_2026_FINAL.pdf`
- Backed up working script → `Code/scripts/generate_planner_WORKING_BACKUP.py`
- Updated `design-system.md` with locked weekly page design values + reference file paths
- Added Product Folder Guide to CLAUDE.md (Moon Magic vs Lunar Boundaries — never cross-save)
- Added Superpowers Reference Files note to CLAUDE.md (read before editing planner)

**In Progress:**
- Review full 163-page PDF for overflow on long weeks (8+ day spans) — not yet checked
- Webflow CTA buttons still need Stripe links across all pages

**What Worked:**
- `gen_test_pdf.py` (2-page test) as fast feedback loop — render 2 pages not 163 while iterating
- `flex:1` + `space-between` on line wrapper = perfectly even write line spacing in any box height
- Reading brainstorm HTML files first before touching any layout — prevented design drift

**What Didn't:**
- Trying to make Gratitude box smaller to free up task overflow room — broke the balance, reverted immediately

**Next Session:**
1. Spot-check FINAL PDF for long-week overflow (weeks with 8+ days)
2. Wire Stripe checkout links to all Webflow CTA buttons
3. Build /boundary-blueprint or /moon-magic Webflow page

---

### 2026-03-20 (Session 13) — Worksheet redesign + custom moon phase SVG icons

**Completed:**
- Increased worksheet write line spacing: `.wl-s` margin `13px → 28px` — more room for handwriting
- Redesigned "Boundaries I'm Setting" section on all worksheets:
  - Removed underline border from label (`border-bottom:none`)
  - Hardcoded label "Boundaries I'm Setting" (removed phase-specific `ws_checklist` text)
  - Reduced from 6 → 4 checkbox rows, spacing 22px between each
  - Added `padding-top:28px` to match gap spacing of write lines above
- Built custom SVG moon phase icons — `phase_icon_svg()` function in `generate_planner.py`
  - Gold lit side `#EDB74D`, burgundy dark side `#6D2E46`, no ring
  - Mathematical two-circle + elliptical terminator approach — all 8 phases accurate
  - Added `pi()` inline helper for embedding icons in text/flex rows
- Replaced ALL emoji moon phases (🌑🌒🌓🌔🌕🌖🌗🌘) with custom SVG icons everywhere:
  - Worksheet headers, phase education pages, monthly overview labels
  - Full moon ritual date, new moon intention date, how-it-works section titles
  - Day card phase indicators, task sidebar icons, lunar calendar, decorative phase row
- Updated `get_phase()` to return phase keys (e.g. `"full_moon"`) instead of emoji strings
- Added `"key"` field to all 8 PHASES dict entries
- Updated task dicts from `"emoji"` field to `"key"` field throughout
- Created `Code/scripts/preview_moon_icons.py` — standalone icon preview script
- Generated full 163-page FINAL PDF → `Content/Products/Moon Magic/ELU_Moon_Planner_2026_FINAL.pdf`
- Updated `gen_test_pdf.py` to render all 5 worksheet types for review

**In Progress:**
- Full PDF spot-check for long-week overflow still pending
- Webflow CTA buttons still need Stripe links

**What Worked:**
- Mathematical SVG phase icons — clean, on-brand, works at any size, no external assets
- `pi(key, size)` helper keeps inline icon usage concise throughout templates
- Testing all 5 worksheet types in one PDF before approving — caught any inconsistencies early

**What Didn't:**
- `margin-top` on wrapper div gets collapsed by browser — use `padding-top` instead for reliable spacing

**Next Session:**
1. Spot-check FINAL PDF for long-week overflow (weeks with 8+ days)
2. Wire Stripe checkout links to all Webflow CTA buttons
3. Build /boundary-blueprint or /moon-magic Webflow page

---

### 2026-03-23 (Session 14) — Lunar Boundaries funnel scoped, planned, and PDFs generated

**Completed:**
- Full brainstorm → spec → plan cycle for Lunar Boundaries product funnel
- Spec saved: `docs/superpowers/specs/2026-03-23-lunar-boundaries-funnel-design.md`
- Plan saved: `docs/superpowers/plans/2026-03-23-lunar-boundaries-funnel.md`
- Deleted 8 obsolete draft files from `Content/Products/Lunar Boundaries/`
- Verified Q2 2026 lunar dates (original estimates were ~10 days off — all corrected)
- Added missing April, May, June months to `ELU_Lunar_Boundary_Planner_2026_COMPLETE.html` (21 pages, 7 per month)
- Fixed 3 Q3/Q4 consistency issues: Q2 Plan mislabeled as Q3, 2 duplicate section comments
- Created `Code/scripts/generate_lunar_pdfs.sh` (Chrome headless, one-liner per PDF)
- Generated `ELU_Lunar_Boundary_Planner_2026.pdf` (6.4MB)
- Built + generated `ELU_Empowered_Boundary_Blueprint_BRANDED.html` / `.pdf` (366KB) — freebie
- Built + generated `ELU_Lunar_Boundary_Setting_Guide_BRANDED.html` / `.pdf` (516KB) — purchase bonus

**In Progress:**
- Paused at Task 10 — Rickie uploads 3 PDFs to Google Drive, returns direct download URLs
- Remaining: Webflow `/lunar-boundaries` + `/thank-you` pages, `/boundary-blueprint` upsell button, Stripe $17, Zapier, Kit delivery email, Kit freebie sequence update

**Key confirmed details:**
- Product: Lunar Boundary Planner 2026, $17, one-time payment
- Delivery: Stripe → Zapier → Kit tag `purchased-lunar-planner` → Kit email with planner PDF + bonus guide + HTML file
- Freebie delivery: existing quiz email gate (Kit sequence needs new Blueprint PDF URL)
- File hosting: Google Drive direct download (`https://drive.google.com/uc?export=download&id=FILE_ID`)

**What Worked:**
- Verify lunar dates before hardcoding — original estimates were 10+ days off, web lookup saved the product
- Spec review loop caught 5 real issues before implementation started
- Subagent-driven execution for HTML tasks — clean and focused

**What Didn't:**
- PDF size threshold (500KB) doesn't apply to pure-text PDFs — Blueprint at 366KB is complete and correct

**Next Session:**
1. Rickie provides 3 Google Drive direct download URLs (planner, blueprint, guide)
2. Build Webflow `/lunar-boundaries` + `/thank-you` pages (design ref: `Content/Products/Lunar Boundaries/ELU_Planner_Landing_Page.html`)
3. Update `/boundary-blueprint` upsell button → `/lunar-boundaries`
4. Create Stripe product at $17, set up Zapier + Kit delivery email
