import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PinkButtonSm from "../components/common/PinkButtonSm";
import BlackButtonSm from "../components/common/BlackButtonSm";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { Search } from "lucide-react";
import useSidebar from "../hooks/useSidebar";
import usePostLogout from "../hooks/queries/usePostLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { toggleSidebar } = useSidebar();
  const { mutate: signoutMutate } = usePostLogout();

  const handleLogout = () => {
    signoutMutate();
  };

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };
    getData();
  }, []);

  return (
    <nav className="h-16 bg-gray-950 flex items-center justify-between px-6">
      {/* 왼쪽 메뉴 */}
      <div className="flex justify-center items-center gap-3">
        {/* 햄버거 메뉴 */}
        <span
          className="text-white cursor-pointer hover:text-pink-500 transition-colors"
          onClick={handleToggleSidebar}
        >
          <svg
            width="30"
            height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
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
        </span>

        {/* 돌려돌려LP판 */}
        <span
          className="text-pink-500 font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          돌려돌려LP판
        </span>
      </div>

      {/* 오른쪽 메뉴 */}
      <div>
        <div className="flex items-center gap-3">
          <Search
            className="text-white cursor-pointer hover:text-pink-500 transition-colors"
            size={20}
            onClick={() => navigate("/search")}
          />
          {accessToken && (
            <>
              <BlackButtonSm
                value={`${data?.data.name}님, 반갑습니다.`}
                hoverbg={false}
                onClick={() => navigate("/my")}
              />
              <PinkButtonSm value={"로그아웃"} onClick={handleLogout} />
            </>
          )}

          {!accessToken && (
            <>
              <BlackButtonSm
                value={"로그인"}
                onClick={() => navigate("/login")}
              />
              <PinkButtonSm
                value={"회원가입"}
                onClick={() => navigate("/signup")}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
