import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { Everyman } from "./characters/Everyman";
import { pose } from "./movements";
import { variantSchema, charAction, expression as expressionEnum, thumbMotif, type AntidoteThumbnailBrief } from "./schema";

/**
 * AntidoteThumbnail — the Antidote engine's OWN thumbnail identity (1280×720).
 *
 * Deliberately NOT the Vox photoreal-cutout look: this is flat-vector — a palette
 * background, a bold growth MOTIF, the Everyman rig in a confident static pose,
 * and a big kinetic-style hook. Running two visually distinct thumbnail styles
 * across the channel (photoreal Vox vs flat-vector Antidote) is itself the
 * variation that keeps the browse feed from looking templated (YPP originality).
 *
 * Palette comes from book.json (BOOK_PALETTES); only the staging (hook, character
 * variant, pose, motif) is per-book art-direction. Rendered as a 1-frame still.
 */

export const antidoteThumbPropsSchema = z.object({
  title: z.string(),
  author: z.string().default(""),
  hook: z.string(),
  paper: z.string().default("#EAF0E8"),
  ink: z.string().default("#1E2A24"),
  accent: z.string().default("#F0A63C"),
  gold: z.string().default("#3E8E7A"),
  variant: variantSchema,
  action: charAction.default("celebrate"),
  expression: expressionEnum.default("happy"),
  motif: thumbMotif.default("risingBars"),
});
export type AntidoteThumbProps = z.infer<typeof antidoteThumbPropsSchema>;

const HEADLINE = "'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";

// mix a hex toward white/black by amt (0..1)
const mix = (hex: string, to: number, amt: number) => {
  const m = hex.replace("#", "");
  const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => Math.round(c + (to - c) * amt));
  return `rgb(${ch[0]},${ch[1]},${ch[2]})`;
};

const Motif: React.FC<{ kind: AntidoteThumbnailBrief["motif"]; accent: string; gold: string }> = ({ kind, accent, gold }) => {
  const soft = 0.55;
  if (kind === "arrowUp")
    return (
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
        <path d="M200 40 L330 220 L250 220 L250 360 L150 360 L150 220 L70 220 Z" fill={accent} opacity={soft} />
      </svg>
    );
  if (kind === "summit")
    return (
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
        <path d="M40 340 L170 120 L240 240 L300 160 L360 340 Z" fill={accent} opacity={soft} />
        <path d="M170 120 L205 180 L135 180 Z" fill={gold} opacity={0.7} />
      </svg>
    );
  if (kind === "spark")
    return (
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={196} y={40} width={8} height={110} rx={4} fill={accent} opacity={soft}
            transform={`rotate(${i * 30} 200 200)`} />
        ))}
        <circle cx={200} cy={200} r={40} fill={gold} opacity={0.8} />
      </svg>
    );
  if (kind === "ring")
    return (
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
        <circle cx={200} cy={200} r={170} fill="none" stroke={accent} strokeWidth={40} opacity={soft} />
        <circle cx={200} cy={200} r={110} fill="none" stroke={gold} strokeWidth={16} opacity={0.5} />
      </svg>
    );
  // risingBars (default) — five bars climbing = growth toward hidden potential
  const bars = [110, 170, 230, 300, 360];
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
      {bars.map((h, i) => (
        <rect key={i} x={30 + i * 74} y={400 - h} width={54} height={h} rx={10}
          fill={i === bars.length - 1 ? gold : accent} opacity={i === bars.length - 1 ? 0.85 : soft} />
      ))}
    </svg>
  );
};

export const AntidoteThumbnail: React.FC<AntidoteThumbProps> = ({
  title, author, hook, paper, ink, accent, gold, variant, action, expression, motif,
}) => {
  // Still frame: sample the pose at a settled frame so spring-driven actions
  // (celebrate arms-up, point) are fully posed rather than mid-launch.
  const p = pose(action, 45, 30);
  const v = { ...variant, expression }; // brief's expression drives the face
  const words = hook.split(" ");
  // keep the long words from colliding with the subject
  const longest = words.reduce((m, w) => Math.max(m, w.length), 0);
  const hookSize = longest >= 11 || hook.length > 16 ? 88 : longest >= 8 ? 104 : 118;
  return (
    <AbsoluteFill style={{ backgroundColor: paper, overflow: "hidden" }}>
      {/* soft two-tone ground */}
      <AbsoluteFill style={{ background: `linear-gradient(135deg, ${mix(paper, 255, 0.35)} 0%, ${paper} 55%, ${mix(paper, 0, 0.06)} 100%)` }} />
      {/* halftone dots (subtle, ties to the channel look) */}
      <AbsoluteFill style={{ opacity: 0.06, backgroundImage: `radial-gradient(${ink} 1px, transparent 1.6px)`, backgroundSize: "22px 22px" }} />

      {/* Everyman subject, bottom-right (viewBox 400×600 → height = width×1.5; keep
          width ≤ ~450 so the waist-up figure fits the 720 frame without clipping). */}
      <div style={{ position: "absolute", right: 44, bottom: -12, filter: "drop-shadow(0 20px 24px rgba(20,20,20,0.28))" }}>
        <Everyman variant={v} pose={p} width={430} />
      </div>

      {/* growth motif in the FOREGROUND at the subject's base (the character stands
          behind a rising chart) — placed after the figure in DOM so it paints on top
          and is guaranteed visible instead of vanishing behind the torso. */}
      <div style={{ position: "absolute", left: 604, bottom: 18, width: 360, height: 320, opacity: 0.96, filter: "drop-shadow(0 12px 18px rgba(20,20,20,0.22))" }}>
        <Motif kind={motif} accent={accent} gold={gold} />
      </div>

      {/* left text block */}
      <div style={{ position: "absolute", left: 70, top: 0, bottom: 0, width: 690, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, zIndex: 5 }}>
        <div style={{ alignSelf: "flex-start", background: accent, color: paper, fontFamily: HEADLINE, fontWeight: 900, fontSize: 30, letterSpacing: 3, padding: "8px 18px", textTransform: "uppercase", boxShadow: `7px 7px 0 ${ink}` }}>
          {title}
        </div>
        <div style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: hookSize, lineHeight: 0.9, color: ink, textTransform: "uppercase" }}>
          {words.map((w, i) => (
            <span key={i} style={{ color: i % 2 === 1 ? accent : ink, marginRight: 14, display: "inline-block" }}>{w}</span>
          ))}
        </div>
        {author ? (
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 34, color: ink, opacity: 0.8 }}>{author}</div>
        ) : null}
      </div>

      {/* gentle vignette */}
      <AbsoluteFill style={{ pointerEvents: "none", boxShadow: "inset 0 0 260px rgba(20,20,20,0.28)" }} />
    </AbsoluteFill>
  );
};
