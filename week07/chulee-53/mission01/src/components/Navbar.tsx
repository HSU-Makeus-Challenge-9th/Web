import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

type NavbarProps = {
  onSidebarToggle?: () => void;
};

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: handleLogout, isPending } = useLogout();

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 bg-neutral-900 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>

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
            <Link to="/my" className="py-2 text-sm text-gray-300">
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
    </nav>
  );
};

export default Navbar;
