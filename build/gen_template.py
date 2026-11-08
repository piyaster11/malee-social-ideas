#!/usr/bin/env python3
"""Rewrite the empty CSV/XLSX import templates from one header list.

The EXAMPLE performance file is checked, not rewritten. Every data row in it
must keep the word EXAMPLE.
"""
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
HEADER = [
    "date", "platform", "format", "pillar", "product", "post_link",
    "reach", "views", "likes", "comments", "shares", "saves",
    "followers_gained", "notes",
]
HOW = [
    ["Malee social posts template"],
    ["One row on the Posts sheet is one post. Leave this sheet out of the upload if you prefer; the dashboard skips a sheet whose name contains 'how to' or 'วิธี'."],
    ["Copy numbers from the app's own insights. This file is an empty template."],
    ["If a row is only a sample, write EXAMPLE in notes. The dashboard keeps the EXAMPLE label while every row says EXAMPLE."],
    ["The file stays on your device. This site does not receive the upload."],
    ["Do not put personal contact details in notes."],
]


def main():
    csv_path = ROOT / "templates" / "social_posts_template.csv"
    xlsx_path = ROOT / "templates" / "social_posts_template.xlsx"
    csv_path.write_text("\ufeff" + ",".join(HEADER) + "\n", encoding="utf-8")
    example = (ROOT / "data" / "social_posts_EXAMPLE.csv").read_text(encoding="utf-8")
    rows = [r for r in example.splitlines() if r.strip()]
    if not rows or not rows[0].lstrip("\ufeff").startswith(",".join(HEADER[:3])):
        raise SystemExit("EXAMPLE csv header drifted")
    for row in rows[1:]:
        if "EXAMPLE" not in row:
            raise SystemExit("EXAMPLE csv has a row without EXAMPLE: " + row[:80])
    script = r"""
const fs = require("fs");
const X = require(process.argv[1]);
if (X.set_fs) X.set_fs(fs);
const header = JSON.parse(process.argv[3]);
const how = JSON.parse(process.argv[4]);
const wb = X.utils.book_new();
X.utils.book_append_sheet(wb, X.utils.aoa_to_sheet([header]), "Posts");
X.utils.book_append_sheet(wb, X.utils.aoa_to_sheet(how), "How to");
X.writeFile(wb, process.argv[2]);
const check = X.read(fs.readFileSync(process.argv[2]));
if (!check.SheetNames.includes("Posts") || !check.SheetNames.includes("How to")) process.exit(2);
"""
    subprocess.check_call([
        "node", "-e", script,
        str(ROOT / "vendor" / "xlsx.full.min.js"),
        str(xlsx_path),
        __import__("json").dumps(HEADER),
        __import__("json").dumps(HOW),
    ])
    print("templates rewritten", xlsx_path.stat().st_size, "bytes")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        sys.exit(exc.returncode or 1)
