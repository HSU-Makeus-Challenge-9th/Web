import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getMyInfo } from '../api/auth';
import type { UserInfo } from '../types/auth';

interface NavBarProps {
  onMenuClick: () => void;
}

const NavBar = ({ onMenuClick }: NavBarProps) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        try {
          const response = await getMyInfo();
          setUserInfo(response.data);
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
        }
      } else {
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다');
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-gray-800 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="px-4 lg:px-8 py-4 flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          {/* 버거 버튼 (모바일) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white hover:text-gray-300 transition-colors"
            aria-label="메뉴"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <Link to="/" className="text-pink-500 text-xl lg:text-2xl font-bold">
            플러플러LP판
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/')}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="검색"
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {userInfo && (
                <span className="text-white text-sm lg:text-base hidden md:inline">
                  {userInfo.name}님 반갑습니다.
                </span>
              )}
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-800 text-sm lg:text-base"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-pink-600 text-sm lg:text-base"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/mypage"
                className="text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-800 text-sm lg:text-base hidden md:inline-block"
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="text-white px-3 lg:px-4 py-2 rounded-lg border border-white hover:bg-gray-800 text-sm lg:text-base"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;