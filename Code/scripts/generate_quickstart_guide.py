#!/usr/bin/env python3
"""Moon Magic Quick Start Guide — Enchanting Life Unleashed"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ── Font Registration ─────────────────────────────────────────────────────────
_HERE     = os.path.dirname(os.path.abspath(__file__))
_FONT_DIR = os.path.normpath(os.path.join(_HERE, "..", "..", "..", "Brand Info", "Fonts"))

pdfmetrics.registerFont(TTFont("PlayfairDisplay",         os.path.join(_FONT_DIR, "PlayfairDisplay-Regular.ttf")))
pdfmetrics.registerFont(TTFont("PlayfairDisplay-Bold",    os.path.join(_FONT_DIR, "PlayfairDisplay-Bold.ttf")))
pdfmetrics.registerFont(TTFont("PlayfairDisplay-Italic",  os.path.join(_FONT_DIR, "PlayfairDisplay-Italic.ttf")))
pdfmetrics.registerFont(TTFont("PlayfairDisplay-BoldItalic", os.path.join(_FONT_DIR, "PlayfairDisplay-BoldItalic.ttf")))

# ── Output ────────────────────────────────────────────────────────────────────
OUTPUT = os.path.join(_HERE, "Moon_Magic_Quick_Start_Guide_v2.pdf")

# ── Page dimensions ───────────────────────────────────────────────────────────
W, H   = letter          # 612 x 792 pt (8.5 x 11 in)
MARGIN = 50              # 0.69 inch — tighter for more content room
SAFE_W = W - 2 * MARGIN  # 512 pt

# ── Colors ────────────────────────────────────────────────────────────────────
CREAM      = HexColor("#FFFCF7")
BURGUNDY   = HexColor("#6D2E46")
DUSTY_ROSE = HexColor("#A26769")
SOFT_PINK  = HexColor("#D5B9B2")
GOLD       = HexColor("#EDB74D")
DARK_PLUM  = HexColor("#1E0A16")
DEEP_PLUM  = HexColor("#3D1A2B")

# ── Fonts ─────────────────────────────────────────────────────────────────────
F_TITLE  = "PlayfairDisplay-Bold"    # all headings / subheadings
F_ITALIC = "PlayfairDisplay-Italic"  # pull quotes, accent text
F_BODY   = "Helvetica"               # body copy (Poppins substitute)

# ── Phase Content ─────────────────────────────────────────────────────────────
PHASES = [
    {
        "symbol": "●",
        "name": "New Moon",
        "tagline": "Begin · Seed · Intend",
        "description": (
            "The slate is clean. This is the dark of the moon — a pause before the surge. "
            "The energy here is quiet and receptive, an invitation to go inward before the "
            "world asks anything of you. Plant one clear intention and let it root in the "
            "silence before the light returns."
        ),
        "ritual_steps": [
            "Light a candle or sit in quiet for 2 minutes.",
            "Write your intention as if it's already true — present tense, no doubt.",
            "Close with: \"I plant this seed. I trust the timing.\"",
        ],
        "prompt": "What do you want to call in this cycle? Write it as if it's already real.",
    },
    {
        "symbol": "◑",
        "name": "Waxing Crescent",
        "tagline": "Move · Reach · Start",
        "description": (
            "The sliver appears and energy begins to stir. This is the phase of the first "
            "step — imperfect, tentative, and necessary. Don't wait until you're ready. "
            "The moon doesn't wait to be full before it starts to shine."
        ),
        "ritual_steps": [
            "Revisit the intention you set at the New Moon.",
            "Identify ONE small action you can take today.",
            "Do it before the day ends — no overthinking.",
        ],
        "prompt": "What's one tiny step toward your intention that you've been avoiding? What would it feel like to just do it?",
    },
    {
        "symbol": "◑",
        "name": "First Quarter",
        "tagline": "Commit · Act · Decide",
        "description": (
            "Half light, half dark — this is the phase of decision and commitment. "
            "Resistance shows up here disguised as logic. The question isn't whether "
            "you're ready. The question is whether you're willing to move anyway."
        ),
        "ritual_steps": [
            "Name the resistance: what story is slowing you down?",
            "Write one decision you've been sitting on — then make it.",
            "Take a visible action that signals commitment.",
        ],
        "prompt": "Where are you hesitating? What would you do if you weren't afraid of getting it wrong?",
    },
    {
        "symbol": "◕",
        "name": "Waxing Gibbous",
        "tagline": "Refine · Trust · Adjust",
        "description": (
            "The moon is almost full and the energy is building — but it's not there yet. "
            "This is the phase of refinement, not perfection. You've done the work. Now "
            "trust the process, adjust what needs adjusting, and stop trying to force the "
            "finish line closer."
        ),
        "ritual_steps": [
            "Review your progress toward your intention — honestly, not harshly.",
            "Ask: what needs adjusting vs. what just needs more time?",
            "Make one refinement. Then let it be.",
        ],
        "prompt": "What's working? What's one thing you can release control over right now?",
    },
    {
        "symbol": "○",
        "name": "Full Moon",
        "tagline": "Celebrate · Release · Receive",
        "description": (
            "This is the peak — the most electric, activated night of the cycle. "
            "Emotions run high because everything is illuminated. This is the moon that "
            "sees all, hides nothing, and asks you to receive what you've called in and "
            "release what you no longer need to carry."
        ),
        "ritual_steps": [
            "Write a list of three things you're grateful for from this cycle.",
            "Write one thing you're ready to release — then burn it, rip it, or speak it aloud.",
            "Stand outside (or by a window) and let the moonlight land on you.",
        ],
        "prompt": "What has this cycle shown you about yourself? What are you finally ready to let go of?",
    },
    {
        "symbol": "◕",
        "name": "Waning Gibbous",
        "tagline": "Share · Integrate · Give",
        "description": (
            "The moon begins to pull back and so should you — inward and generous at the "
            "same time. This phase is about integration: absorbing what you've learned and "
            "sharing what you've been given. Wisdom shared becomes wisdom doubled."
        ),
        "ritual_steps": [
            "Reflect on what this cycle taught you.",
            "Share something — a lesson, a win, a resource — with someone who needs it.",
            "Receive graciously: rest, nourishment, support, a compliment.",
        ],
        "prompt": "What did this full moon reveal? What wisdom are you ready to share or act on?",
    },
    {
        "symbol": "◑",
        "name": "Last Quarter",
        "tagline": "Release · Clear · Forgive",
        "description": (
            "The light is pulling back fast now. This is the clearing phase — where you "
            "actively cut what no longer belongs in your life, your energy field, or your "
            "mental real estate. Release isn't passive here. It's a decision."
        ),
        "ritual_steps": [
            "Identify one thing — a habit, a story, a relationship pattern — that needs to go.",
            "Write it down and consciously choose to release it.",
            "Clear physical space: a drawer, a folder, a corner. The outer reflects the inner.",
        ],
        "prompt": "What are you ready to stop carrying? What would feel lighter if you just... let it go?",
    },
    {
        "symbol": "◑",
        "name": "Waning Crescent",
        "tagline": "Rest · Restore · Surrender",
        "description": (
            "The moon is almost gone and that's the point. This is the most underrated "
            "phase in the cycle — the deep exhale before the next beginning. Everything "
            "wants to rest here. Your nervous system. Your ambitions. Your to-do list. "
            "Honor it."
        ),
        "ritual_steps": [
            "Cancel or defer one thing on your list that doesn't need to happen right now.",
            "Do one thing that genuinely restores you — not productive rest. Real rest.",
            "Set a gentle intention for what you want to feel at the next New Moon.",
        ],
        "prompt": "What do you need more of right now? What are you ready to surrender so the next cycle can begin clean?",
    },
]

# ── Cheat Sheet Rows ──────────────────────────────────────────────────────────
CHEAT_ROWS = [
    ("●", "New Moon",        "Begin",     "Plant seeds · Set intention · Go inward"),
    ("◑", "Waxing Crescent", "Move",      "First steps · Reach out · Start small"),
    ("◑", "First Quarter",   "Commit",    "Act · Decide · Push through"),
    ("◕", "Waxing Gibbous",  "Refine",    "Adjust · Trust · Stay patient"),
    ("○", "Full Moon",       "Release",   "Celebrate · Gratitude · Let go"),
    ("◕", "Waning Gibbous",  "Integrate", "Share · Reflect · Give back"),
    ("◑", "Last Quarter",    "Clear",     "Release · Forgive · Cut ties"),
    ("◑", "Waning Crescent", "Rest",      "Surrender · Restore · Prepare"),
]

# ── Drawing Helpers ───────────────────────────────────────────────────────────

def draw_gradient_rect(c, x, y, w, h, color1, color2):
    """Vertical gradient from color1 (top) to color2 (bottom) via 60 bands."""
    bands = 60
    bh = h / bands
    r1, g1, b1 = color1.red, color1.green, color1.blue
    r2, g2, b2 = color2.red, color2.green, color2.blue
    for i in range(bands):
        t = i / bands
        r = r1 + (r2 - r1) * t
        g = g1 + (g2 - g1) * t
        b = b1 + (b2 - b1) * t
        c.setFillColorRGB(r, g, b)
        c.rect(x, y + h - (i + 1) * bh, w, bh + 0.5, stroke=0, fill=1)


def draw_rounded_rect(c, x, y, w, h, radius, fill_color, stroke_color=None, stroke_width=0.75):
    """Draw a filled rounded rectangle."""
    c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    p = c.beginPath()
    p.moveTo(x + radius, y)
    p.lineTo(x + w - radius, y)
    p.arcTo(x + w - 2*radius, y, x + w, y + 2*radius, -90, 90)
    p.lineTo(x + w, y + h - radius)
    p.arcTo(x + w - 2*radius, y + h - 2*radius, x + w, y + h, 0, 90)
    p.lineTo(x + radius, y + h)
    p.arcTo(x, y + h - 2*radius, x + 2*radius, y + h, 90, 90)
    p.lineTo(x, y + radius)
    p.arcTo(x, y, x + 2*radius, y + 2*radius, 180, 90)
    p.close()
    c.drawPath(p, fill=1, stroke=1 if stroke_color else 0)


def draw_circle(c, cx, cy, r, fill_color):
    """Draw a filled circle centered at (cx, cy)."""
    c.setFillColor(fill_color)
    c.circle(cx, cy, r, stroke=0, fill=1)


def wrapped_text(c, text, x, y, max_width, font, size, color, line_height=None):
    """Draw wrapped text. Returns y position after last line."""
    if line_height is None:
        line_height = size * 1.7
    c.setFont(font, size)
    c.setFillColor(color)
    lines = simpleSplit(text, font, size, max_width)
    for line in lines:
        c.drawString(x, y, line)
        y -= line_height
    return y


def centered_text(c, text, y, font, size, color):
    """Draw horizontally centered text."""
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawCentredString(W / 2, y, text)


# ── Page: Cover ───────────────────────────────────────────────────────────────

def draw_cover(c):
    draw_gradient_rect(c, 0, 0, W, H, BURGUNDY, DARK_PLUM)

    # Italic accent above title
    centered_text(c, "A Guide for the Modern Mystic", H - 190, F_ITALIC, 22, GOLD)

    # Main title
    centered_text(c, "Moon Magic", H - 250, F_TITLE, 52, CREAM)
    centered_text(c, "Quick Start Guide", H - 310, F_TITLE, 32, CREAM)

    # Gold divider
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.line(W/2 - 100, H - 338, W/2 + 100, H - 338)

    # Byline
    centered_text(c, "by Enchanting Life Unleashed", H - 368, F_BODY, 13, DUSTY_ROSE)

    # Moon symbol row
    centered_text(c, "●  ◑  ◑  ◕  ○  ◕  ◑  ◑", 140, F_BODY, 22, CREAM)

    # Tagline
    centered_text(c, "Where Soul Meets Strategy", 90, F_ITALIC, 20, GOLD)


# ── Page: Welcome ─────────────────────────────────────────────────────────────

WELCOME_BODY = (
    "The moon has been tracking time longer than any calendar, planner, or productivity "
    "app ever will. And for good reason — she's reliable, rhythmic, and she never "
    "pushes you to do more than you're energetically built for right now.\n\n"
    "Moon magic isn't about crystals or rituals you have to perform perfectly. It's about "
    "learning to move with natural energy cycles instead of white-knuckling your way "
    "through them. When you align with the moon, you stop fighting yourself.\n\n"
    "This guide covers all 8 phases of the lunar cycle — what each one means, how to "
    "work with its energy, and a simple ritual you can do right now. Use it as a "
    "teaching tool, a journal companion, or a quick reference whenever you need to "
    "remember where you are in the cycle.\n\n"
    "You already have the magic. This guide just helps you remember."
)

HOW_TO_USE = (
    "Read through each phase. Come back to the one you're in right now. "
    "Do the ritual. Journal in the writing box. Keep the cheat sheet (last page) "
    "saved to your phone or printed on your desk."
)


def draw_welcome(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    y = H - MARGIN - 8

    # Label
    centered_text(c, "✦  WELCOME  ✦", y, F_BODY, 12, GOLD)
    y -= 42

    # Heading
    centered_text(c, "Welcome, Modern Mystic", y, F_TITLE, 34, BURGUNDY)
    y -= 52

    # Divider
    c.setStrokeColor(DUSTY_ROSE)
    c.setLineWidth(0.75)
    c.line(MARGIN, y, W - MARGIN, y)
    y -= 30

    # Body paragraphs
    for para in WELCOME_BODY.split("\n\n"):
        y = wrapped_text(c, para, MARGIN, y, SAFE_W, F_BODY, 13, BURGUNDY, line_height=22)
        y -= 16

    y -= 10

    # How to use box — dynamic height
    box_h = 90
    draw_rounded_rect(c, MARGIN, y - box_h, SAFE_W, box_h, 10, SOFT_PINK)
    c.setFont(F_TITLE, 12)
    c.setFillColor(DUSTY_ROSE)
    c.drawString(MARGIN + 16, y - 20, "HOW TO USE THIS GUIDE")
    wrapped_text(c, HOW_TO_USE, MARGIN + 16, y - 42, SAFE_W - 32, F_BODY, 13, BURGUNDY, line_height=20)


# ── Page: Phase ───────────────────────────────────────────────────────────────

HEADER_H = 210   # ~2.9 inches

def draw_phase(c, phase):
    # Header gradient
    draw_gradient_rect(c, 0, H - HEADER_H, W, HEADER_H, BURGUNDY, DARK_PLUM)

    # Symbol + phase name on same line, vertically centered in header
    symbol_x = MARGIN
    text_x   = MARGIN + 60
    mid_y    = H - HEADER_H + HEADER_H / 2 - 10

    c.setFont(F_BODY, 46)
    c.setFillColor(CREAM)
    c.drawString(symbol_x, mid_y, phase["symbol"])

    c.setFont(F_TITLE, 34)
    c.setFillColor(CREAM)
    c.drawString(text_x, mid_y, phase["name"])

    # Tagline below name
    c.setFont(F_BODY, 13)
    c.setFillColor(GOLD)
    c.drawString(text_x, mid_y - 26, phase["tagline"].upper())

    # Cream body
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H - HEADER_H, stroke=0, fill=1)

    y = H - HEADER_H - 28

    # Description
    y = wrapped_text(c, phase["description"], MARGIN, y, SAFE_W, F_BODY, 13, BURGUNDY, line_height=21)
    y -= 24

    # Mini Ritual label
    c.setFont(F_TITLE, 14)
    c.setFillColor(BURGUNDY)
    c.drawString(MARGIN, y, "✦  Mini Ritual")
    y -= 24

    # Numbered steps
    for i, step in enumerate(phase["ritual_steps"], 1):
        draw_circle(c, MARGIN + 10, y + 4, 10, BURGUNDY)
        c.setFont(F_TITLE, 12)
        c.setFillColor(CREAM)
        c.drawCentredString(MARGIN + 10, y, str(i))
        step_x = MARGIN + 28
        y = wrapped_text(c, step, step_x, y, SAFE_W - 28, F_BODY, 13, BURGUNDY, line_height=20)
        y -= 10

    y -= 16

    # Write-in box — fills remaining space
    box_h = max(y - MARGIN - 4, 130)
    box_h = y - MARGIN - 4
    draw_rounded_rect(c, MARGIN, MARGIN, SAFE_W, box_h, 10, SOFT_PINK)

    # Prompt inside box
    prompt_y = MARGIN + box_h - 20
    c.setFont(F_ITALIC, 13)
    c.setFillColor(BURGUNDY)
    lines = simpleSplit(phase["prompt"], F_ITALIC, 13, SAFE_W - 32)
    for line in lines:
        c.drawString(MARGIN + 16, prompt_y, line)
        prompt_y -= 20

    # Writing lines
    line_y = MARGIN + box_h - 20 - len(simpleSplit(phase["prompt"], F_ITALIC, 13, SAFE_W - 32)) * 20 - 16
    while line_y > MARGIN + 14:
        c.setStrokeColor(DUSTY_ROSE)
        c.setLineWidth(0.5)
        c.line(MARGIN + 16, line_y, W - MARGIN - 16, line_y)
        line_y -= 24


# ── Page: Cheat Sheet ─────────────────────────────────────────────────────────

def draw_cheatsheet(c):
    draw_gradient_rect(c, 0, H - HEADER_H, W, HEADER_H, BURGUNDY, DARK_PLUM)
    centered_text(c, "Moon Phase Quick Reference", H - 70, F_TITLE, 28, CREAM)
    centered_text(c, "✦  YOUR AT-A-GLANCE GUIDE  ✦", H - 106, F_BODY, 13, GOLD)

    c.setFillColor(CREAM)
    c.rect(0, 0, W, H - HEADER_H, stroke=0, fill=1)

    # Column layout
    col1_w = 60    # symbol
    col2_w = 160   # phase name + action
    row_h  = (H - HEADER_H - MARGIN - 30) / 8   # fill available body height

    y = H - HEADER_H - 12

    for symbol, name, action, keywords in CHEAT_ROWS:
        row_mid = y - row_h / 2

        # Symbol
        c.setFont(F_BODY, 18)
        c.setFillColor(BURGUNDY)
        c.drawCentredString(MARGIN + col1_w / 2, row_mid - 6, symbol)

        # Phase name (heading font)
        c.setFont(F_TITLE, 14)
        c.setFillColor(BURGUNDY)
        c.drawString(MARGIN + col1_w, row_mid + 4, name)

        # Action word
        c.setFont(F_ITALIC, 13)
        c.setFillColor(DUSTY_ROSE)
        c.drawString(MARGIN + col1_w, row_mid - 14, action)

        # Keywords
        c.setFont(F_BODY, 12)
        c.setFillColor(BURGUNDY)
        c.drawString(MARGIN + col1_w + col2_w, row_mid - 4, keywords)

        y -= row_h

        # Divider
        c.setStrokeColor(DUSTY_ROSE)
        c.setLineWidth(0.5)
        c.line(MARGIN, y, W - MARGIN, y)

    centered_text(c, "Save this page. Screenshot it. Keep it close.", MARGIN - 8, F_ITALIC, 13, DUSTY_ROSE)


# ── Page: Closing CTA ─────────────────────────────────────────────────────────

def draw_cta(c):
    draw_gradient_rect(c, 0, 0, W, H, BURGUNDY, DARK_PLUM)

    y = H - MARGIN - 20

    centered_text(c, "You already have the magic.", y, F_ITALIC, 24, GOLD)
    y -= 56

    centered_text(c, "Ready to Go Deeper?", y, F_TITLE, 36, CREAM)
    y -= 48

    body = "You've learned the foundation. Now put it into practice with a full year of moon magic."
    y = wrapped_text(c, body, MARGIN, y, SAFE_W, F_BODY, 14, SOFT_PINK, line_height=22)
    y += 22

    y -= 28

    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.line(W/2 - 80, y, W/2 + 80, y)
    y -= 38

    box_w = 420
    box_x = (W - box_w) / 2

    # Box 1 — primary CTA
    box_h = 110
    draw_rounded_rect(c, box_x, y - box_h, box_w, box_h, 10, DEEP_PLUM,
                      stroke_color=GOLD, stroke_width=1)
    c.setFont(F_TITLE, 12)
    c.setFillColor(GOLD)
    c.drawString(box_x + 18, y - 20, "✦  NEXT STEP")
    c.setFont(F_TITLE, 20)
    c.setFillColor(CREAM)
    c.drawString(box_x + 18, y - 46, "12 Full Moon Rituals 2026")
    c.setFont(F_BODY, 13)
    c.setFillColor(SOFT_PINK)
    c.drawString(box_x + 18, y - 68, "A complete ritual for every full moon of the year")
    c.setFont(F_BODY, 12)
    c.setFillColor(GOLD)
    c.drawString(box_x + 18, y - 88, "[INSERT PRODUCT LINK]")
    y -= box_h + 20

    # Box 2 — secondary CTA
    draw_rounded_rect(c, box_x, y - box_h, box_w, box_h, 10, DEEP_PLUM,
                      stroke_color=HexColor("#A26769"), stroke_width=1)
    c.setFont(F_TITLE, 12)
    c.setFillColor(DUSTY_ROSE)
    c.drawString(box_x + 18, y - 20, "✦  OR GO ALL IN")
    c.setFont(F_TITLE, 20)
    c.setFillColor(CREAM)
    c.drawString(box_x + 18, y - 46, "Moon Cycle Life Planner")
    c.setFont(F_BODY, 13)
    c.setFillColor(SOFT_PINK)
    c.drawString(box_x + 18, y - 68, "Plan your entire life in sync with the moon")
    c.setFont(F_BODY, 12)
    c.setFillColor(DUSTY_ROSE)
    c.drawString(box_x + 18, y - 88, "[INSERT PRODUCT LINK]")
    y -= box_h + 36

    centered_text(c, "Where Soul Meets Strategy", y, F_ITALIC, 22, GOLD)
    centered_text(c, "Enchanting Life Unleashed", y - 32, F_BODY, 13, DUSTY_ROSE)


if __name__ == "__main__":
    c = canvas.Canvas(OUTPUT, pagesize=letter)
    draw_cover(c);      c.showPage()
    draw_welcome(c);    c.showPage()
    for phase in PHASES:
        draw_phase(c, phase)
        c.showPage()
    draw_cheatsheet(c); c.showPage()
    draw_cta(c);        c.showPage()
    c.save()
    print(f"Saved: {OUTPUT}")
