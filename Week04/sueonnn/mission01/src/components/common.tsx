import React from "react";

// === 1. 로딩 스피너 컴포넌트 ===
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="w-12 h-12 border-4 rounded-full animate-spin border-t-transparent"
        style={{ borderColor: "#bedab1", borderTopColor: "transparent" }}
        role="status"
      >
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};

// === 2. 에러 메시지 컴포넌트 ===
interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "데이터를 불러오는 데 실패했습니다.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-10">
      <div className="text-center">
        <p className="text-6xl mb-4">🚨</p>
        <p className="text-3xl text-red-500 font-bold mb-4">오류 발생</p>
        <p className="text-xl text-gray-300 mb-8">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
};

// === 3. 내비게이션 링크 데이터 ===
export const NAV_LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은 영화" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];
