import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import type { LpItem, ResponseLpListDto } from "../types/lp";
import type { PaginationDto, SortOrder } from "../types/common";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------
// UI 컴포넌트
// ----------------------------------------------------

// ⭐ LpSkeleton Props 타입 정의 (DetailScreen에서 사용하는 count, detail 포함)
interface LpSkeletonProps {
  count?: number; // LpListScreen에서는 사용 안 하지만, DetailScreen에서 사용
  detail?: boolean; // LpListScreen에서는 사용 안 하지만, DetailScreen에서 사용
}

// 🚀 로딩 스켈레톤 컴포넌트
// LpSkeleton: Props를 받아 배열을 렌더링하도록 수정
export const LpSkeleton: React.FC<LpSkeletonProps> = ({
  count = 1,
  detail = false,
}) => {
  // count 만큼 반복하여 렌더링
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        // detail이 true인 경우 더 넓은 영역을 차지하도록 col-span-full 추가
        <div key={i} className={detail ? "col-span-full" : ""}>
          <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg aspect-square w-full">
            <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </>
  );
};

// ⭐ ErrorState Props 타입 정의 (DetailScreen에서 사용하는 message, onRetry, buttonText 포함)
interface ErrorStateProps {
  error?: Error; // LpListScreen에서 사용
  refetch?: () => void; // LpListScreen에서 사용
  message: string; // DetailScreen에서 사용하는 필수 prop
  onRetry: () => void; // DetailScreen에서 사용하는 필수 prop
  buttonText?: string; // DetailScreen에서 사용하는 선택적 prop
}

// 🚀 에러 상태 컴포넌트
export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  message, // DetailScreen에서 전달되는 메시지를 받도록 수정
  onRetry, // DetailScreen에서 전달되는 함수를 받도록 수정
  buttonText = "다시 시도", // 기본값 설정
}) => (
  <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <svg
      className="w-12 h-12 text-red-500 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <p className="text-red-600 dark:text-red-400 font-semibold mb-2">
      {message} {/* 전달받은 message 사용 */}
    </p>
    {error && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {(error as Error)?.message}
      </p>
    )}
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
    >
      {buttonText} {/* 전달받은 buttonText 사용 */}
    </button>
  </div>
);

// LP 목록 항목 컴포넌트 (Hover 스타일 및 라우팅 연결)
const LpCard = ({ item }: { item: LpItem }) => {
  const navigate = useNavigate();
  // 좋아요 수 계산
  const likesCount = item.likes?.length || 0;

  // createdAt을 기준으로 경과 시간 계산
  const timeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 24 * 60)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / (24 * 60))} days ago`;
  };

  const handleCardClick = () => {
    // 카드를 클릭하면 상세 페이지로 라우팅
    navigate(`/lp/${item.id}`);
  };

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer relative group"
      onClick={handleCardClick} // 클릭 이벤트 연결
    >
      <div className="relative aspect-square w-full bg-gray-800 overflow-hidden">
        {/* 1. 이미지 확대 효과: group-hover:scale-105 */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://placehold.co/500x500/1f2937/ffffff?text=DOLIGO";
            target.onerror = null;
          }}
        />

        {/* 2. Hover 오버레이: group-hover:opacity-100 */}
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 p-4 flex flex-col justify-end">
          {/* 메타 정보 컨테이너 */}
          <div className="flex flex-col space-y-2">
            {/* 제목 */}
            <h3 className="text-white text-lg font-bold line-clamp-2">
              {item.title}
            </h3>

            {/* 업로드일 */}
            <p className="text-gray-300 text-sm">{timeAgo(item.createdAt)}</p>

            {/* 좋아요 아이콘 및 카운트 */}
            <div className="flex items-center mt-2">
              <svg
                className="w-5 h-5 text-red-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="text-sm text-white font-semibold">
                {likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 메인 스크린
// ----------------------------------------------------

const LpListScreen = () => {
  // 'desc' (최신순)을 기본값으로 사용
  const [sort, setSort] = useState<SortOrder>("desc");

  // useQuery를 사용하여 LP 목록을 가져옵니다.
  const { data, isLoading, isError, error, refetch } = useQuery<
    ResponseLpListDto,
    Error
  >({
    queryKey: ["lps", sort],
    queryFn: () => getLpList({ order: sort, limit: 20 } as PaginationDto),
    staleTime: 5 * 60 * 1000,
    onError: (err) => console.error("Query Error:", err),
  });

  // 정렬 토글 핸들러
  const toggleSort = (newSort: SortOrder) => {
    if (sort !== newSort) {
      setSort(newSort);
    }
  };

  // 정렬 버튼 클래스 정의
  const getSortButtonClass = (buttonSort: SortOrder) => {
    const isSelected = sort === buttonSort;
    const base =
      "px-4 py-2 font-bold rounded-lg transition-colors duration-150 shadow-md";

    if (isSelected) {
      return `${base} bg-white text-gray-900`;
    }
    return `${base} text-white hover:bg-gray-700/50 border border-gray-700`;
  };

  const displayLps = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 pt-0">
      <div className="max-w-7xl mx-auto">
        {/* 정렬 버튼 섹션 */}
        <div className="flex justify-end space-x-2 py-4 sticky top-0 bg-gray-900 z-20">
          <button
            onClick={() => toggleSort("asc")}
            className={getSortButtonClass("asc")}
            disabled={isLoading}
          >
            오래된순
          </button>
          <button
            onClick={() => toggleSort("desc")}
            className={getSortButtonClass("desc")}
            disabled={isLoading}
          >
            최신순
          </button>
        </div>

        {/* 로딩/에러/데이터 표시 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {/* 로딩 중에는 스켈레톤 표시 */}
          {isLoading &&
            Array.from({ length: 12 }).map((_, i) => (
              <LpSkeleton key={i} count={1} />
            ))}{" "}
          {/* ❗ count Prop 전달 방식 변경 */}
          {/* 에러 발생 시 에러 메시지와 재시도 버튼 표시 */}
          {isError && (
            <ErrorState
              error={error as Error}
              message="목록을 불러오는 데 실패했습니다." // ❗ message Prop 추가
              onRetry={() => refetch()} // ❗ onRetry Prop 전달
            />
          )}
          {/* 데이터 표시 */}
          {!isLoading &&
            !isError &&
            displayLps.map((lp) => <LpCard key={lp.id} item={lp} />)}
          {/* 데이터가 없을 경우 */}
          {!isLoading && !isError && displayLps.length === 0 && (
            <div className="col-span-full text-center p-12 text-gray-500">
              <p className="text-xl font-semibold mb-2">
                😭 목록이 비어있습니다.
              </p>
              <p>정렬 조건을 변경하거나 새로운 LP를 추가해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LpListScreen;
