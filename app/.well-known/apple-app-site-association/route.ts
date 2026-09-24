// The file iOS fetches to decide whether zandapplication.com links may
// open the app instead of Safari.
//
// It must be served from /.well-known/apple-app-site-association, over
// https, as application/json, with no redirect and no extension. A route
// handler is the only way to satisfy all four in Next.
//
// APPLE_TEAM_ID is the ten-character Team ID from the Apple Developer
// membership page. Without it the file is still valid JSON, but iOS will
// not match it and links fall back to this site.

// Either spelling, so it does not matter which one was set in Vercel.
const TEAM = process.env.APPLE_TEAM_ID ?? process.env.NEXT_PUBLIC_APPLE_TEAM_ID ?? "";
const BUNDLE = "com.zandapplication.zand";

export const dynamic = "force-static";

export function GET() {
  const body = {
    applinks: {
      // Empty by design: the modern format carries the app ids on each
      // detail entry.
      apps: [],
      details: [
        {
          appID: `${TEAM}.${BUNDLE}`,
          paths: ["/add", "/add/*", "/folder", "/folder/*"],
        },
      ],
    },
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
