'use client';
import { useState, useEffect } from 'react';

interface SearchBoxProps {
  onSelectAddress?: (address: string) => void;
  readOnly?: boolean; // new prop
}

export default function SearchBox({ onSelectAddress, readOnly = false }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0 || readOnly) return; // ignore if readonly

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex].ccg + " - " + results[selectedIndex].admin_district+","+results[selectedIndex].country);
    }
  };

  const handleSelect = (postcode: string) => {
    if (readOnly) return; // ignore if readonly

    setQuery(postcode);
    setResults([]);
    setSelectedIndex(-1);
    if (onSelectAddress) {
      onSelectAddress(postcode);
      console.log(postcode)
    }
  };

  useEffect(() => {
    if (!query.trim() || readOnly) { // ignore fetching if readonly
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.result || []);
      } catch (err) {
        console.error('Error fetching search results', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, readOnly]);

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search Location..."
        value={query}
        onChange={(e) => !readOnly && setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        className={`block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />

      {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}

      {!readOnly && results.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded-md bg-white shadow">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black"
              onClick={() => handleSelect(item.ccg + " - " + item.admin_district)}
            >
              {item.ccg + " - " + item.admin_district}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
