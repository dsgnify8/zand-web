import Link from "next/link";
import "./home.css";

export default async function HomePage({
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
      <section className="home-hero">
        <p className="home-hero-persian">زند</p>
        <h1 className="home-hero-logo">ZAND</h1>
        <p className="home-hero-tagline">Rooted Living</p>
        <p className="home-hero-desc">
          Learn Persian. Explore Iranian history and culture.
          Discover Iranian-owned businesses <em>anywhere in the world</em>.
        </p>
        <div className="home-cta-group">
          <a href="#" className="home-cta-primary">
            Download the App
          </a>
          <Link href="/en/about" className="home-cta-secondary">
            Our Story
          </Link>
        </div>
        <p className="home-scroll-hint">Scroll to explore ↓</p>
      </section>

      {/* Language */}
      <section className="home-section" style={{ background: "linear-gradient(180deg, #F9F0F0 0%, #FDFDFC 50%, #FDF5F3 100%)" }}>
        <div className="home-section-inner">
          <p className="home-section-label">Learn Persian</p>
          <h2 className="home-section-title">
            There has never been a proper way to learn Farsi online
          </h2>
          <p className="home-section-desc">
            Not a translation of a Western language app. Zand teaches Persian the way it is
            actually spoken and read — with flip cards, guided journeys, quizzes, and{" "}
            <em>live AI translation</em> you can speak to.
          </p>

          <div className="home-features">
            <div className="home-feature-card feature-bg-1">
              <h3>Journey</h3>
              <p>A guided path from your first letter to full conversation, built for how Farsi actually works.</p>
            </div>
            <div className="home-feature-card feature-bg-2">
              <h3>Flip Cards</h3>
              <p>Learn vocabulary through repetition, with pronunciation and transliteration on every card.</p>
            </div>
            <div className="home-feature-card feature-bg-3">
              <h3>AI Translation</h3>
              <p>Speak in English or Farsi and hear the translation spoken back. A conversation partner in your pocket.</p>
            </div>
          </div>

          <div className="home-mockup-row" style={{ marginTop: "3rem" }}>
            <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/home-lang.png" alt="Learn Persian" /></div>
            <div className="phone-frame phone-frame-sm phone-shadow-deep"><div className="phone-frame-notch" /><img src="/mockups/lang-flipcard-single.jpg" alt="Flip cards" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-tilt-right phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/lang-translate.jpg" alt="AI Translation" /></div>
          </div>
        </div>
      </section>

      {/* Explore — wine band */}
      <section className="home-wine-band">
        <div className="tile-pattern" />
        <div className="home-section-inner" style={{ position: "relative", zIndex: 1 }}>
          <p className="home-section-label">Explore Iran</p>
          <h2 className="home-section-title">
            Discover the world behind the headlines
          </h2>
          <p className="home-section-desc">
            Original articles on Iranian history, culture, and identity — from ancient Persia
            to <em>the Iran of today</em>. Written to inform, not to tell you what to think.
          </p>

          <div className="home-mockup-row">
            <div className="phone-frame phone-frame-sm phone-frame-tilt-right phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/home-explore.png" alt="Explore Iran" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-float phone-shadow-deep"><div className="phone-frame-notch" /><img src="/mockups/explore-history.png" alt="History" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/history-article.jpg" alt="Article" /></div>
          </div>
        </div>
      </section>

      {/* Locals */}
      <section className="home-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 100%)" }}>
        <div className="home-section-inner">
          <p className="home-section-label">Local</p>
          <h2 className="home-section-title">
            Find Iranian-owned businesses worldwide
          </h2>
          <p className="home-section-desc">
            Restaurants, shops, and services run by Iranians — from Brooklyn to Dubai to London.
            A way to <strong>find and support your community</strong>, wherever you are.
          </p>

          <div className="home-locals-preview">
            <div className="home-locals-card">
              <div className="home-locals-card-img"><img src="/mockups/home-local.png" alt="Local businesses" style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
              <div className="home-locals-card-body">
                <h3>Eyval</h3>
                <p>Restaurants · Brooklyn, United States</p>
              </div>
            </div>
            <div className="home-locals-card">
              <div className="home-locals-card-img"><span>Photo</span></div>
              <div className="home-locals-card-body">
                <h3>Hafez</h3>
                <p>Restaurants · London</p>
              </div>
            </div>
            <div className="home-locals-card">
              <div className="home-locals-card-img"><span>Photo</span></div>
              <div className="home-locals-card-body">
                <h3>Ariana&#39;s Persian Kitchen</h3>
                <p>Restaurants · Dubai</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/en/local" className="home-section-link">
              Explore all businesses →
            </Link>
          </div>
        </div>
      </section>

      {/* TPM */}
      <section className="home-tpm-band">
        <div className="home-tpm-header">
          <span className="home-tpm-zand-logo">ZAND</span>
          <span className="home-tpm-x">×</span>
          <img src="/tpm-logo.png" alt="The Persian Mag" className="home-tpm-partner-img" />
        </div>
        <p className="home-tpm-desc">
          Contemporary Iranian culture, art, and creative voices — brought into
          Zand through a dedicated editorial partnership with The Persian Mag.
        </p>

        <div className="home-tpm-articles">
          <a href="#" className="home-tpm-article-card">
            <div className="home-tpm-article-img"><span>Article cover</span></div>
            <h3>The New Wave of Iranian Cinema</h3>
            <p>How a generation of filmmakers is redefining what Iranian stories look like on screen.</p>
          </a>
          <a href="#" className="home-tpm-article-card">
            <div className="home-tpm-article-img"><span>Article cover</span></div>
            <h3>Tehran&#39;s Design Underground</h3>
            <p>Inside the studios and collectives shaping Iran&#39;s visual identity today.</p>
          </a>
          <a href="#" className="home-tpm-article-card">
            <div className="home-tpm-article-img"><span>Article cover</span></div>
            <h3>What Persian Music Owes to Poetry</h3>
            <p>The thread that runs from Hafez to today&#39;s Iranian artists.</p>
          </a>
        </div>

        <a href="#" className="home-section-link home-tpm-readmore">
          Read more in the app →
        </a>
      </section>

      {/* Final CTA */}
      <section className="home-final-cta">
        <h2>A place where your identity feels like home</h2>
        <p>
          Whether you are reconnecting with your roots, learning the language,
          growing your business, or simply curious — Zand is where it starts.
        </p>
        <div className="home-cta-group">
          <a href="#" className="home-cta-primary">
            Download on the App Store
          </a>
        </div>
      </section>
    </>
  );
}
