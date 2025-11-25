import { Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axios";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

export const Sidebar = ({ isOpen, onClose, onSearchOpen }: SidebarProps) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    try {
      await axiosInstance.delete("/v1/users");
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login"); // 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-70 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <aside
          className={`fixed top-0 left-0 h-full w-70 bg-neutral-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-pink-500 font-bold text-2xl">돌려돌려LP판</h2>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      onSearchOpen(); // 검색창 열기 실행
                      onClose(); // 사이드바 닫기
                    }}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors w-full text-left"
                  >
                    <Search size={18} />
                    <span className="ml-3">찾기</span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/my"
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <span>
                      <User size={18} />
                    </span>
                    <span className="ml-3">마이페이지</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-gray-700">
              <button
                onClick={() => setShowModal(true)}
                className="w-full px-4 py-3 rounded-lg hover:bg-neutral-800  transition-colors"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </aside>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
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
    </>
  );
};
