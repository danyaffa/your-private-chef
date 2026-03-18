import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { name, email, phone } = data;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const docRef = await getAdminDb().collection("orders").add({
      ...data,
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    return NextResponse.json({ success: true, orderId: docRef.id });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit order." },
      { status: 500 }
    );
  }
}
