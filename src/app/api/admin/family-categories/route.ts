import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FamilyCategory from "@/models/FamilyCategory";

// GET /api/admin/family-categories
export async function GET() {
  try {
    await connectDB();
    const categories = await FamilyCategory.find().sort({ side: 1, name: 1 });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/family-categories error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/admin/family-categories
export async function POST(req: Request) {
  try {
    const { name, side } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!["bride", "groom"].includes(side)) {
      return NextResponse.json({ error: "Side must be 'bride' or 'groom'" }, { status: 400 });
    }

    await connectDB();
    const category = await FamilyCategory.create({ name: name.trim(), side });
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    // Duplicate key (unique name)
    if (error.code === 11000) {
      return NextResponse.json({ error: "Category name already exists" }, { status: 409 });
    }
    console.error("POST /api/admin/family-categories error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/admin/family-categories?id=<id>
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectDB();
    const deleted = await FamilyCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/admin/family-categories error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}