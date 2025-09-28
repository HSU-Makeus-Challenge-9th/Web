import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { path: '/', label: '홈' },
    { path: '/popular', label: '인기 영화' },
    { path: '/now-playing', label: '상영 중' },
    { path: '/top-rated', label: '평점 높은' },
    { path: '/upcoming', label: '개봉 예정' }
  ];

  return (
    <nav className="bg-black">
      <div className="px-8 py-4">
        <div className="flex space-x-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                background: 'none',
                textDecoration: 'none',
                border: 'none',
                outline: 'none',
                marginRight: 10,
                marginBottom: 10,
                color: isActive ? '#10b981' : '#898989ff'  // 초록색 : 회색
              })}
              className="text-lg font-medium transition-colors duration-200 hover:!text-white"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}