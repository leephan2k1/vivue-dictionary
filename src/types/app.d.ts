export type Language = 'English' | 'Vietnamese' | 'Tiếng Việt';

export type Source = 'glosbe' | 'oxford' | 'cambridge' | 'google';

export type LanguagePairs = 'vi-en' | 'en-vi' | 'en-en';

export type FetchingStatus = 'idle' | 'error' | 'success' | 'loading';

export type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

export interface User {
  id: string;
  email: string;
  image: string;
  name: string;
  provider: string;
}

interface TranslationHistory {
  word: string;
  sense: string;
  currentLanguage: string;
  targetLanguage: string;
}

export interface Word {
  wordContent: string;
  typesOfWord: string[];
  senses: Sense[];
  less_frequent_senses: string[];
  similar_phrases: SimilarPhrase[];
  examples: Example[];
}

export interface WordInEnglish extends Pick<Word, 'wordContent' | 'typesOfWord'> {
  senses: (Pick<Sense, 'typeOfWord' | 'sense'> & { examples: string[] })[];
}

export interface Example {
  en: string;
  keyword_en: string;
  vi: string;
  keyword_vi?: string;
}

export interface Sense {
  sense: string;
  typeOfWord?: string;
  category?: string;
  example?: SimilarPhrase;
}

export interface SimilarPhrase {
  en: string;
  vi: string;
}

export interface Audio {
  phrase: string;
  author: string;
  url: string;
}

export interface WordPreview {
  format: string;
  wordContent: string;
  senses: Pick<Sense, 'sense'>[];
}
