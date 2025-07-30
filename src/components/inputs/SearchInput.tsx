import { useEffect, useState } from "react";

interface SearchInputProps {
  readonly onSearch: (query: string) => void;
  readonly label: string;
}

function SearchInput({ onSearch, label }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-96">
      <span className="block text-gray-700 mb-1 text-sm  items-center font-bold">
        {label}
      </span>
      <div className="relative">
        <input
          type="text"
          placeholder="Digite para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ❌
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
