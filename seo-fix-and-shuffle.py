import re

# ============================================================
# FIX: isFa errors in sr-only blocks + add daily shuffle
# ============================================================

# --- 1. FIX language/page.tsx ---
lang_path = "app/[lang]/language/page.tsx"
with open(lang_path, "r") as f:
    content = f.read()

# The sr-only block uses {isFa ? ... : ...} but isFa isn't defined in component scope
# Replace with hardcoded bilingual text (both languages shown, hidden anyway)
old_lang_seo = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>{isFa ? "یادگیری زبان فارسی" : "Learn Farsi - Persian Language Lessons"}</h2>
        <p>{isFa
          ? "فارسی را با زند یاد بگیرید. الفبای فارسی، واژگان، تلفظ و مکالمه را تمرین کنید."
          : `Learn Farsi online with Zand. Master the Persian alphabet, build vocabulary, practice pronunciation, and have conversations in Farsi. Whether you are a beginner learning Persian for the first time or reconnecting with your heritage language, Zand teaches Farsi the way it is actually spoken. Learn to read and write in Farsi, understand Persian grammar, and explore the beauty of the Persian language.`
        }</p>
      </section>"""

new_lang_seo = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>Learn Farsi - Persian Language Lessons</h2>
        <p>Learn Farsi online with Zand. Master the Persian alphabet, build vocabulary, practice pronunciation, and have conversations in Farsi. Whether you are a beginner learning Persian for the first time or reconnecting with your heritage language, Zand teaches Farsi the way it is actually spoken. Learn to read and write in Farsi, understand Persian grammar, and explore the beauty of the Persian language.</p>
        <h2>یادگیری زبان فارسی</h2>
        <p>فارسی را با زند یاد بگیرید. الفبای فارسی، واژگان، تلفظ و مکالمه را تمرین کنید.</p>
      </section>"""

if old_lang_seo in content:
    content = content.replace(old_lang_seo, new_lang_seo)
    with open(lang_path, "w") as f:
        f.write(content)
    print("Fixed language page sr-only block")
else:
    print("Language page: could not find exact sr-only block, trying regex...")
    # Try a more flexible match
    pattern = r'(\{/\* SEO content \*/\}\s*<section className="sr-only".*?</section>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        content = content.replace(match.group(0), new_lang_seo.strip())
        with open(lang_path, "w") as f:
            f.write(content)
        print("Fixed language page sr-only block (regex)")
    else:
        print("WARNING: Could not fix language page automatically")


# --- 2. FIX app/[lang]/page.tsx (homepage) ---
home_path = "app/[lang]/page.tsx"
with open(home_path, "r") as f:
    content = f.read()

old_home_seo = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>{isFa ? "درباره زند" : "About Zand"}</h2>
        <p>{isFa
          ? `زند پلتفرمی برای دیاسپورای ایرانی است. فارسی یاد بگیرید، تاریخ ایران و فرهنگ فارسی را کشف کنید، و کسب‌وکارهای ایرانی را در سراسر جهان پیدا کنید.`
          : `Zand is a platform for the Iranian diaspora to learn Farsi, explore Iranian history and Persian culture, and discover Iranian-owned businesses worldwide. From learning the Persian alphabet to exploring the legacy of Cyrus the Great, the poetry of Hafez and Rumi, and finding Iranian restaurants, shops, and services near you.`
        }</p>
      </section>"""

new_home_seo = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>About Zand</h2>
        <p>Zand is a platform for the Iranian diaspora to learn Farsi, explore Iranian history and Persian culture, and discover Iranian-owned businesses worldwide. From learning the Persian alphabet to exploring the legacy of Cyrus the Great, the poetry of Hafez and Rumi, and finding Iranian restaurants, shops, and services near you.</p>
        <h2>درباره زند</h2>
        <p>زند پلتفرمی برای دیاسپورای ایرانی است. فارسی یاد بگیرید، تاریخ ایران و فرهنگ فارسی را کشف کنید، و کسب‌وکارهای ایرانی را در سراسر جهان پیدا کنید.</p>
      </section>"""

if old_home_seo in content:
    content = content.replace(old_home_seo, new_home_seo)
    with open(home_path, "w") as f:
        f.write(content)
    print("Fixed homepage sr-only block")
else:
    print("Homepage: could not find exact sr-only block, trying regex...")
    pattern = r'(\{/\* SEO content \*/\}\s*<section className="sr-only".*?</section>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        content = content.replace(match.group(0), new_home_seo.strip())
        with open(home_path, "w") as f:
            f.write(content)
        print("Fixed homepage sr-only block (regex)")
    else:
        print("WARNING: Could not fix homepage automatically")


# --- 3. ADD DAILY SHUFFLE TO LOCALS PAGE ---
locals_path = "app/[lang]/local/page.tsx"
with open(locals_path, "r") as f:
    locals_content = f.read()

# Add a seeded shuffle function based on the current date
# This ensures businesses show in a different order each day
# but stay consistent throughout the day

shuffle_function = '''
// Seeded shuffle: same order all day, different order each day
function dailyShuffle<T>(arr: T[]): T[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const shuffled = [...arr];
  let m = shuffled.length;
  let s = seed;
  while (m) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const i = s % m--;
    [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
  }
  return shuffled;
}
'''

if "dailyShuffle" in locals_content:
    print("Locals page already has dailyShuffle")
else:
    # Find where the businesses are fetched and rendered
    # Look for the data fetch pattern

    # Insert the shuffle function before the component
    # Find the default export or main component function
    component_match = re.search(r'(export\s+default\s+(?:async\s+)?function\s+\w+)', locals_content)
    if not component_match:
        component_match = re.search(r'((?:async\s+)?function\s+\w+Page)', locals_content)

    if component_match:
        insert_pos = component_match.start()
        locals_content = locals_content[:insert_pos] + shuffle_function + "\n" + locals_content[insert_pos:]
        print("Added dailyShuffle function to locals page")
    else:
        # Fallback: add after imports
        lines = locals_content.split("\n")
        last_import = 0
        for i, line in enumerate(lines):
            if line.strip().startswith("import ") or line.strip().startswith("} from"):
                last_import = i
        lines.insert(last_import + 1, shuffle_function)
        locals_content = "\n".join(lines)
        print("Added dailyShuffle function after imports")

    # Now find where the business data is mapped/rendered and wrap it with dailyShuffle
    # Common patterns: businesses.map, data.map, listings.map, etc.
    # Look for .map( on what's likely the business array

    # Find the variable that holds the business list
    # Usually something like: const { data: businesses } = await supabase...
    data_match = re.search(r'(?:data:\s*(\w+)|const\s+(\w+)\s*=.*?\.from\(["\']businesses["\'])', locals_content)

    if data_match:
        biz_var = data_match.group(1) or data_match.group(2)
        print(f"  Business variable: {biz_var}")

        # Find where this variable is used in .map() and wrap with dailyShuffle
        # Pattern: {businesses.map( or {businesses?.map( or {(businesses || []).map(
        map_patterns = [
            f'{biz_var}.map(',
            f'{biz_var}?.map(',
            f'({biz_var} || []).map(',
            f'({biz_var} ?? []).map(',
        ]

        replaced = False
        for pattern in map_patterns:
            if pattern in locals_content:
                locals_content = locals_content.replace(
                    pattern,
                    f'dailyShuffle({biz_var} || []).map(',
                    1  # only first occurrence
                )
                replaced = True
                print(f"  Wrapped {pattern} with dailyShuffle")
                break

        if not replaced:
            # Try regex for more complex patterns
            map_regex = re.search(rf'\b{re.escape(biz_var)}\b(\??)\.map\s*\(', locals_content)
            if map_regex:
                old = map_regex.group(0)
                locals_content = locals_content.replace(
                    old,
                    f'dailyShuffle({biz_var} || []).map(',
                    1
                )
                print(f"  Wrapped {old} with dailyShuffle (regex)")
                replaced = True

        if not replaced:
            print("  WARNING: Could not find .map() call to wrap. You may need to add dailyShuffle manually.")
            print(f"  Look for where {biz_var} is rendered and wrap it: dailyShuffle({biz_var} || []).map(...)")
    else:
        # Try to find any .map() that looks like it renders businesses
        print("  Could not identify business variable. Searching for .map() patterns...")
        map_match = re.search(r'(\w+)(?:\?)?\.map\s*\(\s*\(\s*(?:business|biz|listing|item|b)\b', locals_content)
        if map_match:
            biz_var = map_match.group(1)
            old = map_match.group(0)
            new = f'dailyShuffle({biz_var} || []).map(({old.split("(")[-1]}'
            locals_content = locals_content.replace(old, new, 1)
            print(f"  Found and wrapped: {biz_var}.map()")
        else:
            print("  WARNING: Could not find business rendering loop.")
            print("  Manually wrap your business array with dailyShuffle() where it's mapped.")

    with open(locals_path, "w") as f:
        f.write(locals_content)
    print("Saved locals page with daily shuffle")


print("\n========================================")
print("FIXES + SHUFFLE COMPLETE")
print("========================================")
print("Fixed: isFa errors in homepage and language page sr-only blocks")
print("Added: Daily shuffle to locals page (businesses reorder every day)")
print("")
print("Now run:")
print('npx next build && git add -A && git commit -m "SEO fixes + daily business shuffle" && git push')
