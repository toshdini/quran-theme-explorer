import { NextRequest } from "next/server";
import { client } from "@/lib/quran-client";
import { THEMES } from "@/lib/constants";
import { Language } from "@quranjs/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { theme: string } }
) {

  const theme = THEMES[params.theme as keyof typeof THEMES];

  if (!theme) {
    return Response.json({ error: 'Theme not found' }, { status: 404 });
  }

  try {
    const searchPromises = theme.keywords.map(keyword =>
      client.search.search(keyword, {
        language: Language.ENGLISH,
        size: 5
      })
    );

    const allResults = await Promise.all(searchPromises);

    const allVerses = allResults.flatMap(result => result.verses || []);
    const uniqueVerses = Array.from(new Map(
      allVerses.map(verse => [verse.id, verse])
    ).values());

    // Get full verse details for each unique verse
    const verseDetails = await Promise.all(
      uniqueVerses.slice(0, 10).map(verse =>
        client.verses.findByKey(verse.verse_key, {
          words: false
        }).catch(() => null) // Handle individual verse errors
      )
    );

    const validVerses = verseDetails.filter(Boolean);

    return Response.json({
      theme: theme.name,
      description: theme.description,
      verses: validVerses,
      totalResults: validVerses.length
    });

  } catch (error) {
    console.error('Theme search error:', error);
    return Response.json({ error: 'Failed to search Theme' }, { status: 500 });
  }
}
