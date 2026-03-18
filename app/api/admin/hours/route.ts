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

  const doc = await getAdminDb()
    .collection("settings")
    .doc("operating_hours")
    .get();

  if (!doc.exists) {
    const defaults = {
      monday: { open: "08:00", close: "20:00", closed: false },
      tuesday: { open: "08:00", close: "20:00", closed: false },
      wednesday: { open: "08:00", close: "20:00", closed: false },
      thursday: { open: "08:00", close: "20:00", closed: false },
      friday: { open: "08:00", close: "20:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: false },
    };
    return NextResponse.json({ hours: defaults });
  }

  return NextResponse.json({ hours: doc.data() });
}

export async function PUT(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { hours } = await req.json();

  if (!hours) {
    return NextResponse.json(
      { error: "Hours data is required." },
      { status: 400 }
    );
  }

  await getAdminDb()
    .collection("settings")
    .doc("operating_hours")
    .set({ ...hours, updatedAt: new Date().toISOString() }, { merge: true });

  return NextResponse.json({ success: true });
}
