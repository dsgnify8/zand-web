"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { businessPhotoUrl } from "@/lib/supabase";

type Business = {
  id: string;
  name: string;
  name_fa: string | null;
  tagline: string | null;
  tagline_fa: string | null;
  category: string | null;
  city: string | null;
  country: string | null;
  photos: string[] | null;
  keywords: string[] | null;
};

function slugify(name: string, city: string): string {
  return (name + "-" + city)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LocalGrid({
  businesses,
  lang,
}: {
  businesses: Business[];
  lang: string;
}) {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cities = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.city).filter(Boolean))) as string[],
    [businesses]
  );

  const categories = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.category).filter(Boolean))) as string[],
    [businesses]
  );

  const citySuggestions = useMemo(() => {
    if (!cityInput.trim()) return cities;
    const q = cityInput.toLowerCase();
    return cities.filter((c) => c.toLowerCase().includes(q));
  }, [cityInput, cities]);

  const filtered = useMemo(() => {
    return businesses.filter((biz) => {
      if (selectedCity && biz.city !== selectedCity) return false;
      if (selectedCategory && biz.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack = [
          biz.name, biz.tagline, biz.category, biz.city, biz.country,
          ...(biz.keywords || []),
        ].filter(Boolean).join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [businesses, search, selectedCity, selectedCategory]);

  const dot = String.fromCharCode(183);

  return (
    <>
      <div className="local-location-bar">
        <div className="local-location-inner">
          {selectedCity ? (
            <div className="local-location-active">
              <span>{String.fromCodePoint(0x1F4CD)}</span>
              <span className="local-location-name">{selectedCity}</span>
              <button
                className="local-location-clear"
                onClick={() => { setSelectedCity(null); setCityInput(""); }}
              >
                {String.fromCharCode(215)}
              </button>
            </div>
          ) : (
            <div className="local-location-picker">
              <div className="local-location-input-wrap">
                <span className="local-location-pin">{String.fromCodePoint(0x1F4CD)}</span>
                <input
                  type="text"
                  className="local-location-input"
                  placeholder={lang === "fa" ? "\u0634\u0647\u0631 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u200C\u062C\u0648 \u06A9\u0646\u06CC\u062F..." : "Search a city..."}
                  value={cityInput}
                  onChange={(e) => { setCityInput(e.target.value); setShowCityDropdown(true); }}
                  onFocus={() => setShowCityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                />
              </div>
              <button
                className="local-everywhere-btn"
                onClick={() => { setSelectedCity(null); setCityInput(""); setShowCityDropdown(false); }}
              >
                Everywhere
              </button>
            </div>
          )}

          {showCityDropdown && !selectedCity && citySuggestions.length > 0 && (
            <div className="local-city-dropdown">
              {citySuggestions.map((city) => (
                <button
                  key={city}
                  className="local-city-option"
                  onMouseDown={() => { setSelectedCity(city); setCityInput(""); setShowCityDropdown(false); }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="local-search-wrap">
        <input
          type="text"
          className="local-search"
          placeholder={lang === "fa" ? "\u062C\u0633\u062A\u200C\u0648\u200C\u062C\u0648 \u0628\u0627 \u0646\u0627\u0645\u060C \u0646\u0648\u0639 \u06CC\u0627 \u06A9\u0644\u06CC\u062F\u0648\u0627\u0698\u0647..." : "Search by name, type, or keyword..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="local-filters">
        <button
          className={"local-filter-btn" + (!selectedCategory ? " active" : "")}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={"local-filter-btn" + (selectedCategory === cat ? " active" : "")}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="local-results-info">
        <span>
          {filtered.length} {filtered.length === 1 ? "business" : "businesses"}
          {selectedCity ? " in " + selectedCity : ""}
          {selectedCategory ? " " + dot + " " + selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : ""}
        </span>
      </div>

      <div className="local-grid-wrap">
        {filtered.length === 0 ? (
          <div className="local-empty">
            <p>{lang === "fa" ? "\u06A9\u0633\u0628\u200C\u0648\u06A9\u0627\u0631\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F." : "No businesses found."}</p>
            <button
              className="local-empty-reset"
              onClick={() => { setSearch(""); setSelectedCity(null); setSelectedCategory(null); setCityInput(""); }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="local-grid">
            {filtered.map((biz) => {
              const photoKeys: string[] = Array.isArray(biz.photos) ? biz.photos : [];
              const photoUrl = photoKeys.length > 0 ? businessPhotoUrl(photoKeys[0]) : null;
              const slug = slugify(biz.name, biz.city || "");

              return (
                <Link key={biz.id} href={"/" + lang + "/local/" + slug} className="local-card">
                  <div className="local-card-img">
                    {photoUrl ? (
                      <img src={photoUrl} alt={biz.name} />
                    ) : (
                      <span>{lang === "fa" ? "\u0639\u06A9\u0633 \u0628\u0647 \u0632\u0648\u062F\u06CC" : "Photo coming soon"}</span>
                    )}
                  </div>
                  <div className="local-card-body">
                    <h3>{lang === "fa" && biz.name_fa ? biz.name_fa : biz.name}</h3>
                    <p className="local-card-meta">
                      {biz.category ? biz.category.charAt(0).toUpperCase() + biz.category.slice(1) : ""}
                      {" " + dot + " "}
                      {biz.city}
                      {biz.country ? ", " + biz.country : ""}
                    </p>
                    {(biz.tagline || biz.tagline_fa) && <p className="local-card-desc">{lang === "fa" && biz.tagline_fa ? biz.tagline_fa : biz.tagline}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          className="local-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          {String.fromCharCode(8593)}
        </button>
      )}

      {/* App CTA */}
      <div className="local-app-cta">
        <p>{lang === "fa"
          ? "\u0647\u0645\u0647\u0654 \u06A9\u0633\u0628\u200C\u0648\u06A9\u0627\u0631\u0647\u0627 \u0648 \u062F\u0627\u0633\u062A\u0627\u0646\u200C\u0647\u0627\u06CC\u0634\u0627\u0646 \u0631\u0627 \u062F\u0631 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06A9\u0627\u0648\u0634 \u06A9\u0646\u06CC\u062F"
          : "Explore all businesses and their stories on the app"}</p>
        <a href={"/" + lang + "/app"}>
          {lang === "fa" ? "\u062F\u0627\u0646\u0644\u0648\u062F \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646" : "Download the App"}
        </a>
      </div>
    </>
  );
}
