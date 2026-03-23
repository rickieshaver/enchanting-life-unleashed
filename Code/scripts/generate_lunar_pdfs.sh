#!/bin/bash
# ELU Lunar Boundaries — PDF Generator
# Usage: ./generate_lunar_pdfs.sh [planner|blueprint|guide|all]

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
