import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  path: string;
  label: string;
}

interface SidebarMenuProps {
  menuItems: MenuItem[];
  onItemClick: () => void;
  onSearchClick: () => void;
  currentPath: string;
}

const SidebarMenu = ({ menuItems, onItemClick, onSearchClick, currentPath }: SidebarMenuProps) => {
  const location = useLocation();

  return (
    <nav className="space-y-4 flex-1">
      {/* 찾기 버튼 */}
      <button
        onClick={onSearchClick}
        className={`flex items-center gap-3 px-2 py-2 transition-colors w-full text-left ${
          currentPath === '/search' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        <svg
          className="w-6 h-6"
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
        <span className="text-base">찾기</span>
      </button>

      {/* 동적 메뉴 아이템 */}
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-2 py-2 transition-colors ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-base">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;