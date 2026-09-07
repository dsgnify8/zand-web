"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileMenu({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        style={{
          display: "flex", flexDirection: "column", gap: "5px",
          background: "none", border: "none", cursor: "pointer",
          padding: "8px", zIndex: 52, position: "relative",
        }}
      >
        <span style={{
          display: "block", width: "22px", height: "2px", background: "#171717",
          transition: "transform 0.3s ease", transformOrigin: "center",
          transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
        }} />
        <span style={{
          display: "block", width: "22px", height: "2px", background: "#171717",
          transition: "transform 0.3s ease", transformOrigin: "center",
          transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
        }} />
      </button>

      {open ? (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "#FAF8F5",
          zIndex: 51,
          overflowY: "auto",
        }}>
          {/* Close button */}
          <div style={{
            display: "flex", justifyContent: "flex-end",
            padding: "1.2rem 1.5rem",
          }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "1.5rem", color: "#171717", padding: "4px",
              }}
            >
              {String.fromCharCode(215)}
            </button>
          </div>

          {/* Links */}
          <div style={{ padding: "2rem 2rem 3rem" }}>
            {[
              { href: "language", label: "Language" },
              { href: "explore", label: "Explore" },
              { href: "local", label: "Local" },
              { href: "about", label: "About" },
              { href: "privacy", label: "Privacy" },
              { href: "terms", label: "Terms" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={"/" + lang + "/" + href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", padding: "1.1rem 0",
                  fontSize: "1.4rem", fontWeight: 300,
                  color: "#171717", textDecoration: "none",
                  borderBottom: "1px solid rgba(23,23,23,0.06)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Bottom */}
          <div style={{
            padding: "0 2rem 2rem",
            display: "flex", justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{
              fontSize: "0.75rem", fontWeight: 500,
              letterSpacing: "0.25em", color: "#6B6B6B",
            }}>
              ZAND
            </span>
            <Link
              href={"/" + (lang === "en" ? "fa" : "en")}
              onClick={() => setOpen(false)}
              style={{
                fontSize: "0.85rem", fontWeight: 400, color: "#6B6B6B",
                textDecoration: "none",
                border: "1px solid rgba(23,23,23,0.15)",
                padding: "0.35rem 0.85rem", borderRadius: "2rem",
              }}
            >
              {lang === "en" ? "\u0641\u0627\u0631\u0633\u06CC" : "English"}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
