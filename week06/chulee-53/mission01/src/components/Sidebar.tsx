import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useState } from "react";


const Sidebar = () => {
  const [isSearching, setIsSearching] = useState(false); // 찾기 클릭 여부 상태
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col h-full px-6 py-6">
      <nav className="flex flex-col gap-6">
        {!isSearching ? (
          <button
            onClick={() => setIsSearching(true)}
            className="flex items-center gap-2 hover:text-pink-400 transition-colors"
          >
            <Search size={18} />
            찾기
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Search size={18} className="text-gray-300" />
            <input
              className="border border-gray-400 rounded-sm px-2 py-1 text-black w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              onBlur={() => setIsSearching(false)}
            />
          </div>
        )}

        <Link
          to="/my"
          className="flex items-center gap-2 hover:text-pink-400 transition-colors"
        >
          <User size={18} />
          마이페이지
        </Link>
      </nav>

      <div className="flex justify-center mt-auto mb-4 text-sm">
        <button className="hover:text-pink-400 transition-colors">
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
