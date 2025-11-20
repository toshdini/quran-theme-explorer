import { Translation } from "@quranjs/api";

export interface ThemeVerse {
  verseId: number;
  verseKey: string;
  text: string;
  translations?: Translation[];
}

export interface QuranVerse {
  verseId: number;
  verseNumber: number;
  verseKey: string;
  chapterId: number | string;
  text: string;
  translations?: Translation[];
}

export interface SearchResult {
  verseId: number;
  verseKey: string;
  text: string;
  highlighted?: string;
  translations?: Translation[];
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
}
