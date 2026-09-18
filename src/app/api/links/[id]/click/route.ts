import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "linknamu");

    const result = await db
      .collection<{ _id: string; clicks: number }>("linkClicks")
      .findOneAndUpdate(
        { _id: id },
        { $inc: { clicks: 1 } },
        { upsert: true, returnDocument: "after" }
      );

    return NextResponse.json({ clicks: result?.clicks ?? 1 });
  } catch (error) {
    console.error("Failed to record link click", error);
    return NextResponse.json(
      { error: "Failed to record click" },
      { status: 500 }
    );
  }
}
