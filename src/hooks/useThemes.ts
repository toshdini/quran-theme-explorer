'use client';
import { useState, useCallback } from 'react';

export const useThemes = () => {
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  const exploreTheme = useCallback(async (themeId: string) => {
    setLoading(true);
    setError(null);
    setCurrentTheme(themeId);

    try {
      const response = await fetch(`/api/themes/${themeId}`);

      if (!response.ok) {
        throw new Error(`Failed to load theme: ${response.status}`);
      }

      const data = await response.json();

      setVerses(data.results || []);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load theme');
      setVerses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setVerses([]);
    setCurrentTheme(null);
    setError(null);
  }, []);

  return {
    verses,
    loading,
    error,
    currentTheme,
    exploreTheme,
    clearResults
  };
};
