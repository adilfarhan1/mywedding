// app/api/admin/guests/[id]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await params;   // ← await params

    if (!id) {
      return NextResponse.json({ error: "Missing guest id" }, { status: 400 });
    }

    const updated = await Guest.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, guest: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/admin/guests/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedGuest = await Guest.findByIdAndDelete(id);

    if (!deletedGuest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Guest deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE guest error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}