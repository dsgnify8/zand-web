import { MetadataRoute } from "next";
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
