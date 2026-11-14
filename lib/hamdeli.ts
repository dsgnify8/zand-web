// Hand in Hand (همدلی): data, links and copy shared by the section page and
// the profile pages. Everything reads from public.hamdeli, the same table
// the app reads, so the two never disagree.

import { cache } from "react";
import { supabase, STORAGE_URL } from "@/lib/supabase";

export const SITE = "https://zandapplication.com";

export type Reel = { url: string; cover: string };

export type Profile = {
  slug: string;
  name: string;
  name_fa: string | null;
  city: string | null;
  city_fa: string | null;
  kind: string | null;
  blurb: string | null;
  blurb_fa: string | null;
  story: string | null;
  story_fa: string | null;
  need: string | null;
  need_fa: string | null;
  cover: string | null;
  instagram: string | null;
  website: string | null;
  donate_url: string | null;
  youtube_ids: string[] | null;
  reels: Reel[] | null;
  sort: number | null;
};

// Listed explicitly. Never select("*"): consent_note is the admin's private
// record of who agreed to be featured and must never reach the website.
const COLUMNS =
  "slug, name, name_fa, city, city_fa, kind, blurb, blurb_fa, story, story_fa, need, need_fa, cover, instagram, website, donate_url, youtube_ids, reels, sort";

/** Every published profile, in the app's order. RLS already hides drafts. */
export const getProfiles = cache(async (): Promise<Profile[]> => {
  const { data } = await supabase
    .from("hamdeli")
    .select(COLUMNS)
    .eq("published", true)
    .order("sort", { ascending: true })
    .order("name", { ascending: true });
  return (data as Profile[] | null) ?? [];
});

/** One published profile, or null. */
export const getProfile = cache(async (slug: string): Promise<Profile | null> => {
  const { data } = await supabase
    .from("hamdeli")
    .select(COLUMNS)
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  return (data as Profile | null) ?? null;
});

// ── Links and images ──

export function img(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${STORAGE_URL}/hamdeli/${path.replace(/^\/+/, "")}`;
}

export function instagramUrl(handle: string | null | undefined): string | null {
  if (!handle) return null;
  const h = handle.trim();
  if (!h) return null;
  if (/instagram\.com/i.test(h)) return /^https?:\/\//.test(h) ? h : `https://${h}`;
  return `https://instagram.com/${h.replace(/^@+/, "")}`;
}

export function websiteUrl(site: string | null | undefined): string | null {
  if (!site) return null;
  const s = site.trim();
  if (!s) return null;
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

export function reelsOf(p: Profile): Reel[] {
  return (Array.isArray(p.reels) ? p.reels : [])
    .filter((r) => r && r.url && r.cover)
    .slice(0, 2);
}

export function youtubeOf(p: Profile): string[] {
  return (Array.isArray(p.youtube_ids) ? p.youtube_ids : []).filter(
    (id) => typeof id === "string" && /^[\w-]{6,20}$/.test(id)
  );
}

// ── Text ──

/**
 * Iranian bank card numbers and IBANs only work inside Iran, and on ZAND
 * they are easy for impersonators to copy. They are never shown, even if
 * one finds its way into a story.
 */
function stripBankDetails(text: string): string {
  return text
    .replace(/\bIR\s?\d{2}(?:[\s-]?\d{4}){5}[\s-]?\d{2}\b/gi, "")
    .replace(/(?:[0-9۰-۹]{4}[\s-]?){3}[0-9۰-۹]{4}/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/** The Persian field on /fa when it exists, otherwise English. */
export function pick(isFa: boolean, en: string | null, fa: string | null): string {
  const value = isFa && fa && fa.trim() ? fa : en || "";
  return stripBankDetails(value);
}

export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// ── Copy (written, not translated) ──

export const copy = {
  en: {
    title: "Hand in Hand",
    sub: "People doing quiet, difficult work, chosen one by one.",
    intro:
      "People and organisations doing quiet, difficult work in Iran and across the diaspora, chosen one by one. The point is that they are seen. Follow them, share them, send them to someone closer than you are. Nothing here is an advertisement and nothing is paid for.",
    lead: "Anything is something.",
    fromTheirWork: "From their work",
    opensInInstagram: "Opens in Instagram",
    whatHelps: "What helps",
    watch: "Watch",
    findThem: "Find them",
    instagram: "Instagram",
    website: "Website",
    donate: "Donate",
    donateNote: "Donations go directly to them. ZAND takes nothing and handles no money.",
    passThisOn: "Pass this on",
    empty: "The first profiles are being chosen. Come back soon.",
    shareText: "Hand in Hand, on ZAND. People doing quiet, difficult work in Iran, chosen one by one.",
    share: "Share",
    linkCopied: "Link copied",
    getApp: "Every profile, and their videos, in the ZAND app.",
    downloadAppStore: "Download on the App Store",
    back: "Hand in Hand",
    play: "Play on Instagram",
  },
  fa: {
    title: "همدلی",
    sub: "آدم‌هایی که کار سخت و بی‌سروصدا می‌کنند، یکی‌یکی انتخاب‌شده.",
    intro:
      "آدم‌ها و سازمان‌هایی که در ایران و میان ایرانیان جهان، کار سخت و بی‌سروصدا می‌کنند. یکی‌یکی انتخابشان کرده‌ایم. مهم این است که دیده شوند. دنبالشان کن، معرفی‌شان کن، یا برای کسی بفرست که از تو نزدیک‌تر است. اینجا نه تبلیغ است و نه کسی بابتش پولی داده.",
    lead: "کم و زیادش مهم نیست.",
    fromTheirWork: "از کارشان",
    opensInInstagram: "در اینستاگرام باز می‌شود",
    whatHelps: "چه کمکی به کار می‌آید",
    watch: "تماشا",
    findThem: "پیدایشان کن",
    instagram: "اینستاگرام",
    website: "وب‌سایت",
    donate: "کمک مالی",
    donateNote: "کمک‌ها مستقیم به خودشان می‌رسد. زند چیزی برنمی‌دارد و پولی جابه‌جا نمی‌کند.",
    passThisOn: "معرفی‌شان کن",
    empty: "داریم نخستین پروفایل‌ها را انتخاب می‌کنیم. به‌زودی سر بزن.",
    shareText: "همدلی، در زند. آدم‌هایی که در ایران کار سخت و بی‌سروصدا می‌کنند، یکی‌یکی انتخاب‌شده.",
    share: "اشتراک‌گذاری",
    linkCopied: "لینک کپی شد",
    getApp: "همهٔ پروفایل‌ها، با ویدیوهایشان، در اپلیکیشن زند.",
    downloadAppStore: "دانلود از اپ استور",
    back: "همدلی",
    play: "پخش در اینستاگرام",
  },
} as const;

export type HamdeliCopy = (typeof copy)["en"] | (typeof copy)["fa"];

export const APP_STORE_URL = "https://apps.apple.com/za/app/zand-x/id6807573204";
