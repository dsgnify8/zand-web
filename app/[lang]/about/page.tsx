import type { Metadata } from "next";
import "./about.css";

export const metadata: Metadata = {
  title: "About — ZAND",
  description:
    "The story behind Zand — how a question about identity became a platform for the Iranian diaspora.",
};

export default async function AboutPage({
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
      <div className="about-hero-wrap">
        <header className="about-hero">
          <p className="about-hero-label">The story behind Zand</p>
          <h1>A place to come home to</h1>
          <p className="about-hero-sub">
            How a question about identity became a platform for an entire diaspora.
          </p>
        </header>
        <div className="about-rule">
          <div className="about-rule-line" />
        </div>
      </div>

      {/* Opening */}
      <div className="bg-blush-to-white">
        <article className="about-article">
          <p className="lede">
            Zand started with a gap. Not a market gap — a personal one. Growing up outside of Iran, with parents who talked about the country they&apos;d
            left but always stopped short of the full story. There was a world behind your identity
            that you could sense but <em>couldn&apos;t access</em>.
          </p>
          <p>
            A close friend who knew Iranian history well became an accidental teacher. A simple
            question would turn into hours of conversation — a historical event, a cultural shift,
            a person she&apos;d never heard of. She&apos;d leave each one realising{" "}
            <strong>how much she&apos;d never been taught</strong> about her own country. And she
            started to wonder how many other Iranians felt the same way.
          </p>

          <blockquote className="about-pullquote">
            <p>
              &ldquo;Before you can understand what is happening to a country, you have to
              understand its story.&rdquo;
            </p>
          </blockquote>
        </article>
      </div>

      {/* Turning point — wine */}
      <section className="about-wine">
        <div className="tile-pattern" />
        <div className="about-wine-inner">
          <div>
            <h2>The turning point</h2>
            <p>
              In late 2025 and early 2026, as protests and conflict brought Iran back into global
              headlines, she watched something happen among Iranians around the world. A collective
              reaction that <em>crossed generations and geography</em>. People were confronting
              what it meant to be Iranian in a way most of them hadn&apos;t before.
            </p>
            <p>
              She kept thinking about the ones who were like her — people who felt they were
              supposed to understand something they had{" "}
              <strong>never actually been taught</strong>. The information she was looking for was
              scattered everywhere, if you knew where to look at all. Most people didn&apos;t.
            </p>
          </div>
          <div className="about-wine-mark">
            <span>زند</span>
          </div>
        </div>
      </section>

      {/* What Zand is */}
      <div className="bg-white-to-rose">
        <article className="about-article">
          <h2 className="about-section-heading">What Zand is</h2>
          <p>
            Zand is a place where being Iranian can mean whatever it means to you. You can learn
            Persian in a way that <em>actually works</em> — not a translation of a Western language
            app, but something built for how Farsi is actually spoken and read. You can explore
            Iranian history through original sources, not summaries. You can discover the culture
            beyond what makes the news.
          </p>
          <p>
            It&apos;s not a political project. It doesn&apos;t tell anyone what to think about
            Iran. It gives people the tools to <strong>think, question, and learn</strong> — and
            to form their own relationship with it.
          </p>
        </article>
      </div>

      {/* TPM */}
      <div className="bg-tpm">
        <article className="about-article">
          <h2 className="about-section-heading">The right voice</h2>
          <p>
            There was one piece the founder knew she couldn&apos;t build alone. If Zand was going
            to represent Iran, the people already living it had to be part of it. That&apos;s why
            the partnership with <strong>The Persian Mag</strong> matters. TPM has a following of
            over 150,000 and an editorial voice rooted in{" "}
            <em>the Iran that exists right now</em> — its artists, creators, and emerging talent.
            Their world became part of Zand&apos;s, so the platform doesn&apos;t just talk about
            Iran. It shows you what Iran is making today.
          </p>
          <div className="about-placeholder" style={{overflow:"hidden"}}>
            <img src="/mockups/tpm-voice.jpg" alt="ZAND x The Persian Mag" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </article>
      </div>

      {/* Locals */}
      <div className="bg-locals">
        <article className="about-article">
          <h2 className="about-section-heading">Locals</h2>

          <div className="about-locals-banner">
            <div className="about-locals-dot" />
            <span>Brooklyn · Dubai · London · Los Angeles · Toronto · and counting</span>
          </div>

          <p>
            Then there&apos;s the Iranian world being built all around us. Zand has a section
            called Locals — a directory where Iranian-owned businesses{" "}
            <em>anywhere in the world</em> can be found. A restaurant in Brooklyn, a carpet
            showroom in Dubai, a bakery in London. It gives business owners a place to be seen and
            gives the community a way to <strong>find and support them</strong>.
          </p>
          <p>
            Together, these pieces are what make Zand feel complete. A place where you can learn
            something in five minutes or disappear into a subject for five hours. Where you can
            hear your language, find a Persian restaurant in a city you&apos;ve never visited, or
            feel a little more connected to something that has <em>always been part of you</em>.
          </p>
        </article>
      </div>

      {/* Closing */}
      <section className="about-closing">
        <div className="tile-pattern" />
        <div className="about-closing-inner">
          <blockquote>
            &ldquo;I know what it&apos;s like to feel curious about a part of yourself and not
            quite know where to begin. So I wanted to build the place I wish I had growing
            up.&rdquo;
          </blockquote>
          <p className="about-attr">Nojan Zandesh, Founder</p>
        </div>
      </section>
    </>
  );
}
