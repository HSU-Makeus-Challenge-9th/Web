import { DoorClosed, Search, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-between">
      {/* 상단 메뉴 2개 */}
      <div>
        <div
          className="text-white flex justify-left items-center m-5 gap-2 cursor-pointer hover:text-pink-500 transition-colors"
          onClick={() => navigate("/search")}
        >
          <Search size={20} />
          찾기
        </div>
        <div
          className="text-white flex justify-left items-center m-5 gap-2 cursor-pointer hover:text-pink-500 transition-colors"
          onClick={() => navigate("/my")}
        >
          <UserRound size={20} />
          마이페이지
        </div>
      </div>

      {/* 하단 메뉴 1개 */}
      <div>
        <div className="text-white flex justify-left items-center m-5 gap-2 cursor-pointer hover:text-pink-500 transition-colors">
          <DoorClosed size={20} onClick={() => navigate("/")} />
          탈퇴하기
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
