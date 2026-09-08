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
  const isFa = lang === "fa";

  // Farsi now renders the full page

  return (
    <>
      {/* Hero */}
      <div className="about-hero-wrap">
        <header className="about-hero">
          <p className="about-hero-label">{isFa ? "داستان پشت زند" : "The story behind Zand"}</p>
          <h1>{isFa ? "جایی برای بازگشت به خانه" : "A place to come home to"}</h1>
          <p className="about-hero-sub">
            {isFa ? "چگونه یک سؤال دربارهٔ هویت به یک پلتفرم برای یک دیاسپورای کامل تبدیل شد." : "How a question about identity became a platform for an entire diaspora."}
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
            {isFa
            ? <>زند با یک خلاء شروع شد. نه یک خلاء بازار — یک خلاء شخصی. بزرگ شدن در خارج از ایران، با پدر و مادری که از کشوری که ترکش کرده بودند حرف می‌زدند اما همیشه جایی داستان متوقف می‌شد. دنیایی پشت هویتت بود که حسش می‌کردی اما <em>دسترسی نداشتی</em>.</>
            : <>Zand started with a gap. Not a market gap — a personal one. We grew up outside of Iran, with parents who talked about the country they&apos;d left but always stopped short of the full story. There was a world behind our identity that we could sense but <em>couldn&apos;t access</em>.</>
            }
          </p>
          <p>
            {isFa
            ? <>یک دوست نزدیک که تاریخ ایران را خوب می‌شناخت معلمی اتفاقی شد. یک سؤال ساده به ساعت‌ها گفت‌و‌گو تبدیل می‌شد — یک رویداد تاریخی، یک تحول فرهنگی، شخصیتی که هرگز اسمش را نشنیده بود. هر بار با این فکر بیرون می‌آمد که <strong>چقدر چیزهایی بود که هرگز یادش نداده بودند</strong>. و شروع کرد به فکر کردن که چند ایرانی دیگر همین حس را دارند.</>
            : <>A close friend who knew Iranian history well became an accidental teacher. A simple question would turn into hours of conversation — a historical event, a cultural shift, a person we&apos;d never heard of. We&apos;d leave each one realising{" "}<strong>how much she&apos;d never been taught</strong> about her own country. And we started to wonder how many other Iranians felt the same way.</>
            }
          </p>

          <blockquote className="about-pullquote">
            <p>
              {isFa
              ? "«قبل از اینکه بفهمی چه بر سر یک کشور می‌آید، باید داستانش را بشناسی.»"
              : "\u201CBefore you can understand what is happening to a country, you have to understand its story.\u201D"
              }
            </p>
          </blockquote>
        </article>
      </div>

      {/* Turning point — wine */}
      <section className="about-wine">
        <div className="tile-pattern" />
        <div className="about-wine-inner">
          <div>
            <h2>{isFa ? "نقطهٔ عطف" : "The turning point"}</h2>
            <p>
              {isFa
              ? <>در اواخر ۲۰۲۵ و اوایل ۲۰۲۶، وقتی اعتراضات و درگیری ایران را دوباره به تیترهای جهانی برد، اتفاقی را میان ایرانی‌های سراسر جهان دید. واکنشی جمعی که <em>از نسل‌ها و جغرافیا فراتر رفت</em>.</>
              : <>In late 2025 and early 2026, as protests and conflict brought Iran back into global headlines, we watched something happen among Iranians around the world. A collective reaction that <em>crossed generations and geography</em>. People were confronting what it meant to be Iranian in a way most of them hadn&apos;t before.</>
              }
            </p>
            <p>
              {isFa
              ? <>همش به آدم‌هایی فکر می‌کرد که مثل خودش بودند — کسانی که حس می‌کردند باید چیزی را بفهمند که <strong>هرگز یادشان نداده بودند</strong>. اطلاعاتی که دنبالش می‌گشت همه‌جا پراکنده بود، اگر اصلاً می‌دانستی کجا بگردی.</>
              : <>We kept thinking about the ones who were like us — people who felt they were supposed to understand something they had{" "}<strong>never actually been taught</strong>. The information we were looking for was scattered everywhere, if you knew where to look at all. Most people didn&apos;t.</>
              }
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
          <h2 className="about-section-heading">{isFa ? "زند چیست" : "What Zand is"}</h2>
          <p>
            {isFa
            ? <>زند جاییست که ایرانی بودن می‌تواند هر معنایی برایت داشته باشد. فارسی را به روشی یاد بگیری که <em>واقعاً جواب می‌دهد</em> — تاریخ ایران را از منابع اصلی بخوانی، نه خلاصه. فرهنگی را کشف کنی که فراتر از اخبار است.</>
            : <>Zand is a place where being Iranian can mean whatever it means to you. You can learn Persian in a way that <em>actually works</em> — not a translation of a Western language app, but something built for how Farsi is actually spoken and read. You can explore Iranian history through original sources, not summaries. You can discover the culture beyond what makes the news.</>
            }
          </p>
          <p>
            {isFa
            ? <>یک پروژهٔ سیاسی نیست. به کسی نمی‌گوید دربارهٔ ایران چه فکر کند. ابزاری می‌دهد برای <strong>فکر کردن، پرسیدن و یاد گرفتن</strong> — و ساختن رابطهٔ خودت با آن.</>
            : <>It&apos;s not a political project. It doesn&apos;t tell anyone what to think about Iran. It gives people the tools to <strong>think, question, and learn</strong> — and to form their own relationship with it.</>
            }
          </p>
        </article>
      </div>

      {/* TPM */}
      <div className="bg-tpm">
        <article className="about-article">
          <h2 className="about-section-heading">{isFa ? "صدای درست" : "The right voice"}</h2>
          <p>
            {isFa
            ? <>یک بخش بود که می‌دانستیم تنهایی نمی‌توانیم بسازیم. اگر زند قرار بود ایران را نمایندگی کند، کسانی که الآن در آن زندگی می‌کنند باید بخشی از آن باشند. به همین دلیل همکاری با <strong>در پرشین مگ</strong> اهمیت دارد. TPM با بیش از ۱۵۰ هزار دنبال‌کننده و صدایی ریشه‌دار در <em>ایران امروز</em> — هنرمندان، خالقان و استعدادهای نوظهور. دنیایشان بخشی از زند شد، تا پلتفرم فقط از ایران حرف نزند — نشان دهد ایران امروز چه می‌سازد.</>
            : <>There was one piece we knew we couldn&apos;t build alone. If Zand was going to represent Iran, the people already living it had to be part of it. That&apos;s why the partnership with <strong>The Persian Mag</strong> matters. TPM has a following of over 150,000 and an editorial voice rooted in{" "}<em>the Iran that exists right now</em> — its artists, creators, and emerging talent. Their world became part of Zand&apos;s, so the platform doesn&apos;t just talk about Iran. It shows you what Iran is making today.</>
            }
          </p>
          <div className="about-placeholder" style={{overflow:"hidden"}}>
            <img src="/mockups/tpm-voice.jpg" alt="ZAND x The Persian Mag" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </article>
      </div>

      {/* Locals */}
      <div className="bg-locals">
        <article className="about-article">
          <h2 className="about-section-heading">{isFa ? "محلی" : "Locals"}</h2>

          <div className="about-locals-banner">
            <div className="about-locals-dot" />
            <span>Brooklyn · Dubai · London · Los Angeles · Toronto · and counting</span>
          </div>

          <p>
            {isFa
            ? <>و بعد دنیای ایرانی که دور ما ساخته می‌شود. زند بخشی دارد به نام محلی — فهرستی از کسب‌وکارهای ایرانی <em>در هر جای جهان</em>. یک رستوران در بروکلین، یک فرش‌فروشی در دبی، یک نانوایی در لندن. به صاحبان کسب‌وکار جایی برای دیده شدن می‌دهد و به جامعه راهی برای <strong>پیدا کردن و حمایت</strong>.</>
            : <>Then there&apos;s the Iranian world being built all around us. Zand has a section called Locals — a directory where Iranian-owned businesses{" "}<em>anywhere in the world</em> can be found. A restaurant in Brooklyn, a carpet showroom in Dubai, a bakery in London. It gives business owners a place to be seen and gives the community a way to <strong>find and support them</strong>.</>
            }
          </p>
          <p>
            {isFa
            ? <>این بخش‌ها با هم زند را کامل می‌کنند. جایی که در پنج دقیقه چیزی یاد بگیری یا پنج ساعت در موضوعی غرق شوی. زبانت را بشنوی، در شهری که هرگز نرفته‌ای یک رستوران ایرانی پیدا کنی، یا کمی بیشتر به چیزی وصل شوی که <em>همیشه بخشی از تو بوده</em>.</>
            : <>Together, these pieces are what make Zand feel complete. A place where you can learn something in five minutes or disappear into a subject for five hours. Where you can hear your language, find a Persian restaurant in a city you&apos;ve never visited, or feel a little more connected to something that has <em>always been part of you</em>.</>
            }
          </p>
        </article>
      </div>

      {/* Closing */}
      <section className="about-closing">
        <div className="tile-pattern" />
        <div className="about-closing-inner">
          <blockquote>
            {isFa
            ? "«می‌دانیم چه حسیست که به بخشی از خودت کنجکاو باشی و ندانی از کجا شروع کنی. برای همین خواستیم جایی را بسازیم که آرزو داشتم وقتی بزرگ می‌شدم داشتم.»"
            : "\u201CWe know what it\u2019s like to feel curious about a part of yourself and not quite know where to begin. So We wanted to build the place we wish we had growing up.\u201D"
            }
          </blockquote>
          <p className="about-attr">The Zand Team</p>
        </div>
      </section>
    </>
  );
}
