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
                <img src="/mockups/lang-lesson.png" alt="Zand lesson view" />
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
                  <img src="/mockups/lang-flipcard-grid-letters.jpg" alt="Flip cards grid view" />
                </div>
                <div className="phone-frame phone-frame-float phone-shadow-deep">
                  <div className="phone-frame-notch" />
                  <img src="/mockups/lang-flipcard-single.jpg" alt="Flip card expanded view" />
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
                <img src="/mockups/lang-quiz.png" alt="Quiz view in Zand" />
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
                <img src="/mockups/lang-translate.jpg" alt="AI translation view" />
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
    </>
  );
}
