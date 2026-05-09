import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dot Note — Chat with your documents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* ── Background grid ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Blue glow top-right ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Muted glow bottom-left ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "64px 80px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "hsl(221.2, 83.2%, 53.3%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "24px",
              fontWeight: "700",
              boxShadow: "0 0 0 6px rgba(59,130,246,0.15)",
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            Dot{" "}
            <span style={{ color: "#94a3b8", fontWeight: "500" }}>Note</span>
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "auto",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "hsl(221.2, 83.2%, 53.3%)",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "hsl(221.2, 83.2%, 53.3%)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Now in public beta
            </span>
          </div>

          <div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: "1.05",
              letterSpacing: "-2px",
              fontFamily: "Georgia, serif",
            }}
          >
            Chat with your{" "}
            <span style={{ color: "hsl(221.2, 83.2%, 53.3%)" }}>documents</span>
            <br />
            in seconds.
          </div>

          <p
            style={{
              fontSize: "24px",
              color: "#64748b",
              lineHeight: "1.5",
              maxWidth: "680px",
              fontFamily: "system-ui, sans-serif",
              fontWeight: "400",
              margin: "0",
            }}
          >
            Upload any PDF and start asking questions instantly — no
            copy-pasting required.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Pills */}
          <div style={{ display: "flex", gap: "12px" }}>
            {["Upload PDF", "Ask anything", "Get answers"].map((label, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  background: i === 0 ? "hsl(221.2, 83.2%, 53.3%)" : "#f1f5f9",
                  color: i === 0 ? "#fff" : "#475569",
                  fontSize: "16px",
                  fontWeight: "600",
                  fontFamily: "system-ui, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {i > 0 && (
                  <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                    {i}.
                  </span>
                )}
                {label}
              </div>
            ))}
          </div>

          {/* URL */}
          <span
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              fontFamily: "system-ui, sans-serif",
              fontWeight: "500",
            }}
          >
            dotnote.app
          </span>
        </div>
      </div>

      {/* ── Right-side decorative PDF card ───────────────────── */}
      <div
        style={{
          position: "absolute",
          right: "72px",
          top: "50%",
          transform: "translateY(-50%) rotate(4deg)",
          width: "240px",
          background: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(59,130,246,0.08)",
        }}
      >
        {/* PDF icon */}
        <div
          style={{
            width: "48px",
            height: "48px",
            background: "rgba(59,130,246,0.1)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          📄
        </div>

        {/* File name */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{
              height: "12px",
              width: "140px",
              background: "#e2e8f0",
              borderRadius: "6px",
            }}
          />
          <div
            style={{
              height: "10px",
              width: "100px",
              background: "#f1f5f9",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Chat bubbles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              background: "hsl(221.2, 83.2%, 53.3%)",
              borderRadius: "10px 10px 2px 10px",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                height: "8px",
                width: "120px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                height: "8px",
                width: "80px",
                background: "rgba(255,255,255,0.4)",
                borderRadius: "4px",
              }}
            />
          </div>
          <div
            style={{
              background: "#e2e8f0",
              borderRadius: "10px 10px 10px 2px",
              padding: "8px 12px",
              alignSelf: "flex-start",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                height: "8px",
                width: "100px",
                background: "#cbd5e1",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
