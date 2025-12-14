import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLogout } from "../../hooks/auth/uselogout";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);

  const { mutate: logoutMutate } = useLogout();

  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedNickname = localStorage.getItem("nickname");
      setIsLoggedIn(!!accessToken);
      setNickname(storedNickname);
    };

    checkAccessToken();
    window.addEventListener("storage", checkAccessToken);

    return () => window.removeEventListener("storage", checkAccessToken);
  }, []);

  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedNickname = localStorage.getItem("nickname");
      setIsLoggedIn(!!accessToken);
      setNickname(storedNickname);
    };

    checkAccessToken();
  }, [location.pathname]);

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        setIsLoggedIn(false);
        setNickname(null);
        navigate("/");
      },
    });
  };

  return (
    <nav className="w-full bg-zinc-900 py-4 px-5 flex justify-between items-center text-sm select-none">
      <div className="flex items-center gap-2">
        <button onClick={onToggleSidebar} className="text-white text-2xl">
          <HiOutlineMenu />
        </button>
        <Link
          to="/"
          className="text-[20px] font-bold text-[#FF007F] no-underline cursor-pointer"
        >
          앨빈의 LP판
        </Link>
      </div>
      <div className="flex space-x-2 items-center">
        <AiOutlineSearch className="text-white text-xl" />
        {isLoggedIn ? (
          <>
            <span className="text-white">{nickname}님 반갑습니다.</span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 text-white"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-gray-800 px-3 py-1 rounded text-white">
              로그인
            </Link>
            <Link to="/signup" className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 text-white">
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
