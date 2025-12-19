// src/pages/LpDetailPage.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { useLpDetail } from "../hooks/useLpDetail";
import LpCommentList from "../components/Lp/LpCommentList";

const LpDetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const { data: lp, isLoading, isError, error } = useLpDetail(lpid);

  if (!lpid) {
    return (
      <div className="p-8 text-red-500 bg-gray-900 min-h-screen">
        잘못된 접근입니다.
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-900 min-h-screen">
        LP ID: {lpid} 상세 정보 로딩 중...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-8 text-red-500 bg-gray-900 min-h-screen">
        에러 발생: {error?.message}
      </div>
    );
  }
  if (!lp) {
    return (
      <div className="p-8 text-gray-500 bg-gray-900 min-h-screen">
        데이터를 찾을 수 없습니다.
      </div>
    );
  }

  // 날짜 포맷
  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // --- 성공 시 상세 데이터 렌더링 ---
  return (
    <div className="flex justify-center min-h-screen bg-gray-900 text-white pt-10">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl">
        {/* 1. 상단 정보 (작성자, 날짜, 액션 버튼) */}
        <div className="w-full flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
          <div className="flex items-center space-x-3">
            {/* 작성자 아바타 */}
            <img
              src={
                lp.author.avatar ||
                "https://via.placeholder.com/40/0000FF/FFFFFF?text=오"
              }
              alt={lp.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
            />
            {/* 작성자 이름 */}
            <span className="font-bold text-xl text-pink-500">
              {lp.author.name}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            {/* 날짜 */}
            <span className="text-sm">{formattedDate}</span>
            {/* 수정 아이콘 */}
            <button className="hover:text-blue-400">수정</button>
            {/* 삭제 아이콘 */}
            <button className="hover:text-red-400">삭제</button>
          </div>
        </div>

        {/* 2. LP 제목 */}
        <h1 className="text-4xl font-extrabold text-center mb-2">{lp.title}</h1>

        {/* 3. 앨범 이미지 (CD 모양) */}
        <div className="my-6 flex justify-center">
          <img
            src={lp.thumbnail}
            alt={lp.title + " 앨범"}
            className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-gray-600"
          />
        </div>

        {/* 4. 내용 (Content) */}
        <p className="text-center text-gray-300 italic mb-8 border-t border-gray-700 pt-6">
          "{lp.content}"
        </p>

        {/* 5. 태그 영역 */}
        <div className="flex justify-center space-x-2 mb-8">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 text-pink-400 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 6. 좋아요 카운터 */}
        <div className="text-center text-xl font-bold text-pink-500">
          <span className="mr-2">❤️</span>
          {lp.likes.length}
        </div>
        <LpCommentList />
      </div>
    </div>
  );
};

export default LpDetailPage;
