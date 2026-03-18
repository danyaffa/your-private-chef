import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const existing = await getAdminDb()
      .collection("newsletter")
      .where("email", "==", email)
      .get();

    if (!existing.empty) {
      return NextResponse.json({ success: true, message: "Already subscribed." });
    }

    await getAdminDb().collection("newsletter").add({
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe." },
      { status: 500 }
    );
  }
}
