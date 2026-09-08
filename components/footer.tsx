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
    <footer style={{
      background: "#171717",
      padding: "2.5rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem",
    }}>
      <div style={{
        fontWeight: 500,
        fontSize: "0.8rem",
        letterSpacing: "0.25em",
        color: "rgba(248,246,242,0.4)",
      }}>
        ZAND
      </div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem 1.5rem",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}>
        {footerLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={"/" + lang + "/" + href}
            style={{
              fontSize: "0.78rem",
              color: "rgba(248,246,242,0.35)",
              textDecoration: "none",
            }}
          >
            {label[lang]}
          </Link>
        ))}
        
          href="mailto:admin@zandapplication.com"
          style={{
            fontSize: "0.78rem",
            color: "rgba(248,246,242,0.35)",
            textDecoration: "none",
          }}
        >
          {lang === "en" ? "Contact" : "تماس"}
        </a>
      </div>
    </footer>
  );
}
