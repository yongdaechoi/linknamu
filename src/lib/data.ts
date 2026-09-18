import type { LinkCardData, Profile } from "@/types";

export const profile: Profile = {
  name: "최용대",
  bio: "헤르메스 사업단장",
  avatarUrl: "/프로필사진.jpg",
};

// Static link definitions; click counts are tracked in MongoDB per link id
// and fetched separately on the client via /api/clicks.
export const links: Omit<LinkCardData, "clicks">[] = [
  { id: "github", label: "GitHub", url: "https://github.com/yongdaechoi" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/youngfifty_tax" },
  { id: "blog", label: "Blog", url: "https://example.com/blog" },
];
