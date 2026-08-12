import { ImageResponse } from "next/og";
import { profile, site } from "@/data/profile";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucas Mendonça — Full-Stack Developer";

/**
 * Social card generated at request time. `ImageResponse` only supports
 * flexbox and a subset of CSS, so this uses no grid and no custom fonts.
 */
export default async function OpengraphImage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 22% 12%, rgba(214,255,62,0.22), transparent 55%)",
          padding: "72px",
          color: "#f5f5f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9a9aa4",
          }}
        >
          <span>{site.brand}</span>
          <span>Rio de Janeiro · BR</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#d6ff3e",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#d6ff3e",
              }}
            />
            <span>{dict.hero.availability}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.3,
              color: "#9a9aa4",
              maxWidth: 900,
            }}
          >
            {dict.meta.title.split("—")[1]?.trim() ?? "Full-Stack Developer"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 24,
            color: "#6b6b76",
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
            <span
              key={tech}
              style={{
                display: "flex",
                border: "1px solid #ffffff2b",
                borderRadius: 999,
                padding: "8px 22px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
