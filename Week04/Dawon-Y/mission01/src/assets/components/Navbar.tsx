import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: '홈' },
  { path: '/popular', label: '인기 영화' },
  { path: '/now-playing', label: '상영 중' },
  { path: '/top-rated', label: '평점 높은' },
  { path: '/upcoming', label: '개봉 예정' }
] as const;

export default function Navbar() {
  return (
    <nav className="bg-black">
      <div className="px-10 py-4">
        <div className="flex space-x-10">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 hover:text-white ${
                  isActive ? 'text-green-500' : 'text-gray-500'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}