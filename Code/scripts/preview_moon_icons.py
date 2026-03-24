#!/usr/bin/env python3
"""Preview all 8 custom moon phase icons — approve before swapping into planner."""
import os, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_planner import phase_icon_svg, CSS

OUTPUT_HTML = "moon_icon_preview.html"
OUTPUT_PDF  = "moon_icon_preview.pdf"

PHASES = [
    ("new_moon",  "New Moon"),
    ("wax_cres",  "Waxing Crescent"),
    ("first_qtr", "First Quarter"),
    ("wax_gib",   "Waxing Gibbous"),
    ("full_moon", "Full Moon"),
    ("wan_gib",   "Waning Gibbous"),
    ("last_qtr",  "Last Quarter"),
    ("wan_cres",  "Waning Crescent"),
]

def build_preview():
    rows = ""
    for key, name in PHASES:
        sm  = phase_icon_svg(key, size=32)
        med = phase_icon_svg(key, size=52)
        lg  = phase_icon_svg(key, size=80)
        xl  = phase_icon_svg(key, size=110)
        rows += f"""
        <tr>
            <td style="padding:18px 28px;font-family:'Poppins',sans-serif;font-size:12px;font-weight:600;
                       letter-spacing:.2em;color:#6D2E46;text-transform:uppercase;white-space:nowrap;">{name}</td>
            <td style="padding:18px 28px;text-align:center;vertical-align:middle;">{sm}</td>
            <td style="padding:18px 28px;text-align:center;vertical-align:middle;">{med}</td>
            <td style="padding:18px 28px;text-align:center;vertical-align:middle;">{lg}</td>
            <td style="padding:18px 24px;background:#1E0A16;text-align:center;vertical-align:middle;">{xl}</td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>ELU Moon Phase Icons — Preview</title>
<style>
{CSS}
body {{ background:#FFFCF7; margin:0; padding:40px; box-sizing:border-box; }}
h1 {{ font-family:'Playfair Display',serif; color:#6D2E46; font-size:28px; margin-bottom:4px; }}
p  {{ font-family:'Poppins',sans-serif; color:#A26769; font-size:12px; margin-bottom:32px; letter-spacing:.1em; }}
table {{ border-collapse:collapse; width:100%; }}
th {{ font-family:'Poppins',sans-serif; font-size:10px; font-weight:600; letter-spacing:.25em;
      color:#A26769; text-transform:uppercase; padding:10px 28px;
      border-bottom:1px solid rgba(109,46,70,0.15); text-align:center; }}
th:first-child {{ text-align:left; }}
tr {{ border-bottom:.5px solid rgba(109,46,70,0.08); }}
td:last-child {{ width:160px; }}
</style>
</head>
<body>
<h1>Moon Phase Icons</h1>
<p>Custom SVG · ELU Brand · Approve before swapping into planner &nbsp;✦</p>
<table>
  <thead><tr>
    <th>Phase</th>
    <th>32px</th>
    <th>52px</th>
    <th>80px</th>
    <th style="background:#1E0A16;color:#EDB74D;">110px (on dark)</th>
  </tr></thead>
  <tbody>{rows}</tbody>
</table>
</body></html>"""


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    html = build_preview()
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML written: {os.path.abspath(OUTPUT_HTML)}")

    chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    result = subprocess.run([
        chrome, "--headless", "--disable-gpu",
        f"--print-to-pdf={os.path.abspath(OUTPUT_PDF)}",
        "--print-to-pdf-no-header",
        os.path.abspath(OUTPUT_HTML),
    ], capture_output=True, text=True)

    if os.path.exists(OUTPUT_PDF):
        print(f"PDF saved: {os.path.abspath(OUTPUT_PDF)} ({os.path.getsize(OUTPUT_PDF):,} bytes)")
    else:
        print("PDF generation failed.")
        print(result.stderr[:500])
