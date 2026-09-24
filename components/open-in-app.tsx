"use client";

import { useEffect, useState } from "react";

const APP_STORE = "https://apps.apple.com/app/id6807573204";

/**
 * The fallback path.
 *
 * With universal links set up, iOS opens the app before this page ever
 * renders. So anyone who sees it either does not have the app or is not
 * on an iPhone: try the custom scheme once in case the association has
 * not propagated, then send them to the App Store.
 */
export function OpenInApp({ deepLink }: { deepLink: string }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => { window.location.href = deepLink; }, 200);
    const t2 = setTimeout(() => setStuck(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [deepLink]);

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
      {stuck ? "Get ZAND on the App Store" : "Open ZAND"}
    </a>
  );
}
