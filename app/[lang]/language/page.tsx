import type { Metadata } from "next";

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
      locale: lang === "fa" ? "fa_IR" : "en_US",
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

import "./language.css";
import { t } from "@/lib/translations";

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const tx = lang === "fa" ? t.fa : t.en;

  return (
    <>

      {/* Farsi course JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: lang === "fa" ? "یادگیری فارسی" : "Learn Farsi Online",
            description: lang === "fa"
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
      />
      {/* Hero */}
      <section className="lang-hero">
        <p className="lang-hero-label">{tx.homeLearnLabel}</p>
        <h1>{tx.langHeroTitle}</h1>
        <p className="lang-hero-sub">
          {tx.langHeroSub}
        </p>
        <a href={"/" + lang + "/app"} className="lang-hero-cta">{tx.langHeroCta}</a>
      </section>

      {/* Journey */}
      <section className="lang-section" style={{ background: "linear-gradient(180deg, #F9F0F0 0%, #FDFDFC 100%)" }}>
        <div className="lang-section-inner">
          <div className="lang-section-split">
            <div className="lang-section-text">
              <p className="lang-section-label">{tx.langJourneyLabel}</p>
              <h2 className="lang-section-title">{tx.langJourneyTitle}</h2>
              <p className="lang-section-desc">
                {tx.langJourneyDesc}{" "}<em>{tx.langJourneyDescEm}</em>{tx.langJourneyDescEnd}
              </p>
            </div>
            <div className="lang-section-visual">
              <div className="phone-frame phone-frame-tilt-right phone-shadow">
                <div className="phone-frame-notch" />
                <img loading="lazy" src="/mockups/lang-lesson.jpg" alt="Zand lesson view" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="lang-section" style={{ background: "#FDFDFC" }}>
        <div className="lang-section-inner">
          <div className="lang-section-split reverse">
            <div className="lang-section-text">
              <p className="lang-section-label">{tx.langFlipLabel}</p>
              <h2 className="lang-section-title">{tx.langFlipTitle}</h2>
              <p className="lang-section-desc">
                {tx.langFlipDesc}{" "}<strong>{tx.langFlipDescStrong}</strong>{tx.langFlipDescEnd}
              </p>
            </div>
            <div className="lang-section-visual">
              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center" }}>
                <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow-soft">
                  <div className="phone-frame-notch" />
                  <img loading="lazy" src="/mockups/lang-flipcard-grid-letters.jpg" alt="Flip cards grid view" />
                </div>
                <div className="phone-frame phone-frame-float phone-shadow-deep">
                  <div className="phone-frame-notch" />
                  <img loading="lazy" src="/mockups/lang-flipcard-single.jpg" alt="Flip card expanded view" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes */}
      <section className="lang-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #F9F0F0 100%)" }}>
        <div className="lang-section-inner">
          <div className="lang-section-split">
            <div className="lang-section-text">
              <p className="lang-section-label">{tx.langQuizLabel}</p>
              <h2 className="lang-section-title">{tx.langQuizTitle}</h2>
              <p className="lang-section-desc">
                {tx.langQuizDesc}{" "}<em>{tx.langQuizDescEm}</em>{tx.langQuizDescEnd}
              </p>
            </div>
            <div className="lang-section-visual">
              <div className="phone-frame phone-frame-tilt-left phone-shadow">
                <div className="phone-frame-notch" />
                <img loading="lazy" src="/mockups/lang-quiz.jpg" alt="Quiz view in Zand" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Translation \u2014 wine */}
      <section className="lang-wine">
        <div className="tile-pattern" />
        <div className="lang-section-inner" style={{ position: "relative", zIndex: 1 }}>
          <div className="lang-section-split">
            <div className="lang-section-text">
              <p className="lang-section-label">{tx.langAiLabel}</p>
              <h2 className="lang-section-title">{tx.langAiTitle}</h2>
              <p className="lang-section-desc">
                {tx.langAiDesc}
              </p>
            </div>
            <div className="lang-section-visual">
              <div className="phone-frame phone-frame-tilt-right phone-shadow-deep" style={{ borderColor: "#333" }}>
                <div className="phone-frame-notch" style={{ background: "#333" }} />
                <img loading="lazy" src="/mockups/lang-translate.jpg" alt="AI translation view" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lang-cta-band">
        <h2>{tx.langCtaTitle}</h2>
        <p>{tx.langCtaDesc}</p>
        <a href={"/" + lang + "/app"} className="lang-hero-cta">{tx.downloadApp}</a>
      </section>
      {/* SEO content */}
      <section className="sr-only" aria-hidden="true">
        <h2>Learn Farsi - Persian Language Lessons</h2>
        <p>Learn Farsi online with Zand. Master the Persian alphabet, build vocabulary, practice pronunciation, and have conversations in Farsi. Whether you are a beginner learning Persian for the first time or reconnecting with your heritage language, Zand teaches Farsi the way it is actually spoken. Learn to read and write in Farsi, understand Persian grammar, and explore the beauty of the Persian language.</p>
        <h2>یادگیری زبان فارسی</h2>
        <p>فارسی را با زند یاد بگیرید. الفبای فارسی، واژگان، تلفظ و مکالمه را تمرین کنید.</p>
      </section>
    </>
  );
}
