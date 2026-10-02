import { Handoff } from "@/components/handoff";

/**
 * Where a shared invitation lands.
 *
 * On an iPhone with the app installed, iOS follows the association file
 * and this page is never drawn. Everyone else gets the invitation and a
 * way to install.
 */
export default async function AddPage({
  searchParams,
}: {
  searchParams: Promise<{ i?: string; from?: string }>;
}) {
  // `i` is a token and is what a current invitation carries; `from` is a
  // user id and is what links already sitting in people's messages carry.
  // Whichever arrived is passed straight through, because the app knows
  // what to do with either and this page should not have an opinion.
  const { i, from } = await searchParams;
  const q = i
    ? `?i=${encodeURIComponent(i)}`
    : from
      ? `?from=${encodeURIComponent(from)}`
      : "";
  const deepLink = `zand://add${q}`;

  return (
    <Handoff
      title="An invitation to ZAND"
      line="Persian language, Iranian history and culture, and Iranian-owned places worldwide."
      deepLink={deepLink}
    />
  );
}
