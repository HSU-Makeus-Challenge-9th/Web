import { memo, type FormEvent, type ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';

interface SearchFormProps {
  searchQuery: string;
  includeAdult: boolean;
  language: string;
  onSearchQueryChange: (value: string) => void;
  onIncludeAdultChange: (value: boolean) => void;
  onLanguageChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({
  searchQuery,
  includeAdult,
  language,
  onSearchQueryChange,
  onIncludeAdultChange,
  onLanguageChange,
  onSubmit,
}: SearchFormProps) => {
  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value);
  };

  const handleIncludeAdultChange = (e: ChangeEvent<HTMLInputElement>) => {
    onIncludeAdultChange(e.target.checked);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            영화 제목
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="영화 제목을 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">      
            언어
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="ko-KR">한국어</option>
              <option value="en-US">영어</option>
              <option value="ja-JP">일본어</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex items-end">
          <label className="flex items-center gap-3 cursor-pointer h-[48px]">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={handleIncludeAdultChange}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            />
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              성인 콘텐츠 포함
            </span>
          </label>
        </div>  
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        검색
      </button>
    </form>
  );
};

export default memo(SearchForm);
