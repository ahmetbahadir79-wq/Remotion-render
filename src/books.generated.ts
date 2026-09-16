import ant_the_republic from '../books/the-republic/config.antidote.json';
import ant_meta_the_republic from '../books/the-republic/youtube-meta.json';
import ant_lord_of_the_flies from '../books/lord-of-the-flies/config.antidote.json';
import ant_meta_lord_of_the_flies from '../books/lord-of-the-flies/youtube-meta.json';
import ant_the_hunger_games from '../books/the-hunger-games/config.antidote.json';
import ant_meta_the_hunger_games from '../books/the-hunger-games/youtube-meta.json';

export type Palette = { paper: string; ink: string; red: string; gold: string; captionHighlight?: string };

export type BookEntry = {
  slug: string;
  engine: 'vox' | 'antidote';
  config: any;
  meta: any | null;
};

export type AntidoteBookEntry = {
  slug: string;
  engine: 'vox' | 'antidote';
  config: any;
  meta?: any | null;
};

export const BOOK_PALETTES: Record<string, Palette> = {
  'the-republic': { paper: '#F6F1E8', ink: '#181514', red: '#B83A24', gold: '#C98A2C' },
  'lord-of-the-flies': { paper: '#F7F4EB', ink: '#1A1816', red: '#C53030', gold: '#D97706' },
  'the-hunger-games': { paper: '#F9F6F0', ink: '#18181B', red: '#C2410C', gold: '#D97706' },
};

export const BOOK_BG_TINT: Record<string, boolean> = {
  'the-republic': true,
  'lord-of-the-flies': true,
  'the-hunger-games': true,
};

export const BOOKS: BookEntry[] = [];

export const ANTIDOTE_BOOKS: AntidoteBookEntry[] = [
  {
    slug: 'the-republic',
    engine: 'antidote',
    config: ant_the_republic as any,
    meta: ant_meta_the_republic as any,
  },
  {
    slug: 'lord-of-the-flies',
    engine: 'antidote',
    config: ant_lord_of_the_flies as any,
    meta: ant_meta_lord_of_the_flies as any,
  },
  {
    slug: 'the-hunger-games',
    engine: 'antidote',
    config: ant_the_hunger_games as any,
    meta: ant_meta_the_hunger_games as any,
  },
];
