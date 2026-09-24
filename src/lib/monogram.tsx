import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// PROVISIONAL monogram: plain "JJ" in Prata. Replace with the final interlocked
// JJ once its direction is decided (icon.tsx and apple-icon.tsx both use this).
export async function renderMonogram(px: number) {
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
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1b1a",
          color: "#f2f0ed",
          fontFamily: "Prata",
          fontSize: Math.round(px * 0.56),
          letterSpacing: -2,
          borderRadius: Math.round(px * 0.19),
        }}
      >
        JJ
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Prata", data: prata, style: "normal", weight: 400 }],
    },
  );
}
