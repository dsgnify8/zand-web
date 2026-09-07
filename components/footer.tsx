import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const footerLinks = [
  { href: "language", label: { en: "Language", fa: "زبان" } },
  { href: "explore", label: { en: "Explore", fa: "کاوش" } },
  { href: "local", label: { en: "Local", fa: "محلی" } },
  { href: "about", label: { en: "About", fa: "درباره" } },
  { href: "privacy", label: { en: "Privacy", fa: "حریم خصوصی" } },
  { href: "terms", label: { en: "Terms", fa: "شرایط" } },
];

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="bg-zand-ink px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-sans font-medium text-[0.8rem] tracking-[0.25em] text-zand-warm-white/40">
        ZAND
      </div>
      <ul className="flex gap-6 list-none">
        {footerLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={`/${lang}/${href}`}
              className="text-[0.78rem] text-zand-warm-white/30 no-underline transition-opacity duration-300 hover:text-zand-warm-white/60"
            >
              {label[lang]}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="mailto:admin@zandapplication.com"
            className="text-[0.78rem] text-zand-warm-white/30 no-underline transition-opacity duration-300 hover:text-zand-warm-white/60"
          >
            {lang === "en" ? "Contact" : "تماس"}
          </a>
        </li>
      </ul>
    </footer>
  );
}
