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
    .select("id, name, tagline, category, city, country, photos, keywords, status")
    .eq("status", "active")
    .order("name");

  const listings = businesses || [];

  return (
    <>
      <section className="local-hero">
        <h1>
          {lang === "en"
            ? "Persians are known for making a name for themselves."
            : ""}
        </h1>
        <p className="local-hero-sub">
          {lang === "en" ? "Here is where to find them." : ""}
        </p>
      </section>

      <LocalGrid businesses={listings} lang={lang} />
    </>
  );
}
