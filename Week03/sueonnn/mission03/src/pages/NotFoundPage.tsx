import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    // 전체 화면 중앙에 에러 메시지를 표시하는 스타일
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-2xl mb-8">요청하신 페이지를 찾을 수 없습니다.</p>

      {/* 홈으로 돌아가는 버튼 (react-router-dom의 Link 사용) */}
      <Link
        to="/"
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
