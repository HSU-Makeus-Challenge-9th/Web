import { memo, type FormEvent } from 'react';

interface MovieFilters {
  query: string;
  language: string;
  includeAdult: boolean;
}

interface MovieFilterProps {
  filters: MovieFilters;
  setFilters: (filters: MovieFilters) => void;
  onSearch: (e?: FormEvent) => void;
}

export const MovieFilter = memo(({ filters, setFilters, onSearch }: MovieFilterProps) => {
  console.log("필터 컴포넌트 렌더링됨!");
  
  return (
    <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
      <form onSubmit={onSearch}>
        {/* 상단: 영화 제목 + 옵션 */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 영화 제목 */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
              🎬 영화 제목
            </label>
            <input 
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={filters.query}
              onChange={(e) => setFilters({...filters, query: e.target.value})}
              placeholder="영화 제목을 입력하세요"
            />
          </div>

          {/* 옵션 (성인 콘텐츠) */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
              🔧 옵션
            </label>
            <div className="flex h-[48px] items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={filters.includeAdult}
                  onChange={(e) => setFilters({...filters, includeAdult: e.target.checked})}
                />
                <span className="text-sm text-gray-700">
                  성인 콘텐츠 표시
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 하단: 언어 선택 + 검색 버튼 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          {/* 언어 선택 */}
          <div className="flex-1">
            <label className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
              🌐 언어
            </label>
            <select 
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={filters.language}
              onChange={(e) => setFilters({...filters, language: e.target.value})}
            >
              <option value="ko-KR">한국어</option>
              <option value="en-US">영어</option>
              <option value="ja-JP">일본어</option>
            </select>
          </div>

          {/* 검색 버튼 */}
          <button 
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all sm:w-auto"
          >
            🔍 검색하기
          </button>
        </div>
      </form>
    </div>
  );
});

MovieFilter.displayName = 'MovieFilter';