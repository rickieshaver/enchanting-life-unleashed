import io
import re
import textwrap
from datetime import datetime
from typing import Dict, List, Optional

import streamlit as st
from docx import Document
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 0.75 * inch


STYLE_PRESETS = {
    "Grounded Oracle": {
        "bg": colors.HexColor("#fcf9f4"),
        "ink": colors.HexColor("#521830"),
        "accent": colors.HexColor("#EDB74D"),
        "muted": colors.HexColor("#864f51"),
    },
    "Rose Editorial": {
        "bg": colors.HexColor("#F6F2F4"),
        "ink": colors.HexColor("#6E2C4E"),
        "accent": colors.HexColor("#C9A7B2"),
        "muted": colors.HexColor("#AD7E8E"),
    },
    "Lunar Minimal": {
        "bg": colors.HexColor("#FAF7F5"),
        "ink": colors.HexColor("#4F2B3A"),
        "accent": colors.HexColor("#D7C1C3"),
        "muted": colors.HexColor("#A17888"),
    },
    "Classic Clean": {
        "bg": colors.HexColor("#FFFFFF"),
        "ink": colors.HexColor("#1C1C1C"),
        "accent": colors.HexColor("#D9D9D9"),
        "muted": colors.HexColor("#707070"),
    },
}


def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))
    pages = [page.extract_text() or "" for page in reader.pages]
    return "\n".join(pages).strip()


def extract_text_from_docx(file_bytes: bytes) -> str:
    stream = io.BytesIO(file_bytes)
    document = Document(stream)
    return "\n".join(p.text for p in document.paragraphs if p.text.strip()).strip()


def extract_text_from_txt(file_bytes: bytes) -> str:
    return file_bytes.decode("utf-8", errors="ignore").strip()


def extract_uploaded_text(uploaded_file) -> str:
    if uploaded_file is None:
        return ""
    file_bytes = uploaded_file.read()
    suffix = uploaded_file.name.lower().split(".")[-1]
    if suffix == "pdf":
        return extract_text_from_pdf(file_bytes)
    if suffix == "docx":
        return extract_text_from_docx(file_bytes)
    if suffix in {"txt", "md"}:
        return extract_text_from_txt(file_bytes)
    return ""


def normalize_chunks(text: str, max_chunks: int = 10) -> List[str]:
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return []
    sentences = [p.strip() for p in re.split(r"(?<=[.?!])\s+", text) if len(p.strip()) > 30]
    if not sentences:
        sentences = textwrap.wrap(text, width=280)
    return sentences[:max_chunks]


def build_sections(raw_text: str, product_type: str) -> Dict[str, str]:
    chunks = normalize_chunks(raw_text, max_chunks=30)
    fallback = "Add your custom content here."

    if product_type == "Workbook":
        return {
            "Welcome": chunks[0] if len(chunks) > 0 else fallback,
            "Chapter One": chunks[1] if len(chunks) > 1 else fallback,
            "Chapter Two": chunks[2] if len(chunks) > 2 else fallback,
            "Action Steps": "\n".join(f"- {c}" for c in chunks[3:8]) if len(chunks) > 3 else "- Step 1\n- Step 2",
            "Reflection": chunks[8] if len(chunks) > 8 else fallback,
        }
    if product_type == "Guide":
        return {
            "Overview": chunks[0] if len(chunks) > 0 else fallback,
            "Core Framework": chunks[1] if len(chunks) > 1 else fallback,
            "How To Implement": chunks[2] if len(chunks) > 2 else fallback,
            "Checklist": "\n".join(f"- {c}" for c in chunks[3:10]) if len(chunks) > 3 else "- Item 1\n- Item 2",
            "Q&A": chunks[10] if len(chunks) > 10 else fallback,
        }
    if product_type == "Daily Planner":
        return {
            "Top Priorities": "\n".join(f"- {c}" for c in chunks[:3]) if chunks else "- Priority 1\n- Priority 2",
            "Schedule Focus": chunks[3] if len(chunks) > 3 else fallback,
            "Notes": chunks[4] if len(chunks) > 4 else fallback,
        }
    if product_type == "Weekly Planner":
        return {
            "Weekly Goal": chunks[0] if len(chunks) > 0 else fallback,
            "To-Do List": "\n".join(f"- {c}" for c in chunks[1:8]) if len(chunks) > 1 else "- Task 1\n- Task 2",
            "Weekly Reflection": chunks[8] if len(chunks) > 8 else fallback,
        }
    if product_type == "Monthly Planner":
        return {
            "Monthly Focus": chunks[0] if len(chunks) > 0 else fallback,
            "Milestones": "\n".join(f"- {c}" for c in chunks[1:8]) if len(chunks) > 1 else "- Milestone 1\n- Milestone 2",
            "Notes": chunks[8] if len(chunks) > 8 else fallback,
        }
    return {
        "Yearly Focus": chunks[0] if len(chunks) > 0 else fallback,
        "Quarter Priorities": "\n".join(f"- {c}" for c in chunks[1:8]) if len(chunks) > 1 else "- Q1\n- Q2",
        "Notes": chunks[8] if len(chunks) > 8 else fallback,
    }


def split_lines(text: str, width: int = 68, max_lines: int = 14) -> List[str]:
    lines: List[str] = []
    for block in text.split("\n"):
        if not block.strip():
            lines.append("")
            continue
        lines.extend(textwrap.wrap(block, width=width))
    return lines[:max_lines]


def draw_fitted_text(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_width: float,
    max_size: int,
    min_size: int,
    font_name: str,
    color: colors.Color,
    centered: bool = False,
) -> int:
    size = max_size
    c.setFillColor(color)
    while size >= min_size:
        c.setFont(font_name, size)
        if c.stringWidth(text, font_name, size) <= max_width:
            break
        size -= 1
    c.setFont(font_name, size)
    if centered:
        c.drawCentredString(x, y, text)
    else:
        c.drawString(x, y, text)
    return size


def uploaded_to_image_reader(uploaded_file) -> Optional[ImageReader]:
    if uploaded_file is None:
        return None
    try:
        return ImageReader(io.BytesIO(uploaded_file.getvalue()))
    except Exception:
        return None


def draw_image_cover(c: canvas.Canvas, img: ImageReader, x: float, y: float, w: float, h: float) -> None:
    iw, ih = img.getSize()
    if iw == 0 or ih == 0:
        return
    scale = max(w / iw, h / ih)
    draw_w = iw * scale
    draw_h = ih * scale
    x_off = x + (w - draw_w) / 2
    y_off = y + (h - draw_h) / 2
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, w, h)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(img, x_off, y_off, draw_w, draw_h, preserveAspectRatio=True, mask="auto")
    c.restoreState()


def draw_frame(c: canvas.Canvas, brand_name: str, website: str, title: str, page_num: int, style: Dict[str, colors.Color]) -> None:
    c.setFillColor(style["bg"])
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)

    c.setStrokeColor(style["ink"])
    c.setLineWidth(0.8)
    c.line(MARGIN, PAGE_HEIGHT - 0.72 * inch, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 0.72 * inch)
    c.line(MARGIN, 0.72 * inch, PAGE_WIDTH - MARGIN, 0.72 * inch)

    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 12)
    c.drawString(MARGIN, PAGE_HEIGHT - 0.5 * inch, brand_name.upper())
    c.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 0.5 * inch, website.upper())

    c.setFont("Times-Bold", 12)
    c.drawString(MARGIN, 0.42 * inch, title.upper())
    c.drawRightString(PAGE_WIDTH - MARGIN, 0.42 * inch, f"PAGE {page_num:02d}")


def draw_pill(c: canvas.Canvas, x: float, y: float, w: float, h: float, label: str, style: Dict[str, colors.Color], filled: bool = True) -> None:
    c.setStrokeColor(style["ink"])
    if filled:
        c.setFillColor(style["accent"])
    else:
        c.setFillColor(style["bg"])
    c.roundRect(x, y, w, h, h / 2, stroke=1, fill=1)
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 13)
    c.drawCentredString(x + w / 2, y + h * 0.37, label.upper())


def draw_simple_cover(
    c: canvas.Canvas,
    style: Dict[str, colors.Color],
    title: str,
    product_type: str,
    cta: str,
    image_reader: Optional[ImageReader],
) -> None:
    top_h = PAGE_HEIGHT * 0.52
    if image_reader:
        draw_image_cover(c, image_reader, 0, PAGE_HEIGHT - top_h, PAGE_WIDTH, top_h)
    else:
        c.setFillColor(style["accent"])
        c.rect(0, PAGE_HEIGHT - top_h, PAGE_WIDTH, top_h, stroke=0, fill=1)

    c.setFillColor(style["bg"])
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT - top_h, stroke=0, fill=1)

    draw_fitted_text(
        c=c,
        text=title.upper(),
        x=PAGE_WIDTH / 2,
        y=PAGE_HEIGHT - top_h + 16,
        max_width=PAGE_WIDTH - (1.2 * inch),
        max_size=72,
        min_size=28,
        font_name="Times-Bold",
        color=style["bg"],
        centered=True,
    )

    draw_fitted_text(
        c=c,
        text=product_type.title(),
        x=PAGE_WIDTH / 2,
        y=PAGE_HEIGHT - top_h - 56,
        max_width=PAGE_WIDTH - (2.0 * inch),
        max_size=66,
        min_size=24,
        font_name="Times-Italic",
        color=style["muted"],
        centered=True,
    )

    draw_fitted_text(
        c=c,
        text="SUCCESS ISN'T GIVEN. IT'S TAKEN.",
        x=1.1 * inch,
        y=2.7 * inch,
        max_width=3.9 * inch,
        max_size=16,
        min_size=12,
        font_name="Times-Bold",
        color=style["ink"],
    )
    draw_fitted_text(
        c=c,
        text=cta.upper(),
        x=1.1 * inch,
        y=2.25 * inch,
        max_width=3.9 * inch,
        max_size=18,
        min_size=12,
        font_name="Times-Bold",
        color=style["ink"],
    )

    c.setFillColor(style["accent"])
    c.circle(PAGE_WIDTH - 1.75 * inch, 2.45 * inch, 0.55 * inch, stroke=0, fill=1)
    c.setFillColor(style["ink"])
    c.setFont("Times-Italic", 54)
    c.drawCentredString(PAGE_WIDTH - 1.75 * inch, 2.3 * inch, "C")


def draw_welcome_page(
    c: canvas.Canvas,
    style: Dict[str, colors.Color],
    text: str,
    image_a: Optional[ImageReader],
    image_b: Optional[ImageReader],
) -> None:
    x_l = 1.0 * inch
    top = PAGE_HEIGHT - 1.4 * inch
    w = 2.95 * inch
    h = 3.7 * inch

    if image_a:
        draw_image_cover(c, image_a, x_l, top - h, w, h)
    else:
        c.setFillColor(style["accent"])
        c.rect(x_l, top - h, w, h, stroke=0, fill=1)

    if image_b:
        draw_image_cover(c, image_b, x_l + w + 0.2 * inch, top - h, w, h)
    else:
        c.setFillColor(style["muted"])
        c.rect(x_l + w + 0.2 * inch, top - h, w, h, stroke=0, fill=1)

    c.setFillColor(style["muted"])
    c.setFont("Times-Italic", 52)
    c.drawString(3.2 * inch, 4.95 * inch, "Hey,")
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 44)
    c.drawString(4.15 * inch, 4.9 * inch, "WELCOME TO")
    c.drawString(4.8 * inch, 4.45 * inch, "YOUR")
    c.drawString(4.1 * inch, 4.0 * inch, "WORKBOOK")

    body = split_lines(text, width=50, max_lines=8)
    t = c.beginText(4.1 * inch, 3.2 * inch)
    t.setFillColor(style["ink"])
    t.setFont("Times-Roman", 16)
    for line in body:
        t.textLine(line)
    c.drawText(t)


def draw_toc_page(c: canvas.Canvas, style: Dict[str, colors.Color], sections: Dict[str, str]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 64)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.1 * inch, "TABLE OF")
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.8 * inch, "CONTENTS")

    draw_pill(c, PAGE_WIDTH - 3.4 * inch, PAGE_HEIGHT - 2.6 * inch, 2.7 * inch, 0.45 * inch, "What You Will Learn", style)

    y = PAGE_HEIGHT - 3.7 * inch
    for idx, name in enumerate(list(sections.keys())[:5], start=1):
        c.setFillColor(style["ink"])
        c.setFont("Times-Bold", 23)
        c.drawString(1.0 * inch, y, f"CHAPTER {idx}")
        c.setFont("Times-Roman", 21)
        c.drawRightString(PAGE_WIDTH - 1.0 * inch, y, f"PAGE {idx:02d}")

        snippet = sections[name][:190]
        lines = split_lines(snippet, width=66, max_lines=3)
        t = c.beginText(1.0 * inch, y - 0.4 * inch)
        t.setFillColor(style["ink"])
        t.setFont("Times-Roman", 16)
        for line in lines:
            t.textLine(line)
        c.drawText(t)

        c.setStrokeColor(style["ink"])
        c.setLineWidth(1)
        c.line(1.0 * inch, y - 1.2 * inch, PAGE_WIDTH - 1.0 * inch, y - 1.2 * inch)
        y -= 1.95 * inch


def draw_chapter_page(
    c: canvas.Canvas,
    style: Dict[str, colors.Color],
    chapter_num: int,
    chapter_title: str,
    body: str,
) -> None:
    c.setFillColor(style["accent"])
    c.setFont("Times-Bold", 270)
    c.drawString(1.45 * inch, PAGE_HEIGHT - 4.2 * inch, f"{chapter_num:02d}")

    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 78)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.95 * inch, "CHAPTER")
    c.setFont("Times-Italic", 64)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 3.68 * inch, f"{chapter_num:02d}")

    c.setFont("Times-Bold", 24)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 4.25 * inch, chapter_title.upper())

    lines = split_lines(body, width=42, max_lines=17)
    t = c.beginText(1.0 * inch, PAGE_HEIGHT - 4.8 * inch)
    t.setFillColor(style["ink"])
    t.setFont("Times-Roman", 15)
    for line in lines:
        t.textLine(line)
    c.drawText(t)

    c.setFillColor(style["ink"])
    c.circle(PAGE_WIDTH - 2.7 * inch, 2.45 * inch, 0.44 * inch, stroke=0, fill=1)
    c.setFillColor(style["bg"])
    c.circle(PAGE_WIDTH - 2.7 * inch, 2.6 * inch, 0.22 * inch, stroke=0, fill=1)


def draw_goal_setting_page(c: canvas.Canvas, style: Dict[str, colors.Color]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 64)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.3 * inch, "GOAL SETTING")
    c.setFont("Times-Italic", 22)
    c.setFillColor(style["muted"])
    c.drawString(5.0 * inch, PAGE_HEIGHT - 2.3 * inch, "Rooted in vision, powered by execution.")

    labels = [
        "Personal Goals",
        "Professional Goals",
        "Financial Goals",
        "Health Goals",
        "Passion Goals",
        "Love Goals",
    ]
    x_positions = [1.0 * inch, PAGE_WIDTH / 2 + 0.2 * inch]
    y = PAGE_HEIGHT - 3.3 * inch
    i = 0
    for _ in range(3):
        for x in x_positions:
            draw_pill(c, x, y, 3.45 * inch, 0.42 * inch, labels[i], style)
            for row in range(3):
                yy = y - 0.45 * inch - row * 0.42 * inch
                c.setStrokeColor(style["ink"])
                c.line(x, yy, x + 3.45 * inch, yy)
                c.circle(x + 0.18 * inch, yy + 0.16 * inch, 0.09 * inch, stroke=1, fill=0)
                c.setFont("Times-Bold", 11)
                c.drawString(x + 0.145 * inch, yy + 0.14 * inch, f"{row + 1}")
            i += 1
        y -= 2.36 * inch


def draw_checklist_page(c: canvas.Canvas, style: Dict[str, colors.Color], items: List[str]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 62)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 2.1 * inch, "COURSE CHECKLIST")
    draw_pill(c, 1.8 * inch, PAGE_HEIGHT - 2.8 * inch, PAGE_WIDTH - 3.6 * inch, 0.44 * inch, "Customize Your Project Plan Heading", style)

    y = PAGE_HEIGHT - 3.45 * inch
    for idx in range(1, 9):
        c.setFillColor(style["ink"])
        c.setFont("Times-Bold", 28)
        c.drawString(1.2 * inch, y, f"{idx:02d}")
        line_text = items[idx - 1] if idx - 1 < len(items) else f"Task {idx}"
        c.setFont("Times-Roman", 20)
        c.drawString(2.35 * inch, y + 0.03 * inch, line_text[:70])
        c.setStrokeColor(style["ink"])
        c.line(2.2 * inch, y - 0.22 * inch, PAGE_WIDTH - 1.75 * inch, y - 0.22 * inch)
        c.circle(PAGE_WIDTH - 1.05 * inch, y + 0.05 * inch, 0.2 * inch, stroke=1, fill=0)
        y -= 0.55 * inch

    c.setFont("Times-Bold", 24)
    c.drawString(1.0 * inch, 2.2 * inch, "YOUR NOTES")
    for i in range(3):
        yy = 1.95 * inch - i * 0.52 * inch
        c.line(1.0 * inch, yy, PAGE_WIDTH - 1.0 * inch, yy)


def draw_questionnaire_page(c: canvas.Canvas, style: Dict[str, colors.Color], questions: List[str]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 62)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.1 * inch, "QUESTIONNAIRE")

    y = PAGE_HEIGHT - 2.95 * inch
    for idx in range(1, 4):
        c.setFillColor(style["accent"])
        c.circle(1.45 * inch, y + 0.12 * inch, 0.28 * inch, stroke=0, fill=1)
        c.setFillColor(style["ink"])
        c.setFont("Times-BoldItalic", 24)
        c.drawCentredString(1.45 * inch, y + 0.03 * inch, f"{idx:02d}")
        q = questions[idx - 1] if idx - 1 < len(questions) else f"Question {idx}"
        c.setFont("Times-Roman", 20)
        c.drawString(2.35 * inch, y + 0.03 * inch, q[:86])

        for ln in range(6):
            ly = y - 0.32 * inch - ln * 0.31 * inch
            c.setStrokeColor(style["ink"])
            c.line(1.0 * inch, ly, PAGE_WIDTH - 1.0 * inch, ly)
        y -= 2.45 * inch


def draw_daily_page(c: canvas.Canvas, style: Dict[str, colors.Color]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 64)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.1 * inch, "DAILY")
    c.setFont("Times-BoldItalic", 64)
    c.drawString(3.3 * inch, PAGE_HEIGHT - 2.1 * inch, "PLANNER")

    c.setFont("Times-Bold", 20)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.8 * inch, "DATE:")
    c.line(2.0 * inch, PAGE_HEIGHT - 2.85 * inch, PAGE_WIDTH - 1.0 * inch, PAGE_HEIGHT - 2.85 * inch)

    y = PAGE_HEIGHT - 3.25 * inch
    for hour in range(4, 25):
        c.setFillColor(style["ink"])
        c.setFont("Times-Bold", 16)
        c.drawString(1.0 * inch, y, f"{hour}:00")
        c.line(1.8 * inch, y + 0.03 * inch, 4.2 * inch, y + 0.03 * inch)
        y -= 0.33 * inch

    draw_pill(c, 4.65 * inch, PAGE_HEIGHT - 3.45 * inch, 2.95 * inch, 0.45 * inch, "Priorities", style)
    c.roundRect(4.65 * inch, PAGE_HEIGHT - 6.85 * inch, 2.95 * inch, 3.3 * inch, 0.25 * inch, stroke=1, fill=0)
    draw_pill(c, 4.65 * inch, PAGE_HEIGHT - 7.6 * inch, 2.95 * inch, 0.45 * inch, "Notes", style)
    c.roundRect(4.65 * inch, 1.95 * inch, 2.95 * inch, 2.95 * inch, 0.25 * inch, stroke=1, fill=0)


def draw_weekly_page(c: canvas.Canvas, style: Dict[str, colors.Color]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 64)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.1 * inch, "WEEKLY PLANNER")
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    y = PAGE_HEIGHT - 3.0 * inch
    for d in days:
        draw_pill(c, 1.0 * inch, y + 0.15 * inch, 2.8 * inch, 0.44 * inch, d, style, filled=d in {"Monday", "Wednesday", "Friday", "Sunday"})
        c.roundRect(1.0 * inch, y, PAGE_WIDTH - 2.0 * inch, 0.95 * inch, 0.26 * inch, stroke=1, fill=0)
        y -= 1.12 * inch


def draw_monthly_page(c: canvas.Canvas, style: Dict[str, colors.Color], compact: bool) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 64)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.1 * inch, "MONTHLY")
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.75 * inch, "PLANNER")
    if compact:
        draw_pill(c, 4.65 * inch, PAGE_HEIGHT - 2.3 * inch, 2.95 * inch, 0.45 * inch, "Month", style, filled=True)
        c.line(4.65 * inch, PAGE_HEIGHT - 3.0 * inch, PAGE_WIDTH - 1.0 * inch, PAGE_HEIGHT - 3.0 * inch)
        draw_pill(c, 1.0 * inch, PAGE_HEIGHT - 4.0 * inch, 3.1 * inch, 0.43 * inch, "Reminder", style)
        c.roundRect(1.0 * inch, 2.55 * inch, 3.1 * inch, 4.9 * inch, 0.25 * inch, stroke=1, fill=0)
        draw_pill(c, 4.65 * inch, PAGE_HEIGHT - 4.0 * inch, 2.95 * inch, 0.43 * inch, "Goals", style)
        c.roundRect(4.65 * inch, 4.95 * inch, 2.95 * inch, 2.5 * inch, 0.25 * inch, stroke=1, fill=0)
        draw_pill(c, 4.65 * inch, 4.3 * inch, 2.95 * inch, 0.43 * inch, "To-Do", style)
        c.roundRect(4.65 * inch, 2.55 * inch, 2.95 * inch, 1.6 * inch, 0.25 * inch, stroke=1, fill=0)
        c.setFont("Times-Bold", 20)
        c.drawString(1.0 * inch, 2.15 * inch, "YOUR NOTES")
        c.line(1.0 * inch, 1.9 * inch, PAGE_WIDTH - 1.0 * inch, 1.9 * inch)
        c.line(1.0 * inch, 1.55 * inch, PAGE_WIDTH - 1.0 * inch, 1.55 * inch)
    else:
        day = 1
        grid_x = 1.0 * inch
        grid_y = PAGE_HEIGHT - 3.3 * inch
        box = 1.13 * inch
        for row in range(7):
            for col in range(5):
                x = grid_x + col * (box + 0.18 * inch)
                y = grid_y - row * (box + 0.15 * inch)
                c.roundRect(x, y - box, box, box, 0.12 * inch, stroke=1, fill=0)
                if day <= 31:
                    c.setFont("Times-Bold", 14)
                    c.drawRightString(x + box - 0.08 * inch, y - 0.16 * inch, str(day))
                    day += 1


def draw_yearly_page(c: canvas.Canvas, style: Dict[str, colors.Color]) -> None:
    c.setFillColor(style["ink"])
    c.setFont("Times-Bold", 68)
    c.drawString(1.0 * inch, PAGE_HEIGHT - 2.1 * inch, "YEARLY PLANNER")

    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    idx = 0
    for row in range(4):
        for col in range(3):
            x = 1.0 * inch + col * 2.5 * inch
            y = PAGE_HEIGHT - 3.0 * inch - row * 2.3 * inch
            draw_pill(c, x + 0.02 * inch, y - 0.25 * inch, 1.9 * inch, 0.36 * inch, months[idx], style)
            c.roundRect(x, y - 1.7 * inch, 2.1 * inch, 1.6 * inch, 0.22 * inch, stroke=1, fill=0)
            idx += 1


def build_template_matching_pdf(
    title: str,
    brand_name: str,
    website: str,
    cta: str,
    product_type: str,
    style_name: str,
    sections: Dict[str, str],
    image_readers: List[ImageReader],
) -> bytes:
    style = STYLE_PRESETS[style_name]
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    page_num = 1

    cover_image = image_readers[0] if len(image_readers) > 0 else None
    draw_simple_cover(c, style, title, product_type, cta, cover_image)
    draw_frame(c, brand_name, website, title, page_num, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    if product_type in {"Workbook", "Guide"}:
        welcome_text = sections.get("Welcome") or sections.get("Overview") or "Welcome to your guide."
        img_a = image_readers[1] if len(image_readers) > 1 else None
        img_b = image_readers[2] if len(image_readers) > 2 else None
        draw_welcome_page(c, style, welcome_text, img_a, img_b)
    elif product_type == "Daily Planner":
        draw_daily_page(c, style)
    elif product_type == "Weekly Planner":
        draw_weekly_page(c, style)
    elif product_type == "Monthly Planner":
        draw_monthly_page(c, style, compact=False)
    else:
        draw_yearly_page(c, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    if product_type in {"Workbook", "Guide"}:
        draw_toc_page(c, style, sections)
    elif product_type == "Daily Planner":
        draw_daily_page(c, style)
    elif product_type == "Weekly Planner":
        draw_weekly_page(c, style)
    elif product_type == "Monthly Planner":
        draw_monthly_page(c, style, compact=True)
    else:
        draw_yearly_page(c, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    if product_type in {"Workbook", "Guide"}:
        chapter_body = sections.get("Chapter One") or sections.get("Core Framework") or "Chapter content here."
        draw_chapter_page(c, style, 1, "Goal Breakdown", chapter_body)
    elif product_type == "Daily Planner":
        draw_daily_page(c, style)
    elif product_type == "Weekly Planner":
        draw_weekly_page(c, style)
    elif product_type == "Monthly Planner":
        draw_monthly_page(c, style, compact=False)
    else:
        draw_yearly_page(c, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    if product_type in {"Workbook", "Guide"}:
        draw_goal_setting_page(c, style)
    elif product_type == "Daily Planner":
        draw_daily_page(c, style)
    elif product_type == "Weekly Planner":
        draw_weekly_page(c, style)
    elif product_type == "Monthly Planner":
        draw_monthly_page(c, style, compact=True)
    else:
        draw_yearly_page(c, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    if product_type in {"Workbook", "Guide"}:
        checklist_items = normalize_chunks(sections.get("Checklist", "") or sections.get("Action Steps", ""), max_chunks=8)
        draw_checklist_page(c, style, checklist_items)
    elif product_type == "Daily Planner":
        draw_daily_page(c, style)
    elif product_type == "Weekly Planner":
        draw_weekly_page(c, style)
    elif product_type == "Monthly Planner":
        draw_monthly_page(c, style, compact=False)
    else:
        draw_yearly_page(c, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    if product_type in {"Workbook", "Guide"}:
        questions = normalize_chunks(sections.get("Q&A", "") or sections.get("Reflection", ""), max_chunks=3)
        draw_questionnaire_page(c, style, questions)
    elif product_type == "Daily Planner":
        draw_daily_page(c, style)
    elif product_type == "Weekly Planner":
        draw_weekly_page(c, style)
    elif product_type == "Monthly Planner":
        draw_monthly_page(c, style, compact=True)
    else:
        draw_yearly_page(c, style)
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    c.setFillColor(style["accent"])
    c.setStrokeColor(style["accent"])
    c.setLineWidth(1)
    p = c.beginPath()
    p.moveTo(PAGE_WIDTH * 0.43, 1.3 * inch)
    p.lineTo(PAGE_WIDTH * 0.62, PAGE_HEIGHT - 1.6 * inch)
    p.lineTo(PAGE_WIDTH * 0.53, PAGE_HEIGHT - 1.6 * inch)
    p.lineTo(PAGE_WIDTH * 0.37, 1.3 * inch)
    p.close()
    c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(style["ink"])
    c.setFont("Times-Italic", 70)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 0.8 * inch, "Congratulations!")
    c.setFont("Times-Bold", 82)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 0.05 * inch, "SUCCESS")
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 0.65 * inch, "LOOKS GOOD")
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 1.35 * inch, "ON YOU")
    c.setFont("Times-Bold", 18)
    c.drawCentredString(PAGE_WIDTH / 2, 2.9 * inch, "YOU'VE FINISHED THE COURSE!")
    c.setFont("Times-Roman", 16)
    c.drawCentredString(PAGE_WIDTH / 2, 2.3 * inch, datetime.now().strftime("%B %Y"))

    c.save()
    data = buf.getvalue()
    buf.close()
    return data


def build_simple_pdf(
    title: str,
    brand_name: str,
    website: str,
    cta: str,
    product_type: str,
    style_name: str,
    sections: Dict[str, str],
) -> bytes:
    style = STYLE_PRESETS[style_name]
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)

    page_num = 1
    draw_frame(c, brand_name, website, title, page_num, style)
    draw_fitted_text(
        c=c,
        text=title.upper(),
        x=0.9 * inch,
        y=PAGE_HEIGHT - 2.0 * inch,
        max_width=PAGE_WIDTH - 1.8 * inch,
        max_size=54,
        min_size=26,
        font_name="Times-Bold",
        color=style["ink"],
    )
    draw_fitted_text(
        c=c,
        text=product_type,
        x=0.9 * inch,
        y=PAGE_HEIGHT - 2.5 * inch,
        max_width=PAGE_WIDTH - 1.8 * inch,
        max_size=28,
        min_size=16,
        font_name="Times-Italic",
        color=style["ink"],
    )
    draw_pill(c, 0.9 * inch, PAGE_HEIGHT - 3.35 * inch, PAGE_WIDTH - 1.8 * inch, 0.55 * inch, cta, style)
    c.setFont("Times-Roman", 13)
    c.drawString(0.9 * inch, PAGE_HEIGHT - 4.0 * inch, f"Created: {datetime.now().strftime('%B %d, %Y')}")
    c.showPage()

    page_num += 1
    draw_frame(c, brand_name, website, title, page_num, style)
    y = PAGE_HEIGHT - 1.4 * inch
    for heading, body in sections.items():
        c.setFillColor(style["ink"])
        c.setFont("Times-Bold", 25)
        c.drawString(0.9 * inch, y, heading)
        c.line(0.9 * inch, y - 0.08 * inch, PAGE_WIDTH - 0.9 * inch, y - 0.08 * inch)
        text_obj = c.beginText(0.9 * inch, y - 0.4 * inch)
        text_obj.setFont("Times-Roman", 13)
        for line in split_lines(body, width=95, max_lines=8):
            text_obj.textLine(line)
        c.drawText(text_obj)
        y = text_obj.getY() - 0.25 * inch
        if y < 1.3 * inch:
            c.showPage()
            page_num += 1
            draw_frame(c, brand_name, website, title, page_num, style)
            y = PAGE_HEIGHT - 1.4 * inch

    c.save()
    data = buf.getvalue()
    buf.close()
    return data


def main() -> None:
    st.set_page_config(page_title="ELU Product Builder", layout="wide")
    st.title("ELU Digital Product Builder")
    st.caption("Upload brand assets + source copy, then generate polished workbook, guide, and planner PDFs ready to sell.")

    with st.sidebar:
        st.header("Product Setup")
        product_type = st.selectbox(
            "Product Type",
            ["Workbook", "Guide", "Daily Planner", "Weekly Planner", "Monthly Planner", "Yearly Planner"],
        )
        style_name = st.selectbox("Design Style", list(STYLE_PRESETS.keys()))
        generation_mode = st.selectbox("Generation Mode", ["Template Matching Mode", "Standard Mode"], index=0)
        title = st.text_input("Product Title", "Course Workbook")
        brand_name = st.text_input("Brand Name", "Enchanting Life U")
        website = st.text_input("Website", "yourwebsite.com")
        cta = st.text_input("Call To Action", "Let's Get Started")

    left_col, right_col = st.columns(2)
    with left_col:
        st.subheader("1) Upload Brand Guide Assets")
        brand_files = st.file_uploader(
            "Upload PDFs, DOCX, TXT, or MD",
            type=["pdf", "docx", "txt", "md"],
            accept_multiple_files=True,
            key="brand_files",
        )

        st.subheader("2) Upload Source Content")
        source_file = st.file_uploader(
            "Upload source copy (PDF/DOCX/TXT/MD)",
            type=["pdf", "docx", "txt", "md"],
            accept_multiple_files=False,
            key="source_file",
        )

        st.subheader("3) Upload Reference Images (Optional)")
        image_files = st.file_uploader(
            "Upload JPG/PNG images to map into template slots (cover/welcome/content)",
            type=["png", "jpg", "jpeg", "webp"],
            accept_multiple_files=True,
            key="image_files",
        )

    with right_col:
        brand_text = ""
        if brand_files:
            blocks = []
            for file in brand_files:
                text = extract_uploaded_text(file)
                if text:
                    blocks.append(text[:3000])
            brand_text = "\n".join(blocks)

        st.subheader("Detected Brand Context")
        if brand_text:
            st.text_area("Brand voice/context preview", value=brand_text[:2400], height=220)
        else:
            st.info("Upload brand assets to improve voice matching.")

        source_text = extract_uploaded_text(source_file) if source_file else ""
        st.subheader("Source Copy Preview")
        if source_text:
            st.text_area("Extracted source text", value=source_text[:2400], height=220)
        else:
            st.info("Upload source content to auto-populate page copy.")

        if generation_mode == "Template Matching Mode":
            st.markdown(
                "**Template Matching includes:** cover, welcome/hero, TOC, chapter page, goal-setting, checklist, questionnaire, and closing page."
            )

    st.divider()
    generate = st.button("Generate Product PDF", type="primary", use_container_width=True)
    if not generate:
        return

    merged_text = (f"{brand_text}\n{source_text}" if brand_text else source_text).strip()
    sections = build_sections(merged_text, product_type)
    image_readers = [uploaded_to_image_reader(f) for f in (image_files or [])]
    image_readers = [img for img in image_readers if img is not None]

    if generation_mode == "Template Matching Mode":
        pdf_data = build_template_matching_pdf(
            title=title,
            brand_name=brand_name,
            website=website,
            cta=cta,
            product_type=product_type,
            style_name=style_name,
            sections=sections,
            image_readers=image_readers,
        )
    else:
        pdf_data = build_simple_pdf(
            title=title,
            brand_name=brand_name,
            website=website,
            cta=cta,
            product_type=product_type,
            style_name=style_name,
            sections=sections,
        )

    filename = f"{title.lower().replace(' ', '_')}_{product_type.lower().replace(' ', '_')}.pdf"
    st.success("Your product is ready. Download below.")
    st.download_button(
        label="Download PDF",
        data=pdf_data,
        file_name=filename,
        mime="application/pdf",
        use_container_width=True,
    )

    st.subheader("Auto-Populated Section Draft")
    for k, v in sections.items():
        st.markdown(f"**{k}**")
        st.write(v)


if __name__ == "__main__":
    main()
