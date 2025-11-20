import { NextRequest } from 'next/server';
import { quranClient } from '@/lib/quran-client';
import { Language } from '@quranjs/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.trim() === '') {
    return Response.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    const results = await quranClient.search.search(query, {
      language: Language.ENGLISH,
      size: 10
    });

    return Response.json({
      results: results.results || [],
      totalResults: results.totalResults || 0
    });

  } catch (error) {
    console.error('Search API error:', error);
    return Response.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
