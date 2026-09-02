import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { loadFont as loadDisplay } from "@remotion/google-fonts/PlayfairDisplay";
import { BOOK_PALETTES, BOOK_BG_TINT } from "../../books.generated";

const { fontFamily: SERIF } = loadDisplay();

// ── Vox visual system ───────────────────────────────────────────────────
// Colors are CSS variables injected once at the root (see VoxBook), so a book
// can carry a bespoke palette without touching any downstream component.
const PAPER = "var(--vox-paper)";
const INK = "var(--vox-ink)";
const RED = "var(--vox-red)";
const GOLD = "var(--vox-gold)";
const HEADLINE = "'Arial Black', Arial, sans-serif";

// Default locked palette — fallback only. Each book carries its OWN palette in
// books/<slug>/book.json (authored per book at art-direction time), surfaced via
// BOOK_PALETTES in the generated registry. This is what gives every video +
// thumbnail its own color identity instead of the shared red-on-cream look.
const DEFAULT_PALETTE = { paper: "#DAD9D5", ink: "#1A1A1A", red: "#E04329", gold: "#E8A417" };
const resolvePalette = (slug?: string) => BOOK_PALETTES[slug ?? ""] ?? DEFAULT_PALETTE;
const CAPTION_BAND = 210;

export const voxBookSchema = z.object({ config: z.any() });

type VImage = { path: string; prompt: string; style: "cutout" | "card"; cut?: string };
type Beat = {
  id: string;
  type: string;
  fromFrame: number;
  durationFrames: number;
  images: VImage[];
  props: {
    text: string;
    kicker?: string;
    emphasis: string[];
    items?: string[];
    keywords: string[];
    title?: string;
    author?: string;
    compareLabels?: string[];
  };
};
type Caption = { text: string; startFrame: number; endFrame: number; words: { w: string; s: number; e: number }[] };
type Chapter = { index: number; fromFrame: number; label: string; teaser?: string };
type VoxConfig = { meta: { audio: string; slug?: string; progress?: boolean }; captions: Caption[]; beats: Beat[]; chapters?: Chapter[] };

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
}

// ── global texture layers ─────────────────────────────────────────────────
const BG = "broll-ocean-tanker/mo-photoshop-background.png";

const PaperBackground: React.FC<{ tint?: boolean }> = ({ tint = false }) => {
  const frame = useCurrentFrame();
  const scale = 1.06 + Math.sin(frame / 110) * 0.01;
  const tx = Math.sin(frame / 140) * 10;
  return (
    <>
      <Img src={staticFile(BG)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translateX(${tx}px)`, zIndex: 0 }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(63,54,42,0.16)), radial-gradient(circle at 50% 52%, rgba(255,255,255,0.20), transparent 46%)", mixBlendMode: "soft-light", zIndex: 1 }} />
      {/* per-book palette wash — gives each new book its own background atmosphere
          without new assets. Subtle (multiply, low opacity) so text stays legible. */}
      {tint ? (
        <>
          <AbsoluteFill style={{ zIndex: 1, mixBlendMode: "multiply", opacity: 0.22, background: `radial-gradient(circle at 26% 22%, ${GOLD}, transparent 55%), radial-gradient(circle at 82% 82%, ${RED}, transparent 60%)` }} />
          <AbsoluteFill style={{ zIndex: 1, mixBlendMode: "soft-light", opacity: 0.18, background: `linear-gradient(150deg, ${INK}, transparent 70%)` }} />
        </>
      ) : null}
    </>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame % 6) * 13;
  return (
    <AbsoluteFill
      style={{
        zIndex: 60,
        pointerEvents: "none",
        opacity: 0.06,
        backgroundImage: `radial-gradient(${INK} 0.5px, transparent 0.6px)`,
        backgroundSize: "3px 3px",
        backgroundPosition: `${shift}px ${shift * 1.3}px`,
        mixBlendMode: "multiply",
      }}
    />
  );
};

const Vignette: React.FC<{ intensity?: number }> = ({ intensity = 0.28 }) => (
  <AbsoluteFill style={{ zIndex: 58, pointerEvents: "none", boxShadow: `inset 0 0 460px rgba(20,15,10,${intensity})` }} />
);

// large accent shape behind subjects — a seeded ring/half-tone disc
const AccentBurst: React.FC<{ seed: number; x?: number; y?: number; startFrame?: number }> = ({ seed, x = 50, y = 46, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - startFrame, fps, config: { damping: 20, mass: 1, stiffness: 90 }, durationInFrames: 40 });
  const size = 620 + Math.floor(seed * 260);
  const color = seed > 0.5 ? GOLD : RED;
  const rot = frame * 0.15 * (seed > 0.5 ? 1 : -1);
  return (
    <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: size, height: size, transform: `translate(-50%,-50%) scale(${s})`, opacity: 0.9, zIndex: 4 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `18px solid ${color}`, opacity: 0.18 }} />
      <div style={{ position: "absolute", inset: "16%", borderRadius: "50%", backgroundImage: `radial-gradient(${color} 2px, transparent 2.6px)`, backgroundSize: "16px 16px", opacity: 0.16, transform: `rotate(${rot}deg)` }} />
    </div>
  );
};

// ── shared elements ─────────────────────────────────────────────────────────
const KineticWords: React.FC<{
  text: string; startFrame: number; perWord?: number; fontSize: number; color?: string; fontFamily?: string;
  weight?: number | string; letterSpacing?: number; align?: "left" | "center"; maxWidth?: number; italic?: boolean; uppercase?: boolean;
}> = ({ text, startFrame, perWord = 4, fontSize, color = INK, fontFamily = HEADLINE, weight = 900, letterSpacing = 0, align = "center", maxWidth = 1500, italic = false, uppercase = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: `${fontSize * 0.1}px ${fontSize * 0.28}px`, maxWidth, justifyContent: align === "center" ? "center" : "flex-start", lineHeight: 0.98 }}>
      {text.split(" ").map((w, i) => {
        const sf = startFrame + i * perWord;
        const s = spring({ frame: frame - sf, fps, config: { damping: 15, mass: 0.55, stiffness: 130 }, durationInFrames: 20 });
        const y = interpolate(s, [0, 1], [54, 0]);
        const rot = interpolate(s, [0, 1], [4, 0]);
        const op = interpolate(frame, [sf, sf + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px) rotate(${rot}deg)`, opacity: op, fontFamily, fontWeight: weight, fontStyle: italic ? "italic" : "normal", fontSize, color, letterSpacing, textTransform: uppercase ? "uppercase" : "none" }}>{w}</span>
        );
      })}
    </div>
  );
};

const MarkerUnderline: React.FC<{ startFrame: number; width: number; height?: number; color?: string; rotate?: number }> = ({ startFrame, width, height = 14, color = RED, rotate = -1.2 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startFrame, startFrame + 13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return <div style={{ width: Math.max(0, width * p), height, backgroundColor: color, borderRadius: height, transform: `rotate(${rotate}deg)`, transformOrigin: "left center", opacity: 0.92 }} />;
};

// red-chip kicker tag
const KickerChip: React.FC<{ text: string; startFrame: number; align?: "left" | "center" }> = ({ text, startFrame, align = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!text) return null;
  const s = spring({ frame: frame - startFrame, fps, config: { damping: 16, mass: 0.6, stiffness: 130 }, durationInFrames: 16 });
  const op = interpolate(frame, [startFrame, startFrame + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ alignSelf: align === "center" ? "center" : "flex-start", transform: `translateX(${interpolate(s, [0, 1], [-30, 0])}px)`, opacity: op, background: RED, color: PAPER, fontFamily: HEADLINE, fontWeight: 900, fontSize: 26, letterSpacing: 3, padding: "8px 16px", textTransform: "uppercase", boxShadow: `6px 6px 0 ${INK}` }}>{text}</div>
  );
};

// transparent subject cut-out with offset red marker stroke
const Cutout: React.FC<{ asset: string; startFrame: number; height: number; strokeX?: number; strokeY?: number; tint?: string }> = ({ asset, startFrame, height, strokeX = -24, strokeY = 12, tint = RED }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - startFrame, fps, config: { damping: 18, mass: 0.8, stiffness: 110 }, durationInFrames: 28 });
  const rise = interpolate(s, [0, 1], [120, 0]);
  const op = interpolate(frame, [startFrame, startFrame + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const url = staticFile(asset);
  const bob = Math.sin(frame / 26) * 5; // continuous float
  const box = { position: "absolute" as const, bottom: 0, left: "50%", height, width: "auto", objectFit: "contain" as const };
  return (
    <div style={{ position: "relative", height, width: height, transform: `translateY(${rise + bob}px)`, opacity: op, zIndex: 12 }}>
      <div aria-hidden style={{ ...box, aspectRatio: "1", width: height, height, backgroundColor: tint, WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center bottom", maskPosition: "center bottom", transform: `translate(calc(-50% + ${strokeX}px), ${strokeY}px)`, opacity: 0.92 }} />
      <Img src={url} alt="" style={{ ...box, width: height, transform: "translateX(-50%)", filter: "drop-shadow(0 26px 24px rgba(40,30,20,0.32))" }} />
    </div>
  );
};

// framed halftone environment card with tape + offset block
const HalftoneCard: React.FC<{ asset?: string; keyword?: string; startFrame: number; width: number; height: number; tint?: string }> = ({ asset, keyword, startFrame, width, height, tint = RED }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - startFrame, fps, config: { damping: 18, mass: 0.8, stiffness: 110 }, durationInFrames: 26 });
  const rise = interpolate(s, [0, 1], [90, 0]);
  const rot = interpolate(s, [0, 1], [-3, -1.2]);
  const op = interpolate(frame, [startFrame, startFrame + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", width, height, transform: `translateY(${rise}px) rotate(${rot}deg)`, opacity: op, zIndex: 12 }}>
      <div style={{ position: "absolute", inset: 0, transform: "translate(18px,18px)", backgroundColor: tint }} />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", border: `5px solid ${INK}`, background: "#c9c8c3", boxShadow: "0 18px 30px rgba(40,30,20,0.28)" }}>
        {asset ? (
          <>
            <Img src={staticFile(asset)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.35) brightness(1.03)", transform: `scale(${1.06 + frame * 0.0004}) translate(${Math.sin(frame / 120) * 8}px, ${Math.cos(frame / 150) * 6}px)` }} />
            <div style={{ position: "absolute", inset: 0, background: tint, mixBlendMode: "multiply", opacity: 0.2 }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${INK} 1px, transparent 1.4px)`, backgroundSize: "5px 5px", mixBlendMode: "overlay", opacity: 0.35 }} />
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <span style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 40, color: INK, textAlign: "center", textTransform: "uppercase", opacity: 0.6 }}>{keyword}</span>
          </div>
        )}
      </div>
      {/* tape corners */}
      <div style={{ position: "absolute", top: -14, left: "50%", width: 120, height: 34, transform: "translateX(-50%) rotate(-4deg)", background: "rgba(232,164,23,0.55)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
    </div>
  );
};

// ── scene wrapper: entrance/exit + reserved caption band + optional bleed ──
const Scene: React.FC<{ beat: Beat; children: React.ReactNode; accent?: boolean; bleed?: React.ReactNode }> = ({ beat, children, accent = true, bleed }) => {
  const frame = useCurrentFrame();
  const seed = hash(beat.id);
  const inOp = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outOp = interpolate(frame, [beat.durationFrames - 8, beat.durationFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const inY = interpolate(frame, [0, 10], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  // gentle continuous drift so scenes never sit perfectly still
  const driftY = Math.sin(frame / 46 + seed * 6) * 4;
  return (
    <AbsoluteFill style={{ opacity: Math.min(inOp, outOp), transform: `translateY(${inY + driftY}px)` }}>
      {bleed}
      {accent ? <AccentBurst seed={seed} x={35 + seed * 30} y={44} /> : null}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: CAPTION_BAND, paddingInline: 130, zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

// drifting paper specks — subtle global life
const FloatingSpecks: React.FC = () => {
  const frame = useCurrentFrame();
  const specks = Array.from({ length: 26 }, (_, i) => {
    const s = (i * 97.13) % 100;
    const x = (s * 1.7 + Math.sin(frame / (40 + (i % 7) * 8) + i) * 3) % 100;
    const y = ((i * 61.7) % 100 + frame / (5 + (i % 5))) % 100;
    const size = 2 + (i % 4);
    return <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: size, height: size, borderRadius: "50%", background: i % 3 === 0 ? RED : INK, opacity: 0.08 }} />;
  });
  return <AbsoluteFill style={{ zIndex: 3, pointerEvents: "none" }}>{specks}</AbsoluteFill>;
};

// ── archetypes ─────────────────────────────────────────────────────────────
const TitleScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const { title, author, kicker } = beat.props;
  const img = beat.images[0];
  return (
    <Scene beat={beat} accent={false}>
      <AccentBurst seed={0.2} x={70} y={48} startFrame={2} />
      <div style={{ display: "flex", alignItems: "flex-end", gap: 60, zIndex: 12 }}>
        {img ? (img.style === "cutout" && img.cut ? <Cutout asset={img.cut} startFrame={4} height={620} /> : <HalftoneCard asset={img.path} startFrame={4} width={460} height={560} />) : null}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860, paddingBottom: 30 }}>
          <KickerChip text={kicker || "BOOK BREAKDOWN"} startFrame={12} />
          <KineticWords text={title || ""} startFrame={26} perWord={5} fontSize={112} align="left" maxWidth={860} />
          {author ? <div style={{ marginTop: 6 }}><KineticWords text={"by " + author} startFrame={50} perWord={3} fontSize={40} fontFamily={SERIF} weight={600} align="left" uppercase={false} italic /></div> : null}
        </div>
      </div>
    </Scene>
  );
};

const StatementScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const words = (beat.props.emphasis.length ? beat.props.emphasis : beat.props.keywords.map((k) => k.toUpperCase())).slice(0, 3);
  const size = words.length >= 3 ? 116 : 148;
  const seed = hash(beat.id);
  // Statement is ~half of all beats — a single layout is the biggest source of
  // visual monotony, so pick one of three compositions by DNA (stable per beat).
  const variant = Math.floor(hash(beat.id + "s") * 3);

  // — v1: left editorial — big flush-left stack, oversized ghost index, accent right —
  if (variant === 1) {
    const idx = String((Math.floor(seed * 89) % 9) + 1).padStart(2, "0");
    return (
      <Scene beat={beat} accent={false}>
        <AccentBurst seed={seed} x={74} y={42} />
        <div style={{ position: "relative", width: "100%", maxWidth: 1360, display: "flex", alignItems: "center", gap: 44, zIndex: 12 }}>
          <span aria-hidden style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 340, lineHeight: 0.8, color: INK, opacity: 0.06, marginTop: -20 }}>{idx}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <KickerChip text={beat.props.kicker || ""} startFrame={2} />
            {words.map((w, i) => (
              <KineticWords key={i} text={w} startFrame={10 + i * 9} perWord={3} fontSize={size * 0.92} align="left" maxWidth={980} color={i === 1 ? RED : INK} />
            ))}
            <MarkerUnderline startFrame={30} width={340} height={16} />
          </div>
        </div>
      </Scene>
    );
  }

  // — v2: banner — centered, middle word reversed out on a red slab —
  if (variant === 2) {
    const hot = Math.min(1, words.length - 1);
    return (
      <Scene beat={beat}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <KickerChip text={beat.props.kicker || ""} startFrame={2} align="center" />
          {words.map((w, i) =>
            i === hot ? (
              <div key={i} style={{ background: RED, padding: "4px 22px", boxShadow: `10px 10px 0 ${INK}`, transform: "rotate(-1.5deg)" }}>
                <KineticWords text={w} startFrame={10 + i * 9} perWord={3} fontSize={size * 0.96} color={PAPER} />
              </div>
            ) : (
              <KineticWords key={i} text={w} startFrame={10 + i * 9} perWord={3} fontSize={size} color={INK} />
            ),
          )}
        </div>
      </Scene>
    );
  }

  // — v0: centered stack (original) —
  return (
    <Scene beat={beat}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <KickerChip text={beat.props.kicker || ""} startFrame={2} align="center" />
        {words.map((w, i) => (
          <div key={i} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <KineticWords text={w} startFrame={10 + i * 9} perWord={3} fontSize={size} color={i === 1 ? RED : INK} />
            {i === Math.min(1, words.length - 1) ? <MarkerUnderline startFrame={10 + i * 9 + 16} width={w.length * size * 0.5} height={18} /> : null}
          </div>
        ))}
      </div>
    </Scene>
  );
};

const ListItem: React.FC<{ label: string; startFrame: number; index: number }> = ({ label, startFrame, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - startFrame, fps, config: { damping: 16, mass: 0.6, stiffness: 120 }, durationInFrames: 18 });
  const x = interpolate(s, [0, 1], [-80, 0]);
  const op = interpolate(frame, [startFrame, startFrame + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26, transform: `translateX(${x}px)`, opacity: op }}>
      <span style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 50, color: PAPER, background: RED, padding: "2px 14px", boxShadow: `5px 5px 0 ${INK}` }}>{`0${index + 1}`}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 66, color: INK, textTransform: "uppercase" }}>{label}</span>
        <MarkerUnderline startFrame={startFrame + 6} width={Math.min(760, label.length * 40)} height={9} />
      </div>
    </div>
  );
};
const ListScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const items = (beat.props.items?.length ? beat.props.items : beat.props.keywords.map((k) => k.toUpperCase())).slice(0, 4);
  return (
    <Scene beat={beat}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
        <KickerChip text={beat.props.kicker || "A MASTERCLASS IN"} startFrame={2} />
        {items.map((label, i) => <ListItem key={i} label={label} startFrame={22 + i * 15} index={i} />)}
      </div>
    </Scene>
  );
};

const QuoteScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const phrase = beat.props.emphasis.join(" ") || beat.props.keywords.slice(0, 2).join(" ").toUpperCase();
  return (
    <Scene beat={beat}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, maxWidth: 1300 }}>
        <div style={{ fontFamily: SERIF, fontSize: 220, color: RED, lineHeight: 0.4, height: 92 }}>“</div>
        <KineticWords text={phrase} startFrame={8} perWord={5} fontSize={92} fontFamily={SERIF} weight={700} italic uppercase={false} color={INK} />
        <MarkerUnderline startFrame={30} width={360} height={12} />
      </div>
    </Scene>
  );
};

const StatScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const m = beat.props.text.match(/\$?\d[\d,\.]*\s?(%|percent|million|billion|trillion|k)?/i);
  const num = m ? m[0].trim() : beat.props.emphasis[0] || "";
  const label = beat.props.emphasis.filter((e) => !/\d/.test(e)).slice(0, 2).join(" ") || beat.props.keywords[0]?.toUpperCase() || "";
  return (
    <Scene beat={beat}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <KineticWords text={num} startFrame={4} perWord={2} fontSize={230} color={RED} uppercase={false} />
        <MarkerUnderline startFrame={20} width={520} height={20} />
        <KineticWords text={label} startFrame={26} perWord={3} fontSize={52} color={INK} />
      </div>
    </Scene>
  );
};

const ImageFocusScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const label = beat.props.emphasis.slice(0, 3).join(" ") || beat.props.keywords[0]?.toUpperCase() || "";
  const img = beat.images[0];
  const seed = hash(beat.id);
  const cut = img && img.style === "cutout" && img.cut ? img.cut : null;
  // 3 layouts by DNA so image scenes never feel copy-pasted
  const variant = img ? Math.floor(hash(beat.id + "v") * 3) : -1;

  // — backdrop: full-bleed dimmed photo + text over it —
  if (variant === 1) {
    return (
      <Scene
        beat={beat}
        accent={false}
        bleed={
          <AbsoluteFill style={{ zIndex: 2 }}>
            <BackdropImg asset={img!.path} />
            <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(20,15,10,0.82) 0%, rgba(20,15,10,0.5) 45%, rgba(20,15,10,0.15) 100%)" }} />
          </AbsoluteFill>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", width: "100%", maxWidth: 1400 }}>
          <KickerChip text={beat.props.kicker || ""} startFrame={10} />
          <KineticWords text={label} startFrame={16} perWord={4} fontSize={110} align="left" maxWidth={1100} color={PAPER} />
          <MarkerUnderline startFrame={34} width={360} height={16} />
        </div>
      </Scene>
    );
  }

  // — hero: big centered cut-out / card with emphasis above —
  if (variant === 2) {
    return (
      <Scene beat={beat} accent>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 12 }}>
          <KineticWords text={label} startFrame={16} perWord={3} fontSize={92} color={INK} />
          {cut ? <Cutout asset={cut} startFrame={4} height={560} /> : <HalftoneCard asset={img!.path} keyword={beat.props.keywords[0]?.toUpperCase()} startFrame={4} width={780} height={460} />}
        </div>
      </Scene>
    );
  }

  // — beside (default): visual + text column, side alternated by DNA —
  const flip = seed > 0.5;
  const visual = img
    ? cut
      ? <Cutout asset={cut} startFrame={4} height={640} strokeX={flip ? 24 : -24} />
      : <HalftoneCard asset={img.path} keyword={beat.props.keywords[0]?.toUpperCase()} startFrame={4} width={720} height={540} />
    : null;
  const text = (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560, paddingBottom: 20 }}>
      <KickerChip text={beat.props.kicker || ""} startFrame={12} />
      <KineticWords text={label} startFrame={20} perWord={4} fontSize={86} align="left" maxWidth={560} />
      <MarkerUnderline startFrame={36} width={320} height={16} />
    </div>
  );
  return (
    <Scene beat={beat} accent={false}>
      <AccentBurst seed={seed} x={flip ? 30 : 68} y={46} />
      <div style={{ display: "flex", alignItems: "flex-end", gap: 70, zIndex: 12 }}>
        {flip ? (<>{text}{visual}</>) : (<>{visual}{text}</>)}
      </div>
    </Scene>
  );
};

// full-bleed backdrop image with slow ken-burns
const BackdropImg: React.FC<{ asset: string }> = ({ asset }) => {
  const frame = useCurrentFrame();
  const scale = 1.08 + frame * 0.0004;
  const tx = Math.sin(frame / 130) * 14;
  return <Img src={staticFile(asset)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.4) contrast(1.15) brightness(0.9)", transform: `scale(${scale}) translateX(${tx}px)` }} />;
};

const CompareScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const [la, lb] = beat.props.compareLabels || beat.props.emphasis;
  const a = beat.images[0];
  const b = beat.images[1];
  const vs = interpolate(frame, [36, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const side = (img?: VImage, label?: string, sf = 4, tint = RED) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {img ? (img.style === "cutout" && img.cut ? <Cutout asset={img.cut} startFrame={sf} height={470} tint={tint} strokeX={tint === RED ? -22 : 22} /> : <HalftoneCard asset={img.path} startFrame={sf} width={470} height={380} tint={tint} />) : null}
      <KineticWords text={label || ""} startFrame={sf + 14} perWord={2} fontSize={40} weight={900} letterSpacing={1} />
    </div>
  );
  return (
    <Scene beat={beat} accent={false}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 44, zIndex: 12 }}>
        {side(a, la, 4, RED)}
        <div style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 76, color: RED, opacity: vs, transform: `scale(${0.6 + vs * 0.4})`, paddingBottom: 80 }}>VS</div>
        {side(b, lb, 60, INK)}
      </div>
    </Scene>
  );
};

const PunchlineScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const words = (beat.props.emphasis.length ? beat.props.emphasis : beat.props.keywords.map((k) => k.toUpperCase())).slice(0, 3);
  const vig = interpolate(frame, [30, 80], [0, 0.45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Scene beat={beat} accent={false}>
      <AccentBurst seed={0.7} x={50} y={46} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 12 }}>
        {words.map((w, i) => <KineticWords key={i} text={w} startFrame={8 + i * 12} perWord={3} fontSize={150} color={i === words.length - 1 ? RED : INK} />)}
      </div>
      <AbsoluteFill style={{ pointerEvents: "none", boxShadow: `inset 0 0 480px rgba(20,15,10,${vig})`, zIndex: 40 }} />
    </Scene>
  );
};

const SCENES: Record<string, React.FC<{ beat: Beat }>> = {
  title: TitleScene, statement: StatementScene, list: ListScene, quote: QuoteScene,
  stat: StatScene, imagefocus: ImageFocusScene, compare: CompareScene, punchline: PunchlineScene,
};

// ── chapter card (non-blocking overlay over continuous audio) ───────────────
// Slides in at each chapter boundary for ~2.6 s over the running scene — the
// narration is never paused (no audio gaps: inserting silence into gap-less
// narration reads as broken at the cut). Chapter 0 (cold open) is never carded.
// The teaser is an open loop (a curiosity question) that plants the next hook.
const CHAPTER_HOLD = 2.6; // seconds on screen
const ChapterOverlay: React.FC<{ chapters?: Chapter[] }> = ({ chapters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!chapters || !chapters.length) return null;
  const hold = Math.round(CHAPTER_HOLD * fps);
  const active = chapters.find((c) => c.index > 0 && frame >= c.fromFrame && frame < c.fromFrame + hold);
  if (!active) return null;
  const local = frame - active.fromFrame;
  const inX = interpolate(local, [0, 12], [-620, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const op = Math.min(
    interpolate(local, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(local, [hold - 12, hold], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const num = String(active.index).padStart(2, "0");
  // Sits over a continuous scene (no audio gap), so the whole card rides on one
  // dark scrim panel with light text — always legible whatever is behind it, and
  // it never fights the scene's own big words for contrast.
  return (
    <AbsoluteFill style={{ zIndex: 56, pointerEvents: "none" }}>
      {/* faint global scrim so the scene recedes under the card */}
      <AbsoluteFill style={{ background: "rgba(15,12,9,0.28)", opacity: op }} />
      <div style={{ position: "absolute", left: 0, top: 150, transform: `translateX(${inX}px)`, opacity: op, maxWidth: 1040 }}>
        <div style={{ background: "rgba(17,13,9,0.82)", borderLeft: `10px solid ${RED}`, padding: "26px 40px 30px 34px", borderRadius: "0 14px 14px 0", boxShadow: "0 18px 40px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 44, color: PAPER, background: RED, padding: "2px 18px" }}>{num}</span>
            <span style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 32, letterSpacing: 7, color: PAPER, opacity: 0.75 }}>CHAPTER</span>
          </div>
          <div style={{ fontFamily: HEADLINE, fontWeight: 900, fontSize: 62, lineHeight: 0.98, color: PAPER, textTransform: "uppercase" }}>{active.label}</div>
          {active.teaser ? <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 38, color: PAPER, opacity: 0.82 }}>{active.teaser}</div> : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// thin reading-progress rail with a tick per chapter (opt-out via meta.progress:false)
const ProgressRail: React.FC<{ chapters?: Chapter[]; total: number }> = ({ chapters, total }) => {
  const frame = useCurrentFrame();
  if (total <= 0) return null;
  const pct = Math.max(0, Math.min(1, frame / total));
  return (
    <AbsoluteFill style={{ zIndex: 57, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, background: "color-mix(in srgb, var(--vox-ink) 16%, transparent)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct * 100}%`, background: RED }} />
        {(chapters || []).map((c) => (
          <div key={c.index} style={{ position: "absolute", top: -2, left: `${(c.fromFrame / total) * 100}%`, width: 2, height: 10, background: INK, opacity: 0.4 }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── karaoke subtitle layer ─────────────────────────────────────────────────
const CaptionLayer: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const frame = useCurrentFrame();
  const active = captions.find((c) => frame >= c.startFrame && frame < c.endFrame);
  if (!active) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60, zIndex: 55, pointerEvents: "none" }}>
      <div style={{ maxWidth: 1500, textAlign: "center", background: "rgba(26,26,26,0.88)", borderRadius: 12, padding: "16px 30px", display: "flex", flexWrap: "wrap", gap: "4px 14px", justifyContent: "center", boxShadow: `0 0 0 3px ${RED}` }}>
        {active.words.map((w, i) => {
          const spoken = frame >= w.s;
          const current = frame >= w.s && frame < w.e;
          return <span key={i} style={{ fontFamily: HEADLINE, fontWeight: 800, fontSize: 40, letterSpacing: 0.5, color: current ? RED : spoken ? "#fff" : "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{w.w}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── Thumbnail (1280×720, static, CTR-optimized) ─────────────────────────────
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
      {/* red accent burst behind subject */}
      <div style={{ position: "absolute", right: "6%", top: "50%", width: 760, height: 760, transform: "translateY(-50%)", borderRadius: "50%", border: `26px solid ${RED}`, opacity: 0.22, zIndex: 1 }} />
      <div style={{ position: "absolute", right: "10%", top: "50%", width: 620, height: 620, transform: "translateY(-50%)", borderRadius: "50%", backgroundImage: `radial-gradient(${INK} 3px, transparent 3.6px)`, backgroundSize: "20px 20px", opacity: 0.16, zIndex: 1 }} />
      {/* hero subject with red marker stroke */}
      {hero ? (
        <div style={{ position: "absolute", right: 40, bottom: 0, height: 720, width: 620, zIndex: 3 }}>
          <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", height: 700, width: 560, backgroundColor: RED, WebkitMaskImage: `url(${staticFile(hero)})`, maskImage: `url(${staticFile(hero)})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center bottom", maskPosition: "center bottom", transform: "translate(calc(-50% - 22px), 8px)", opacity: 0.9 }} />
          <Img src={staticFile(hero)} alt="" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: 700, width: "auto", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(30,20,10,0.45))" }} />
        </div>
      ) : null}
      {/* left text block */}
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

// ── VoxBook composition ─────────────────────────────────────────────────────
export const VoxBook: React.FC<{ config: VoxConfig }> = ({ config }) => {
  const pal = resolvePalette(config.meta.slug);
  const paletteVars = {
    "--vox-paper": pal.paper,
    "--vox-ink": pal.ink,
    "--vox-red": pal.red,
    "--vox-gold": pal.gold,
  } as React.CSSProperties;
  return (
  <AbsoluteFill style={{ ...paletteVars, backgroundColor: PAPER }}>
    <Audio src={staticFile(config.meta.audio)} />
    <PaperBackground tint={BOOK_BG_TINT[config.meta.slug ?? ""] ?? false} />
    <FloatingSpecks />
    {config.beats.map((beat) => {
      const S = SCENES[beat.type] || StatementScene;
      return (
        <Sequence key={beat.id} from={beat.fromFrame} durationInFrames={beat.durationFrames} name={`${beat.id} · ${beat.type}`}>
          <S beat={beat} />
        </Sequence>
      );
    })}
    <CaptionLayer captions={config.captions} />
    <ChapterOverlay chapters={config.chapters} />
    {config.meta.progress === false ? null : (
      <ProgressRail chapters={config.chapters} total={config.beats.reduce((m, b) => Math.max(m, b.fromFrame + b.durationFrames), 0)} />
    )}
    <Vignette />
    <Grain />
  </AbsoluteFill>
  );
};
