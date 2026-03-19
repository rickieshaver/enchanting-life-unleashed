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

if __name__ == "__main__":
    pass  # main() will be replaced in Task 4
