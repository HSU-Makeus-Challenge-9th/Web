import { Link } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { accessToken, logout } = useAuth();

  return (
    <nav className="bg-gray-800 h-20 p-5 flex justify-between">
      <Link className="font-bold text-3xl text-pink-600" to={"/"}>
        돌려돌려 돌림판
      </Link>
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
          <button
            className="text-lg rounded-xl text-white h-10 w-25 p-2 bg-sky-600 flex items-center justify-center"
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
