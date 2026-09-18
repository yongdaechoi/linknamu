import type { LinkCardData } from "@/types";
import { LinkCard } from "@/components/LinkCard";

export function LinkList({ links }: { links: LinkCardData[] }) {
  return (
    <div className="flex w-full flex-col gap-5">
      {links.map((link) => (
        <LinkCard key={link.id} {...link} />
      ))}
    </div>
  );
}
