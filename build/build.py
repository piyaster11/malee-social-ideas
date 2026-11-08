#!/usr/bin/env python3
"""Rebuild the static dashboard.

index.html uses project-relative assets so GitHub Pages can serve the repo at
/malee-social-ideas/. dashboard-offline.html inlines CSS, data and SheetJS so
it still opens from a file with the network off.
"""
import base64
import json
import pathlib
from datetime import datetime, timedelta, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent


def js(value):
    return json.dumps(value, ensure_ascii=False)


def main():
    page = (ROOT / "src/page.html").read_text(encoding="utf-8")
    css = (ROOT / "src/style.css").read_text(encoding="utf-8")
    data = (ROOT / "src/data.js").read_text(encoding="utf-8")
    gen = (ROOT / "src/gen.js").read_text(encoding="utf-8")
    archive = (ROOT / "src/archive.js").read_text(encoding="utf-8")
    app = (ROOT / "src/app.js").read_text(encoding="utf-8")
    tpl = (ROOT / "templates/social_posts_template.csv").read_text(encoding="utf-8")
    example = (ROOT / "data/social_posts_EXAMPLE.csv").read_text(encoding="utf-8")
    xlsx = (ROOT / "templates/social_posts_template.xlsx").read_bytes()
    sheet = (ROOT / "vendor/xlsx.full.min.js").read_text(encoding="utf-8")
    ict = datetime.now(timezone(timedelta(hours=7)))
    stamp = (
        "Built " + ict.strftime("%Y-%m-%d %H:%M") + " ICT"
        " · content checked 8 Nov 2026 ICT"
        " · draft mockup, this page does not post"
        " · charts: local SVG"
        " · Excel reader: SheetJS Community Edition 0.20.3 (Apache-2.0), vendor/xlsx.full.min.js"
        " · saved ideas stay in this browser"
    )

    def fill(html):
        html = html.replace("/*__TEMPLATE_CSV__*/", js(tpl))
        html = html.replace("/*__TEMPLATE_XLSX_B64__*/", js(base64.b64encode(xlsx).decode("ascii")))
        html = html.replace("/*__EXAMPLE_CSV__*/", js(example))
        html = html.replace("/*__BUILD__*/", js(stamp))
        return html

    pages = fill(page)
    pages = pages.replace(
        "<style>/*__CSS__*/</style>",
        '<link rel="stylesheet" href="src/style.css">',
    )
    pages = pages.replace(
        "<!--__SHEETJS__-->",
        "<!-- SheetJS CE 0.20.3 loads from vendor/xlsx.full.min.js only if an Excel file is uploaded. -->",
    )
    pages = pages.replace(
        "<!--__SCRIPTS__-->",
        "\n".join([
            '<script src="src/data.js"></script>',
            '<script src="src/gen.js"></script>',
            '<script src="src/archive.js"></script>',
            '<script src="src/app.js"></script>',
        ]),
    )

    offline = fill(page)
    offline = offline.replace("/*__CSS__*/", css)
    offline = offline.replace("<!--__SHEETJS__-->", "<script>\n" + sheet + "\n</script>")
    offline = offline.replace(
        "<!--__SCRIPTS__-->",
        "\n".join([
            "<script>\n" + data + "\n</script>",
            "<script>\n" + gen + "\n</script>",
            "<script>\n" + archive + "\n</script>",
            "<script>\n" + app + "\n</script>",
        ]),
    )
    for name, html in (("index.html", pages), ("dashboard-offline.html", offline)):
        if "/*__" in html or "__SCRIPTS__" in html or "__SHEETJS__" in html:
            raise SystemExit("unreplaced placeholder in " + name)
        if "</script><script" in html.lower() and html.lower().count("<script") < 2:
            raise SystemExit("script tags look truncated in " + name)
    (ROOT / "index.html").write_text(pages, encoding="utf-8")
    (ROOT / "dashboard-offline.html").write_text(offline, encoding="utf-8")
    print("index.html %d bytes" % len(pages.encode("utf-8")))
    print("dashboard-offline.html %d bytes" % len(offline.encode("utf-8")))


if __name__ == "__main__":
    main()
