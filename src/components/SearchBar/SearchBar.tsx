import { useState } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void | Promise<void>;
  loading?: boolean;
};

export const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search Quran verses..."
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
        {loading && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </form>
  );
};
