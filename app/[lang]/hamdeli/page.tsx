import type { Metadata } from "next";
import Link from "next/link";
import {
  APP_STORE_URL,
  SITE,
  copy,
  getProfiles,
  img,
  pick,
  reelsOf,
} from "@/lib/hamdeli";
import { ShareButton } from "@/components/hamdeli/share-button";
import { VideoWall, type WallReel } from "@/components/hamdeli/video-wall";
import { PhoneRow } from "@/components/hamdeli/phone-row";
import { ChevronIcon } from "@/components/hamdeli/icons";
import "./hamdeli.css";

// Profiles are added, edited and removed from the app's admin at any time.
export const revalidate = 60;

const OG_IMAGE = SITE + "/og-hamdeli.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFa = lang === "fa";
  const c = isFa ? copy.fa : copy.en;
  const title = isFa ? "همدلی | زند" : "Hand in Hand | ZAND";
  const url = `${SITE}/${lang}/hamdeli`;

  return {
    title,
    description: c.sub,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/hamdeli`, fa: `${SITE}/fa/hamdeli` },
    },
    openGraph: {
      title,
      description: c.sub,
      url,
      siteName: "ZAND",
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: isFa ? "همدلی" : "Hand in Hand" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: c.sub,
      images: [OG_IMAGE],
    },
  };
}

export default async function HamdeliPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isFa = lang === "fa";
  const c = isFa ? copy.fa : copy.en;
  const profiles = await getProfiles();

  const wall: WallReel[] = profiles.flatMap((p) =>
    reelsOf(p)
      .map((r) => ({
        url: r.url,
        cover: img(r.cover) || "",
        name: isFa && p.name_fa ? p.name_fa : p.name,
        owner: p.slug,
      }))
      .filter((r) => r.cover)
  );

  return (
    <div className={"hd-page" + (isFa ? " hd-is-fa" : "")}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: isFa ? "همدلی" : "Hand in Hand",
            description: c.sub,
            url: `${SITE}/${lang}/hamdeli`,
            inLanguage: isFa ? "fa" : "en",
            isPartOf: { "@type": "WebSite", name: "ZAND", url: SITE },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: profiles.length,
              itemListElement: profiles.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: isFa && p.name_fa ? p.name_fa : p.name,
                url: `${SITE}/${lang}/hamdeli/${p.slug}`,
              })),
            },
          }),
        }}
      />

      {/* 1. Header */}
      <header className="hd-head">
        <div className="hd-wash" aria-hidden />
        <div className="hd-head-inner">
          <ShareButton
            variant="icon"
            url={`${SITE}/${lang}/hamdeli`}
            title={c.title}
            text={c.shareText}
            label={c.share}
            copiedLabel={c.linkCopied}
          />
          {isFa ? (
            <h1 className="hd-word hd-word-title">همدلی</h1>
          ) : (
            <>
              <p className="hd-word" lang="fa" dir="rtl">همدلی</p>
              <h1 className="hd-title">Hand in Hand</h1>
            </>
          )}
          <span className="hd-rule" aria-hidden />
          <p className="hd-sub">{c.sub}</p>
        </div>
      </header>

      {/* 2. Intro */}
      <section className="hd-intro">
        <p>{c.intro}</p>
      </section>

      {/* 3. Lead */}
      <div className="hd-lead">
        <span className="hd-rule" aria-hidden />
        <p>{c.lead}</p>
        <span className="hd-rule" aria-hidden />
      </div>

      {/* 4. Cards */}
      {profiles.length === 0 ? (
        <p className="hd-empty">{c.empty}</p>
      ) : (
        <section className="hd-cards">
          {profiles.map((p) => {
            const name = isFa && p.name_fa ? p.name_fa : p.name;
            const other = isFa ? p.name : p.name_fa;
            const city = pick(isFa, p.city, p.city_fa);
            const blurb = pick(isFa, p.blurb, p.blurb_fa);
            const photo = img(p.cover);
            return (
              <Link key={p.slug} href={`/${lang}/hamdeli/${p.slug}`} className="hd-card">
                <div className="hd-card-row">
                  <span className="hd-ring hd-ring-60">
                    {photo ? (
                      <img src={photo} alt="" loading="lazy" />
                    ) : (
                      <span className="hd-ring-empty">{name.charAt(0)}</span>
                    )}
                  </span>
                  <span className="hd-card-names">
                    <span className="hd-card-line">
                      <span className="hd-card-name" dir="auto">{name}</span>
                      {other && (
                        <span className="hd-card-other" lang={isFa ? "en" : "fa"} dir={isFa ? "ltr" : "rtl"}>
                          {other}
                        </span>
                      )}
                    </span>
                    {city && <span className="hd-city" dir="auto">{city}</span>}
                  </span>
                  <ChevronIcon size={16} className="hd-chev" />
                </div>
                {blurb && <p className="hd-card-blurb" dir="auto">{blurb}</p>}
              </Link>
            );
          })}
        </section>
      )}

      {/* 5. From their work */}
      {wall.length > 0 && (
        <section className="hd-chapter hd-wall-wrap">
          <span className="hd-diamond" aria-hidden />
          <p className="hd-eyebrow">{c.fromTheirWork}</p>
          <p className="hd-note">{c.opensInInstagram}</p>
          <VideoWall reels={wall} />
        </section>
      )}

      {/* 6. Close */}
      <div className="hd-close">
        <span className="hd-vline" aria-hidden />
        <p className="hd-word hd-word-close" lang="fa" dir="rtl">همدلی</p>
        <span className="hd-diamond hd-diamond-gold" aria-hidden />
      </div>

      {/* 7. Get the app */}
      <section className="hd-app">
        <PhoneRow>
          <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow-soft">
            <div className="phone-frame-notch" />
            <img loading="lazy" src="/mockups/hamdeli-lead.jpg" alt={isFa ? "همدلی در اپلیکیشن زند" : "Hand in Hand in the ZAND app"} />
          </div>
          <div className="phone-frame phone-frame-sm phone-shadow">
            <div className="phone-frame-notch" />
            <img loading="lazy" src="/mockups/hamdeli-profile.jpg" alt={isFa ? "یک پروفایل همدلی با ویدیوهایش" : "A Hand in Hand profile with its videos"} />
          </div>
          <div className="phone-frame phone-frame-sm phone-frame-tilt-right phone-shadow-soft">
            <div className="phone-frame-notch" />
            <img loading="lazy" src="/mockups/hamdeli-cards.jpg" alt={isFa ? "پروفایل‌های همدلی" : "Hand in Hand profiles"} />
          </div>
        </PhoneRow>
        <p className="hd-app-line">{c.getApp}</p>
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hd-store">
          {c.downloadAppStore}
        </a>
      </section>
    </div>
  );
}
