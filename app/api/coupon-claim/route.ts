import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existing = await getAdminDb()
      .collection("coupon_claims")
      .where("email", "==", email)
      .get();

    if (!existing.empty) {
      return NextResponse.json({ success: true, code: "WELCOME10" });
    }

    await getAdminDb().collection("coupon_claims").add({
      name,
      email,
      phone,
      code: "WELCOME10",
      claimedAt: new Date().toISOString(),
      used: false,
    });

    return NextResponse.json({ success: true, code: "WELCOME10" });
  } catch (error) {
    console.error("Coupon claim error:", error);
    return NextResponse.json(
      { error: "Failed to claim coupon." },
      { status: 500 }
    );
  }
}
