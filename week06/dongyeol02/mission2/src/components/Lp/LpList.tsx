// LpList.tsx (수정된 렌더링 부분)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLps } from "../../hooks/useLps";
import LpSkeletonList from "../skeleton/LpSkeletonList"; // (import 경로 확인)

const LpList = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, // 💡 다음 페이지 로딩 중 상태
  } = useLps(order);

  const toggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // 1. 로딩 상태 처리: isLoading 상태일 때만 전체 스켈레톤 반환
  if (isLoading) {
    // 💡 초기 로딩 시 전체 스켈레톤 (10개)
    return (
      <div className="p-5 bg-gray-900 min-h-screen">
        <LpSkeletonList count={10} />
      </div>
    );
  }

  // 2. 에러 상태 처리 (동일)
  if (isError) {
    return (
      <div style={{ padding: "20px", color: "red", border: "1px solid red" }}>
        <p>⚠️ 데이터 로딩 중 에러 발생: {error.message}</p>
      </div>
    );
  }

  const allLps = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>LP 목록</h2>

      {/* 정렬 버튼 UI */}
      <button
        onClick={toggleOrder}
        className="px-4 py-2 cursor-pointer mb-5 bg-gray-200 rounded-2xl"
      >
        정렬: {order === "desc" ? "최신순 (Desc)" : "오래된순 (Asc)"}
      </button>

      {/* LP 목록 그리드 */}
      <ul className="grid grid-cols-5 gap-4">
        {allLps.map((lp) => (
          <Link
            key={lp.id}
            to={`/lp/${lp.id}`}
            className="relative overflow-hidden group"
          >
            {/* ... LP 카드 렌더링 로직 (동일) ... */}
            <li className="relative block">
              <img
                src={lp.thumbnail}
                alt={lp.title + " 썸네일"}
                className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 text-white">
                <h3 className="text-lg font-bold truncate">{lp.title}</h3>
                <p className="text-sm text-gray-300">
                  업로드일: {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-semibold mt-1">
                  ❤️ 좋아요: {lp.likes?.length ?? 0}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {/* 💡 4. 다음 페이지 로딩 상태 처리 (목록 하단에 스켈레톤 추가) */}
      {isFetchingNextPage && (
        <div className="mt-10">
          {/* 💡 isFetchingNextPage일 때 5개의 스켈레톤을 목록의 그리드 안에 추가로 렌더링 */}
          <LpSkeletonList count={5} />
        </div>
      )}

      {/* 💡 더 불러오기 트리거 버튼: isFetchingNextPage가 아닐 때만 버튼 노출 */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchNextPage()}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
          >
            더 불러오기
          </button>
        </div>
      )}

      {/* 데이터가 없을 경우 처리 */}
      {allLps.length === 0 && !isLoading && !isError && (
        <p className="text-center text-gray-500 mt-10">표시할 LP가 없습니다.</p>
      )}
    </div>
  );
};

export default LpList;
