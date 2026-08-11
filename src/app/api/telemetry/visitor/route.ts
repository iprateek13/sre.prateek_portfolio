import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    let mongoSaved = false;

    if (clientPromise) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
        const collection = db.collection("visitor_analytics");

        await collection.insertOne({
          timestamp: new Date(),
          userAgent: req.headers.get("user-agent") || "unknown",
          referer: req.headers.get("referer") || "direct",
        });

        mongoSaved = true;
      } catch (err) {
        console.error("MongoDB visitor telemetry insertion error:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Visitor event logged!", mongoSaved },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to log visitor event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (clientPromise) {
      const mongoClient = await clientPromise;
      const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
      const collection = db.collection("visitor_analytics");

      const totalViews = await collection.countDocuments();
      return NextResponse.json({ success: true, totalPageViews: totalViews }, { status: 200 });
    }

    return NextResponse.json({ success: true, totalPageViews: 0 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch visitor stats" }, { status: 500 });
  }
}
