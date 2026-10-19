import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    const guest = await Guest.findOne({ slug }).select("name side").lean();

    if (!guest) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { name: guest.name, side: guest.side ?? null },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/guest/[slug] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
