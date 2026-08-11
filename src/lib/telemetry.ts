export async function trackResumeDownload(): Promise<void> {
  try {
    await fetch("/api/resume/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    // Non-blocking telemetry tracking
  }
}

export async function trackPageView(): Promise<void> {
  try {
    await fetch("/api/telemetry/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    // Non-blocking telemetry tracking
  }
}
