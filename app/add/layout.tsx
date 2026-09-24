import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"], weight: ["400", "500"], variable: "--font-cormorant", display: "swap",
});

export const metadata: Metadata = {
  title: "Join me on ZAND",
  description: "Open the invitation in ZAND.",
};

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
