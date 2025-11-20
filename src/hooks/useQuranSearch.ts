'use client'
import { useState, useCallback } from "react";
import { SearchResult } from "@/types/quran";

export const useQuranSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const exploreQuery = useCallback(async (query: string) => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      const response = await fetch(`/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
  }, []);

  return {
    searchResults,
    searchLoading,
    searchError,
    exploreQuery,
    clearSearch
  };
};
