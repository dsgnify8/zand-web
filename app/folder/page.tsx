import { Handoff } from "@/components/handoff";

/** A shared folder of saved places. */
export default async function FolderPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const deepLink = `zand://folder${t ? `?t=${encodeURIComponent(t)}` : ""}`;

  return (
    <Handoff
      title="A folder shared with you"
      line="Places someone saved on ZAND, waiting in the app."
      deepLink={deepLink}
    />
  );
}
