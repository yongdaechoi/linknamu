"use client";

import { useEffect, useState } from "react";
import type { LinkCardData } from "@/types";
import { LinkCard } from "@/components/LinkCard";

type LinkDefinition = Omit<LinkCardData, "clicks">;

export function LinkList({ links }: { links: LinkDefinition[] }) {
  const [clicksById, setClicksById] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, number>) => setClicksById(data))
      .catch(() => {
        // Best-effort: leave counts at 0 if the fetch fails.
      });
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          {...link}
          clicks={clicksById[link.id] ?? 0}
          onClicked={(clicks) =>
            setClicksById((prev) => ({ ...prev, [link.id]: clicks }))
          }
        />
      ))}
    </div>
  );
}
