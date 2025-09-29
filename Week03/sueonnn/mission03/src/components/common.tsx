import React from "react";

// === 1. 로딩 스피너 컴포넌트 ===
// Tailwind CSS의 애니메이션과 스타일을 사용하여 스피너를 만듭니다.
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="w-12 h-12 border-4 rounded-full animate-spin border-t-transparent"
        style={{ borderColor: "#bedab1", borderTopColor: "transparent" }} // 연두색 (#bedab1)
        role="status"
      >
        <span className="sr-only">로딩 중...</span> {/* 스크린 리더용 */}
      </div>
    </div>
  );
};

// === 2. 내비게이션 링크 데이터 ===
// 네브바에 표시될 링크 정보 배열
export const NAV_LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은 영화" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];
