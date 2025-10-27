import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다');
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-pink-500 text-2xl font-bold">
          플러플러LP판
        </Link>
        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                회원가입
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 rounded-lg border border-white hover:bg-gray-800"
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;