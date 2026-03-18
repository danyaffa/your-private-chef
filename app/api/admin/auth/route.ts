import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required." }, { status: 400 });
    }

    const adminCode = process.env.ADMIN_TEAM_CODE;
    if (!adminCode) {
      return NextResponse.json(
        { error: "Admin access not configured." },
        { status: 500 }
      );
    }

    if (code !== adminCode) {
      return NextResponse.json({ error: "Invalid code." }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Auth failed." }, { status: 500 });
  }
}
