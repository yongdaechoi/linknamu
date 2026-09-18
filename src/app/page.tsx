import { Profile } from "@/components/Profile";
import { LinkList } from "@/components/LinkList";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { links, profile } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-10 dark:bg-black">
      <main className="flex w-full max-w-sm flex-col gap-6 rounded-3xl border-2 border-zinc-900 p-8 dark:border-zinc-100">
        <div className="flex w-full justify-end">
          <DarkModeToggle />
        </div>
        <Profile {...profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
