import { Link } from "react-router-dom";
import burger from "../assets/hamburger-button.svg";
import { useAuth } from "../Context/AuthContext";
import { useSidebar } from "../Context/SidebarContext";
const Navbar = () => {
  const { accessToken, logout, name } = useAuth();
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="bg-gray-800 h-20 p-5 flex justify-between fixed w-full z-50">
      <div className="flex items-center justify-center gap-x-4">
        <button onClick={toggleSidebar} className="p-2">
          <img src={burger} alt="메뉴 열기" />
        </button>
        <Link className="font-bold text-3xl text-pink-600" to={"/"}>
          돌려돌려 돌림판
        </Link>
      </div>
      {!accessToken && ( // 중괄호와 && 연산자로 조건부 렌더링
        <div className="flex items-baseline justify-center gap-4">
          <Link
            className="text-lg rounded-xl text-white h-10 w-25 p-2 bg-black flex items-center justify-center"
            to={"/login"}
          >
            로그인
          </Link>
          <Link
            className="text-lg rounded-xl text-white h-10 w-25 p-2 bg-pink-600 flex items-center justify-center"
            to={"signup"}
          >
            회원가입
          </Link>
        </div>
      )}
      {accessToken && (
        <div className="flex items-baseline justify-center gap-4">
          <div className="text-white font-lg">{name}님 반갑습니다</div>
          <button
            className="text-lg rounded-xl text-white h-10 w-25 p-2 bg-black/60 flex items-center justify-center"
            onClick={logout}
          >
            로그아웃
          </button>
          <Link
            className="text-lg rounded-xl text-white h-10 w-25 p-2 bg-pink-600 flex items-center justify-center"
            to={"/my"}
          >
            마이페이지
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
