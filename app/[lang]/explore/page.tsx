import "./explore.css";
import { t } from "@/lib/translations";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tx = lang === "fa" ? t.fa : t.en;
  const isFa = lang === "fa";

  return (
    <>
      {/* Hero */}
      <section className="explore-hero">
        <div className="tile-pattern" />
        <p className="explore-hero-label">{tx.homeExploreLabel}</p>
        <h1>{tx.exploreHeroTitle}</h1>
        <p className="explore-hero-sub">
          {tx.exploreHeroSub}
        </p>
      </section>

      {/* Category nav */}
      <nav className="explore-cats">
        <a href="#history" className="explore-cat-link">{tx.catHistory}</a>
        <a href="#literature" className="explore-cat-link">{tx.catLiterature}</a>
        <a href="#culture" className="explore-cat-link">{tx.catCulture}</a>
        <a href="#geography" className="explore-cat-link">{tx.catGeography}</a>
      </nav>

      {/* ── HISTORY ── */}
      <section id="history" className="explore-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 100%)" }}>
        <div className="explore-section-inner">
          <p className="explore-section-label">{tx.catHistory}</p>
          <p className="explore-section-persian">تاریخ</p>
          <h2 className="explore-section-title">{tx.exploreHistoryTitle}</h2>
          <p className="explore-section-desc">
            {tx.exploreHistoryDesc}{" "}<em>{tx.exploreHistoryDescEm}</em>{tx.exploreHistoryDescEnd}
          </p>

          <div className="history-with-mockups">
            <div className="history-timeline">
              <div className="history-era">
                <p className="history-era-num">{isFa ? "۰۱" : "01"}</p>
                <h3>{tx.historyEra1Title}</h3>
                <p className="history-era-dates">{tx.historyEra1Dates}</p>
                <p>{tx.historyEra1Desc}</p>
              </div>
              <div className="history-era">
                <p className="history-era-num">{isFa ? "۰۲" : "02"}</p>
                <h3>{tx.historyEra2Title}</h3>
                <p className="history-era-dates">{tx.historyEra2Dates}</p>
                <p>{tx.historyEra2Desc}</p>
              </div>
              <div className="history-era">
                <p className="history-era-num">{isFa ? "۰۳" : "03"}</p>
                <h3>{tx.historyEra3Title}</h3>
                <p className="history-era-dates">{tx.historyEra3Dates}</p>
                <p>{tx.historyEra3Desc}</p>
              </div>
              <div className="history-era">
                <p className="history-era-num">{isFa ? "۰۴" : "04"}</p>
                <h3>{tx.historyEra4Title}</h3>
                <p className="history-era-dates">{tx.historyEra4Dates}</p>
                <p>{tx.historyEra4Desc}</p>
              </div>

              <div className="history-more">
                <p>{tx.moreSections}</p>
              </div>
            </div>

            <div className="history-mockups">
              <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img loading="lazy" src="/mockups/explore-history.jpg" alt="History in Zand" /></div>
              <div className="phone-frame phone-frame-sm phone-frame-float phone-shadow-deep"><div className="phone-frame-notch" /><img loading="lazy" src="/mockups/history-article.jpg" alt="Article in Zand" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LITERATURE ── */}
      <section id="literature" className="explore-section" style={{ background: "linear-gradient(180deg, #FDF5F3 0%, #FDFDFC 100%)" }}>
        <div className="explore-section-inner">
          <p className="explore-section-label">{tx.catLiterature}</p>
          <p className="explore-section-persian">ادبیات</p>
          <h2 className="explore-section-title">{tx.exploreLitTitle}</h2>
          <p className="explore-section-desc">
            {tx.exploreLitDesc}
          </p>

          <div className="lit-poets">
            <div className="lit-poet-card poet-ferdowsi">
              <p className="poet-persian">فردوسی</p>
              <h3>{isFa ? "فردوسی" : "Ferdowsi"}</h3>
              <p className="poet-title">{tx.poetFerdowsiTitle}</p>
              <p className="poet-dates">{isFa ? "۹۴۰ — ۱۰۲۰" : "940 — 1020"}</p>
            </div>
            <div className="lit-poet-card poet-saadi">
              <p className="poet-persian">سعدی</p>
              <h3>{isFa ? "سعدی" : "Saadi"}</h3>
              <p className="poet-title">{tx.poetSaadiTitle}</p>
              <p className="poet-dates">{isFa ? "حدود ۱۲۱۰ — ۱۲۹۱" : "c. 1210 — 1291"}</p>
            </div>
            <div className="lit-poet-card poet-hafez">
              <p className="poet-persian">حافظ</p>
              <h3>{isFa ? "حافظ" : "Hafez"}</h3>
              <p className="poet-title">{tx.poetHafezTitle}</p>
              <p className="poet-dates">{isFa ? "حدود ۱۳۱۵ — ۱۳۹۰" : "c. 1315 — 1390"}</p>
            </div>
          </div>

          <div className="lit-more">
            <p>{tx.morePoets}</p>
          </div>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section id="culture" className="culture-section">
        <div className="tile-pattern" />
        <div className="explore-section-inner" style={{ position: "relative", zIndex: 1 }}>
          <p className="explore-section-label">{tx.catCulture}</p>
          <p className="explore-section-persian">فرهنگ</p>
          <h2 className="explore-section-title">{tx.exploreCultureTitle}</h2>
          <p className="explore-section-desc">
            {tx.exploreCultureDesc}{" "}<em>{tx.exploreCultureDescEm}</em>
          </p>

          <div className="culture-cards">
            <div className="culture-card">
              <p className="culture-card-label">{tx.cultureTaarofLabel}</p>
              <h3>{isFa ? "تعارف" : "Taarof"}</h3>
              <p className="culture-fa">تعارف</p>
              <p>{tx.cultureTaarofDesc}</p>
            </div>
            <div className="culture-card">
              <p className="culture-card-label">{tx.cultureTableLabel}</p>
              <h3>{isFa ? "سفره" : "The Table"}</h3>
              <p className="culture-fa">سفره</p>
              <p>{tx.cultureTableDesc}</p>
            </div>
            <div className="culture-card">
              <p className="culture-card-label">{tx.cultureTypicalLabel}</p>
              <h3>{isFa ? "ایرانی تیپیکال" : "Typical Persian"}</h3>
              <p className="culture-fa">ایرانی‌ها</p>
              <p>{tx.cultureTypicalDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GEOGRAPHY ── */}
      <section id="geography" className="explore-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 100%)" }}>
        <div className="explore-section-inner">
          <p className="explore-section-label">{tx.catGeography}</p>
          <p className="explore-section-persian">جغرافیا</p>
          <h2 className="explore-section-title">{tx.exploreGeoTitle}</h2>
          <p className="explore-section-desc">
            {tx.exploreGeoDesc}
          </p>

          <div className="geo-placeholder" style={{padding:"0",overflow:"hidden"}}>
            <img loading="lazy" src="/mockups/iran-map.jpg" alt="Map of Iran" style={{width:"100%",height:"100%",objectFit:"contain"}} />
          </div>
        </div>
      </section>

      {/* ── SHARE BAND ── */}
      <section className="explore-share">
        <div className="explore-share-inner">
          <h2>{tx.exploreShareTitle}</h2>
          <p>
            {tx.exploreShareDesc}
          </p>

          <div className="share-features">
            <div className="share-feature">
              <div className="share-feature-icon">&#x2764;</div>
              <h3>{tx.like}</h3>
              <p>{tx.likeDesc}</p>
            </div>
            <div className="share-feature">
              <div className="share-feature-icon">&#x1F516;</div>
              <h3>{tx.save}</h3>
              <p>{tx.saveDesc}</p>
            </div>
            <div className="share-feature">
              <div className="share-feature-icon">&#x1F4E4;</div>
              <h3>{tx.share}</h3>
              <p>{tx.shareDesc}</p>
            </div>
            <div className="share-feature">
              <div className="share-feature-icon">&#x1F4AC;</div>
              <h3>{tx.send}</h3>
              <p>{tx.sendDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="explore-cta">
        <h2>{tx.exploreCtaTitle}</h2>
        <p>{tx.exploreCtaDesc}</p>
        <a href={"/" + lang + "/app"} className="explore-cta-btn">{tx.downloadApp}</a>
      </section>
    </>
  );
}
