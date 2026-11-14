"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon, ShareIcon } from "./icons";

type Props = {
  url: string;
  title: string;
  text: string;
  /** "icon": the quiet round button in the section header. "pill": Pass this on. */
  variant: "icon" | "pill";
  label: string;
  copiedLabel: string;
};

/**
 * Phones get the native share sheet. Everywhere else the link is copied,
 * with a small note that it was.
 */
export function ShareButton({ url, title, text, variant, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function onClick() {
    const isPhone =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches &&
      typeof navigator.share === "function";

    if (isPhone) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // The person closed the sheet: nothing to do.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }

  if (variant === "icon") {
    return (
      <div className="hd-share">
        <button type="button" className="hd-share-btn" onClick={onClick} aria-label={label} title={label}>
          <ShareIcon size={16} />
        </button>
        <span className={"hd-share-note" + (copied ? " is-on" : "")} role="status" aria-live="polite">
          {copied ? copiedLabel : ""}
        </span>
      </div>
    );
  }

  return (
    <div className="hd-pass">
      <button type="button" className="hd-pass-btn" onClick={onClick}>
        <span>{label}</span>
        <span className="hd-pass-arrow">
          <ArrowIcon size={14} />
        </span>
      </button>
      <span className={"hd-pass-note" + (copied ? " is-on" : "")} role="status" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
