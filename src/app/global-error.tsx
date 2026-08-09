"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#FAF9E1", color: "#3D081B", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0, padding: "20px" }}>
        <div style={{ maxWidth: "400px", margin: "auto", padding: "30px", backgroundColor: "#FFFFFF", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h2 style={{ color: "#910F3F", marginTop: 0 }}>Application Error</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>{error.message || "A global error occurred."}</p>
          <button
            onClick={() => reset()}
            style={{ padding: "10px 20px", backgroundColor: "#910F3F", color: "#FFF", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
