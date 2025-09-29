import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

// HomePage는 레이아웃 컴포넌트 역할을 합니다.
// Outlet 자리에 라우터 설정에 따라 MoviePage나 MovieDetailPage가 렌더링됩니다.
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 모든 페이지에 공통으로 표시될 내비게이션 바 */}
      <NavBar />

      {/* 자식 라우트 컴포넌트가 렌더링될 위치 */}
      <Outlet />
    </div>
  );
};

export default HomePage;
