import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { z } from "zod";
import { PAPER, INK, RED, HEADLINE, SERIF, resolvePalette } from "./palette";
import { BG } from "./backgrounds";

export const thumbnailSchema = z.object({
  title: z.string(),
  author: z.string(),
  hook: z.string(),
  heroCut: z.string(),
  heroImg: z.string().optional(),
  slug: z.string().optional(),
});
export type ThumbnailProps = z.infer<typeof thumbnailSchema>;

export const VoxThumbnail: React.FC<ThumbnailProps> = ({ title, author, hook, heroCut, heroImg, slug }) => {
  const hero = heroCut || heroImg;
  const pal = resolvePalette(slug);
  const paletteVars = {
    "--vox-paper": pal.paper,
    "--vox-ink": pal.ink,
    "--vox-red": pal.red,
    "--vox-gold": pal.gold,
  } as React.CSSProperties;
  return (
    <AbsoluteFill style={{ ...paletteVars, backgroundColor: PAPER, overflow: "hidden" }}>
      <Img src={staticFile(BG)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", right: "6%", top: "50%", width: 760, height: 760, transform: "translateY(-50%)", borderRadius: "50%", border: `26px solid ${RED}`, opacity: 0.22, zIndex: 1 }} />
      <div style={{ position: "absolute", right: "10%", top: "50%", width: 620, height: 620, transform: "translateY(-50%)", borderRadius: "50%", backgroundImage: `radial-gradient(${INK} 3px, transparent 3.6px)`, backgroundSize: "20px 20px", opacity: 0.16, zIndex: 1 }} />
      {hero ? (
        <div style={{ position: "absolute", right: 40, bottom: 0, height: 720, width: 620, zIndex: 3 }}>
          <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", height: 700, width: 560, backgroundColor: RED, WebkitMaskImage: `url(${staticFile(hero)})`, maskImage: `url(${staticFile(hero)})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center bottom", maskPosition: "center bottom", transform: "translate(calc(-50% - 22px), 8px)", opacity: 0.9 }} />
          <Img src={staticFile(hero)} alt="" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: 700, width: "auto", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(30,20,10,0.45))" }} />
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 64, top: 0, bottom: 0, width: 720, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, zIndex: 5 }}>
        <div style={{ alignSelf: "flex-start", background: RED, color: PAPER, fontFamily: HEADLINE, fontWeight: 900, fontSize: 30, letterSpacing: 3, padding: "8px 18px", textTransform: "uppercase", boxShadow: `8px 8px 0 ${INK}` }}>
          {title}
        </div>
        <div style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 118, lineHeight: 0.92, color: INK, textTransform: "uppercase", textShadow: "3px 3px 0 rgba(255,255,255,0.5)" }}>
          {hook.split(" ").map((w, i) => (
            <span key={i} style={{ color: i % 2 === 1 ? RED : INK, marginRight: 14, display: "inline-block" }}>{w}</span>
          ))}
        </div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 34, color: INK, opacity: 0.8 }}>{author}</div>
      </div>
      <AbsoluteFill style={{ zIndex: 8, pointerEvents: "none", boxShadow: "inset 0 0 300px rgba(20,15,10,0.4)" }} />
      <AbsoluteFill style={{ zIndex: 9, pointerEvents: "none", opacity: 0.07, backgroundImage: `radial-gradient(${INK} 0.5px, transparent 0.6px)`, backgroundSize: "3px 3px", mixBlendMode: "multiply" }} />
    </AbsoluteFill>
  );
};
