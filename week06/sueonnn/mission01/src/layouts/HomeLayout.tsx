// import { Outlet } from "react-router-dom";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// const HomeLayout = () => {
//   return (
//     <div className="h-dvh flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default HomeLayout;
// HomeLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleFabClick = () => {
    // ⚠️ TODO: 여기에 실제 라우팅 경로를 넣어주세요.
    navigate("/new-item");
  };

  return (
    <div className="h-dvh flex">
      {/* 🚀 데스크톱 사이드바 - 화면이 넓을 때 (md 이상) 고정으로 항상 보임 */}
      <div className="hidden md:block w-64 fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30">
        <Sidebar isOpen={true} onClose={() => {}} isDesktop={true} />
      </div>

      {/* 🚀 모바일 사이드바 - 좁은 화면 (md 미만)에서 버거 메뉴 클릭시 표시 */}
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isDesktop={false}
        />
      </div>

      {/* 메인 콘텐츠 영역: 데스크톱에서 사이드바 너비만큼 왼쪽 마진을 줍니다. */}
      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 pt-16 overflow-auto relative">
          <Outlet />

          {/* 플로팅 추가 버튼 (이전 요청에서 추가) */}
          <button
            onClick={handleFabClick}
            className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105 z-40"
            aria-label="새 항목 추가"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
