import clientPromise from "@/lib/mongodb";
import type { LinkCardData, Profile } from "@/types";

// TODO: 더미 데이터 — 실제 프로필/링크 내용으로 교체 예정
export const profile: Profile = {
  name: "최용대",
  bio: "헤르메스 사업단장",
  avatarUrl: "/avatar.svg",
};

// Static link definitions; click counts are tracked in MongoDB per link id.
const linkDefinitions: Omit<LinkCardData, "clicks">[] = [
  { id: "github", label: "GitHub", url: "https://github.com" },
  { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com" },
  { id: "blog", label: "Blog", url: "https://example.com/blog" },
];

export async function getLinks(): Promise<LinkCardData[]> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "linknamu");
    const counts = await db
      .collection<{ _id: string; clicks: number }>("linkClicks")
      .find({})
      .toArray();

    const countsById = new Map(counts.map((c) => [c._id, c.clicks]));

    return linkDefinitions.map((link) => ({
      ...link,
      clicks: countsById.get(link.id) ?? 0,
    }));
  } catch {
    // DB unavailable (e.g. MONGODB_URI not configured yet) — fall back to zero clicks.
    return linkDefinitions.map((link) => ({ ...link, clicks: 0 }));
  }
}
