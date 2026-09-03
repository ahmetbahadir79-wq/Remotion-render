import { z } from "zod";

export const voxBookSchema = z.object({ config: z.any() });

export type VImage = { path: string; prompt: string; style: "cutout" | "card"; cut?: string };
export type Beat = {
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
export type Caption = { text: string; startFrame: number; endFrame: number; words: { w: string; s: number; e: number }[] };
export type Chapter = { index: number; fromFrame: number; label: string; teaser?: string };
export type VoxConfig = { meta: { audio: string; slug?: string; progress?: boolean }; captions: Caption[]; beats: Beat[]; chapters?: Chapter[] };
