import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE,
  copy,
  getProfile,
  img,
  instagramUrl,
  paragraphs,
  pick,
  reelsOf,
  websiteUrl,
  youtubeOf,
} from "@/lib/hamdeli";
import { ShareButton } from "@/components/hamdeli/share-button";
import {
  ArrowIcon,
  ExternalIcon,
  GlobeIcon,
  HeartIcon,
  InstagramIcon,
  PlayIcon,
} from "@/components/hamdeli/icons";
import "../hamdeli.css";

export const revalidate = 60;

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const isFa = lang === "fa";
  const p = await getProfile(slug);
  if (!p) return { title: isFa ? "همدلی | زند" : "Hand in Hand | ZAND" };

  const name = isFa && p.name_fa ? p.name_fa : p.name;
  const title = isFa ? `${name} | همدلی | زند` : `${name} | Hand in Hand | ZAND`;
  const description = pick(isFa, p.blurb, p.blurb_fa) || (isFa ? copy.fa.sub : copy.en.sub);
  const url = `${SITE}/${lang}/hamdeli/${slug}`;
  const photo = img(p.cover) || SITE + "/og-hamdeli.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/hamdeli/${slug}`, fa: `${SITE}/fa/hamdeli/${slug}` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ZAND",
      type: "profile",
      locale: isFa ? "fa_IR" : "en_US",
      images: [{ url: photo, alt: name }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [photo],
    },
  };
}

export default async function HamdeliProfilePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const isFa = lang === "fa";
  const c = isFa ? copy.fa : copy.en;
  const p = await getProfile(slug);
  if (!p) notFound();

  const name = isFa && p.name_fa ? p.name_fa : p.name;
  const other = isFa ? p.name : p.name_fa;
  const city = pick(isFa, p.city, p.city_fa);
  const blurb = pick(isFa, p.blurb, p.blurb_fa);
  const story = paragraphs(pick(isFa, p.story, p.story_fa));
  const need = pick(isFa, p.need, p.need_fa);
  const photo = img(p.cover);
  const reels = reelsOf(p);
  const youtube = youtubeOf(p);

  const ig = instagramUrl(p.instagram);
  const web = websiteUrl(p.website);
  const donate = websiteUrl(p.donate_url);
  const links = [
    ig && { href: ig, label: c.instagram, Icon: InstagramIcon },
    web && { href: web, label: c.website, Icon: GlobeIcon },
    donate && { href: donate, label: c.donate, Icon: HeartIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof InstagramIcon }[];

  // Pass this on sends a reader towards them, never towards ZAND.
  const passTo = ig || web || donate;

  return (
    <div className={"hd-page hd-profile" + (isFa ? " hd-is-fa" : "")}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "ZAND", item: SITE },
              { "@type": "ListItem", position: 2, name: isFa ? "همدلی" : "Hand in Hand", item: `${SITE}/${lang}/hamdeli` },
              { "@type": "ListItem", position: 3, name, item: `${SITE}/${lang}/hamdeli/${slug}` },
            ],
          }),
        }}
      />

      {/* 1. Header */}
      <header className="hd-head hd-head-profile">
        <div className="hd-wash" aria-hidden />
        <div className="hd-head-inner">
          <Link href={`/${lang}/hamdeli`} className="hd-back">
            <ArrowIcon size={14} className="hd-back-arrow" />
            <span>{c.back}</span>
          </Link>
          <span className="hd-ring hd-ring-112">
            {photo ? (
              <img src={photo} alt={name} />
            ) : (
              <span className="hd-ring-empty">{name.charAt(0)}</span>
            )}
          </span>
          <h1 className="hd-profile-name" dir="auto">{name}</h1>
          {other && (
            <p className="hd-profile-other" lang={isFa ? "en" : "fa"} dir={isFa ? "ltr" : "rtl"}>
              {other}
            </p>
          )}
          <span className="hd-rule" aria-hidden />
          {city && <p className="hd-city" dir="auto">{city}</p>}
        </div>
      </header>

      <div className="hd-body">
        {/* 2. Story */}
        {story.length > 0 && (
          <section className="hd-story">
            {story.map((para, i) => (
              <p key={i} dir="auto">{para}</p>
            ))}
          </section>
        )}

        {/* 3. What helps */}
        {need && (
          <section className="hd-chapter">
            <span className="hd-diamond" aria-hidden />
            <p className="hd-eyebrow">{c.whatHelps}</p>
            <blockquote className="hd-need" dir="auto">{need}</blockquote>
          </section>
        )}

        {/* 4. Watch */}
        {(reels.length > 0 || youtube.length > 0) && (
          <section className="hd-chapter">
            <span className="hd-diamond" aria-hidden />
            <p className="hd-eyebrow">{c.watch}</p>
            {reels.length > 0 && <p className="hd-note">{c.opensInInstagram}</p>}

            {reels.length > 0 && (
              <div className={"hd-reels" + (reels.length === 1 ? " is-single" : "")}>
                {reels.map((r, i) => {
                  const cover = img(r.cover);
                  return (
                    <a
                      key={i + r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hd-reel"
                      aria-label={`${name}, ${c.play}`}
                    >
                      {cover && <img src={cover} alt="" loading="lazy" />}
                      <span className="hd-tile-fade" />
                      <span className="hd-play">
                        <PlayIcon size={18} />
                      </span>
                      <span className="hd-reel-label">
                        <InstagramIcon size={14} />
                        <span>Instagram</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            {youtube.map((id) => (
              <div key={id} className="hd-yt">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
                  title={name}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
            ))}
          </section>
        )}

        {/* 5. Find them */}
        {links.length > 0 && (
          <section className="hd-chapter">
            <span className="hd-diamond" aria-hidden />
            <p className="hd-eyebrow">{c.findThem}</p>
            <div className="hd-links">
              {links.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hd-link">
                  <span className="hd-link-icon">
                    <Icon size={16} />
                  </span>
                  <span className="hd-link-label">{label}</span>
                  <ExternalIcon size={16} className="hd-link-ext" />
                </a>
              ))}
            </div>
            {donate && <p className="hd-note hd-donate-note">{c.donateNote}</p>}
          </section>
        )}

        {/* 6. Pass this on */}
        {passTo && (
          <ShareButton
            variant="pill"
            url={passTo}
            title={name}
            text={blurb ? `${name}: ${blurb}` : name}
            label={c.passThisOn}
            copiedLabel={c.linkCopied}
          />
        )}

        {/* 7. Close */}
        <div className="hd-close">
          <span className="hd-vline" aria-hidden />
          <p className="hd-close-line">{c.lead}</p>
          <span className="hd-diamond hd-diamond-gold" aria-hidden />
        </div>
      </div>
    </div>
  );
}
