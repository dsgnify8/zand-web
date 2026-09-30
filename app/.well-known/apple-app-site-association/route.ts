// The file iOS fetches to decide whether zandapplication.com links may
// open the app instead of Safari.
//
// It must be served from /.well-known/apple-app-site-association, over
// https, as application/json, with no redirect and no extension. A route
// handler is the only way to satisfy all four in Next.
//
// The Team ID is written in rather than read from the environment. It
// is published in this very file, so it is not a secret, and a build
// that cannot see a variable silently serves a file iOS ignores.
const TEAM = "J888GRM9SW";
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
          // Empty, deliberately, and temporarily.
          //
          // These paths used to be here: "/add", "/add/*", "/folder",
          // "/folder/*", "/en/local/*", "/fa/local/*". iOS honoured them
          // and opened the app — but version 1.1.0 has no screen behind
          // any of those URLs, so every invitation anyone sent opened ZAND
          // to a black screen and stopped there.
          //
          // With nothing listed, iOS stops intercepting and the links open
          // these pages instead, which work and offer the App Store.
          //
          // Put the list back once 1.2.0 is live, not before: that is the
          // version that has the screens. See also OpenInApp, which had to
          // stop reaching for the zand:// scheme for the same reason.
          paths: [],
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
