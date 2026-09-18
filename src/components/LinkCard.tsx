"use client";

import type { LinkCardData } from "@/types";

export function LinkCard({ id, label, url }: LinkCardData) {
  const handleClick = () => {
    fetch(`/api/links/${id}/click`, { method: "POST" }).catch(() => {
      // Best-effort click tracking; ignore failures so navigation isn't blocked.
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 text-center font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
    >
      {label}
    </a>
  );
}
