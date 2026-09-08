import Link from "next/link";
import { supabase, businessPhotoUrl } from "@/lib/supabase";
import { t } from "@/lib/translations";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { ScrollCenter } from "@/components/scroll-center";
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

  const isFa = lang === "fa";
  const tx = isFa ? t.fa : t.en;

  return (
    <>
      <ScrollRevealInit />
      {/* Hero */}
      <section className="home-hero">
        <p className="home-hero-persian">زند</p>
        <h1 className="home-hero-logo">ZAND</h1>
        <p className="home-hero-tagline">{tx.homeTagline}</p>
        <p className="home-hero-desc">
          {tx.homeDesc}{" "}<em>{tx.homeDescEm}</em>{tx.homeDescEnd}
        </p>
        <div className="home-cta-group">
          <a href={"/" + lang + "/app"} className="home-cta-primary">
            {tx.downloadApp}
          </a>
          <Link href={"/" + lang + "/about"} className="home-cta-secondary">
            {tx.ourStory}
          </Link>
        </div>

      </section>

      {/* Language */}
      <section className="home-section" style={{ background: "linear-gradient(180deg, #F9F0F0 0%, #FDFDFC 12%, #FDFDFC 80%, #F7F5F3 100%)" }}>
        <div className="home-section-inner">
          <p className="home-section-label">{tx.homeLearnLabel}</p>
          <h2 className="home-section-title scroll-reveal">
            {tx.homeLearnTitle}
          </h2>
          <p className="home-section-desc">
            {tx.homeLearnDesc}{" "}<em>{tx.homeLearnDescEm}</em>{isFa ? tx.homeLearnDescEnd : " you can speak to."}
          </p>

          <div className="home-features">
            <div className="home-feature-card feature-bg-1 scroll-reveal delay-1">
              <h3>{tx.homeJourney}</h3>
              <p>{tx.homeJourneyDesc}</p>
            </div>
            <div className="home-feature-card feature-bg-2 scroll-reveal delay-2">
              <h3>{tx.homeFlipCards}</h3>
              <p>{tx.homeFlipCardsDesc}</p>
            </div>
            <div className="home-feature-card feature-bg-3 scroll-reveal delay-3">
              <h3>{tx.homeAiTranslation}</h3>
              <p>{tx.homeAiTranslationDesc}</p>
            </div>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <ScrollCenter>
              <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/home-lang.png" alt="Learn Persian" /></div>
              <div className="phone-frame phone-frame-sm phone-shadow-deep"><div className="phone-frame-notch" /><img src="/mockups/lang-flipcard-single.jpg" alt="Flip cards" /></div>
              <div className="phone-frame phone-frame-sm phone-frame-tilt-right phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/lang-translate.jpg" alt="AI Translation" /></div>
            </ScrollCenter>
          </div>
        </div>
      </section>

      {/* Explore — wine band */}
      <section className="home-wine-band">
        <div className="tile-pattern" />
        <div className="home-section-inner" style={{ position: "relative", zIndex: 1 }}>
          <p className="home-section-label">{tx.homeExploreLabel}</p>
          <h2 className="home-section-title scroll-reveal">
            {tx.homeExploreTitle}
          </h2>
          <p className="home-section-desc">
            {tx.homeExploreDesc}{" "}<em>{tx.homeExploreDescEm}</em>{tx.homeExploreDescEnd}
          </p>

          <div className="home-mockup-scroll">
            <div className="phone-frame phone-frame-sm phone-frame-tilt-right phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/home-explore.png" alt="Explore Iran" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-float phone-shadow-deep"><div className="phone-frame-notch" /><img src="/mockups/explore-history.png" alt="History" /></div>
            <div className="phone-frame phone-frame-sm phone-frame-tilt-left phone-shadow"><div className="phone-frame-notch" /><img src="/mockups/history-article.jpg" alt="Article" /></div>
          </div>
        </div>
      </section>

      {/* Locals */}
      <section className="home-section" style={{ background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 85%, #FBF6F0 100%)" }}>
        <div className="home-section-inner">
          <p className="home-section-label">{tx.homeLocalLabel}</p>
          <h2 className="home-section-title scroll-reveal">
            {tx.homeLocalTitle}
          </h2>
          <p className="home-section-desc">
            {tx.homeLocalDesc}{" "}<strong>{tx.homeLocalDescStrong}</strong>{tx.homeLocalDescEnd}
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
                      <span>{tx.localPhotoSoon}</span>
                    )}
                  </div>
                  <div className="home-locals-card-body">
                    <h3>{isFa && biz.name_fa ? biz.name_fa : biz.name}</h3>
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
            <Link href={"/" + lang + "/local"} className="home-section-link">
              {tx.homeLocalLink}
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
          {tx.homeTpmDesc}
        </p>

        <div className="home-tpm-articles">
          <div className="home-tpm-article-card scroll-reveal delay-1">
            <p className="home-tpm-article-tag">{isFa ? "فیلم" : "Film"}</p>
            <h3>{isFa ? "موج نوی سینمای ایران" : "The New Wave of Iranian Cinema"}</h3>
            <p>{isFa ? "نسلی از فیلم‌سازان که دارند شکل قصه‌های ایرانی روی پرده را بازتعریف می‌کنند." : "How a generation of filmmakers is redefining what Iranian stories look like on screen."}</p>
          </div>
          <div className="home-tpm-article-card scroll-reveal delay-2">
            <p className="home-tpm-article-tag">{isFa ? "طراحی" : "Design"}</p>
            <h3>{isFa ? "طراحی زیرزمینی تهران" : "Tehran's Design Underground"}</h3>
            <p>{isFa ? "درون استودیوها و کلکتیوهایی که هویت بصری ایران امروز را شکل می‌دهند." : "Inside the studios and collectives shaping Iran's visual identity today."}</p>
          </div>
          <div className="home-tpm-article-card scroll-reveal delay-3">
            <p className="home-tpm-article-tag">{isFa ? "موسیقی" : "Music"}</p>
            <h3>{isFa ? "آنچه موسیقی ایرانی به شعر مدیون است" : "What Persian Music Owes to Poetry"}</h3>
            <p>{isFa ? "ریسمانی که از حافظ تا هنرمندان امروز ایران کشیده می‌شود." : "The thread that runs from Hafez to today's Iranian artists."}</p>
          </div>
        </div>

        <a href={"/" + lang + "/app"} className="home-section-link home-tpm-readmore">
          {tx.homeTpmReadMore}
        </a>
      </section>

      {/* Final CTA */}
      <section className="home-final-cta">
        <h2>{tx.homeCtaTitle}</h2>
        <p>
          {tx.homeCtaDesc}
        </p>
        <div className="home-cta-group">
          <a href={"/" + lang + "/app"} className="home-cta-primary">
            {tx.downloadAppStore}
          </a>
        </div>
      </section>
    </>
  );
}
