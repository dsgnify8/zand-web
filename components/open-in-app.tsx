"use client";

const APP_STORE = "https://apps.apple.com/app/id6807573204";

/**
 * The way into the app, from a shared link.
 *
 * Two earlier versions of this were both wrong in the same way: they fired
 * the zand:// scheme by themselves, 200ms after the page loaded, so nobody
 * had to press anything to be sent somewhere. For a person without the app
 * that is an iOS error sheet about an address it cannot open. For a person
 * on a version with no screen behind that URL it was a black screen.
 *
 * So nothing happens on its own now. With the association file in place,
 * anyone who already has ZAND never reaches this page at all — iOS opens
 * the app directly — which makes almost everybody who does reach it
 * somebody who needs the App Store. That is the button. The scheme is
 * underneath it in words, for the case where the association file has not
 * reached their device yet, and it is a choice rather than a redirect.
 */
export function OpenInApp({ deepLink }: { deepLink: string }) {
  return (
    <>
      <a
        href={APP_STORE}
        style={{
          display: "inline-block",
          marginTop: "1.6rem",
          padding: "0.9rem 1.9rem",
          borderRadius: "999px",
          background: "linear-gradient(180deg, #A8493A 0%, #8C3A2E 100%)",
          color: "#FFF",
          fontSize: "0.95rem",
          fontWeight: 300,
          letterSpacing: "0.04em",
          textDecoration: "none",
          boxShadow: "0 6px 20px rgba(140,58,46,0.28)",
        }}
      >
        Get ZAND on the App Store
      </a>

      <a
        href={deepLink}
        style={{
          marginTop: "1rem",
          fontSize: "0.85rem",
          fontWeight: 300,
          color: "#8A8A8A",
          textDecoration: "none",
          borderBottom: "1px solid rgba(138,138,138,0.3)",
          paddingBottom: "1px",
        }}
      >
        Already have it? Open ZAND
      </a>
    </>
  );
}
