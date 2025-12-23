import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { HamburgerButton } from "./HamburgerButton";
import { useSidebar } from "../hooks/useSidebar";
import { Sidebar } from "./Sidebar";

const Navbar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, toggle, close } = useSidebar();

  const debouncedValue = useDebounce(searchTerm, 400);
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: handleLogout, isPending } = useLogout();

  // debounce 검색 적용
  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      navigate(`/?q=${debouncedValue}`);
    }
  }, [debouncedValue]);

  const toggleSearch = () => {
    setIsSearching((prev) => !prev);
    if (isSearching) {
      setSearchTerm("");
      navigate("/");
    }
  };

  const openSearch = () => {
    setIsSearching(true);
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 bg-neutral-900 text-white relative">
      <div className="flex items-center gap-4">
        <HamburgerButton isOpen={isOpen} onClick={toggle} />
        <Link to="/" className="text-pink-500 font-bold text-2xl">
          돌려돌려LP판
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {!accessToken ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-pink-500 rounded-md hover:bg-pink-700 transition-colors"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={toggleSearch}
              className="flex items-center gap-2 hover:text-pink-400 transition-colors"
            >
              {isSearching ? <X size={22} /> : <Search size={18} />}
            </button>

            <Link to="/my" className="py-2 text-md">
              {me?.data?.name}님 반갑습니다.
            </Link>

            <button
              onClick={() => handleLogout()}
              disabled={isPending}
              className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? "로그아웃 중..." : "로그아웃"}
            </button>
          </>
        )}
      </div>

      {/* 검색창 */}
      {isSearching && (
        <div className="absolute top-20 left-0 w-full flex z-50">
          {/* 검색바 박스 */}
          <div className="w-full bg-neutral-900 shadow-lg pt-5 pb-60">
            <div className="max-w-lg mx-auto w-full">
              {/* 검색 인풋 라인 */}
              <div className="flex items-center gap-3 mb-4">
                <Search size={22} />
                <input
                  type="text"
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none border-b-1 text-lg"
                />
                <select className=" text-white px-3 py-1 rounded-md border text-md">
                  <option>제목</option>
                  <option>내용</option>
                </select>
              </div>
              {/* 최근 검색어 박스 */}
              <div>
                <a className="mb-2 mr-2 text-lg">최근 검색어</a>
                <button className="text-gray-500 text-sm hover:text-gray-300">
                  모두 지우기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Sidebar isOpen={isOpen} onClose={close} onSearchOpen={openSearch} />
    </nav>
  );
};

export default Navbar;
