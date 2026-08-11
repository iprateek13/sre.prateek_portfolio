import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "DISCONNECTED";
  let dbLatencyMs = 0;
  let mongoActive = false;

  if (clientPromise) {
    try {
      const mongoClient = await clientPromise;
      const db = mongoClient.db(process.env.MONGODB_DB_NAME || "prateek_portfolio");
      
      const dbPingStart = Date.now();
      await db.command({ ping: 1 });
      dbLatencyMs = Date.now() - dbPingStart;
      dbStatus = "CONNECTED";
      mongoActive = true;
    } catch (err) {
      dbStatus = "UNREACHABLE";
    }
  }

  const memoryUsage = process.memoryUsage();

  return NextResponse.json(
    {
      status: dbStatus === "CONNECTED" ? "HEALTHY" : "DEGRADED",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
      k8sProbes: {
        liveness: "PASS",
        readiness: dbStatus === "CONNECTED" ? "READY" : "NOT_READY",
      },
      telemetry: {
        dbStatus,
        dbLatencyMs: dbLatencyMs > 0 ? `${dbLatencyMs}ms` : "N/A",
        processUptimeSeconds: Math.floor(process.uptime()),
        memoryHeapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        totalResponseMs: Date.now() - startTime,
      },
      serviceInfo: {
        name: "sre-portfolio-backend-microservice",
        version: "1.0.0",
        author: "Prateek Gupta (SRE & Cloud Architect)",
      },
    },
    { status: 200 }
  );
}
