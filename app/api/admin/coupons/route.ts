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
    .collection("coupons")
    .orderBy("createdAt", "desc")
    .get();

  const coupons = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Also get coupon claim stats
  const claimsSnapshot = await getAdminDb().collection("coupon_claims").get();
  const totalClaims = claimsSnapshot.size;

  return NextResponse.json({ coupons, totalClaims });
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { code, discount, type, description, maxUses } = data;

  if (!code || !discount) {
    return NextResponse.json(
      { error: "Code and discount are required." },
      { status: 400 }
    );
  }

  const docRef = await getAdminDb().collection("coupons").add({
    code: code.toUpperCase(),
    discount: Number(discount),
    type: type || "percentage",
    description: description || "",
    maxUses: maxUses ? Number(maxUses) : null,
    usedCount: 0,
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

  if (updates.discount !== undefined) updates.discount = Number(updates.discount);
  if (updates.maxUses !== undefined)
    updates.maxUses = updates.maxUses ? Number(updates.maxUses) : null;
  if (updates.code) updates.code = updates.code.toUpperCase();
  updates.updatedAt = new Date().toISOString();

  await getAdminDb().collection("coupons").doc(id).update(updates);
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

  await getAdminDb().collection("coupons").doc(id).delete();
  return NextResponse.json({ success: true });
}
