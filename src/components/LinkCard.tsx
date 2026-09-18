"use client";

type LinkCardProps = {
  id: string;
  label: string;
  url: string;
  clicks: number;
  onClicked: (clicks: number) => void;
};

export function LinkCard({ id, label, url, clicks, onClicked }: LinkCardProps) {
  const handleClick = () => {
    fetch(`/api/links/${id}/click`, { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { clicks?: number } | null) => {
        if (typeof data?.clicks === "number") {
          onClicked(data.clicks);
        }
      })
      .catch(() => {
        // Best-effort click tracking; ignore failures so navigation isn't blocked.
      });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-4 font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
    >
      <span className="flex-1 text-center">{label}</span>
      <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">{clicks}회</span>
    </a>
  );
}
