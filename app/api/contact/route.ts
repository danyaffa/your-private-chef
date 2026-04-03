import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Store in Firestore
    await getAdminDb().collection("contacts").add({
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    // Send email notification via Gmail SMTP
    const contactEmail = process.env.CONTACT_EMAIL || "eat@chefprepforyou.com";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Your Private Chef" <${process.env.GMAIL_USER}>`,
      to: contactEmail,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1C1C;">
          <div style="background: #1C1C1C; padding: 24px 32px;">
            <h1 style="color: #C8986E; font-size: 20px; margin: 0; letter-spacing: 2px;">YOUR PRIVATE CHEF</h1>
          </div>
          <div style="padding: 32px; background: #F5F0EB;">
            <h2 style="color: #1C1C1C; font-size: 22px; margin-top: 0;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #8B7355; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 100px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; color: #1C1C1C; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8B7355; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #1C1C1C; font-size: 15px;"><a href="mailto:${email}" style="color: #C8986E;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 8px 0; color: #8B7355; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Phone</td>
                <td style="padding: 8px 0; color: #1C1C1C; font-size: 15px;"><a href="tel:${phone}" style="color: #C8986E;">${phone}</a></td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border-left: 3px solid #C8986E;">
              <p style="color: #8B7355; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Message</p>
              <p style="color: #1C1C1C; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background: #1C1C1C; padding: 16px 32px; text-align: center;">
            <p style="color: #F5F0EB50; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
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
