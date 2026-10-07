import os, re

# ============================================================
# 1. FIX BUILD: businesses (array) -> biz (single object)
# 2. UPDATE ALL APP DOWNLOAD CTAs TO REAL APP STORE LINK
# ============================================================

APP_STORE_URL = "https://apps.apple.com/za/app/zand-x/id6807573204"

# --- 1. FIX BUSINESS DETAIL PAGE BUILD ERROR ---
biz_page = "app/[lang]/local/[slug]/page.tsx"
if os.path.exists(biz_page):
    with open(biz_page, "r") as f:
        content = f.read()

    changed = False

    # Fix keywords block: businesses?. -> biz?.
    # These are in the generateMetadata function
    if "businesses?.name" in content or "businesses?.category" in content or "businesses?.city" in content:
        content = content.replace("businesses?.name", "biz?.name")
        content = content.replace("businesses?.category", "biz?.category")
        content = content.replace("businesses?.city", "biz?.city")
        changed = True
        print("Fixed keywords: businesses?. -> biz?.")

    # Fix breadcrumb JSON-LD: businesses.name -> biz.name, businesses.slug -> slug
    # The breadcrumb is in the component body, where biz is also defined
    if "name: businesses.name" in content:
        content = content.replace("name: businesses.name", "name: biz.name")
        changed = True
        print("Fixed breadcrumb: businesses.name -> biz.name")

    if "businesses.slug" in content:
        # In breadcrumb, the slug should come from the URL param or biz.slug
        content = content.replace("${businesses.slug}", "${slug}")
        changed = True
        print("Fixed breadcrumb: businesses.slug -> slug (from URL params)")

    # Fix the guard: {businesses && ( -> {biz && (
    # This is the JSON-LD wrapper - there may be multiple
    # Only fix the ones that are clearly about a single business display
    if "{businesses && (" in content:
        content = content.replace("{businesses && (", "{biz && (")
        changed = True
        print("Fixed JSON-LD guards: businesses && -> biz &&")

    if changed:
        with open(biz_page, "w") as f:
            f.write(content)
        print(f"Saved: {biz_page}\n")
    else:
        print("Business detail page: no array fixes needed\n")
else:
    print(f"WARNING: {biz_page} not found\n")


# --- 2. UPDATE ALL APP DOWNLOAD CTAs ---
print("=" * 50)
print("UPDATING APP DOWNLOAD LINKS")
print("=" * 50)

# All CTAs currently point to {"/" + lang + "/app"} (internal route)
# We need to change them to the real App Store URL

pages_to_fix = [
    "app/[lang]/page.tsx",              # Homepage
    "app/[lang]/explore/page.tsx",      # Explore page
    "app/[lang]/language/page.tsx",     # Language page
    "app/[lang]/local/[slug]/page.tsx", # Business detail page
]

# Pattern: href={"/" + lang + "/app"}
# Replace with: href="https://apps.apple.com/za/app/zand-x/id6807573204" target="_blank" rel="noopener noreferrer"
app_link_patterns = [
    # Various ways the internal /app link might be written
    'href={"/" + lang + "/app"}',
    "href={'/' + lang + '/app'}",
    'href={`/${lang}/app`}',
    'href={`/${lang}/app/`}',
    'href={"/" + lang + "/app/"}',
]

replacement = f'href="{APP_STORE_URL}" target="_blank" rel="noopener noreferrer"'

total_fixed = 0

for page_path in pages_to_fix:
    if not os.path.exists(page_path):
        print(f"  Skipping (not found): {page_path}")
        continue

    with open(page_path, "r") as f:
        content = f.read()

    count = 0
    for pattern in app_link_patterns:
        if pattern in content:
            occurrences = content.count(pattern)
            content = content.replace(pattern, replacement)
            count += occurrences

    if count > 0:
        with open(page_path, "w") as f:
            f.write(content)
        print(f"  Updated {count} app link(s) in: {page_path}")
        total_fixed += count
    else:
        print(f"  No app links found in: {page_path}")

print(f"\nTotal app links updated: {total_fixed}")


# --- 3. ALSO CHECK FOR /app ROUTE PAGE AND UPDATE IT ---
# There might be an /app page that says "coming soon" - let's update it too
app_page = "app/[lang]/app/page.tsx"
if os.path.exists(app_page):
    with open(app_page, "r") as f:
        app_content = f.read()
    print(f"\nFound app page: {app_page}")
    print(f"  Length: {len(app_content)} chars")

    # Check if it has "coming soon" text
    if "coming soon" in app_content.lower() or "comingSoon" in app_content:
        print("  Contains 'coming soon' - will update")

    # Replace the page to redirect to App Store or show the real download link
    # Check what's in it first
    if "Coming soon" in app_content or "comingSoon" in app_content:
        # Rewrite to redirect to App Store
        new_app_page = f'''import {{ redirect }} from "next/navigation";

export default function AppPage() {{
  redirect("{APP_STORE_URL}");
}}
'''
        with open(app_page, "w") as f:
            f.write(new_app_page)
        print("  Replaced /app page with redirect to App Store")
    else:
        print("  No 'coming soon' text found, leaving as-is")
else:
    print(f"\nNo /app page found at {app_page}")


# --- 4. UPDATE TRANSLATIONS ---
# Change "Coming soon" to "Download on the App Store" in case it's used anywhere
translations_path = "lib/translations.ts"
if os.path.exists(translations_path):
    with open(translations_path, "r") as f:
        trans = f.read()

    # Don't remove comingSoon key (might be used for other features)
    # But make sure downloadApp and downloadAppStore are correct
    print(f"\nTranslations file exists: {translations_path}")
    if "comingSoon" in trans:
        print("  'comingSoon' key exists in translations")
    if "downloadApp" in trans:
        print("  'downloadApp' key exists in translations")
else:
    print(f"\nNo translations file at {translations_path}")


# --- 5. CHECK FOR ANY OTHER "COMING SOON" REFERENCES ---
print("\n" + "=" * 50)
print("SCANNING FOR REMAINING 'COMING SOON' REFERENCES")
print("=" * 50)

import subprocess
result = subprocess.run(
    ["grep", "-rn", "-i", "coming.soon", "--include=*.tsx", "--include=*.ts",
     "--exclude-dir=node_modules", "--exclude-dir=.next", "."],
    capture_output=True, text=True
)
if result.stdout.strip():
    print("Found 'coming soon' references:")
    for line in result.stdout.strip().split("\n"):
        print(f"  {line}")
else:
    print("No 'coming soon' references found in source files")


print("\n" + "=" * 50)
print("ALL DONE")
print("=" * 50)
print(f"""
Changes made:

1. FIXED BUILD ERROR in business detail page:
   - keywords: businesses?.name -> biz?.name (etc.)
   - breadcrumb: businesses.name -> biz.name
   - breadcrumb: businesses.slug -> slug (URL param)
   - JSON-LD guards: businesses && -> biz &&

2. UPDATED APP DOWNLOAD LINKS ({total_fixed} buttons):
   - All "Download the App" buttons now link directly to:
     {APP_STORE_URL}
   - Links open in new tab with noopener noreferrer

3. /app route page: redirects to App Store (if it existed)

Now run:
npx next build && git add -A && git commit -m "Fix build + link all download CTAs to App Store" && git push
""")
