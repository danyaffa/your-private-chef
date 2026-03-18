import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

function verifyAdmin(req: NextRequest): boolean {
  const code = req.headers.get("x-admin-code");
  return !!code && code === process.env.ADMIN_TEAM_CODE;
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await getAdminDb()
    .collection("menu_items")
    .orderBy("createdAt", "desc")
    .get();

  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { name, description, price, category } = data;

  if (!name || !price) {
    return NextResponse.json(
      { error: "Name and price are required." },
      { status: 400 }
    );
  }

  const docRef = await getAdminDb().collection("menu_items").add({
    name,
    description: description || "",
    price: Number(price),
    category: category || "General",
    active: true,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, id: docRef.id });
}

export async function PUT(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { id, ...updates } = data;

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  if (updates.price !== undefined) {
    updates.price = Number(updates.price);
  }
  updates.updatedAt = new Date().toISOString();

  await getAdminDb().collection("menu_items").doc(id).update(updates);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  await getAdminDb().collection("menu_items").doc(id).delete();
  return NextResponse.json({ success: true });
}
