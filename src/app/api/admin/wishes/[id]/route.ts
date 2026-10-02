import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wish from "@/models/Wish";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Wish.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/admin/wishes/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
