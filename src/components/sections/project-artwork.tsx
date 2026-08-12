import { cn } from "@/lib/utils";

/**
 * Generated cover art. Screenshots would be better, but they go stale and
 * cost bandwidth; a per-project hue keeps the grid recognisable and free.
 * Drop in `<Image>` here later if you ever capture real screenshots.
 */
export function ProjectArtwork({
  hue,
  label,
  className,
}: {
  hue: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden bg-bg-sunken", className)}
      style={{
        backgroundImage: `
          radial-gradient(120% 120% at 15% 10%, oklch(72% 0.18 ${hue} / 0.55), transparent 55%),
          radial-gradient(90% 90% at 85% 90%, oklch(62% 0.16 ${(hue + 48) % 360} / 0.45), transparent 60%)
        `,
      }}
    >
      <div className="absolute inset-0 bg-blueprint opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="max-w-[85%] truncate font-mono text-sm tracking-[0.28em] text-fg/70 uppercase">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-bg-elevated/70 via-transparent to-transparent" />
    </div>
  );
}
