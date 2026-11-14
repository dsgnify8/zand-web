"use client";

import { useEffect, useRef } from "react";

/** A row of phone mockups. On phones it scrolls sideways, starting on the middle one. */
export function PhoneRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth > 768 || el.children.length < 2) return;
    const middle = el.children[1] as HTMLElement;
    // Absolute, so running twice lands in the same place. The row is
    // position: relative, so offsetLeft is measured from its edge.
    const left = middle.offsetLeft + middle.offsetWidth / 2 - el.clientWidth / 2;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollTo({ left: rtl ? left - (el.scrollWidth - el.clientWidth) : left, behavior: "instant" });
  }, []);

  return (
    <div ref={ref} className="hd-phones">
      {children}
    </div>
  );
}
