import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { portfolioData } from "@/data/content";

export async function GET() {
  try {
    if (clientPromise) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
        const collection = db.collection("projects");

        const mongoProjects = await collection.find({}).toArray();

        if (mongoProjects && mongoProjects.length > 0) {
          return NextResponse.json({ success: true, source: "mongodb", projects: mongoProjects }, { status: 200 });
        }
      } catch (err) {
        console.error("MongoDB projects query error:", err);
      }
    }

    // Fallback to portfolio static project dataset
    return NextResponse.json(
      { success: true, source: "static", projects: portfolioData.projects },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, source: "fallback", projects: portfolioData.projects },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Missing required project title or description" },
        { status: 400 }
      );
    }

    if (clientPromise) {
      const mongoClient = await clientPromise;
      const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
      const collection = db.collection("projects");

      const result = await collection.insertOne({
        ...body,
        createdAt: new Date(),
      });

      return NextResponse.json(
        { success: true, message: "Project inserted successfully into MongoDB!", insertedId: result.insertedId },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "MongoDB connection unavailable" },
      { status: 503 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to insert project" }, { status: 500 });
  }
}
