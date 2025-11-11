'use client';
import { useState, useEffect } from 'react';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Handler moved to component scope so it can be referenced by the input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { console.log("Key Down",results);
    if (results.length === 0) return; 

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();//results[selectedIndex].ccg+ " - "+results[selectedIndex].admin_district
      handleSelect(results[selectedIndex].ccg+ " - "+results[selectedIndex].admin_district);
    }
  };

  const handleSelect = (postcode: string) => { console.log("Called");
    setQuery(postcode); // set selected value in the input
    setResults([]); // hide suggestions
    setSelectedIndex(-1); // reset keyboard navigation
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log(data.result);
        setResults(data.result || []);
      } catch (err) {
        console.error('Error fetching search results', err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce delay

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="w-full max-w-md mx-auto mt-1">
      <input
        type="text"
        placeholder="Search Location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
         onKeyDown={handleKeyDown}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}

      {results.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded-md bg-white shadow">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {item.ccg+ " - "+item.admin_district}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
