import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const brand = "#10b981"; // emerald-500
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#e5e7eb",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          <span style={{ color: brand }}>AC</span>Dev
        </div>
        <div style={{ fontSize: 44, fontWeight: 700, maxWidth: 960 }}>
          Build AI solutions once reserved for enterprises.
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              height: 10,
              width: 10,
              borderRadius: 999,
              background: brand,
            }}
          />
          <div style={{ fontSize: 24, color: "#a1a1aa" }}>
            Perth, Western Australia — since 2025
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

