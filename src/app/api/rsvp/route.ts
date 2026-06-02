import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, attending, members, slug, side } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    try {
      await connectDB();
    } catch (dbError) {
      console.warn("DB not connected:", dbError);
      return NextResponse.json({ success: true, dummy: true }, { status: 200 });
    }

    if (slug) {
      // Update existing personalized record
      const guest = await Guest.findOneAndUpdate(
        { slug },
        { attending, members: attending ? members : 0, name, ...(side ? { side } : {}) },
        { new: true }
      );
      if (guest) {
        return NextResponse.json({ success: true, guest }, { status: 200 });
      }
    }

    // New record
    const newGuest = await Guest.create({
      name,
      attending,
      members: attending ? members : 0,
      side,
    });
    return NextResponse.json({ success: true, guest: newGuest }, { status: 201 });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}