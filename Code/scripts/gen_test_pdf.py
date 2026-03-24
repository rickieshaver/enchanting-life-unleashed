#!/usr/bin/env python3
"""
Test generator — renders ONLY January Week 2 + February Week 2.
Run: python gen_test_pdf.py
Output: test_output.pdf in the same directory.
"""

import os, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from generate_planner import (
    CSS, brackets, MONTHS, WEEK_QUOTES, PHASE_IDX,
    build_weeks, page_weekly_planner, page_phase_worksheet,
    page_full_moon_ritual,
)

OUTPUT_HTML = "test_output.html"
OUTPUT_PDF  = "test_output.pdf"


def build_test_html():
    pages = []
    jan = MONTHS[0]

    # All 5 worksheet types using January data
    pages.append(page_phase_worksheet(jan, PHASE_IDX["first_qtr"], "Jan 6–13",  "1 — First Quarter"))
    pages.append(page_phase_worksheet(jan, PHASE_IDX["wax_gib"],   "Jan 13–17", "2 — Waxing Gibbous"))
    pages.append(page_phase_worksheet(jan, PHASE_IDX["wan_gib"],   "Jan 18–24", "3 — Waning Gibbous"))
    pages.append(page_phase_worksheet(jan, PHASE_IDX["last_qtr"],  "Jan 24–27", "4 — Last Quarter"))
    pages.append(page_phase_worksheet(jan, PHASE_IDX["wan_cres"],  "Jan 27–31", "5 — Waning Crescent"))
    pages.append(page_full_moon_ritual(jan, "6 — Full Moon Ritual"))

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Test — Jan + Feb Week 2</title>
<style>{CSS}</style>
</head>
<body>{''.join(pages)}</body>
</html>"""


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    html = build_test_html()
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
        size = os.path.getsize(OUTPUT_PDF)
        print(f"PDF saved: {os.path.abspath(OUTPUT_PDF)} ({size:,} bytes)")
    else:
        print("PDF generation failed.")
        print(result.stderr[:500])
