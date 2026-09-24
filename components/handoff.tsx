import { OpenInApp } from "@/components/open-in-app";

/** The shared look for links that hand off to the app. */
export function Handoff({
  title, line, deepLink,
}: { title: string; line: string; deepLink: string }) {
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
        style={{ width: 96, height: 96, borderRadius: 22, boxShadow: "0 8px 32px rgba(23,23,23,0.12)", marginBottom: "2rem" }}
      />
      <h1 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontWeight: 400, fontSize: "2.2rem", color: "#171717", margin: "0 0 0.9rem",
      }}>
        {title}
      </h1>
      <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "#6B6B6B", maxWidth: 400, lineHeight: 1.7, margin: 0 }}>
        {line}
      </p>
      <OpenInApp deepLink={deepLink} />
    </div>
  );
}
