import "./language.css";

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang === "fa") {
    return (
      <div style={{ paddingTop: "10rem", textAlign: "center", color: "#6B6B6B" }}>
        \u0646\u0633\u062E\u0647 \u0641\u0627\u0631\u0633\u06CC \u0628\u0647 \u0632\u0648\u062F\u06CC
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="lang-hero">
        <p className="lang-hero-label">Learn Persian</p>
        <h1>The first real way to learn Farsi online</h1>
        <p className="lang-hero-sub">
          Not a translation of Duolingo. Zand teaches Persian the way it is actually
          spoken and read \u2014 built from the ground up for the language, not adapted from another one.
        </p>
        <a href="#" className="lang-hero-cta">Start learning in the app</a>
      </section>

      {/* Journey */}
      <section className="lang-section" style={{ background: "linear-gradient(180deg, #F9F0F0 0%, #FDFDFC 100%)" }}>
        <div className="lang-section-inner">
          <div className="lang-section-split">
            <div className="lang-section-text">
              <p className="lang-section-label">The Journey</p>
              <h2 className="lang-section-title">From your first letter to full conversation</h2>
              <p className="lang-section-desc">
                A structured path that takes you through the Persian alphabet, basic vocabulary,
                sentence structure, and real conversation \u2014 <em>step by step</em>, at your own pace.
                Every lesson builds on the last. No guessing where to go next.
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
              <p className="lang-section-label">Flip Cards</p>
              <h2 className="lang-section-title">Learn by seeing, hearing, and repeating</h2>
              <p className="lang-section-desc">
                Every card shows the Persian word, its transliteration, and the English meaning.
                Flip to reveal. <strong>Pronunciation is built in</strong> \u2014 you hear how each
                word sounds as you learn it. Repetition that actually sticks.
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
              <p className="lang-section-label">Quizzes</p>
              <h2 className="lang-section-title">Test what you have learned</h2>
              <p className="lang-section-desc">
                After each section, short quizzes check your understanding \u2014 reading, vocabulary,
                and comprehension. <em>You move forward when you are ready</em>, not when
                a timer runs out.
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
              <p className="lang-section-label">AI Translation</p>
              <h2 className="lang-section-title">Speak and hear it translated live</h2>
              <p className="lang-section-desc">
                Say something in English and hear it in Farsi. Say it in Farsi and get
                the English back. A live conversation partner that helps you practise
                speaking \u2014 not just reading.
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
        <h2>Ready to start?</h2>
        <p>Download Zand and begin your first lesson today.</p>
        <a href="#" className="lang-hero-cta">Download the App</a>
      </section>
    </>
  );
}
