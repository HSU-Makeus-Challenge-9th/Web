import type { SearchType } from '../hooks/useSearchLPs';

interface SearchInputProps {
  searchQuery: string;
  searchType: SearchType;
  isTypeDropdownOpen: boolean;
  searchTypeLabels: Record<SearchType, string>;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onToggleDropdown: () => void;
  onTypeChange: (type: SearchType) => void;
}

const SearchInput = ({
  searchQuery,
  searchType,
  isTypeDropdownOpen,
  searchTypeLabels,
  onSearchChange,
  onClearSearch,
  onToggleDropdown,
  onTypeChange,
}: SearchInputProps) => {
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        {/* 검색 아이콘 */}
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* 검색 입력 */}
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          autoFocus
        />

        {/* 검색어 지우기 버튼 */}
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* 검색 타입 드롭다운 */}
        <div className="relative">
          <button
            onClick={onToggleDropdown}
            className="flex items-center justify-center gap-1 w-20 py-1.5 bg-gray-700 rounded text-white text-sm hover:bg-gray-600"
          >
            {searchTypeLabels[searchType]}
            <svg
              className={`w-4 h-4 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isTypeDropdownOpen && (
            <div className="absolute right-0 mt-1 bg-gray-700 rounded shadow-lg z-10 w-20">
              {(Object.keys(searchTypeLabels) as SearchType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`block w-full py-2 text-center text-sm hover:bg-gray-600 ${
                    searchType === type ? 'text-pink-500' : 'text-white'
                  }`}
                >
                  {searchTypeLabels[type]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;