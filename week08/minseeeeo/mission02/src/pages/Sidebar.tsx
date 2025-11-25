import { DoorClosed, Search, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDeleteUser from "../hooks/queries/useDeleteUser";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSignOutOpen, setIsSignoutOpen] = useState(false);
  const { mutate: deleteUserMutate } = useDeleteUser();

  const handleSignOut = () => {
    deleteUserMutate(undefined, {
      onSuccess: () => {
        setIsSignoutOpen(false);
        alert("회원 탈퇴가 완료되었습니다.");
      },
    });
  };

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
      <div
        className="text-white flex justify-left items-center m-5 gap-2 cursor-pointer hover:text-pink-500 transition-colors"
        onClick={() => setIsSignoutOpen(true)}
      >
        <DoorClosed size={20} />
        탈퇴하기
      </div>
      {isSignOutOpen && (
        <div
          className="fixed z-50 inset-0 flex justify-center items-center bg-black/70"
          onClick={() => setIsSignoutOpen(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-20 flex flex-col items-center gap-6 relative max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsSignoutOpen(false)}
              className="absolute top-3 right-5 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>

            {/* 메시지 */}
            <p className="text-white text-lg text-center">
              정말 탈퇴하시겠습니까?
            </p>

            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={handleSignOut}
                className="px-8 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
              >
                예
              </button>
              <button
                onClick={() => setIsSignoutOpen(false)}
                className="px-8 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
