import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-gray-800 text-xl font-bold hover:text-blue-600">
            MOVIE app
          </NavLink>
          
          <div className="flex items-center space-x-6">
            <div className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-pink-500 text-white font-semibold'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                홈
              </NavLink>
              
              <NavLink
                to="/popular"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-pink-500 text-white font-semibold'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                인기 영화
              </NavLink>
              
              <NavLink
                to="/upcoming"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-pink-500 text-white font-semibold'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                개봉 예정
              </NavLink>
              
              <NavLink
                to="/top-rated"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-pink-500 text-white font-semibold'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                평점 높은
              </NavLink>
            </div>

            <div className="flex space-x-2">
              <NavLink
                to="/login"
                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-pink-500 text-white px-3 py-1 rounded text-sm hover:bg-pink-600 transition-colors"
              >
                회원가입
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;