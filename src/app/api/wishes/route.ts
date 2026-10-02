import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wish from "@/models/Wish";

export async function GET() {
  try {
    await connectDB();
    const wishes = await Wish.find().sort({ createdAt: -1 });
    return NextResponse.json({ wishes }, { status: 200 });
  } catch (error) {
    console.error("GET /api/wishes error:", error);
    return NextResponse.json({ wishes: [] }, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }
    try {
      await connectDB();
    } catch {
      console.warn("DB not connected");
      return NextResponse.json({ success: true, dummy: true }, { status: 200 });
    }
    const wish = await Wish.create({ name: name.trim(), message: message.trim() });
    return NextResponse.json({ success: true, wish }, { status: 201 });
  } catch (error) {
    console.error("POST /api/wishes error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
