import "./explore.css";
import { t } from "@/lib/translations";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang === "fa") {
    return (
      <div style={{ paddingTop: "10rem", textAlign: "center", color: "#6B6B6B" }}>
        نسخه فارسی به زودی
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="explore-hero">
        <div className="tile-pattern" />
        <p className="explore-hero-label">{tx.homeExploreLabel}</p>
        <h1>{tx.exploreHeroTitle}</h1>
        <p className="explore-hero-sub">
          History, culture, identity — written from original sources,
          designed to inform, never to tell you what to think.
        </p>
      </section>

      {/* Category nav */}
      <nav className="explore-cats">
        <a href="#history" className="explore-cat-link">History</a>
        <a href="#literature" className="explore-cat-link">Literature</a>
        <a href="#culture" className="explore-cat-link">Culture</a>
        <a href="#geography" className="explore-cat-link">Geography</a>
      </nav>

      {/* ── HISTORY ── */}
      <section id="history" className="explore-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 100%)" }}>
        <div className="explore-section-inner">
          <p className="explore-section-label">History</p>
          <p className="explore-section-persian">تاریخ</p>
          <h2 className="explore-section-title">{tx.exploreHistoryTitle}</h2>
          <p className="explore-section-desc">
            From the first Persian empire to the Iran of today — a continuous story
            told through <em>original sources</em>, not textbook summaries.
          </p>

          <div className="history-with-mockups">
            <div className="history-timeline">
              <div className="history-era">
                <p className="history-era-num">01</p>
                <h3>The First Empires</h3>
                <p className="history-era-dates">550 BCE — 651 CE</p>
                <p>Cyrus the Great founds the Achaemenid Empire. Darius builds Persepolis. Alexander conquers and Persia rises again under the Sasanians — a thousand years of empire.</p>
              </div>
              <div className="history-era">
                <p className="history-era-num">02</p>
                <h3>Silence and Return</h3>
                <p className="history-era-dates">651 — 1501</p>
                <p>The Arab conquest transforms Iran. But Persian language and identity survive — through poetry, scholarship, and the slow, quiet work of cultural resistance.</p>
              </div>
              <div className="history-era">
                <p className="history-era-num">03</p>
                <h3>A Country Reforged</h3>
                <p className="history-era-dates">1501 — 1789</p>
                <p>The Safavids reunify Iran and establish Shia Islam as the state religion. Isfahan becomes one of the most beautiful cities in the world.</p>
              </div>
              <div className="history-era">
                <p className="history-era-num">04</p>
                <h3>The Modern Age</h3>
                <p className="history-era-dates">1789 — today</p>
                <p>Constitutional revolution, the Pahlavi dynasty, the 1979 revolution, and the Iran that exists now — a country still being written.</p>
              </div>

              <div className="history-more">
                <p>{tx.moreSections}</p>
              </div>
            </div>

            <div className="history-mockups">
              <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/explore-history.png" alt="History in Zand" /></div>
              <div className="phone-frame phone-frame-sm phone-frame-float phone-shadow-deep"><div className="phone-frame-notch" /><img src="/mockups/history-article.jpg" alt="Article in Zand" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LITERATURE ── */}
      <section id="literature" className="explore-section" style={{ background: "linear-gradient(180deg, #FDF5F3 0%, #FDFDFC 100%)" }}>
        <div className="explore-section-inner">
          <p className="explore-section-label">Literature</p>
          <p className="explore-section-persian">ادبیات</p>
          <h2 className="explore-section-title">{tx.exploreLitTitle}</h2>
          <p className="explore-section-desc">
            The poets who defined Persian — and whose words are still quoted at dinner tables,
            weddings, and farewells across the Iranian world.
          </p>

          <div className="lit-poets">
            <div className="lit-poet-card poet-bg-1">
              <p className="poet-persian">فردوسی</p>
              <h3>Ferdowsi</h3>
              <p className="poet-title">The Keeper of the Language</p>
              <p className="poet-dates">940 — 1020</p>
            </div>
            <div className="lit-poet-card poet-bg-2">
              <p className="poet-persian">سعدی</p>
              <h3>Saadi</h3>
              <p className="poet-title">The Voice of Wisdom</p>
              <p className="poet-dates">c. 1210 — 1291</p>
            </div>
            <div className="lit-poet-card poet-bg-3">
              <p className="poet-persian">حافظ</p>
              <h3>Hafez</h3>
              <p className="poet-title">The Tongue of the Unseen</p>
              <p className="poet-dates">c. 1315 — 1390</p>
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
          <p className="explore-section-label">Culture</p>
          <p className="explore-section-persian">فرهنگ</p>
          <h2 className="explore-section-title">{tx.exploreCultureTitle}</h2>
          <p className="explore-section-desc">
            Nobody sits you down and explains any of this. You are supposed to absorb it, and
            if you did not grow up inside it, you spend your life half a beat behind.
            <em> Here it is, written down.</em>
          </p>

          <div className="culture-cards">
            <div className="culture-card">
              <p className="culture-card-label">The rule nobody explains</p>
              <h3>Taarof</h3>
              <p className="culture-fa">تعارف</p>
              <p>Offering what you will not give. Refusing what you want. The most confusing thing about Iranians, to everyone including Iranians.</p>
            </div>
            <div className="culture-card">
              <p className="culture-card-label">Nobody eats alone</p>
              <h3>The Table</h3>
              <p className="culture-fa">سفره</p>
              <p>An Iranian table is never set for one. Get to know what Iranians put on the table — and why there is always more food than anyone could finish.</p>
            </div>
            <div className="culture-card">
              <p className="culture-card-label">You all know one</p>
              <h3>Typical Persian</h3>
              <p className="culture-fa">ایرانی‌ها</p>
              <p>You all know a Persian like this. We are standard in our ways — and once you see it, you cannot unsee it. A guide to recognising your own people.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GEOGRAPHY ── */}
      <section id="geography" className="explore-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 100%)" }}>
        <div className="explore-section-inner">
          <p className="explore-section-label">Geography</p>
          <p className="explore-section-persian">جغرافیا</p>
          <h2 className="explore-section-title">{tx.exploreGeoTitle}</h2>
          <p className="explore-section-desc">
            Mountains, deserts, forests, coastlines — Iran is not one landscape. Explore
            its provinces, cities, and the geography that shaped its history.
          </p>

          <div className="geo-placeholder" style={{padding:"0",overflow:"hidden"}}>
            <img src="/mockups/iran-map.png" alt="Map of Iran" style={{width:"100%",height:"100%",objectFit:"contain"}} />
          </div>
        </div>
      </section>

      {/* ── SHARE BAND ── */}
      <section className="explore-share">
        <div className="explore-share-inner">
          <h2>{tx.exploreShareTitle}</h2>
          <p>
            Everything you discover in Zand can be saved to your collection, shared with
            friends, or sent directly inside the app — and when they open it,
            they learn the same thing you did.
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
        <p>Download Zand and dive into the story of Iran.</p>
        <a href="#" className="explore-cta-btn">{tx.downloadApp}</a>
      </section>
    </>
  );
}
