import { supabase, businessPhotoUrl } from "@/lib/supabase";
import Link from "next/link";
import type { Metadata } from "next";
import "./detail.css";

export const revalidate = 60;

function slugify(name: string, city: string): string {
  return (name + "-" + city)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SITE = "https://zandapplication.com";
const DEFAULT_OG = SITE + "/og-default.jpg";

function truncate(text: string | null, max: number): string {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "\u2026";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isFa = lang === "fa";

  const { data: businesses } = await supabase
    .from("businesses")
    .select("name, name_fa, tagline, tagline_fa, description, description_fa, city, country, category, photos")
    .eq("status", "active");

  const biz = (businesses || []).find(
    (b) => slugify(b.name, b.city || "") === slug
  );

  if (!biz) return { title: "Business \u2014 ZAND" };

  const name = isFa && biz.name_fa ? biz.name_fa : biz.name;
  const title = name + " \u2014 " + biz.city + " | ZAND Local";

  const descSource = isFa && biz.description_fa
    ? biz.description_fa
    : biz.description || biz.tagline || "";
  const desc = truncate(descSource, 160)
    || name + " \u2014 " + (biz.category || "Business") + " in " + biz.city + ", " + (biz.country || "") + ". Discover Iranian-owned businesses on ZAND.";

  const photoKeys: string[] = Array.isArray(biz.photos) ? biz.photos : [];
  const coverPhoto = photoKeys.length > 0 ? businessPhotoUrl(photoKeys[0]) : null;
  const ogImage = coverPhoto || DEFAULT_OG;

  const url = SITE + "/" + lang + "/local/" + slug;

  return {
    title,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        en: SITE + "/en/local/" + slug,
        fa: SITE + "/fa/local/" + slug,
      },
    },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "ZAND",
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "active");

  const biz = (businesses || []).find(
    (b) => slugify(b.name, b.city || "") === slug
  );

  if (!biz) {
    return (
      <div className="biz-not-found">
        <h1>{lang === "fa" ? "کسب‌وکار یافت نشد" : "Business not found"}</h1>
        <p>This listing may have been removed or the link may be incorrect.</p>
        <Link href={"/" + lang + "/local"} className="biz-back">
          {"\u2190"} Back to all businesses
        </Link>
      </div>
    );
  }

  const photoKeys: string[] = Array.isArray(biz.photos) ? biz.photos : [];
  const photoUrls = photoKeys
    .map((k) => businessPhotoUrl(k))
    .filter((u): u is string => u !== null);

  const category = biz.category
    ? biz.category.charAt(0).toUpperCase() + biz.category.slice(1)
    : "";

  // Structured data for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    ...(biz.name_fa && { alternateName: biz.name_fa }),
    description: biz.description || biz.tagline || "",
    ...(photoUrls.length > 0 && { image: photoUrls }),
    ...(biz.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: biz.address,
        addressLocality: biz.city || "",
        addressCountry: biz.country || "",
      },
    }),
    ...(biz.phone && { telephone: biz.phone }),
    ...(biz.website && { url: biz.website }),
    ...(biz.category && { "@type": biz.category === "restaurant" ? "Restaurant" : "LocalBusiness" }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={photoUrls.length > 1 ? "biz-gallery" : "biz-hero"}>
        {photoUrls.length > 0 ? (
          photoUrls.map((url, i) => (
            <div key={i} className={photoUrls.length > 1 ? "biz-gallery-item" : undefined}>
              <img src={url} alt={biz.name + (photoUrls.length > 1 ? ` — photo ${i + 1}` : "")} />
            </div>
          ))
        ) : (
          <span>Photo coming soon</span>
        )}
      </div>

      <div className="biz-content">
        <div className="biz-main">
          <Link href={"/" + lang + "/local"} className="biz-back">
            {"\u2190"} All businesses
          </Link>

          <h1 className="biz-name">{lang === "fa" && biz.name_fa ? biz.name_fa : biz.name}</h1>
          {lang === "fa" ? (biz.name && <p className="biz-name-fa">{biz.name}</p>) : (biz.name_fa && <p className="biz-name-fa">{biz.name_fa}</p>)}

          <div className="biz-meta">
            {category && <span className="biz-category">{category}</span>}
            <span className="biz-location">
              {biz.city}{biz.country ? ", " + biz.country : ""}
            </span>
          </div>

          {biz.badge && (
            <p className="biz-badge">{"\u2726"} {biz.badge}</p>
          )}

          {(biz.tagline || biz.tagline_fa) && <p className="biz-tagline">{lang === "fa" && biz.tagline_fa ? biz.tagline_fa : biz.tagline}</p>}

          {biz.show_opened && biz.opened_year && (
            <p className="biz-opened">Since {biz.opened_year}</p>
          )}

          {(biz.description || biz.description_fa) && (
            <div className="biz-description">{lang === "fa" && biz.description_fa ? biz.description_fa : biz.description}</div>
          )}
        </div>

        <aside className="biz-sidebar">
          <div className="biz-info-card">
            <p className="biz-info-label">{lang === "fa" ? "جزئیات" : "Details"}</p>

            {biz.address && (
              <div className="biz-info-row">
                <p className="biz-info-heading">{lang === "fa" ? "آدرس" : "Address"}</p>
                <p className="biz-info-value">{biz.address}</p>
              </div>
            )}

            {biz.phone && (
              <div className="biz-info-row">
                <p className="biz-info-heading">{lang === "fa" ? "تلفن" : "Phone"}</p>
                <p className="biz-info-value">
                  <a href={"tel:" + biz.phone}>{biz.phone}</a>
                </p>
              </div>
            )}



            {biz.location_label && (
              <div className="biz-info-row">
                <p className="biz-info-heading">{lang === "fa" ? "موقعیت" : "Location"}</p>
                <p className="biz-info-value">{biz.location_label}</p>
              </div>
            )}

            <div className="biz-actions">
              {biz.phone && (
                <a href={"tel:" + biz.phone} className="biz-action-btn biz-action-primary">
                  Call
                </a>
              )}
              {biz.website && (
                <a href={biz.website} target="_blank" rel="noopener noreferrer" className="biz-action-btn biz-action-secondary">
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="biz-app-band">
        <p>See hours, read founder stories, save to your collection, and get directions in the ZAND app.</p>
        <a href={"/" + lang + "/app"}>{lang === "fa" ? "باز کردن در اپلیکیشن" : "Open in App"}</a>
      </div>
    </>
  );
}
