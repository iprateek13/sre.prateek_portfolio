import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { portfolioData } from "@/data/content";

export async function GET() {
  try {
    if (clientPromise) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
        const collection = db.collection("skills");

        const mongoSkills = await collection.find({}).toArray();

        if (mongoSkills && mongoSkills.length > 0) {
          return NextResponse.json({ success: true, source: "mongodb", skillCategories: mongoSkills }, { status: 200 });
        }
      } catch (err) {
        console.error("MongoDB skills query error:", err);
      }
    }

    return NextResponse.json(
      { success: true, source: "static", skillCategories: portfolioData.skillCategories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, source: "fallback", skillCategories: portfolioData.skillCategories },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.category || !body.skills) {
      return NextResponse.json(
        { error: "Missing required skill category or skills array" },
        { status: 400 }
      );
    }

    if (clientPromise) {
      const mongoClient = await clientPromise;
      const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
      const collection = db.collection("skills");

      const result = await collection.insertOne({
        ...body,
        createdAt: new Date(),
      });

      return NextResponse.json(
        { success: true, message: "Skill category inserted into MongoDB!", insertedId: result.insertedId },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "MongoDB connection unavailable" },
      { status: 503 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to insert skill category" }, { status: 500 });
  }
}
