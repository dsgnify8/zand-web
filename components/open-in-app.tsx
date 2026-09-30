"use client";

const APP_STORE = "https://apps.apple.com/app/id6807573204";

/**
 * The way into the app.
 *
 * This used to reach for the zand:// scheme after a moment, on the theory
 * that somebody with the app should not have to visit the App Store. That
 * theory was sound and the practice was not: version 1.1.0 has no screen
 * behind zand://add or zand://folder, so the redirect opened ZAND to a
 * black screen. Worse, it fired on its own, so nobody had to press
 * anything to get there.
 *
 * So for now there is one button and it goes to the App Store, which shows
 * OPEN to anyone who already has the app. Once 1.2.0 is live the scheme
 * handoff can come back, along with the paths in the association file.
 *
 * `deepLink` is still taken, and still unused, so that restoring it is a
 * matter of putting the effect back rather than rethreading two pages.
 */
export function OpenInApp({ deepLink }: { deepLink: string }) {
  void deepLink;

  return (
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
  );
}
