import Link from "next/link";
import { supabase, businessPhotoUrl } from "@/lib/supabase";
import { t } from "@/lib/translations";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import "./home.css";

export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const { data: featuredBiz } = await supabase
    .from("businesses")
    .select("id, name, name_fa, tagline, tagline_fa, category, city, country, photos")
    .eq("status", "active")
    .eq("featured", true)
    .order("featured_rank")
    .limit(3);

  const localCards = featuredBiz && featuredBiz.length >= 3
    ? featuredBiz
    : (await supabase
        .from("businesses")
        .select("id, name, name_fa, tagline, tagline_fa, category, city, country, photos")
        .eq("status", "active")
        .limit(3)
      ).data || [];

  if (lang === "fa") {
    return (
      <div style={{ paddingTop: "10rem", textAlign: "center", color: "#6B6B6B" }}>
        نسخه فارسی به زودی
      </div>
    );
  }

  return (
    <>
      <ScrollRevealInit />
      {/* Hero */}
      <section className="home-hero">
        <p className="home-hero-persian">زند</p>
        <h1 className="home-hero-logo">ZAND</h1>
        <p className="home-hero-tagline">{lang === "fa" ? t.fa.homeTagline : "Rooted Living"}</p>
        <p className="home-hero-desc">
          {lang === "fa" ? t.fa.homeDesc : "Learn Persian. Explore Iranian history and culture. Discover Iranian-owned businesses"}{" "}<em>{lang === "fa" ? t.fa.homeDescEm : "anywhere in the world"}</em>{lang === "fa" ? t.fa.homeDescEnd || "" : "."}
        </p>
        <div className="home-cta-group">
          <a href="#" className="home-cta-primary">
            Download the App
          </a>
          <Link href="/en/about" className="home-cta-secondary">
            Our Story
          </Link>
        </div>
        <p className="home-scroll-hint">{lang === "fa" ? t.fa.scrollToExplore : "Scroll to explore ↓"}</p>
      </section>

      {/* Language */}
      <section className="home-section" style={{ background: "linear-gradient(180deg, #F9F0F0 0%, #FDFDFC 50%, #FDF5F3 100%)" }}>
        <div className="home-section-inner">
          <p className="home-section-label">{lang === "fa" ? t.fa.homeLearnLabel : "Learn Persian"}</p>
          <h2 className="home-section-title scroll-reveal">
            {lang === "fa" ? t.fa.homeLearnTitle : "There has never been a proper way to learn Farsi online"}
          </h2>
          <p className="home-section-desc">
            Not a translation of a Western language app. Zand teaches Persian the way it is
            actually spoken and read — with flip cards, guided journeys, quizzes, and{" "}
            <em>live AI translation</em> you can speak to.
          </p>

          <div className="home-features">
            <div className="home-feature-card feature-bg-1 scroll-reveal delay-1">
              <h3>{lang === "fa" ? t.fa.homeJourney : "Journey"}</h3>
              <p>{lang === "fa" ? t.fa.homeJourneyDesc : "A guided path from your first letter to full conversation, built for how Farsi actually works."}</p>
            </div>
            <div className="home-feature-card feature-bg-2 scroll-reveal delay-2">
              <h3>{lang === "fa" ? t.fa.homeFlipCards : "Flip Cards"}</h3>
              <p>{lang === "fa" ? t.fa.homeFlipCardsDesc : "Learn vocabulary through repetition, with pronunciation and transliteration on every card."}</p>
            </div>
            <div className="home-feature-card feature-bg-3 scroll-reveal delay-3">
              <h3>{lang === "fa" ? t.fa.homeAiTranslation : "AI Translation"}</h3>
              <p>{lang === "fa" ? t.fa.homeAiTranslationDesc : "Speak in English or Farsi and hear the translation spoken back. A conversation partner in your pocket."}</p>
            </div>
          </div>

          <div className="home-mockup-scroll" style={{ marginTop: "3rem" }}>
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
          <p className="home-section-label">{lang === "fa" ? t.fa.homeExploreLabel : "Explore Iran"}</p>
          <h2 className="home-section-title scroll-reveal">
            {lang === "fa" ? t.fa.homeExploreTitle : "Discover the world behind the headlines"}
          </h2>
          <p className="home-section-desc">
            Original articles on Iranian history, culture, and identity — from ancient Persia
            to <em>the Iran of today</em>. Written to inform, not to tell you what to think.
          </p>

          <div className="home-mockup-scroll">
            <div className="phone-frame phone-frame-sm phone-frame-tilt-right phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/home-explore.png" alt="Explore Iran" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-float phone-shadow-deep"><div className="phone-frame-notch" /><img src="/mockups/explore-history.png" alt="History" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/history-article.jpg" alt="Article" /></div>
          </div>
        </div>
      </section>

      {/* Locals */}
      <section className="home-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 100%)" }}>
        <div className="home-section-inner">
          <p className="home-section-label">{lang === "fa" ? t.fa.homeLocalLabel : "Local"}</p>
          <h2 className="home-section-title scroll-reveal">
            {lang === "fa" ? t.fa.homeLocalTitle : "Find Iranian-owned businesses worldwide"}
          </h2>
          <p className="home-section-desc">
            Restaurants, shops, and services run by Iranians — from Brooklyn to Dubai to London.
            A way to <strong>find and support your community</strong>, wherever you are.
          </p>

          <div className="home-locals-preview">
            {localCards.map((biz: any, i: number) => {
              const photoKeys: string[] = Array.isArray(biz.photos) ? biz.photos : [];
              const photoUrl = photoKeys.length > 0 ? businessPhotoUrl(photoKeys[0]) : null;
              const dot = String.fromCharCode(183);
              return (
                <div key={biz.id} className={"home-locals-card scroll-reveal delay-" + (i + 1)}>
                  <div className="home-locals-card-img">
                    {photoUrl ? (
                      <img src={photoUrl} alt={biz.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                    ) : (
                      <span>{lang === "fa" ? "\u0639\u06A9\u0633 \u0628\u0647 \u0632\u0648\u062F\u06CC" : "Photo coming soon"}</span>
                    )}
                  </div>
                  <div className="home-locals-card-body">
                    <h3>{lang === "fa" && biz.name_fa ? biz.name_fa : biz.name}</h3>
                    <p>
                      {biz.category ? biz.category.charAt(0).toUpperCase() + biz.category.slice(1) : ""}
                      {" " + dot + " "}
                      {biz.city}
                      {biz.country ? ", " + biz.country : ""}
                    </p>
                  </div>
                </div>
              );
            })}
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
        <h2>{lang === "fa" ? t.fa.homeCtaTitle : "A place where your identity feels like home"}</h2>
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
