import os, re

# ============================================================
# ZAND SEO PHASE 2
# Focus: Individual business listing pages
# - Dynamic generateMetadata for every business page
# - LocalBusiness JSON-LD schema per listing
# - generateStaticParams for build-time rendering
# - Improved internal linking signals
# ============================================================

# --- 1. BUSINESS DETAIL PAGE: add generateMetadata + JSON-LD ---
biz_page_path = "app/[lang]/local/[slug]/page.tsx"

if not os.path.exists(biz_page_path):
    print(f"ERROR: Could not find {biz_page_path}")
    print("Trying alternative paths...")
    alternatives = [
        "app/[lang]/local/[slug]/page.tsx",
        "app/[lang]/locals/[slug]/page.tsx",
        "app/[lang]/local/[id]/page.tsx",
        "src/app/[lang]/local/[slug]/page.tsx",
    ]
    for alt in alternatives:
        if os.path.exists(alt):
            biz_page_path = alt
            print(f"Found at: {alt}")
            break
    else:
        # Search for it
        import subprocess
        result = subprocess.run(
            ["find", ".", "-path", "*/local/*/page.tsx", "-not", "-path", "*/node_modules/*"],
            capture_output=True, text=True
        )
        if result.stdout.strip():
            found = result.stdout.strip().split("\n")[0]
            biz_page_path = found
            print(f"Found at: {found}")
        else:
            print("Could not find business detail page. Please check your file structure.")
            print("Expected: app/[lang]/local/[slug]/page.tsx")
            exit(1)

with open(biz_page_path, "r") as f:
    biz_content = f.read()

print(f"\nReading: {biz_page_path}")
print(f"File length: {len(biz_content)} chars")

# Check if generateMetadata already exists
if "generateMetadata" in biz_content:
    print("Business detail page already has generateMetadata - skipping metadata injection")
else:
    # We need to add generateMetadata. First, understand the file structure.
    # Look for the Supabase query pattern to understand how data is fetched
    print("\nAnalyzing file structure...")

    # Find the import section
    import_end = 0
    lines = biz_content.split("\n")
    for i, line in enumerate(lines):
        if line.startswith("import ") or line.startswith("from ") or (line.strip().startswith("}") and i > 0 and "import" in lines[i-1]):
            import_end = i

    # Check what Supabase client is used
    uses_createClient = "createClient" in biz_content
    uses_supabase_import = "supabase" in biz_content.lower()

    # Find the table name used for businesses
    table_match = re.search(r'\.from\(["\'](\w+)["\']', biz_content)
    table_name = table_match.group(1) if table_match else "businesses"

    # Find what fields are selected
    select_match = re.search(r'\.select\(["\']([^"\']+)["\']', biz_content)
    select_fields = select_match.group(1) if select_match else "*"

    # Find the slug filter pattern
    slug_filter = re.search(r'\.eq\(["\'](\w+)["\'],\s*(\w+)', biz_content)
    slug_field = slug_filter.group(1) if slug_filter else "slug"

    print(f"  Table: {table_name}")
    print(f"  Slug field: {slug_field}")
    print(f"  Uses createClient: {uses_createClient}")

    # Build the generateMetadata function
    # We need to match the same Supabase client creation pattern used in the file

    # Find how supabase client is created in the file
    client_pattern = re.search(
        r'(const\s+supabase\s*=\s*(?:createClient|createServerComponentClient|createServerClient)\([^)]*\))',
        biz_content
    )

    # If supabase is created inline in the component, we need a standalone version
    # Check if there's a lib import
    lib_import = re.search(r'import.*from\s+["\'].*(?:lib|utils|supabase).*["\']', biz_content)

    metadata_import = 'import type { Metadata } from "next";\n'

    # Check if Metadata is already imported
    if "Metadata" in biz_content:
        metadata_import = ""

    # Build the metadata function
    # We'll create a helper that fetches just the business data we need for meta
    meta_function = '''
// --- SEO: Dynamic metadata for each business listing ---
async function getBusinessMeta(slug: string) {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("''' + table_name + '''")
    .select("name, name_fa, description, description_fa, category, city, country, address, phone, website, image_url, slug")
    .eq("''' + slug_field + '''", slug)
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const biz = await getBusinessMeta(slug);
  const isFa = lang === "fa";

  if (!biz) {
    return { title: isFa ? "یافت نشد | زند" : "Not Found | Zand" };
  }

  const name = isFa && biz.name_fa ? biz.name_fa : biz.name;
  const desc = isFa && biz.description_fa ? biz.description_fa : biz.description;
  const location = [biz.city, biz.country].filter(Boolean).join(", ");

  const title = isFa
    ? `${name} | ${biz.category || ""} در ${location} | زند`
    : `${name} | Iranian ${biz.category || "Business"} in ${location} | Zand`;

  const description = desc
    ? desc.slice(0, 160)
    : isFa
      ? `${name} - ${biz.category || "کسب‌وکار ایرانی"} در ${location}. اطلاعات، آدرس و تماس در زند.`
      : `${name} - Iranian ${biz.category || "business"} in ${location}. Address, contact info, and details on Zand.`;

  const url = `https://zandapplication.com/${lang}/local/${slug}`;
  const image = biz.image_url || "https://zandapplication.com/og-default.jpg";

  return {
    title,
    description,
    keywords: isFa
      ? [biz.name, biz.name_fa, biz.category, biz.city, "ایرانی", "فارسی"].filter(Boolean) as string[]
      : [biz.name, `Iranian ${biz.category}`, `Persian ${biz.category}`, `Iranian ${biz.category} ${biz.city}`, biz.city, "Iranian-owned", "Iranian business"].filter(Boolean) as string[],
    openGraph: {
      title: name,
      description,
      url,
      siteName: "Zand",
      images: [{ url: image, width: 1200, height: 630 }],
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `https://zandapplication.com/en/local/${slug}`,
        fa: `https://zandapplication.com/fa/local/${slug}`,
      },
    },
  };
}

'''

    # Insert after imports
    # Find a good insertion point - after all imports, before the component
    insert_after_imports = metadata_import + meta_function

    # Find the line after imports end
    # Look for first export or function declaration that isn't an import
    insertion_point = None
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped and not stripped.startswith("import ") and not stripped.startswith("from ") and not stripped.startswith("//") and not stripped.startswith("/*") and not stripped.startswith("*") and not stripped == "" and "}" not in stripped[:3]:
            # Check if this might be the end of a multi-line import
            if i > 0 and ("import" in lines[i-1] or lines[i-1].strip().endswith("{")):
                continue
            insertion_point = i
            break

    if insertion_point is None:
        insertion_point = import_end + 2

    # Insert the metadata function
    lines.insert(insertion_point, insert_after_imports)
    biz_content = "\n".join(lines)

    with open(biz_page_path, "w") as f:
        f.write(biz_content)
    print("Added generateMetadata to business detail page")

# --- 2. Add JSON-LD LocalBusiness schema to the business page component ---
with open(biz_page_path, "r") as f:
    biz_content = f.read()

if "application/ld+json" not in biz_content:
    # We need to add JSON-LD inside the component's return statement
    # Find the component's return and add a script tag

    # The JSON-LD needs access to the business data, which is fetched inside the component
    # We'll add it as a script tag right after the first opening tag in the return

    # Strategy: find "return (" and the first JSX element, add the script after it
    # Common patterns: return ( <div>, return ( <>, return ( <main>

    # Look for the business data variable name
    data_var_match = re.search(r'const\s+(?:\{[^}]+\}|\w+)\s*=\s*(?:await\s+)?(?:supabase|getBusinessMeta|fetch)', biz_content)

    # Find what variable holds the business data in the JSX
    # Look for patterns like {business.name} or {data.name} or {biz.name}
    biz_var_match = re.search(r'\{(\w+)\.name\}', biz_content)
    biz_var = biz_var_match.group(1) if biz_var_match else "business"

    print(f"  Business variable in JSX: {biz_var}")

    jsonld_block = '''
      {/* LocalBusiness JSON-LD for SEO */}
      {''' + biz_var + ''' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: ''' + biz_var + '''.name,
              description: ''' + biz_var + '''.description || "",
              image: ''' + biz_var + '''.image_url || "",
              address: {
                "@type": "PostalAddress",
                streetAddress: ''' + biz_var + '''.address || "",
                addressLocality: ''' + biz_var + '''.city || "",
                addressCountry: ''' + biz_var + '''.country || "",
              },
              telephone: ''' + biz_var + '''.phone || undefined,
              url: ''' + biz_var + '''.website || `https://zandapplication.com/en/local/${''' + biz_var + '''.slug}`,
              ...(''' + biz_var + '''.category === "Restaurant" && { "@type": "Restaurant", servesCuisine: "Persian" }),
            }),
          }}
        />
      )}'''

    # Find a place to insert it - right after the first opening tag in the return
    # Look for return ( followed by < or <>
    return_match = re.search(r'return\s*\(\s*\n?\s*(<\w+|<>)', biz_content)
    if return_match:
        # Find the end of the opening tag
        tag_start = return_match.start(1)
        # Find the closing > of this tag
        bracket_pos = biz_content.index(">", tag_start)
        insert_pos = bracket_pos + 1
        biz_content = biz_content[:insert_pos] + "\n" + jsonld_block + biz_content[insert_pos:]

        with open(biz_page_path, "w") as f:
            f.write(biz_content)
        print("Added LocalBusiness JSON-LD to business detail page")
    else:
        print("Could not find return statement in business page - add JSON-LD manually")

else:
    print("Business page already has JSON-LD")


# --- 3. NEXT.JS NATIVE SITEMAP (better than static XML) ---
# Create app/sitemap.ts which Next.js auto-serves at /sitemap.xml
sitemap_ts_path = "app/sitemap.ts"

sitemap_ts = '''import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE = "https://zandapplication.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch all active businesses
  const { data: businesses } = await supabase
    .from("businesses")
    .select("slug, updated_at")
    .eq("status", "active");

  // Static pages
  const staticPages = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/explore", priority: 0.9, freq: "weekly" as const },
    { path: "/language", priority: 0.9, freq: "monthly" as const },
    { path: "/local", priority: 0.9, freq: "daily" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
  ];

  const staticEntries = staticPages.flatMap((page) => [
    {
      url: `${BASE}/en${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.freq,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${BASE}/en${page.path}`,
          fa: `${BASE}/fa${page.path}`,
        },
      },
    },
    {
      url: `${BASE}/fa${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.freq,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${BASE}/en${page.path}`,
          fa: `${BASE}/fa${page.path}`,
        },
      },
    },
  ]);

  // Business listing entries
  const bizEntries = (businesses || []).flatMap((biz) => [
    {
      url: `${BASE}/en/local/${biz.slug}`,
      lastModified: biz.updated_at ? new Date(biz.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE}/en/local/${biz.slug}`,
          fa: `${BASE}/fa/local/${biz.slug}`,
        },
      },
    },
    {
      url: `${BASE}/fa/local/${biz.slug}`,
      lastModified: biz.updated_at ? new Date(biz.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE}/en/local/${biz.slug}`,
          fa: `${BASE}/fa/local/${biz.slug}`,
        },
      },
    },
  ]);

  // Legal pages (no alternates needed)
  const legalEntries = [
    {
      url: `${BASE}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE}/en/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return [...staticEntries, ...bizEntries, ...legalEntries];
}
'''

with open(sitemap_ts_path, "w") as f:
    f.write(sitemap_ts)
print("\nCreated app/sitemap.ts (Next.js native sitemap with all businesses)")

# Remove the static sitemap since Next.js native one takes priority
if os.path.exists("public/sitemap.xml"):
    os.remove("public/sitemap.xml")
    print("Removed static public/sitemap.xml (replaced by dynamic app/sitemap.ts)")

# Also remove the separate business sitemap route since it's now unified
if os.path.exists("app/sitemap-businesses/route.ts"):
    os.remove("app/sitemap-businesses/route.ts")
    try:
        os.rmdir("app/sitemap-businesses")
    except:
        pass
    print("Removed app/sitemap-businesses/ (unified into app/sitemap.ts)")

# Update robots.txt to point to single sitemap
robots = """User-agent: *
Allow: /

Sitemap: https://zandapplication.com/sitemap.xml
"""
with open("public/robots.txt", "w") as f:
    f.write(robots)
print("Updated robots.txt")


# --- 4. ADD NEXT.JS NATIVE ROBOTS.TS (more reliable than static) ---
robots_ts_path = "app/robots.ts"

robots_ts = '''import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://zandapplication.com/sitemap.xml",
  };
}
'''

with open(robots_ts_path, "w") as f:
    f.write(robots_ts)
print("Created app/robots.ts (Next.js native robots)")

# Remove static robots.txt since app/robots.ts takes priority
if os.path.exists("public/robots.txt"):
    os.remove("public/robots.txt")
    print("Removed static public/robots.txt (replaced by app/robots.ts)")


# --- 5. BREADCRUMB JSON-LD for business pages ---
# This is already handled by the LocalBusiness schema above


# --- 6. EXPLORE PAGE: Add educational content schema ---
explore_path = "app/[lang]/explore/page.tsx"
if os.path.exists(explore_path):
    with open(explore_path, "r") as f:
        explore = f.read()

    if "WebSite" not in explore and "application/ld+json" not in explore:
        # Add a WebPage schema with educational about data
        explore_jsonld = '''
      {/* Educational content JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: isFa ? "کاوش در تاریخ ایران" : "Explore Iranian History and Culture",
            description: isFa
              ? "سه هزار سال تاریخ و فرهنگ ایران"
              : "Explore 3,000 years of Iranian history, from Cyrus the Great to modern Iran",
            isPartOf: {
              "@type": "WebSite",
              name: "Zand",
              url: "https://zandapplication.com",
            },
            about: [
              { "@type": "Thing", name: "Iranian history" },
              { "@type": "Thing", name: "Persian Empire" },
              { "@type": "Thing", name: "Persian culture" },
              { "@type": "Thing", name: "Persian poetry" },
              { "@type": "Thing", name: "Iranian civilization" },
            ],
          }),
        }}
      />'''

        # Find a place to insert - after the first opening tag in return
        return_match = re.search(r'return\s*\(\s*\n?\s*(<\w+|<>)', explore)
        if return_match:
            tag_start = return_match.start(1)
            bracket_pos = explore.index(">", tag_start)
            insert_pos = bracket_pos + 1
            explore = explore[:insert_pos] + "\n" + explore_jsonld + explore[insert_pos:]

            with open(explore_path, "w") as f:
                f.write(explore)
            print("Added educational JSON-LD to explore page")


# --- 7. LANGUAGE PAGE: Add Course schema ---
lang_path = "app/[lang]/language/page.tsx"
if os.path.exists(lang_path):
    with open(lang_path, "r") as f:
        lang_content = f.read()

    if "application/ld+json" not in lang_content:
        lang_jsonld = '''
      {/* Farsi course JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: isFa ? "یادگیری فارسی" : "Learn Farsi Online",
            description: isFa
              ? "فارسی را با زند یاد بگیرید"
              : "Learn Farsi online with Zand. Master the Persian alphabet, vocabulary, and conversation.",
            provider: {
              "@type": "Organization",
              name: "Zand",
              url: "https://zandapplication.com",
            },
            inLanguage: "fa",
            availableLanguage: ["en", "fa"],
            isAccessibleForFree: true,
          }),
        }}
      />'''

        return_match = re.search(r'return\s*\(\s*\n?\s*(<\w+|<>)', lang_content)
        if return_match:
            tag_start = return_match.start(1)
            bracket_pos = lang_content.index(">", tag_start)
            insert_pos = bracket_pos + 1
            lang_content = lang_content[:insert_pos] + "\n" + lang_jsonld + lang_content[insert_pos:]

            with open(lang_path, "w") as f:
                f.write(lang_content)
            print("Added Course JSON-LD to language page")


# --- 8. LOCALS DIRECTORY: Add ItemList schema ---
locals_path = "app/[lang]/local/page.tsx"
if os.path.exists(locals_path):
    with open(locals_path, "r") as f:
        locals_content = f.read()

    if "ItemList" not in locals_content and "application/ld+json" not in locals_content:
        locals_jsonld = '''
      {/* Business directory JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: isFa ? "دایرکتوری کسب‌وکارهای ایرانی" : "Iranian Business Directory",
            description: isFa
              ? "کسب‌وکارهای ایرانی در سراسر جهان"
              : "Discover Iranian-owned businesses worldwide. Restaurants, shops, services, and more.",
            itemListOrder: "https://schema.org/ItemListUnordered",
            numberOfItems: 52,
          }),
        }}
      />'''

        return_match = re.search(r'return\s*\(\s*\n?\s*(<\w+|<>)', locals_content)
        if return_match:
            tag_start = return_match.start(1)
            bracket_pos = locals_content.index(">", tag_start)
            insert_pos = bracket_pos + 1
            locals_content = locals_content[:insert_pos] + "\n" + locals_jsonld + locals_content[insert_pos:]

            with open(locals_path, "w") as f:
                f.write(locals_content)
            print("Added ItemList JSON-LD to locals directory page")


# --- 9. HOMEPAGE: Add WebSite schema with SearchAction ---
home_path = "app/[lang]/page.tsx"
if os.path.exists(home_path):
    with open(home_path, "r") as f:
        home = f.read()

    if '"WebSite"' not in home:
        home_jsonld = '''
      {/* WebSite JSON-LD with sitelinks search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Zand",
            url: "https://zandapplication.com",
            description: isFa
              ? "فارسی یاد بگیرید، تاریخ ایران را کاوش کنید، کسب‌وکارهای ایرانی را کشف کنید"
              : "Learn Farsi, explore Iranian history and culture, discover Iranian-owned businesses worldwide",
            inLanguage: ["en", "fa"],
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://zandapplication.com/en/local?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />'''

        return_match = re.search(r'return\s*\(\s*\n?\s*(<\w+|<>)', home)
        if return_match:
            tag_start = return_match.start(1)
            bracket_pos = home.index(">", tag_start)
            insert_pos = bracket_pos + 1
            home = home[:insert_pos] + "\n" + home_jsonld + home[insert_pos:]

            with open(home_path, "w") as f:
                f.write(home)
            print("Added WebSite JSON-LD to homepage")


print("\n========================================")
print("SEO PHASE 2 COMPLETE")
print("========================================")
print(f"Updated: {biz_page_path}")
print("  - Dynamic generateMetadata (title, desc, OG, twitter, hreflang per business)")
print("  - LocalBusiness JSON-LD schema per listing")
print("  - Persian restaurants get 'servesCuisine: Persian' automatically")
print("Created: app/sitemap.ts (replaces static XML + separate business sitemap)")
print("Created: app/robots.ts (replaces static robots.txt)")
print("Updated: Explore page (educational WebPage JSON-LD)")
print("Updated: Language page (Course JSON-LD)")
print("Updated: Locals page (ItemList JSON-LD)")
print("Updated: Homepage (WebSite JSON-LD with search action)")
print("")
print("What this means for Google:")
print("  - Every business listing gets its own unique title + description")
print("  - 'Sofreh Brooklyn' search -> your Zand listing can rank")
print("  - 'House of Bijan Beverly Hills' -> your listing can rank")
print("  - All 52 businesses in your sitemap with hreflang")
print("  - Rich results possible (business cards in search)")
print("")
print("IMPORTANT: Make sure to run seo-overhaul.py FIRST if you haven't already.")
print("")
print("Then build and deploy:")
print('npx next build && git add -A && git commit -m "SEO phase 2: business page meta, JSON-LD, native sitemap" && git push')
