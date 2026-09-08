import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download ZAND",
};

export default async function AppPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isFa = lang === "fa";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(180deg, #FDFDFC 0%, #FDF5F3 50%, #F9F0F0 100%)",
      textAlign: "center",
    }}>
      <img
        src="/app-icon.png"
        alt="ZAND"
        style={{
          width: "96px",
          height: "96px",
          borderRadius: "22px",
          boxShadow: "0 8px 32px rgba(23,23,23,0.12)",
          marginBottom: "2rem",
        }}
      />
      <h1 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontWeight: 400,
        fontSize: "2.4rem",
        color: "#171717",
        marginBottom: "1rem",
      }}>
        ZAND
      </h1>
      <p style={{
        fontSize: "1.1rem",
        fontWeight: 300,
        color: "#6B6B6B",
        maxWidth: "400px",
        lineHeight: 1.7,
        marginBottom: "0.5rem",
      }}>
        {isFa ? "\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0628\u0647 \u0632\u0648\u062F\u06CC \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u062E\u0648\u0627\u0647\u062F \u0628\u0648\u062F" : "The app will be live soon"}
      </p>
      <p style={{
        fontSize: "0.88rem",
        fontWeight: 300,
        color: "#B8924A",
        letterSpacing: "0.05em",
      }}>
        {isFa ? "iOS \u0648 Android" : "Coming to iOS & Android"}
      </p>
    </div>
  );
}
