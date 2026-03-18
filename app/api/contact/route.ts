import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { name, email, phone, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await getAdminDb().collection("contacts").add({
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form." },
      { status: 500 }
    );
  }
}
