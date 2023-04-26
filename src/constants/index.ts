import type { Source } from '@/types/app';

export const PUBLIC_LAYOUT = 'default';
export const AUTH_LAYOUT = 'auth';

export const sources: Source[] = ['cambridge', 'oxford', 'glosbe'];

export const COLORS_OPTIONS = [
  '#facc15',
  '#a3e635',
  '#fbbf24',
  '#34d399',
  '#fb923c',
  '#22d3ee',
  '#f87171',
  '#38bdf8',
  '#f472b6',
  '#818cf8',
  '#fb7185',
  '#a78bfa',
  '#e879f9'
];

export const t: { [key: string]: string } = {
  English: 'en',
  Vietnamese: 'vi',
  'Tiếng Việt': 'vi',
  en: 'English',
  vi: 'Tiếng Việt',
  'chưa nhớ': 'FORGOT',
  'khó nhớ': 'HARD_TO_REMEMBER',
  'chưa học': 'NOT_PRACTICE',
  'đã nhớ': 'REMEMBERED',
  'tạm quên': 'TEMPORARILY_FORGET'
};
