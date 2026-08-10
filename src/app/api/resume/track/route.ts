import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    let mongoSaved = false;

    if (clientPromise) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
        const collection = db.collection("resume_downloads");

        await collection.insertOne({
          downloadedAt: new Date(),
          userAgent: req.headers.get("user-agent") || "unknown",
          referer: req.headers.get("referer") || "direct",
        });

        mongoSaved = true;
      } catch (err) {
        console.error("MongoDB resume track insertion error:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Resume download tracked!", mongoSaved },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to track download event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (clientPromise) {
      const mongoClient = await clientPromise;
      const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
      const collection = db.collection("resume_downloads");

      const count = await collection.countDocuments();
      return NextResponse.json({ success: true, totalDownloads: count }, { status: 200 });
    }

    return NextResponse.json({ success: true, totalDownloads: 0 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch download stats" }, { status: 500 });
  }
}
