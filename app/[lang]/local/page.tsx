import { supabase } from "@/lib/supabase";
import { LocalGrid } from "@/components/local-grid";
import "./local.css";

export const revalidate = 300;

export default async function LocalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, name_fa, tagline, tagline_fa, category, city, city_fa, country, photos, keywords, status")
    .eq("status", "active")
    .order("name");

  const listings = businesses || [];

  return (
    <>
      <section className="local-hero">
        <h1>
          {lang === "en"
            ? "Persians are known for making a name for themselves."
            : "\u0627\u06CC\u0631\u0627\u0646\u06CC\u200C\u0647\u0627 \u0628\u0647 \u0646\u0627\u0645\u200C\u0622\u0641\u0631\u06CC\u0646\u06CC \u0645\u0639\u0631\u0648\u0641\u0646\u062F."}
        </h1>
        <p className="local-hero-sub">
          {lang === "en" ? "Here is where to find them." : "\u0627\u06CC\u0646\u062C\u0627 \u067E\u06CC\u062F\u0627\u06CC\u0634\u0627\u0646 \u06A9\u0646\u06CC\u062F."}
        </p>
      </section>

      <LocalGrid businesses={listings} lang={lang} />
    </>
  );
}
