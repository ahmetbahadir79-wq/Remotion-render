import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Beat, VImage } from "./schema";
import { INK, RED, PAPER, HEADLINE, SERIF, hash } from "./palette";
import { AccentBurst } from "./backgrounds";
import { Scene, KineticWords, MarkerUnderline, KickerChip, Cutout, HalftoneCard, BackdropImg } from "./shared";

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
  const variant = Math.floor(hash(beat.id + "s") * 3);

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
        <div style={{ fontFamily: SERIF, fontSize: 220, color: RED, lineHeight: 0.4, height: 92 }}>&quot;</div>
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
  const variant = img ? Math.floor(hash(beat.id + "v") * 3) : -1;

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

const CompareScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const [la, lb] = beat.props.compareLabels || beat.props.emphasis;
  const a = beat.images[0];
  const b = beat.images[1];
  const vs = interpolate(frame, [36, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const side = (img: VImage | undefined, sideLabel: string | undefined, sf = 4, tint = RED) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {img ? (img.style === "cutout" && img.cut ? <Cutout asset={img.cut} startFrame={sf} height={470} tint={tint} strokeX={tint === RED ? -22 : 22} /> : <HalftoneCard asset={img.path} startFrame={sf} width={470} height={380} tint={tint} />) : null}
      <KineticWords text={sideLabel || ""} startFrame={sf + 14} perWord={2} fontSize={40} weight={900} letterSpacing={1} />
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

export const SCENES: Record<string, React.FC<{ beat: Beat }>> = {
  title: TitleScene, statement: StatementScene, list: ListScene, quote: QuoteScene,
  stat: StatScene, imagefocus: ImageFocusScene, compare: CompareScene, punchline: PunchlineScene,
};

export { StatementScene };
