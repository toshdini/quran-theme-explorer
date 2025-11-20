import { NextRequest } from "next/server";
import { quranClient } from "@/lib/quran-client";
import { THEMES } from "@/lib/constants";
import { Language } from "@quranjs/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ theme: string }> }
) {
  const { theme: themeParam } = await params;
  const theme = THEMES[themeParam as keyof typeof THEMES];

  if (!theme) {
    return Response.json({ error: 'Theme not found' }, { status: 404 });
  }

  try {
    const searchPromises = theme.keywords.map(keyword =>
      quranClient.search.search(keyword, {
        language: Language.ENGLISH,
        size: 5
      })
    );

    const allResults = await Promise.all(searchPromises);

    // Use the search results directly - they have everything we need!
    const allVerses = allResults.flatMap(result => result.results || []);
    const uniqueVerses = Array.from(new Map(
      allVerses.map(verse => [verse.verseId, verse])
    ).values());

    console.log('Returning verses:', uniqueVerses.length);

    // RETURN THE SEARCH RESULTS DIRECTLY
    return Response.json({
      theme: theme.name,
      description: theme.description,
      results: uniqueVerses.slice(0, 10), // ← This is what matters!
      totalResults: uniqueVerses.length
    });

  } catch (error) {
    console.error('Theme search error:', error);
    return Response.json({ error: 'Failed to search Theme' }, { status: 500 });
  }
}
