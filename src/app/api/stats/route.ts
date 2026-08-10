import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { portfolioData } from "@/data/content";

export async function GET() {
  try {
    let totalInquiries = 0;
    let totalResumeDownloads = 0;
    let mongoActive = false;

    if (clientPromise) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");

        totalInquiries = await db.collection("contact_submissions").countDocuments();
        totalResumeDownloads = await db.collection("resume_downloads").countDocuments();
        mongoActive = true;
      } catch (err) {
        console.error("MongoDB stats aggregation error:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        mongoActive,
        stats: {
          slaUptime: "99.99%",
          certifications: "AZ-900 Certified",
          iacModules: "15+ Child Modules",
          telemetryLatency: "<5ms",
          totalInquiries,
          totalResumeDownloads,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        stats: {
          slaUptime: "99.99%",
          certifications: "AZ-900 Certified",
          iacModules: "15+ Child Modules",
          telemetryLatency: "<5ms",
          totalInquiries: 0,
          totalResumeDownloads: 0,
        },
      },
      { status: 200 }
    );
  }
}
