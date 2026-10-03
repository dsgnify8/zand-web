import { createClient } from "@supabase/supabase-js";

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
    .join("\n");

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
