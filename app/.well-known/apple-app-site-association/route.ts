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
/**
 * Whether the released version of the app can handle these links.
 *
 * One association file serves every version, so listing a path opens the
 * app for everybody — including anyone on an older version. Version 1.1.0
 * had no screen behind /add, /folder or a listing URL, and an unmatched
 * route in expo-router draws nothing, so for a day every invitation anyone
 * sent opened ZAND to a black screen.
 *
 * Flip this to true when the version that HAS those screens is the one on
 * the App Store, and not before. There is a floor under them now too
 * (app/+not-found.tsx), so an unrecognised path goes home rather than
 * nowhere, but that floor only exists in the new version.
 */
const APP_HANDLES_LINKS = true;

const APP_PATHS = [
  "/add", "/add/*",
  "/folder", "/folder/*",
  "/en/local/*", "/fa/local/*",
];

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
          // See APP_HANDLES_LINKS above. Empty means iOS does not claim
          // these URLs and they open the pages in this site instead, which
          // work and offer the App Store.
          paths: APP_HANDLES_LINKS ? APP_PATHS : [],
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
