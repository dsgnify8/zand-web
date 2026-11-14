# Hand in Hand (همدلی) on the website

A brief for building the web version of a section that already exists in the ZAND app. The app is the reference: the website page should show the same people, the same words and the same design language, read from the same database, so the two never disagree.

## What it is

Hand in Hand is ZAND's section for people and organisations doing quiet, difficult work in Iran: animal shelters, people who sit with those sleeping rough, homes for children with no one. Every profile is chosen by hand. Nothing is submitted from outside, nothing is paid for, and ZAND never sits in the middle of any money.

The point of the section is exposure. Most ZAND readers live outside Iran and cannot adopt a dog in Tehran or join an Iranian society. What they can do is follow, share, and pass someone on. So every page ends in links out to the people themselves, and sharing always sends a reader towards them, not towards ZAND.

The Persian name, همدلی, means one-heartedness. English readers see "Hand in Hand"; Persian readers see همدلی.

## What to build

| Page | URL | Content |
|---|---|---|
| The section | `/en/hamdeli`, `/fa/hamdeli` | Everything: header, intro, every profile card, the video wall |
| One profile | `/en/hamdeli/[slug]`, `/fa/hamdeli/[slug]` | The full profile, as in the app |

Bare `/hamdeli` already redirects to `/en/hamdeli` through the existing middleware.

**Why these exact URLs:** the app has a share button at the top of its Hand in Hand page that sends `https://zandapplication.com/en/hamdeli` (or `/fa/hamdeli` when the app is in Persian). That link has to land on this page. The app build with that button will not ship until this page is live.

**Do not add these paths to `APP_PATHS`** in `app/.well-known/apple-app-site-association/route.ts`. The app has no screen at these addresses, so claiming them would open the app on its home screen instead of showing this page. The website should handle these links for everyone, with or without the app.

## Data

Everything comes from Supabase, through the existing `lib/supabase.ts` client and `STORAGE_URL`. Nothing is hardcoded.

**Table:** `public.hamdeli`. Row-level security already lets the anon key read **published rows only**, so drafts are invisible without any filtering on your side. Filter on `published = true` anyway, for clarity.

```ts
const { data } = await supabase
  .from("hamdeli")
  .select("slug, name, name_fa, city, city_fa, kind, blurb, blurb_fa, story, story_fa, need, need_fa, cover, instagram, website, donate_url, youtube_ids, reels, sort")
  .eq("published", true)
  .order("sort", { ascending: true })
  .order("name", { ascending: true });
```

**Never select `consent_note`.** It is the admin's private record of who agreed to be featured. List the columns explicitly, as above, rather than `select("*")`.

| Column | Meaning |
|---|---|
| `slug` | URL key for the profile page |
| `name`, `name_fa` | Name in English and Persian. Persian is written, not translated. |
| `city`, `city_fa` | Optional. Many profiles have none. |
| `kind` | `animals`, `people`, `children` or `other`. Not shown to readers yet. |
| `blurb`, `blurb_fa` | One line, shown on the card |
| `story`, `story_fa` | A few paragraphs, shown on the profile page |
| `need`, `need_fa` | "What helps": the concrete thing that helps |
| `cover` | Path of the round profile photo in storage |
| `instagram` | Handle, no @ |
| `website` | May be missing `https://` |
| `donate_url` | Optional. Opens in a new tab. |
| `youtube_ids` | Array of YouTube video ids |
| `reels` | Array of `{ url, cover }`: an Instagram reel link and the path of its cover screenshot. Up to two per profile. |

**Images:** `cover` and each reel's `cover` live in the public `hamdeli` bucket:

```ts
const img = (path: string) => `${STORAGE_URL}/hamdeli/${path}`;
```

**Freshness:** `export const revalidate = 60;` as on the local pages. Profiles are added, edited and removed from the app's admin at any time, and the website should follow within a minute without a deploy.

**Links:**
- Instagram: `https://instagram.com/${handle}` (strip a leading `@`)
- Website: prefix `https://` if it has no scheme
- Reels: use `reel.url` as stored. It is already cleaned.

**Persian:** on `/fa`, use the `_fa` field when it exists and fall back to English when it does not. The layout already sets `dir="rtl"`.

## Design language

The section borrows the palette of the app's Nowruz section, the warmest world in ZAND, with a dusty rose of its own. The page background stays the site's normal paper. The warmth comes from a wash at the top and from the details, not from a coloured page.

**Palette**

| Token | Hex | Used for |
|---|---|---|
| Rose | `#9C5468` | The section's own colour: Persian names, buttons, the chapter diamond, icons |
| Rose soft | `#F5EAEE` | Icon backgrounds, empty photo fill |
| Gold | `#B08A46` | همدلی, short rules, city names, eyebrows, chevrons, photo rings |
| Ink | `#2E2823` | Headings and body text |
| Ink dim | `#8A7F73` | Secondary text, notes |
| Hairline | `#E7D9D6` | Card borders |
| Card | `#FCF8F7` | Card surfaces |
| Wash | `#E7D5CF` to `#EFE3DF` | The gradient at the top of both pages, fading into the page background |

The wash is a rosy taupe. It is deliberately close to Nowruz's sand without matching it: sand with a little blush in it.

**Type**
- Headings and the lines that matter: **Cormorant Garamond** (already loaded as `--font-cormorant`), often in italic.
- Body: **Inter** (already loaded as `--font-inter`). The app uses Poppins; the site keeps its own body face.
- Persian: **Vazirmatn**. Load it through `next/font/google`. Never letter-space Persian: it breaks the joins between letters.

**Signature details** (these are what make it read as ZAND rather than a list page)
- The Persian word همدلی, large and gold, above the English title.
- A short gold rule, 34 by 1px at 70% opacity, under headings.
- Small diamonds (squares rotated 45°) as markers: 7px rose ones open sections, a 6px gold one closes the page.
- Round photos inside a fine gold ring (1.5px, with a small gap between ring and photo).
- Small labels in tracked uppercase gold, 9px, 2 to 3px letter spacing (English only).
- Italic Cormorant for the lines that carry feeling.

No shadows on cards, no gradients except the top wash and the dark fade on video covers, no animation beyond a gentle hover.

## The section page, top to bottom

**1. Header**, centred, over the wash (about 300px tall, fading into the page):
- همدلی in gold, Vazirmatn, about 44px
- "Hand in Hand" in Cormorant, about 32px, English only. On `/fa` the Persian word is the title.
- The gold rule
- The sub line, Inter 13px, ink dim, max about 300px wide
- A share button, top right: a quiet 36px circle with a share icon in rose. Uses the Web Share API on phones, and copies the link with a small "Link copied" note elsewhere.

**2. Intro paragraph**, Inter 14 to 15px, line height about 1.7, ink, left-aligned (right-aligned on `/fa`), at a readable measure.

**3. The lead line**, centred, between two gold rules: "Anything is something." in Cormorant italic, about 22px.

**4. The cards**, one column on phones, two from tablet width up. Each card:
- Card background, 1px hairline border, 16px radius, 24px padding
- Row: the 60px round photo in its gold ring, then the name in Cormorant 21px with the Persian name beside it in rose 13px, then the city underneath in gold tracked caps. A gold chevron on the far side.
- Below the row: the one line, Inter 12.5px, ink dim, clamped to three lines
- The whole card links to the profile page

**5. From their work**, the video wall:
- Opens with a rose diamond, the eyebrow "FROM THEIR WORK" in gold, and "Opens in Instagram" in small italic
- Up to five reel covers from across all published profiles, in two rows: one of two and one of three. Which row comes first is random per visit.
- The row of two is deliberately unequal (widths about 1.35 to 1), with the wider side random per visit, so it reads as a wall of snapshots rather than a grid.
- Tiles: 14px radius, cover image, a dark fade at the bottom, the person's name in white with a small Instagram mark. Each opens its reel in a new tab.
- **Everyone appears once before anyone appears twice.** Most profiles have two videos, so shuffle all reels, then take each person's first video before anyone's second.
- Shuffle on the client after mount, not on the server, so the cached page does not freeze one order for every visitor and hydration does not mismatch.

**6. Close**, centred: a 1 by 36px gold line, همدلی in gold about 26px, a 6px gold diamond.

**7. Get the app** (website only): one quiet line, "Every profile, and their videos, in the ZAND app.", with the site's existing App Store button.

## The profile page, top to bottom

**1. Header**, centred, over the same wash:
- Back link to the section
- The photo, 112px round, inside the gold ring
- Name in Cormorant 30px, Persian name in rose 15px beneath
- The gold rule, then the city in gold tracked caps

**2. The story**, Inter 15px, line height about 1.75.

**3. What helps** (only if `need` exists): a rose diamond with the eyebrow "WHAT HELPS", then the text in Cormorant italic about 19px beside a 3px rose bar.

**4. Watch** (only if there are reels or YouTube videos): a rose diamond, the eyebrow "WATCH", "Opens in Instagram" under it when there are reels.
- Reels: up to two tall 9:16 tiles side by side, 16px radius, a frosted round play button in the middle, an Instagram label at the bottom. Each opens the reel in a new tab. The video itself is never embedded or played on ZAND.
- YouTube: embedding the player is fine on the web, beneath the reels.

**5. Find them**: a rose diamond, the eyebrow "FIND THEM", then link rows for Instagram, Website and Donate, whichever exist. Each row: card background, hairline border, 16px radius, a 32px rose-soft circle with the icon in rose, the label, and an external-link icon in gold. All open in a new tab with `rel="noopener noreferrer"`.
- If there is a donate link, add under the rows, in small italic: "Donations go directly to them. ZAND takes nothing and handles no money."

**6. Pass this on**: a full-width rose pill button, label then a small circled arrow. It shares **their** Instagram link (or website, or donate link, in that order), with their name and one line as the text. Not the ZAND page. Web Share API on phones; copy to clipboard elsewhere.

**7. Close**: the gold line, "Anything is something." in Cormorant italic, the gold diamond.

## Copy

Use these exactly. The Persian is written, not translated.

| Key | English | Persian |
|---|---|---|
| Title | Hand in Hand | همدلی |
| Sub | People doing quiet, difficult work, chosen one by one. | آدم‌هایی که کار سخت و بی‌سروصدا می‌کنند، یکی‌یکی انتخاب‌شده. |
| Intro | People and organisations doing quiet, difficult work in Iran and across the diaspora, chosen one by one. The point is that they are seen. Follow them, share them, send them to someone closer than you are. Nothing here is an advertisement and nothing is paid for. | آدم‌ها و سازمان‌هایی که در ایران و میان ایرانیان جهان، کار سخت و بی‌سروصدا می‌کنند. یکی‌یکی انتخابشان کرده‌ایم. مهم این است که دیده شوند. دنبالشان کن، معرفی‌شان کن، یا برای کسی بفرست که از تو نزدیک‌تر است. اینجا نه تبلیغ است و نه کسی بابتش پولی داده. |
| Lead | Anything is something. | کم و زیادش مهم نیست. |
| From their work | FROM THEIR WORK | از کارشان |
| Opens in Instagram | Opens in Instagram | در اینستاگرام باز می‌شود |
| What helps | What helps | چه کمکی به کار می‌آید |
| Watch | Watch | تماشا |
| Find them | Find them | پیدایشان کن |
| Instagram | Instagram | اینستاگرام |
| Website | Website | وب‌سایت |
| Donate | Donate | کمک مالی |
| Donate note | Donations go directly to them. ZAND takes nothing and handles no money. | کمک‌ها مستقیم به خودشان می‌رسد. زند چیزی برنمی‌دارد و پولی جابه‌جا نمی‌کند. |
| Pass this on | Pass this on | معرفی‌شان کن |
| Empty | The first profiles are being chosen. Come back soon. | داریم نخستین پروفایل‌ها را انتخاب می‌کنیم. به‌زودی سر بزن. |
| Share text | Hand in Hand, on ZAND. People doing quiet, difficult work in Iran, chosen one by one. | همدلی، در زند. آدم‌هایی که در ایران کار سخت و بی‌سروصدا می‌کنند، یکی‌یکی انتخاب‌شده. |

## Search and sharing

- Title: "Hand in Hand | ZAND" (`/fa`: "همدلی | زند"). Profile pages: "{name} | Hand in Hand | ZAND".
- Description: the sub line on the section; the profile's one line on a profile page.
- Open Graph image: a profile's photo on its own page. For the section, a designed card is better than any one person's photo.
- Add both languages of the section and every profile to `app/sitemap.ts`, with `hreflang` alternates between `/en` and `/fa`.
- Add Hand in Hand wherever the site lists the app's sections (navigation, footer, the explore page).

## Do not

- Embed Instagram posts or reels, or hotlink Instagram's own image URLs. Embedding is restricted, and those URLs expire within hours. Covers come from the ZAND storage bucket.
- Show Iranian bank card numbers, even when a profile's Instagram does. They only work inside Iran, and on ZAND they are easy for impersonators to copy.
- Show `consent_note`, or anything from unpublished rows.
- Take, route or hold donations. Every donate link goes straight to the organisation.
- Add `/hamdeli` paths to the app's universal-link list (see above).
