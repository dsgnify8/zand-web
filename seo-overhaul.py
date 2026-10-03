import os, json

# ============================================================
# ZAND SEO OVERHAUL
# Adds: sitemap, robots.txt, JSON-LD, meta tags, keywords,
# hreflang, semantic improvements across all pages
# ============================================================

BASE_URL = "https://zandapplication.com"

# --- 1. SITEMAP ---
sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>{BASE_URL}/en</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa"/>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/fa</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa"/>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/en/explore</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/explore"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/explore"/>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/fa/explore</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/explore"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/explore"/>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/en/language</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/language"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/language"/>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/fa/language</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/language"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/language"/>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/en/local</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/local"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/local"/>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/fa/local</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/local"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/local"/>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/en/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/about"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/about"/>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/fa/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{BASE_URL}/en/about"/>
    <xhtml:link rel="alternate" hreflang="fa" href="{BASE_URL}/fa/about"/>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/en/privacy</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>{BASE_URL}/en/terms</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>"""

os.makedirs("public", exist_ok=True)
with open("public/sitemap.xml", "w") as f:
    f.write(sitemap_content)
print("Created public/sitemap.xml")

# --- 2. ROBOTS.TXT ---
robots_content = f"""User-agent: *
Allow: /

Sitemap: {BASE_URL}/sitemap.xml
"""
with open("public/robots.txt", "w") as f:
    f.write(robots_content)
print("Created public/robots.txt")

# --- 3. EXPLORE PAGE - add generateMetadata ---
explore_path = "app/[lang]/explore/page.tsx"
with open(explore_path, "r") as f:
    explore = f.read()

if "generateMetadata" not in explore:
    explore_meta = '''import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFa = lang === "fa";

  const title = isFa
    ? "کاوش در تاریخ و فرهنگ ایران | زند"
    : "Explore Iranian History and Culture | Zand";
  const description = isFa
    ? "سه هزار سال تاریخ ایران را کشف کنید. از کوروش کبیر تا ایران مدرن، شعر فارسی، فرهنگ و هنر."
    : "Explore 3,000 years of Iranian history, from Cyrus the Great and the Persian Empire to modern Iran. Discover Persian poetry, culture, the Qajar dynasty, Safavid era, and more.";
  const url = `https://zandapplication.com/${lang}/explore`;

  return {
    title,
    description,
    keywords: isFa
      ? ["تاریخ ایران", "کوروش کبیر", "شعر فارسی", "حافظ", "سعدی", "فردوسی", "فرهنگ ایرانی", "سلسله قاجار", "ایران باستان"]
      : ["Iranian history", "Persian Empire", "Cyrus the Great", "Persian poetry", "Hafez", "Saadi", "Ferdowsi", "Qajar dynasty", "Safavid Empire", "modern Iran", "Shah of Iran", "Iranian culture", "Persian civilization", "Achaemenid Empire", "Iranian art", "Persian literature"],
    openGraph: {
      title,
      description,
      url,
      siteName: "Zand",
      images: [{ url: "https://zandapplication.com/og-default.jpg", width: 1200, height: 630 }],
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://zandapplication.com/og-default.jpg"],
    },
    alternates: {
      canonical: url,
      languages: {
        en: "https://zandapplication.com/en/explore",
        fa: "https://zandapplication.com/fa/explore",
      },
    },
  };
}

'''
    explore = explore_meta + explore
    with open(explore_path, "w") as f:
        f.write(explore)
    print("Added generateMetadata to explore page")
else:
    print("Explore page already has generateMetadata")

# --- 4. LANGUAGE PAGE - add generateMetadata ---
lang_path = "app/[lang]/language/page.tsx"
with open(lang_path, "r") as f:
    lang_content = f.read()

if "generateMetadata" not in lang_content:
    lang_meta = '''import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFa = lang === "fa";

  const title = isFa
    ? "فارسی یاد بگیرید | زند"
    : "Learn Farsi Online | Zand";
  const description = isFa
    ? "فارسی را به روشی یاد بگیرید که واقعا جواب می‌دهد. الفبای فارسی، مکالمه، ترجمه با هوش مصنوعی و تمرین تلفظ."
    : "Learn Farsi the right way. Master the Persian alphabet, build vocabulary with flip cards, practice conversation with AI translation, and hear native pronunciation. The first Farsi learning app built for how the language actually works.";
  const url = `https://zandapplication.com/${lang}/language`;

  return {
    title,
    description,
    keywords: isFa
      ? ["یادگیری فارسی", "آموزش فارسی", "الفبای فارسی", "زبان فارسی"]
      : ["learn Farsi", "learn Persian", "Farsi app", "Persian language", "Farsi alphabet", "learn Farsi online", "Persian vocabulary", "Farsi for beginners", "speak Farsi", "Persian lessons", "Farsi course", "learn Persian online free"],
    openGraph: {
      title,
      description,
      url,
      siteName: "Zand",
      images: [{ url: "https://zandapplication.com/og-default.jpg", width: 1200, height: 630 }],
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://zandapplication.com/og-default.jpg"],
    },
    alternates: {
      canonical: url,
      languages: {
        en: "https://zandapplication.com/en/language",
        fa: "https://zandapplication.com/fa/language",
      },
    },
  };
}

'''
    lang_content = lang_meta + lang_content
    with open(lang_path, "w") as f:
        f.write(lang_content)
    print("Added generateMetadata to language page")
else:
    print("Language page already has generateMetadata")

# --- 5. ABOUT PAGE - upgrade metadata to dynamic generateMetadata ---
about_path = "app/[lang]/about/page.tsx"
with open(about_path, "r") as f:
    about = f.read()

# Replace static metadata with dynamic generateMetadata
if "export const metadata" in about:
    old_meta = '''export const metadata: Metadata = {
  title: "About — ZAND",
  description:
    "The story behind Zand — how a question about identity became a platform for the Iranian diaspora.",
};'''
    
    new_meta = '''export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFa = lang === "fa";

  const title = isFa ? "درباره زند" : "About Zand | Our Story";
  const description = isFa
    ? "داستان زند. چگونه یک سوال درباره هویت ایرانی به پلتفرمی برای دیاسپورای ایرانی تبدیل شد."
    : "The story behind Zand. How a question about Iranian identity became a platform for the Iranian diaspora to learn, explore, and connect.";
  const url = `https://zandapplication.com/${lang}/about`;

  return {
    title,
    description,
    keywords: isFa
      ? ["زند", "درباره زند", "دیاسپورای ایرانی", "هویت ایرانی"]
      : ["Zand", "Iranian diaspora", "Iranian identity", "Persian culture platform", "Iranian community", "about Zand"],
    openGraph: {
      title,
      description,
      url,
      siteName: "Zand",
      images: [{ url: "https://zandapplication.com/og-default.jpg", width: 1200, height: 630 }],
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://zandapplication.com/og-default.jpg"],
    },
    alternates: {
      canonical: url,
      languages: {
        en: "https://zandapplication.com/en/about",
        fa: "https://zandapplication.com/fa/about",
      },
    },
  };
}'''
    
    about = about.replace(old_meta, new_meta)
    with open(about_path, "w") as f:
        f.write(about)
    print("Upgraded about page to dynamic generateMetadata with OG tags")
else:
    print("About page metadata already modified")

# --- 6. HOMEPAGE - add keywords + JSON-LD ---
home_path = "app/[lang]/page.tsx"
with open(home_path, "r") as f:
    home = f.read()

# Add keywords to existing generateMetadata if not present
if "keywords" not in home and "generateMetadata" in home:
    home = home.replace(
        '''    alternates: {''',
        '''    keywords: isFa
      ? ["زند", "فارسی", "تاریخ ایران", "کسب‌وکار ایرانی", "فرهنگ ایرانی", "یادگیری فارسی"]
      : ["Zand", "Iranian", "learn Farsi", "Persian culture", "Iranian history", "Iranian businesses", "Persian Empire", "Iranian diaspora", "Iranian community", "learn Persian", "Farsi app", "Iranian restaurants", "Persian language"],
    alternates: {'''
    )
    with open(home_path, "w") as f:
        f.write(home)
    print("Added keywords to homepage generateMetadata")

# --- 7. LAYOUT - add JSON-LD Organization schema + hreflang default ---
layout_path = "app/layout.tsx"
with open(layout_path, "r") as f:
    layout = f.read()

# Check if JSON-LD already exists
if "application/ld+json" not in layout:
    org_jsonld = '''
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zand",
              url: "https://zandapplication.com",
              logo: "https://zandapplication.com/og-default.jpg",
              description:
                "Learn Persian, explore Iranian history and culture, and discover Iranian-owned businesses worldwide.",
              sameAs: [],
              foundingDate: "2025",
              knowsAbout: [
                "Persian language",
                "Iranian history",
                "Iranian culture",
                "Iranian diaspora",
                "Persian Empire",
                "Farsi language learning",
                "Iranian businesses",
              ],
            }),
          }}
        />'''
    
    # Insert before closing </head> or after <meta> tags in the layout
    if "<body" in layout:
        layout = layout.replace("<body", org_jsonld + "\n        <body")
        with open(layout_path, "w") as f:
            f.write(layout)
        print("Added Organization JSON-LD to layout")
    else:
        print("Could not find insertion point in layout.tsx")
else:
    print("Layout already has JSON-LD")

# --- 8. LOCALS PAGE - add JSON-LD ItemList for the directory ---
locals_path = "app/[lang]/local/page.tsx"
with open(locals_path, "r") as f:
    locals_content = f.read()

if "keywords" not in locals_content and "generateMetadata" in locals_content:
    locals_content = locals_content.replace(
        "alternates: {",
        '''keywords: isFa
      ? ["کسب‌وکار ایرانی", "رستوران ایرانی", "فروشگاه ایرانی", "دایرکتوری ایرانی"]
      : ["Iranian businesses", "Iranian restaurants", "Persian restaurants", "Iranian-owned businesses", "Iranian business directory", "Persian business directory", "Iranian shops", "Iranian restaurants near me", "Persian food", "Iranian cafes", "Iranian services"],
    alternates: {'''
    )
    with open(locals_path, "w") as f:
        f.write(locals_content)
    print("Added keywords to locals page")

# --- 9. DYNAMIC SITEMAP for business listings ---
# Create a dynamic sitemap route that auto-generates entries for all businesses
os.makedirs("app/sitemap-businesses", exist_ok=True)
dynamic_sitemap = '''import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data: businesses } = await supabase
    .from("businesses")
    .select("slug, updated_at")
    .eq("status", "active");

  const base = "https://zandapplication.com";

  const urls = (businesses || [])
    .map(
      (biz) => `  <url>
    <loc>${base}/en/local/${biz.slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}/en/local/${biz.slug}"/>
    <xhtml:link rel="alternate" hreflang="fa" href="${base}/fa/local/${biz.slug}"/>
    <lastmod>${biz.updated_at ? new Date(biz.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${base}/fa/local/${biz.slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}/en/local/${biz.slug}"/>
    <xhtml:link rel="alternate" hreflang="fa" href="${base}/fa/local/${biz.slug}"/>
    <lastmod>${biz.updated_at ? new Date(biz.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`
    )
    .join("\\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
'''

with open("app/sitemap-businesses/route.ts", "w") as f:
    f.write(dynamic_sitemap)
print("Created dynamic sitemap for business listings at /sitemap-businesses")

# Update robots.txt to include both sitemaps
robots_updated = f"""User-agent: *
Allow: /

Sitemap: {BASE_URL}/sitemap.xml
Sitemap: {BASE_URL}/sitemap-businesses
"""
with open("public/robots.txt", "w") as f:
    f.write(robots_updated)
print("Updated robots.txt with both sitemaps")

# --- 10. SEO-RICH HIDDEN CONTENT for Explore page ---
# Add a visually-hidden keyword-rich section for search engines
explore_path = "app/[lang]/explore/page.tsx"
with open(explore_path, "r") as f:
    explore = f.read()

if "sr-only" not in explore and "visually-hidden" not in explore:
    # Find the closing tag to add before it
    seo_block_en = """Iranian history spans over 3,000 years. From the Achaemenid Empire founded by Cyrus the Great, through the Parthian and Sassanid dynasties, the Islamic Golden Age, the Safavid Empire, the Qajar dynasty, the Pahlavi era under the Shah of Iran, to modern-day Iran. Persian poetry includes masters like Ferdowsi who wrote the Shahnameh, Hafez of Shiraz, Saadi, Rumi, Omar Khayyam, and Attar. Iranian culture encompasses taarof, Nowruz, Persian cuisine, Persian architecture, Persian gardens, Persian calligraphy, Iranian cinema, and Persian music. Iran was historically known as Persia and is home to one of the world's oldest civilizations."""
    
    seo_block_fa = """تاریخ ایران بیش از سه هزار سال قدمت دارد. از امپراتوری هخامنشی که توسط کوروش کبیر بنیان‌گذاری شد، تا سلسله‌های اشکانی و ساسانی، عصر طلایی اسلام، امپراتوری صفوی، سلسله قاجار، دوران پهلوی و ایران مدرن. شعر فارسی شامل استادانی چون فردوسی نویسنده شاهنامه، حافظ شیرازی، سعدی، مولانا، عمر خیام و عطار است."""

    # Add as a screen-reader-only section at the bottom
    old_closing = "    </>\n  );\n}"
    new_closing = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>{isFa ? "درباره تاریخ و فرهنگ ایران" : "About Iranian History and Culture"}</h2>
        <p>{isFa
          ? `""" + seo_block_fa + """`
          : `""" + seo_block_en + """`
        }</p>
      </section>
    </>
  );
}"""
    
    if old_closing in explore:
        explore = explore.replace(old_closing, new_closing)
        with open(explore_path, "w") as f:
            f.write(explore)
        print("Added SEO content block to explore page")
    else:
        print("Could not find closing tag in explore page - check manually")

# --- 11. Add sr-only CSS class if not in globals ---
globals_path = "app/globals.css"
with open(globals_path, "r") as f:
    globals_css = f.read()

if ".sr-only" not in globals_css:
    sr_only_css = """
/* Screen-reader only (SEO text) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
"""
    globals_css += sr_only_css
    with open(globals_path, "w") as f:
        f.write(globals_css)
    print("Added .sr-only CSS class to globals.css")

# --- 12. Homepage SEO content block ---
home_path = "app/[lang]/page.tsx"
with open(home_path, "r") as f:
    home = f.read()

if "sr-only" not in home:
    home_seo_en = "Zand is a platform for the Iranian diaspora to learn Farsi, explore Iranian history and Persian culture, and discover Iranian-owned businesses worldwide. From learning the Persian alphabet to exploring the legacy of Cyrus the Great, the poetry of Hafez and Rumi, and finding Iranian restaurants, shops, and services near you."
    home_seo_fa = "زند پلتفرمی برای دیاسپورای ایرانی است. فارسی یاد بگیرید، تاریخ ایران و فرهنگ فارسی را کشف کنید، و کسب‌وکارهای ایرانی را در سراسر جهان پیدا کنید."
    
    old_home_closing = "    </>\n  );\n}"
    new_home_closing = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>{isFa ? "درباره زند" : "About Zand"}</h2>
        <p>{isFa
          ? `""" + home_seo_fa + """`
          : `""" + home_seo_en + """`
        }</p>
      </section>
    </>
  );
}"""
    
    if old_home_closing in home:
        home = home.replace(old_home_closing, new_home_closing)
        with open(home_path, "w") as f:
            f.write(home)
        print("Added SEO content block to homepage")
    else:
        print("Could not find closing tag in homepage - may need manual check")

# --- 13. Language page SEO content ---
lang_path = "app/[lang]/language/page.tsx"
with open(lang_path, "r") as f:
    lang_content = f.read()

if "sr-only" not in lang_content:
    lang_seo_en = "Learn Farsi online with Zand. Master the Persian alphabet, build vocabulary, practice pronunciation, and have conversations in Farsi. Whether you are a beginner learning Persian for the first time or reconnecting with your heritage language, Zand teaches Farsi the way it is actually spoken. Learn to read and write in Farsi, understand Persian grammar, and explore the beauty of the Persian language."
    
    old_lang_closing = "    </>\n  );\n}"
    new_lang_closing = """      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>{isFa ? "یادگیری زبان فارسی" : "Learn Farsi - Persian Language Lessons"}</h2>
        <p>{isFa
          ? "فارسی را با زند یاد بگیرید. الفبای فارسی، واژگان، تلفظ و مکالمه را تمرین کنید."
          : `""" + lang_seo_en + """`
        }</p>
      </section>
    </>
  );
}"""
    
    if old_lang_closing in lang_content:
        lang_content = lang_content.replace(old_lang_closing, new_lang_closing)
        with open(lang_path, "w") as f:
            f.write(lang_content)
        print("Added SEO content block to language page")
    else:
        print("Could not find closing tag in language page - may need manual check")

print("\n========================================")
print("SEO OVERHAUL COMPLETE")
print("========================================")
print("Created: public/sitemap.xml")
print("Created: public/robots.txt")
print("Created: app/sitemap-businesses/route.ts (dynamic)")
print("Updated: app/[lang]/page.tsx (keywords + SEO block)")
print("Updated: app/[lang]/explore/page.tsx (full meta + SEO block)")
print("Updated: app/[lang]/language/page.tsx (full meta + SEO block)")
print("Updated: app/[lang]/about/page.tsx (dynamic meta + OG tags)")
print("Updated: app/[lang]/local/page.tsx (keywords)")
print("Updated: app/layout.tsx (Organization JSON-LD)")
print("Updated: app/globals.css (.sr-only class)")
print("\nNow run:")
print('npx next build && git add -A && git commit -m "SEO overhaul: sitemaps, meta tags, JSON-LD, keywords" && git push')
