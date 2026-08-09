import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, or message" },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Check if SMTP environment variables exist
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      // Production email dispatch using Nodemailer
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
        replyTo: email,
        to: process.env.CONTACT_RECEIVER_EMAIL || "iprateekgupta13@gmail.com",
        subject: `[Portfolio Inquiry] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #0078D4;">New Portfolio Contact Submission</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> ${email}</p>
            <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        `,
      });

      return NextResponse.json(
        { success: true, message: "Email sent successfully via SMTP!" },
        { status: 200 }
      );
    } else {
      // Development mode fallback logging
      console.log("----------------------------------------");
      console.log("[DEV CONTACT FORM SUBMISSION RECEIVED]");
      console.log(`From: ${name} <${email}>`);
      console.log(`Message: ${message}`);
      console.log("----------------------------------------");

      return NextResponse.json(
        {
          success: true,
          message: "Message received successfully! (Simulated response in development mode)",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
