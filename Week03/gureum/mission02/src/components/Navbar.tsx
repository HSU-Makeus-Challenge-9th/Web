import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-800 text-xl font-bold">
            MovieApp
          </div>
          
          <div className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-green-500 text-white font-semibold'
                    : 'text-black hover:text-gray-700 hover:bg-gray-100'
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
                    ? 'bg-green-500 text-white font-semibold'
                    : 'text-black hover:text-gray-700 hover:bg-gray-100'
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
                    ? 'bg-green-500 text-white font-semibold'
                    : 'text-black hover:text-gray-700 hover:bg-gray-100'
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
                    ? 'bg-green-500 text-white font-semibold'
                    : 'text-black hover:text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              평점 높은
            </NavLink>
            
            <NavLink
              to="/now-playing"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-green-500 text-white font-semibold'
                    : 'text-black hover:text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              상영 중
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;