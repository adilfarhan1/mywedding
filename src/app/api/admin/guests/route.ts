import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Math.random().toString(36).substring(2, 6);
}

export async function GET() {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      console.warn("DB not connected");
      return NextResponse.json({ guests: [] }, { status: 200 });
    }

    const guests = await Guest.find().sort({ createdAt: -1 });
    return NextResponse.json({ guests }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, category } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.warn("DB not connected");
      return NextResponse.json({ success: true, dummy: true }, { status: 200 });
    }

    const slug = generateSlug(name);
    
    const guest = await Guest.create({
      name,
      category,
      slug,
      attending: null, // Pending status
      members: 0,
    });

    return NextResponse.json({ success: true, guest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
