import React, { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useJobs } from '../hooks/useContexts';
import { debounce } from '../utils/helpers';

const SearchBar = ({ onSearch, onRecentSearchClick }) => {
  const [query, setQuery] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const { recentSearches, addRecentSearch } = useJobs();

  const debouncedSearch = useCallback(
    debounce((q) => {
      if (q.trim()) {
        onSearch(q);
      }
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      debouncedSearch(value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      onSearch(query);
      setShowRecent(false);
    }
  };

  const handleRecentSearch = (search) => {
    setQuery(search);
    addRecentSearch(search);
    onRecentSearchClick(search);
    setShowRecent(false);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setShowRecent(recentSearches.length > 0)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder="Search jobs by title, company, or skills..."
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* Recent Searches Dropdown */}
        {showRecent && recentSearches.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg shadow-lg z-10">
            <div className="p-2">
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleRecentSearch(search)}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg text-gray-700 dark:text-gray-300 text-sm"
                >
                  <FiSearch size={16} className="text-gray-400" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
