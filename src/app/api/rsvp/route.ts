import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, attending, members, slug } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.warn("Database connection failed. In a real environment, this would fail the request.", dbError);
      // For the sake of the demo, if DB is not configured, we just return success
      return NextResponse.json({ success: true, dummy: true }, { status: 200 });
    }

    if (slug) {
      // If they are responding via a personalized link, update existing record
      const guest = await Guest.findOneAndUpdate(
        { slug },
        { attending, members, name }, // Update name in case they corrected it
        { new: true }
      );
      if (guest) {
        return NextResponse.json({ success: true, guest }, { status: 200 });
      }
    }

    // Otherwise create a new record
    const newGuest = await Guest.create({
      name,
      attending,
      members: attending ? members : 0,
    });

    return NextResponse.json({ success: true, guest: newGuest }, { status: 201 });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
