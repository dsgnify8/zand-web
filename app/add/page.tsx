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
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const deepLink = `zand://add${from ? `?from=${encodeURIComponent(from)}` : ""}`;

  return (
    <Handoff
      title="An invitation to ZAND"
      line="Persian language, Iranian history and culture, and Iranian-owned places worldwide."
      deepLink={deepLink}
    />
  );
}
