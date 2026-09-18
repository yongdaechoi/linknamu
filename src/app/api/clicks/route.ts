import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "linknamu");
    const counts = await db
      .collection<{ _id: string; clicks: number }>("linkClicks")
      .find({})
      .toArray();

    const clicksById = Object.fromEntries(counts.map((c) => [c._id, c.clicks]));
    return NextResponse.json(clicksById);
  } catch (error) {
    console.error("Failed to fetch click counts", error);
    return NextResponse.json({}, { status: 500 });
  }
}
