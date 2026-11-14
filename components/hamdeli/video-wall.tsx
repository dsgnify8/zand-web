"use client";

import { useEffect, useState } from "react";
import { InstagramIcon } from "./icons";

export type WallReel = { url: string; cover: string; name: string; owner: string };

type Layout = { tiles: WallReel[]; twoFirst: boolean; wideFirst: boolean };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Everyone appears once before anyone appears twice. */
function everyoneOnce(reels: WallReel[]): WallReel[] {
  const seen = new Map<string, number>();
  const ranked = reels.map((r) => {
    const n = seen.get(r.owner) ?? 0;
    seen.set(r.owner, n + 1);
    return { r, n };
  });
  return ranked
    .sort((a, b) => a.n - b.n) // stable: keeps the shuffled order within a rank
    .map((x) => x.r);
}

function Tile({ reel, flex }: { reel: WallReel; flex?: number }) {
  return (
    <a
      className="hd-tile"
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      style={flex ? { flex } : undefined}
      aria-label={`${reel.name}, Instagram`}
    >
      <img src={reel.cover} alt="" loading="lazy" />
      <span className="hd-tile-fade" />
      <span className="hd-tile-name">
        <InstagramIcon size={12} />
        <span>{reel.name}</span>
      </span>
    </a>
  );
}

/**
 * Up to five reel covers from across all profiles: a row of two (unequal,
 * about 1.35 to 1) and a row of three. Which row comes first and which side
 * is wider are chosen per visit. The order is shuffled in the browser after
 * mount, so the cached page does not freeze one order for everyone and
 * hydration always matches.
 */
export function VideoWall({ reels }: { reels: WallReel[] }) {
  const [layout, setLayout] = useState<Layout>(() => ({
    tiles: everyoneOnce(reels).slice(0, 5),
    twoFirst: true,
    wideFirst: true,
  }));

  useEffect(() => {
    // After hydration, so the server's order and the first client render match.
    const frame = requestAnimationFrame(() =>
      setLayout({
        tiles: everyoneOnce(shuffle(reels)).slice(0, 5),
        twoFirst: Math.random() < 0.5,
        wideFirst: Math.random() < 0.5,
      })
    );
    return () => cancelAnimationFrame(frame);
  }, [reels]);

  const { tiles, twoFirst, wideFirst } = layout;
  if (tiles.length === 0) return null;

  // Five makes two rows (two and three). Fewer still reads as a wall.
  let pair: WallReel[] = [];
  let trio: WallReel[] = [];
  if (tiles.length >= 5) {
    pair = tiles.slice(0, 2);
    trio = tiles.slice(2, 5);
  } else if (tiles.length === 4) {
    pair = tiles.slice(0, 2);
    trio = tiles.slice(2, 4);
  } else if (tiles.length === 3) {
    trio = tiles;
  } else {
    pair = tiles;
  }

  const pairRow = pair.length > 0 && (
    <div className="hd-wall-row hd-wall-row-2" key="pair">
      {pair.map((r, i) => (
        <Tile
          key={i + r.url}
          reel={r}
          flex={pair.length === 2 ? ((i === 0) === wideFirst ? 1.35 : 1) : 1}
        />
      ))}
    </div>
  );

  const trioRow = trio.length > 0 && (
    <div className="hd-wall-row hd-wall-row-3" key="trio">
      {trio.map((r, i) => (
        <Tile key={i + r.url} reel={r} flex={1} />
      ))}
    </div>
  );

  return <div className="hd-wall">{twoFirst ? [pairRow, trioRow] : [trioRow, pairRow]}</div>;
}
