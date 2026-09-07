import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZAND — Rooted Living",
  description:
    "Learn Persian, explore Iranian history and culture, and discover Iranian-owned businesses worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
