import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FRFCX 定制展柜制造";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #22d3ee, #06b6d4, #0891b2)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            FRFCX
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#22d3ee",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            定制展柜制造商
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.6,
            }}
          >
            珠宝 · 化妆品 · 眼镜 · 服装 · 电子 · 定制零售陈列
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 16,
            }}
          >
            {["工厂直供", "美国合规", "全球物流", "定制设计"].map((pill) => (
              <div
                key={pill}
                style={{
                  padding: "8px 24px",
                  borderRadius: 9999,
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  background: "rgba(34, 211, 238, 0.1)",
                  color: "#cffafe",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#64748b",
            letterSpacing: "0.02em",
          }}
        >
          frfcxcfurniturecustommadeshowcase.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
