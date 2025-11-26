import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import BurgerIcon from './common/BurgerIcon';

interface NavbarProps {
  active?: 'login' | 'signup';
  onToggleSidebar: () => void;
}

const Navbar = ({ active, onToggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();
  const { accessToken, userInfo, logout } = useAuth();
  const isAuthenticated = Boolean(accessToken);

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log('✅ 로그아웃 성공');
      navigate('/login');
    },
    onError: (error) => {
      console.error('🚨 로그아웃 에러:', error);
      alert('로그아웃에 실패했습니다.');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getLoginButtonClasses = () => {
    const baseClasses = 'text-white px-4 py-2 border border-gray-600 rounded text-sm transition-colors';
    const activeClasses = active === 'login' ? 'bg-gray-800 cursor-default' : 'hover:bg-gray-800';
    return `${baseClasses} ${activeClasses}`;
  };

  const getSignupButtonClasses = () => {
    const baseClasses = 'bg-pink-500 text-white px-4 py-2 rounded text-sm transition-colors';
    const activeClasses = active === 'signup' ? 'cursor-default hover:bg-pink-600' : 'hover:bg-pink-600';
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-black z-50">
      {/* 왼쪽 영역: 햄버거 메뉴 + 브랜드 로고 */}
      <div className="flex items-center space-x-3">
        {/* 햄버거 메뉴 */}
        <BurgerIcon onClick={onToggleSidebar} />
        
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-pink-500 text-xl font-bold hover:text-pink-400 transition-colors"
        >
          돌려돌려 LP판
        </button>
      </div>

      {/* 데스크톱 메뉴 */}
      <div className="hidden md:flex items-center space-x-4">
        {/* 로그인 상태 환영 문구 */}
        {isAuthenticated && (
          <div className="flex items-center text-gray-300 text-sm">
            {userInfo ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{userInfo.name}님 반갑습니다.</span>
              </>
            ) : (
              <span>사용자 정보 로딩 중...</span>
            )}
          </div>
        )}
        <div className="flex space-x-3">
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="text-gray-400 px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-50"
            >
              {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
            </button>
          )}
          {!isAuthenticated && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-400 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>로그인이 필요합니다</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={getLoginButtonClasses()}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className={getSignupButtonClasses()}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
