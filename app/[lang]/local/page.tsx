import { supabase, businessPhotoUrl } from "@/lib/supabase";
import { LocalGrid } from "@/components/local-grid";
import type { Metadata } from "next";
import "./local.css";

const SITE = "https://zandapplication.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFa = lang === "fa";

  const title = isFa
    ? "کسب\u200Cوکارهای ایرانی | ZAND"
    : "Iranian-Owned Businesses Worldwide | ZAND Local";
  const desc = isFa
    ? "رستوران\u200Cها، فروشگاه\u200Cها و خدماتی که ایرانی\u200Cها اداره می\u200Cکنند \u2014 از لندن تا دبی تا نیویورک."
    : "Restaurants, shops, and services run by Iranians \u2014 from London to Dubai to New York. Find and support your community on ZAND.";

  return {
    title,
    description: desc,
    alternates: {
      canonical: SITE + "/" + lang + "/local",
      languages: { en: SITE + "/en/local", fa: SITE + "/fa/local" },
    },
    openGraph: {
      title,
      description: desc,
      url: SITE + "/" + lang + "/local",
      siteName: "ZAND",
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      images: [{ url: SITE + "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [SITE + "/og-default.jpg"],
    },
  };
}

export const revalidate = 60;

export default async function LocalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, name_fa, tagline, tagline_fa, category, city, city_fa, country, photos, keywords, status")
    .eq("status", "active")
    .order("name");

  const listings = (businesses || []).map((biz) => {
    const photoKeys: string[] = Array.isArray(biz.photos) ? biz.photos : [];
    const coverUrl = photoKeys.length > 0 ? businessPhotoUrl(photoKeys[0]) : null;
    return { ...biz, coverUrl };
  });

  return (
    <>
      <section className="local-hero">
        <h1>
          {lang === "en"
            ? "Persians are known for making a name for themselves."
            : "\u0627\u06CC\u0631\u0627\u0646\u06CC\u200C\u0647\u0627 \u0628\u0647 \u0646\u0627\u0645\u200C\u0622\u0641\u0631\u06CC\u0646\u06CC \u0645\u0639\u0631\u0648\u0641\u0646\u062F."}
        </h1>
        <p className="local-hero-sub">
          {lang === "en" ? "Here is where to find them." : "\u0627\u06CC\u0646\u062C\u0627 \u067E\u06CC\u062F\u0627\u06CC\u0634\u0627\u0646 \u06A9\u0646\u06CC\u062F."}
        </p>
      </section>

      <LocalGrid businesses={listings} lang={lang} />
    </>
  );
}
