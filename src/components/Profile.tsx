import Image from "next/image";
import type { Profile as ProfileType } from "@/types";

export function Profile({ name, bio, avatarUrl }: ProfileType) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <Image src={avatarUrl} alt={name} fill sizes="128px" className="object-cover" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{name}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{bio}</p>
      </div>
    </div>
  );
}
