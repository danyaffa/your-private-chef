import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

function verifyAdmin(req: NextRequest): boolean {
  const code = req.headers.get("x-admin-code");
  return !!code && code === process.env.ADMIN_TEAM_CODE;
}

// Public GET — no auth required (used by homepage)
export async function GET() {
  const doc = await getAdminDb()
    .collection("settings")
    .doc("availability")
    .get();

  if (!doc.exists) {
    return NextResponse.json({ spots: 6 });
  }

  return NextResponse.json({ spots: doc.data()?.spots ?? 6 });
}

// Admin PUT — requires auth
export async function PUT(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { spots } = await req.json();

  if (spots === undefined || spots === null) {
    return NextResponse.json(
      { error: "Spots number is required." },
      { status: 400 }
    );
  }

  await getAdminDb()
    .collection("settings")
    .doc("availability")
    .set({ spots: Number(spots), updatedAt: new Date().toISOString() }, { merge: true });

  return NextResponse.json({ success: true });
}
