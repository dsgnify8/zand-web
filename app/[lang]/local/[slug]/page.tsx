import { supabase, businessPhotoUrl } from "@/lib/supabase";
import Link from "next/link";
import type { Metadata } from "next";
import "./detail.css";

export const revalidate = 300;

function slugify(name: string, city: string): string {
  return (name + "-" + city)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: businesses } = await supabase
    .from("businesses")
    .select("name, tagline, city, country, category")
    .eq("status", "active");

  const biz = (businesses || []).find(
    (b) => slugify(b.name, b.city || "") === slug
  );

  if (!biz) return { title: "Business \u2014 ZAND" };

  return {
    title: biz.name + " \u2014 " + biz.city + " | ZAND Local",
    description: biz.tagline || biz.name + " \u2014 " + biz.category + " in " + biz.city + ", " + biz.country + ". Find Iranian-owned businesses on ZAND.",
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
        <h1>Business not found</h1>
        <p>This listing may have been removed or the link may be incorrect.</p>
        <Link href={"/" + lang + "/local"} className="biz-back">
          {"\u2190"} Back to all businesses
        </Link>
      </div>
    );
  }

  const photoKeys: string[] = Array.isArray(biz.photos) ? biz.photos : [];
  const photoUrl = photoKeys.length > 0 ? businessPhotoUrl(photoKeys[0]) : null;

  const category = biz.category
    ? biz.category.charAt(0).toUpperCase() + biz.category.slice(1)
    : "";

  return (
    <>
      <div className="biz-hero">
        {photoUrl ? (
          <img src={photoUrl} alt={biz.name} />
        ) : (
          <span>Photo coming soon</span>
        )}
      </div>

      <div className="biz-content">
        <div className="biz-main">
          <Link href={"/" + lang + "/local"} className="biz-back">
            {"\u2190"} All businesses
          </Link>

          <h1 className="biz-name">{biz.name}</h1>
          {biz.name_fa && <p className="biz-name-fa">{biz.name_fa}</p>}

          <div className="biz-meta">
            {category && <span className="biz-category">{category}</span>}
            <span className="biz-location">
              {biz.city}{biz.country ? ", " + biz.country : ""}
            </span>
          </div>

          {biz.badge && (
            <p className="biz-badge">{"\u2726"} {biz.badge}</p>
          )}

          {biz.tagline && <p className="biz-tagline">{biz.tagline}</p>}

          {biz.show_opened && biz.opened_year && (
            <p className="biz-opened">Since {biz.opened_year}</p>
          )}

          {biz.description && (
            <div className="biz-description">{biz.description}</div>
          )}
        </div>

        <aside className="biz-sidebar">
          <div className="biz-info-card">
            <p className="biz-info-label">Details</p>

            {biz.address && (
              <div className="biz-info-row">
                <p className="biz-info-heading">Address</p>
                <p className="biz-info-value">{biz.address}</p>
              </div>
            )}

            {biz.phone && (
              <div className="biz-info-row">
                <p className="biz-info-heading">Phone</p>
                <p className="biz-info-value">
                  <a href={"tel:" + biz.phone}>{biz.phone}</a>
                </p>
              </div>
            )}



            {biz.location_label && (
              <div className="biz-info-row">
                <p className="biz-info-heading">Location</p>
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
        <a href="#">Open in App</a>
      </div>
    </>
  );
}
