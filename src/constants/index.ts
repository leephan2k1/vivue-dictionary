import type { Source } from '@/types/app';

export const PUBLIC_LAYOUT = 'default';
export const AUTH_LAYOUT = 'auth';

export const sources: Source[] = ['cambridge', 'oxford', 'glosbe'];

export const t: { [key: string]: string } = {
  English: 'en',
  Vietnamese: 'vi',
  'Tiếng Việt': 'vi',
  en: 'English',
  vi: 'Tiếng Việt'
};
