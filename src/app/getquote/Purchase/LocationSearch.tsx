'use client';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { API_ENDPOINTS, getData } from '../../auth/API/api';

interface SearchBoxProps {
  onSelectAddress?: (selected: PostcodeResult) => void;
  readOnly?: boolean;
}

export interface PostcodeResult {
  id: string;
  suggestion: string;
  udprn: number;
}




export async function fetchAddressDetails1(
  udprn: number,
  apiKey?: string
) {
  console.log(apiKey)
  if (!apiKey) {
    
    return null;
  }

  

  const url = `https://api.ideal-postcodes.co.uk/v1/udprn/${udprn}?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

   

    if (data.code !== 2000) {
      return null;
    }

    return data.result;
  } catch (error) {
    return null;
  }
}




const SearchBox = forwardRef(function SearchBox({ onSelectAddress, readOnly = false }: SearchBoxProps, ref) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostcodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const justSelectedRef = useRef(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [details,setDetails] = useState({});
  const lastDetailsRef = useRef<any>(null);


  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

const   fetchAddressDetailsByKey = async(udprn)=>{
  console.log("inside comp function");

  const url = `https://api.ideal-postcodes.co.uk/v1/udprn/${udprn}?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

   

    if (data.code !== 2000) {
      return null;
    }

    return data.result;
  } catch (error) {
    return null;
  }
}

const onSelectAddressFullDetails = () => {
  return lastDetailsRef.current ?? details ?? null;
}
const handleSelect = async (item: PostcodeResult) => { console.log("selected item",item);
   if (!apiKey) return; 
  setResults([]);
  setSelectedIndex(-1);
  justSelectedRef.current = true;

  // 👉 CALL UDPRN DETAILS API HERE
  const details = await fetchAddressDetailsByKey(item.udprn);
 // console.log(details)
  lastDetailsRef.current = details;
  setDetails(details);
  // 👉 USE THIS BLOCK HERE
  if (details) {
    const fullAddress = [
      details.line_1,
      details.line_2,
      details.post_town,
      details.postcode,
    ]
      .filter(Boolean)
      .join(", ");
    console.log("fullAddress",fullAddress)
    setQuery(fullAddress); // ✅ FULL ADDRESS + FULL POSTCODE
  } else {
    setQuery(item.suggestion);
  }

  if (onSelectAddress) onSelectAddress(item);
};

  useImperativeHandle(ref, () => ({
    onSelectAddressFullDetails,
    fetchAddressDetailsByKey,
  }), [onSelectAddressFullDetails, fetchAddressDetailsByKey]);

useEffect(() => {
  if (apiKey) {
    console.log("Ideal Postcodes API Key being used:", apiKey);
  }
}, [apiKey]);

useEffect(() => {
  if (!apiKey) return;
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?query=${encodeURIComponent( trimmed)}&api_key=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.code !== 2000) {
          setError("❌ API error or invalid key");
          setResults([]);
          return;
        }

        const mapped = (data.result?.hits || []).map((x: any) => ({
          id: x.id,
          suggestion: x.suggestion,
          udprn: x.udprn,
        }));

        setResults(mapped);
      } catch (e) {
        setError("❌ Network error — could not reach API");
        console.error("Ideal Postcodes error:", e);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, apiKey]);


useEffect(() => {
  async function fetchApiKey() {
    try {
      const res = await getData(API_ENDPOINTS.api_key);
      const key = res?.data?.postal_code;

      if (key) {
        setApiKey(key);
      } else {
        console.error("Postal code API key missing");
      }
    } catch (err) {
      console.error("Failed to fetch API key", err);
    }
  }

  fetchApiKey();
}, []);


  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search Location..."
        value={readOnly ? "" : query}  
        onChange={(e) => !readOnly && setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        autoComplete="off"
        className={`block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 outline-none transition-colors appearance-none pr-10  ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

     


      {!readOnly && results.length > 0 && (
          <ul className="mt-2 border border-gray-200 rounded-md bg-white shadow max-h-60 overflow-auto">
          {results.map((item, i) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 cursor-pointer text-black ${
                i === selectedIndex ? 'bg-blue-200' : 'hover:bg-blue-100'
              }`}
            >
              {item.suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SearchBox;