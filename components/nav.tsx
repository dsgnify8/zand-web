"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const links = [
  { href: "language", label: { en: "Language", fa: "زبان" } },
  { href: "explore", label: { en: "Explore", fa: "کاوش" } },
  { href: "local", label: { en: "Local", fa: "محلی" } },
  { href: "about", label: { en: "About", fa: "درباره" } },
];

export function Nav({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const otherLang = lang === "en" ? "fa" : "en";
  const otherPath = pathname.replace("/" + lang, "/" + otherLang);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 2.5rem",
        background: "rgba(253,253,252,0.92)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(23,23,23,0.06)",
      }}>
        <Link
          href={"/" + lang}
          style={{
            fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.25em",
            color: "#171717", textDecoration: "none",
          }}
        >
          ZAND
        </Link>

        <ul className="zand-nav-desktop" style={{
          display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0,
        }}>
          {links.map(({ href, label }) => {
            const fullPath = "/" + lang + "/" + href;
            const isActive = pathname === fullPath;
            return (
              <li key={href}>
                <Link href={fullPath} style={{
                  fontSize: "0.82rem", fontWeight: 400,
                  color: isActive ? "#171717" : "#6B6B6B",
                  textDecoration: "none", letterSpacing: "0.02em",
                }}>
                  {label[lang]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href={otherPath} style={{
            fontSize: "0.82rem", fontWeight: 400, color: "#6B6B6B",
            textDecoration: "none", letterSpacing: "0.02em",
            border: "1px solid rgba(23,23,23,0.15)",
            padding: "0.35rem 0.85rem", borderRadius: "2rem",
          }}>
            {lang === "en" ? "فارسی" : "English"}
          </Link>
          <button
            className="zand-nav-burger"
            onClick={() => setOpen(true)}
            aria-label="Menu"
            style={{
              display: "flex", flexDirection: "column", gap: "5px",
              background: "none", border: "none", cursor: "pointer", padding: "8px",
            }}
          >
            <span style={{ display: "block", width: "22px", height: "2px", background: "#171717" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "#171717" }} />
          </button>
        </div>
      </div>

      {open && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "#FAF8F5", zIndex: 9999,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "1.2rem 2rem",
            borderBottom: "1px solid rgba(23,23,23,0.06)",
          }}>
            <span style={{
              fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.25em", color: "#171717",
            }}>ZAND</span>
            <button onClick={() => setOpen(false)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "1.6rem", color: "#171717", padding: "4px", lineHeight: 1,
            }}>{String.fromCharCode(215)}</button>
          </div>

          <div style={{ padding: "1.5rem 2rem", flex: 1 }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={"/" + lang + "/" + href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", padding: "1.1rem 0",
                  fontSize: "1.3rem", fontWeight: 300, color: "#171717",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(23,23,23,0.06)",
                }}
              >
                {label[lang]}
              </Link>
            ))}
          </div>

          <div style={{
            padding: "1.5rem 2rem",
            borderTop: "1px solid rgba(23,23,23,0.06)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{
              fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.25em", color: "#6B6B6B",
            }}>ZAND</span>
            <Link href={otherPath} onClick={() => setOpen(false)} style={{
              fontSize: "0.82rem", fontWeight: 400, color: "#6B6B6B",
              textDecoration: "none", border: "1px solid rgba(23,23,23,0.15)",
              padding: "0.35rem 0.85rem", borderRadius: "2rem",
            }}>
              {lang === "en" ? "فارسی" : "English"}
            </Link>
          </div>
        </div>
      )}

      <style>{String.raw`
        @media (min-width: 769px) {
          .zand-nav-burger { display: none !important; }
        }
        @media (max-width: 768px) {
          .zand-nav-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
}
