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
    .collection("orders")
    .orderBy("createdAt", "desc")
    .get();

  const orders = snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, ...data };
  });

  const totalAmount = orders.reduce(
    (sum: number, order: Record<string, unknown>) =>
      sum + (Number(order.total) || 0),
    0
  );

  return NextResponse.json({ orders, totalAmount });
}

export async function PUT(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "ID and status are required." },
      { status: 400 }
    );
  }

  await getAdminDb()
    .collection("orders")
    .doc(id)
    .update({ status, updatedAt: new Date().toISOString() });

  return NextResponse.json({ success: true });
}
