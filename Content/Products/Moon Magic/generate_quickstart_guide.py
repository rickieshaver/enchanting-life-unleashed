#!/usr/bin/env python3
"""Moon Magic Quick Start Guide — Enchanting Life Unleashed"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
import os

# ── Output ────────────────────────────────────────────────────────────────────
OUTPUT = os.path.join(os.path.dirname(__file__), "Moon_Magic_Quick_Start_Guide_v2.pdf")

# ── Page dimensions ───────────────────────────────────────────────────────────
W, H = letter          # 612 x 792 pt (8.5 x 11 in)
MARGIN = 54            # 0.75 inch
SAFE_W = W - 2 * MARGIN   # 504 pt
SAFE_H = H - 2 * MARGIN   # 684 pt

# ── Colors ────────────────────────────────────────────────────────────────────
CREAM       = HexColor("#FFFCF7")
BURGUNDY    = HexColor("#6D2E46")
DUSTY_ROSE  = HexColor("#A26769")
SOFT_PINK   = HexColor("#D5B9B2")
GOLD        = HexColor("#EDB74D")
DARK_PLUM   = HexColor("#1E0A16")
DEEP_PLUM   = HexColor("#3D1A2B")

# ── Fonts (ReportLab built-ins; Playfair/Poppins/Allura not available
#    without TTF registration — use Helvetica family as faithful stand-ins
#    until font files are added) ───────────────────────────────────────────────
F_TITLE  = "Helvetica-Bold"    # → swap to Playfair Display once TTF registered
F_BODY   = "Helvetica"         # → swap to Poppins once TTF registered
F_ACCENT = "Helvetica-Oblique" # → swap to Allura once TTF registered

# ── Phase Content ─────────────────────────────────────────────────────────────
PHASES = [
    {
        "emoji": "●",
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
        "emoji": "◑",
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
        "emoji": "◑",
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
        "emoji": "◕",
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
        "emoji": "○",
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
        "emoji": "◕",
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
        "emoji": "◑",
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
        "emoji": "◑",
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
    ("●", "New Moon",       "Begin",    "Plant seeds · Set intention · Go inward"),
    ("◑", "Waxing Crescent","Move",     "First steps · Reach out · Start small"),
    ("◑", "First Quarter",  "Commit",   "Act · Decide · Push through"),
    ("◕", "Waxing Gibbous", "Refine",   "Adjust · Trust · Stay patient"),
    ("○", "Full Moon",      "Release",  "Celebrate · Gratitude · Let go"),
    ("◕", "Waning Gibbous", "Integrate","Share · Reflect · Give back"),
    ("◑", "Last Quarter",   "Clear",    "Release · Forgive · Cut ties"),
    ("◑", "Waning Crescent","Rest",     "Surrender · Restore · Prepare"),
]

# ── Drawing Helpers ───────────────────────────────────────────────────────────

def draw_gradient_rect(c, x, y, w, h, color1, color2):
    """Vertical gradient from color1 (top) to color2 (bottom) via 40 bands."""
    bands = 40
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


def draw_rounded_rect(c, x, y, w, h, radius, fill_color, stroke_color=None, stroke_width=0.5):
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
    # Full-page gradient background
    draw_gradient_rect(c, 0, 0, W, H, BURGUNDY, DARK_PLUM)

    # Allura accent above title
    centered_text(c, "A Guide for the Modern Mystic", H - 180, F_ACCENT, 28, GOLD)

    # Main title (two lines)
    centered_text(c, "Moon Magic", H - 230, F_TITLE, 38, CREAM)
    centered_text(c, "Quick Start Guide", H - 278, F_TITLE, 28, CREAM)

    # Gold divider line
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.75)
    c.line(W/2 - 80, H - 305, W/2 + 80, H - 305)

    # Byline
    centered_text(c, "by Enchanting Life Unleashed", H - 330, F_BODY, 11, DUSTY_ROSE)

    # Moon phase text row near bottom
    moons = "●  ◑  ◑  ◕  ○  ◕  ◑  ◑"
    centered_text(c, moons, 120, F_BODY, 18, CREAM)

    # Tagline at bottom
    centered_text(c, "Where Soul Meets Strategy", 80, F_ACCENT, 16, GOLD)


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
    # Cream background
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    y = H - MARGIN

    # Gold section label
    centered_text(c, "✦  WELCOME  ✦", y - 10, F_BODY, 9, GOLD)
    y -= 36

    # Heading
    centered_text(c, "Welcome, Modern Mystic", y, F_TITLE, 26, BURGUNDY)
    y -= 44

    # Dusty rose divider
    c.setStrokeColor(DUSTY_ROSE)
    c.setLineWidth(0.5)
    c.line(MARGIN, y, W - MARGIN, y)
    y -= 24

    # Body text
    for para in WELCOME_BODY.split("\n\n"):
        y = wrapped_text(c, para, MARGIN, y, SAFE_W, F_BODY, 10, BURGUNDY, line_height=17)
        y -= 10

    y -= 8

    # How to use box
    draw_rounded_rect(c, MARGIN, y - 72, SAFE_W, 72, 8, SOFT_PINK)
    c.setFont(F_BODY, 8)
    c.setFillColor(DUSTY_ROSE)
    c.drawString(MARGIN + 14, y - 18, "HOW TO USE THIS GUIDE")
    wrapped_text(c, HOW_TO_USE, MARGIN + 14, y - 34, SAFE_W - 28, F_BODY, 9, BURGUNDY, line_height=15)


# ── Page: Phase ───────────────────────────────────────────────────────────────

HEADER_H = 180   # top 180pt = ~2.5 inches

def draw_phase(c, phase):
    # ── Header gradient ──────────────────────────────────────────────────────
    draw_gradient_rect(c, 0, H - HEADER_H, W, HEADER_H, BURGUNDY, DARK_PLUM)

    # Moon emoji + phase name on same horizontal line
    emoji_x = MARGIN
    text_x  = MARGIN + 54   # 54pt emoji column
    mid_y   = H - HEADER_H + (HEADER_H - 28) / 2 + 10  # vertically centered

    c.setFont(F_BODY, 40)
    c.setFillColor(CREAM)
    c.drawString(emoji_x, mid_y, phase["emoji"])

    c.setFont(F_TITLE, 28)
    c.setFillColor(CREAM)
    c.drawString(text_x, mid_y, phase["name"])

    # Action tagline below name
    c.setFont(F_BODY, 9)
    c.setFillColor(GOLD)
    c.drawString(text_x, mid_y - 22, phase["tagline"].upper())

    # ── Body (cream background) ───────────────────────────────────────────────
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H - HEADER_H, stroke=0, fill=1)

    y = H - HEADER_H - 24

    # Description
    y = wrapped_text(c, phase["description"], MARGIN, y, SAFE_W, F_BODY, 10, BURGUNDY, line_height=17)
    y -= 18

    # Mini Ritual label
    c.setFont(F_BODY, 8)
    c.setFillColor(BURGUNDY)
    c.drawString(MARGIN, y, "✦  MINI RITUAL")
    y -= 16

    # Numbered steps
    for i, step in enumerate(phase["ritual_steps"], 1):
        # Circle
        draw_circle(c, MARGIN + 7, y + 3, 7, BURGUNDY)
        c.setFont(F_BODY, 8)
        c.setFillColor(CREAM)
        c.drawCentredString(MARGIN + 7, y - 1, str(i))
        # Step text
        step_x = MARGIN + 20
        y = wrapped_text(c, step, step_x, y, SAFE_W - 20, F_BODY, 10, BURGUNDY, line_height=15)
        y -= 6

    y -= 12

    # Write-in box
    box_h = 110
    if y - box_h < MARGIN:
        box_h = y - MARGIN - 4
    draw_rounded_rect(c, MARGIN, y - box_h, SAFE_W, box_h, 8, SOFT_PINK)

    # Prompt
    prompt_y = y - 18
    wrapped_text(c, phase["prompt"], MARGIN + 14, prompt_y, SAFE_W - 28, F_ACCENT, 9, BURGUNDY, line_height=14)

    # Writing lines
    line_y = y - 46
    for _ in range(4):
        if line_y > y - box_h + 8:
            c.setStrokeColor(DUSTY_ROSE)
            c.setLineWidth(0.5)
            c.line(MARGIN + 14, line_y, W - MARGIN - 14, line_y)
            line_y -= 18


if __name__ == "__main__":
    c = canvas.Canvas(OUTPUT, pagesize=letter)
    draw_cover(c);   c.showPage()
    draw_welcome(c); c.showPage()
    for phase in PHASES:
        draw_phase(c, phase)
        c.showPage()
    c.save()
    print(f"Saved: {OUTPUT}")
