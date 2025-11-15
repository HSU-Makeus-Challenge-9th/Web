import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { accessToken, userInfo, logout } = useAuth();
  const isAuthenticated = Boolean(accessToken);

  return (
    <>
      {/* 데스크톱에서도 배경 오버레이 (투명하지만 클릭 감지용) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 md:bg-transparent bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* 사이드바 */}
      <div className={`
        fixed top-24 left-0 h-[calc(100vh-6rem)] w-60 bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col p-6 space-y-4">
          {/* 사이드바 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-pink-500 text-lg font-bold">메뉴</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
              aria-label="메뉴 닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 공통 메뉴 */}
          <button
            onClick={() => {
              navigate('/');
              // 모바일에서만 사이드바 닫기
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
            className="w-full flex items-center text-left text-white px-4 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈
          </button>
          
          <button
            onClick={() => {
              // 추후 검색 기능 구현
              console.log("찾기 기능 클릭");
              // 모바일에서만 사이드바 닫기
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
            className="w-full flex items-center text-left text-white px-4 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            찾기
          </button>

          {/* 로그인 상태에 따른 메뉴 */}
          {isAuthenticated ? (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              {userInfo && (
                <div className="flex items-center text-gray-300 text-sm pb-4 border-b border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{userInfo.name}님 반갑습니다.</span>
                </div>
              )}
              
              <button
                onClick={() => {
                  navigate('/my');
                  // 모바일에서만 사이드바 닫기
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className="w-full text-left text-white px-4 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                마이페이지
              </button>
              
              <button
                onClick={() => {
                  logout();
                  // 로그아웃 시에는 항상 사이드바 닫기
                  onClose();
                }}
                className="w-full text-left text-gray-400 px-4 py-3 border border-gray-600 rounded hover:bg-gray-800 hover:text-white transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <div className="flex items-center text-gray-400 text-sm pb-4 border-b border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>로그인이 필요합니다</span>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;