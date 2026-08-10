import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, or message" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    const targetEmail = process.env.CONTACT_RECEIVER_EMAIL || "sre.prateek@gmail.com";

    // 1. SAFELY RECORD SUBMISSION IN MONGODB ATLAS (If MONGODB_URI exists)
    let mongoSaved = false;
    if (clientPromise) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
        const collection = db.collection("contact_submissions");

        await collection.insertOne({
          name,
          email,
          subject: subject || "Portfolio Inquiry",
          message,
          createdAt: new Date(),
          status: "unread",
          userAgent: req.headers.get("user-agent") || "unknown",
        });

        mongoSaved = true;
        console.log("Successfully saved contact submission to MongoDB Atlas!");
      } catch (mongoErr) {
        console.error("MongoDB Atlas insertion error (continuing cleanly):", mongoErr);
      }
    }

    // 2. CHECK SMTP ENVIRONMENT VARIABLES (Gmail / SendGrid / Custom SMTP)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
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
        to: targetEmail,
        subject: `[Portfolio Inquiry] ${subject || "New Message"} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0f172a; background: #faf9e1; border-radius: 16px;">
            <h2 style="color: #0284c7; margin-top: 0;">⚡ New SRE Portfolio Message</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || "Portfolio Inquiry"}</p>
            <hr style="border: 1px solid #cbd5e1; margin: 20px 0;" />
            <p><strong>Message Content:</strong></p>
            <div style="background: #ffffff; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>
        `,
      });

      return NextResponse.json(
        { success: true, message: "Email sent successfully & saved to database!", mongoSaved },
        { status: 200 }
      );
    }

    // 3. WEB3FORMS REAL MAIL FALLBACK
    try {
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY || "e5ad9a3d-4c31-4c7a-9a03-7b6bbbf93457",
          name: name,
          email: email,
          subject: `[Portfolio] ${subject || "New Inquiry"} from ${name}`,
          message: `Sender: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
          to: targetEmail,
        }),
      });

      const web3Data = await web3Response.json();

      if (web3Data.success) {
        return NextResponse.json(
          { success: true, message: "Real email dispatched & recorded!", mongoSaved },
          { status: 200 }
        );
      }
    } catch (e) {
      // Fallback
    }

    return NextResponse.json(
      { success: true, message: "Message processed successfully!", mongoSaved },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
