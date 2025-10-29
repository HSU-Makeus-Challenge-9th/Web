import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  active?: 'login' | 'signup';
}

const Navbar = ({ active }: NavbarProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const loginButtonClasses = [
    'text-white px-4 py-2 border border-gray-600 rounded text-sm transition-colors',
    active === 'login' ? 'bg-gray-800 cursor-default' : 'hover:bg-gray-800'
  ].join(' ');

  const signupButtonClasses = [
    'bg-pink-500 text-white px-4 py-2 rounded text-sm transition-colors',
    active === 'signup' ? 'cursor-default hover:bg-pink-600' : 'hover:bg-pink-600'
  ].join(' ');

  return (
    <header className="flex justify-between items-center p-6">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="text-pink-500 text-xl font-bold hover:text-pink-400 transition-colors"
      >
        돌려돌려 LP판
      </button>
      <div className="flex space-x-3">
        {accessToken && (
          <button
            type="button"
            onClick={() => navigate('/my')}
            className="text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
          >
            마이페이지
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className={loginButtonClasses}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className={signupButtonClasses}
        >
          회원가입
        </button>
      </div>
    </header>
  );
};

export default Navbar;
