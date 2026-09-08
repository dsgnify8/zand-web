"use client";

import { useEffect, useRef } from "react";

export function ScrollCenter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Scroll to center the second child
    const items = el.children;
    if (items.length >= 2 && window.innerWidth <= 768) {
      const second = items[1] as HTMLElement;
      const scrollLeft = second.offsetLeft - (el.clientWidth / 2) + (second.clientWidth / 2);
      el.scrollTo({ left: scrollLeft, behavior: "instant" });
    }
  }, []);

  return (
    <div ref={ref} className="home-mockup-scroll home-mockup-scroll-center">
      {children}
    </div>
  );
}
