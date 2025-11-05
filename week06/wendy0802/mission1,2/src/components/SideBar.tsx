import { FaSearch, FaUser, FaAngleDoubleLeft } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-pink-500 text-xl font-bold">DOLIGO</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-pink-500 transition"
        >
          <FaAngleDoubleLeft className="w-6 h-6" />
        </button>
      </div>
      <nav className="p-6">
        <ul className="space-y-6">
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition"
            >
              <FaSearch className="text-lg" />
              <span>찾기</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition"
            >
              <FaUser className="text-lg" />
              <span>마이페이지</span>
            </a>
          </li>
        </ul>
        <div className="absolute bottom-6 left-6">
          <a
            href="#"
            className="text-gray-400 hover:text-red-500 transition text-sm"
          >
            탈퇴하기
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
