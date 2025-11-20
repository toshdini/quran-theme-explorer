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
  verseId: number;        // "23" style ID
  verseKey: string;       // "2:33" style key
  text: string;    // Arabic text
  highlighted?: string;   // "<b>Mercy</b>"
  translations?: Translation[]; // Array of translations
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
}
