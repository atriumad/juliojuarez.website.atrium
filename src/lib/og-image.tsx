import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

// Near-black ground, near-white type: same palette as the site (toned B&W).
const INK = "#1c1b1a";
const PAPER = "#f2f0ed";
const MUTED = "#a3a09b";
const HAIRLINE = "#3c3936";

export async function renderOgImage() {
  const prata = await readFile(
    join(process.cwd(), "src/assets/fonts/Prata-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: 72,
          fontFamily: "Prata",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {site.city}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {new Date().getFullYear()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", width: "100%", height: 1, background: HAIRLINE }}
          />
          <div style={{ display: "flex", fontSize: 168, lineHeight: 1 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 26,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {site.descriptor}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              marginTop: 32,
              background: HAIRLINE,
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {site.mark}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {site.city}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Prata", data: prata, style: "normal", weight: 400 }],
    },
  );
}