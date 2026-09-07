"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { businessPhotoUrl } from "@/lib/supabase";

type Business = {
  id: string;
  name: string;
  tagline: string | null;
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
                  placeholder="Search a city..."
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
          placeholder="Search by name, type, or keyword..."
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
            <p>No businesses found.</p>
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
                      <span>Photo coming soon</span>
                    )}
                  </div>
                  <div className="local-card-body">
                    <h3>{biz.name}</h3>
                    <p className="local-card-meta">
                      {biz.category ? biz.category.charAt(0).toUpperCase() + biz.category.slice(1) : ""}
                      {" " + dot + " "}
                      {biz.city}
                      {biz.country ? ", " + biz.country : ""}
                    </p>
                    {biz.tagline && <p className="local-card-desc">{biz.tagline}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
