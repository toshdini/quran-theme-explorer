'use client';
import { useThemes } from "@/hooks/useThemes";
import { useQuranSearch } from "@/hooks/useQuranSearch";
import { THEMES } from "@/lib/constants";
import { SearchBar } from "@/components/SearchBar/SearchBar";

export const ThemeExplorer = () => {
  const { verses, loading, error, currentTheme, exploreTheme, clearResults } = useThemes();
  const { searchResults, searchLoading, searchError, exploreQuery, clearSearch } = useQuranSearch();

  const showingSearchResults = searchResults.length > 0;
  const showingThemeResults = verses.length > 0 && !showingSearchResults;
  const showingResults = showingSearchResults || showingThemeResults;

  const handleSearch = async (query: string) => {
    clearResults();
    await exploreQuery(query);
  };

  const handleThemeClick = (themeId: string) => {
    console.log('🎯 Theme button clicked:', themeId);
    clearSearch();
    exploreTheme(themeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quranic Theme Explorer
          </h1>
          <p className="text-xl text-gray-600">
            Discover the Quran through its profound themes
          </p>
        </div>

        {/* Search Bar - Simple Center */}
        <div className="flex justify-center mb-12">
          <div className="w-96">
            <SearchBar
              onSearch={handleSearch}
              loading={searchLoading}
            />
          </div>
        </div>

        {/* Theme Grid - Center with Flex Wrap */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
            {Object.values(THEMES).map(theme => (
              <button
                key={theme.id}
                onClick={() => handleThemeClick(theme.id)}
                disabled={loading || searchLoading}
                className={`p-6 rounded-2xl text-white text-left transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${theme.color} shadow-lg w-64`}
              >
                <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                <p className="text-sm opacity-90">{theme.description}</p>
              </button>
            ))}
          </div>
        </div>
        {(loading || searchLoading) && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center mb-8">
            Theme Error: {error}
          </div>
        )}

        {searchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center mb-8">
            Search Error: {searchError}
          </div>
        )}

        {showingResults && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              {showingSearchResults ? (
                <>
                  Search Results
                  <span className="text-gray-500 text-lg ml-2">
                    ({searchResults.length} verses)
                  </span>
                </>
              ) : (
                <>
                  {THEMES[currentTheme as keyof typeof THEMES]?.name}
                  <span className="text-gray-500 text-lg ml-2">
                    ({verses.length} verses)
                  </span>
                </>
              )}
            </h2>

            <div className="space-y-4">
              {(showingSearchResults ? searchResults : verses).map(verse => (
                <div key={verse.verseId} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {verse.verseKey}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-right">
                      <p className="text-2xl font-arabic leading-loose text-gray-900">
                        {verse.text}
                      </p>
                    </div>

                    {verse.translations?.[0] && (
                      <div className="border-t pt-4">
                        <p
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: verse.translations[0].text
                          }}
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          - {verse.translations[0].resourceName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !searchLoading && !showingResults && !error && !searchError && (
          <div className="text-center py-12 text-gray-500">
            <p>Select a theme or search above to explore Quranic verses</p>
          </div>
        )}
      </div>
    </div>
  );
};
