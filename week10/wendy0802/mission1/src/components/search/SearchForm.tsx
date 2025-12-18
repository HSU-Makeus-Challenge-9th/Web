
import React from "react";

type MovieSearchFormProps = {
  title: string;
  includeAdult: boolean;
  language: string;
  onChangeTitle: (value: string) => void;
  onChangeIncludeAdult: (value: boolean) => void;
  onChangeLanguage: (value: string) => void;
  onSubmit: () => void;
};

const MovieSearchForm: React.FC<MovieSearchFormProps> = ({
  title,
  includeAdult,
  language,
  onChangeTitle,
  onChangeIncludeAdult,
  onChangeLanguage,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center mt-6">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-md px-6 py-5 space-y-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          {/* 영화 제목 */}
          <div className="flex-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span>🎬</span>
              <span>영화 제목</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="영화 제목을 입력하세요"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="w-full md:w-64">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span>⚙️</span>
              <span>옵션</span>
            </p>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={(e) => onChangeIncludeAdult(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>성인 콘텐츠 표시</span>
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span>🌐</span>
            <span>언어</span>
          </label>
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>
        </div>

        {/* 검색 버튼 */}
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-blue-500 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-600 transition-colors"
        >
          🔍 검색하기
        </button>
      </div>
    </form>
  );
};

export default MovieSearchForm;