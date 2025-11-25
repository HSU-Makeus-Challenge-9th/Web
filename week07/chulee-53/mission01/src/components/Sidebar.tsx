import { Link, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../apis/axios";

const Sidebar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ 탈퇴 확인 모달 상태
  const navigate = useNavigate();

  // ✅ 탈퇴 API 요청 함수
  const handleWithdraw = async () => {
    try {
      await axiosInstance.delete("/v1/users"); // Swagger 명세에 맞게 엔드포인트 조정
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login"); // ✅ 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col h-full px-6 py-6">
      <nav className="flex flex-col gap-6">
        {/* 🔍 찾기 버튼 or 검색창 */}
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

        {/* 👤 마이페이지 */}
        <Link
          to="/my"
          className="flex items-center gap-2 hover:text-pink-400 transition-colors"
        >
          <User size={18} />
          마이페이지
        </Link>
      </nav>

      {/* ⚠️ 탈퇴 버튼 */}
      <div className="flex justify-center mt-auto mb-4 text-sm">
        <button
          className="hover:text-pink-400 transition-colors"
          onClick={() => setShowModal(true)}
        >
          탈퇴하기
        </button>
      </div>

      {/* ✅ 탈퇴 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-[#2b2b2b] text-white p-20 rounded-lg shadow-2xl w-[90%] max-w-sm text-center">
            {/* 닫기(X) 버튼 */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-5 cursor-pointer"
            >
              ✕
            </button>

            {/* 내용 */}
            <h2 className="text-lg font-medium mb-6">정말 탈퇴하시겠습니까?</h2>

            <div className="flex justify-center gap-8">
              <button
                className="px-10 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-200 transition font-semibold"
                onClick={handleWithdraw}
              >
                예
              </button>
              <button
                className="px-6 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-400 transition font-semibold"
                onClick={() => setShowModal(false)}
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
