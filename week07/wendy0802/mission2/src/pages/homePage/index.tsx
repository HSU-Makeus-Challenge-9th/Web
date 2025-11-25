import { useEffect, useState } from "react";
import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import LPCard from "./components/LPCard";
import { useInfiniteLps } from "../../hooks/useInfiniteLps";
import Modal from "../../components/Modal";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../apis/profile";
import { useNavigate } from "react-router-dom";
// 무한 스크롤 자동 트리거는 사용하지 않습니다. (더 보기 버튼만 사용)

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteLps(order);

  // pages 배열을 flatMap으로 변환
  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      // 인증정보 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsDeleteOpen(false);
      navigate("/login", { replace: true });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "탈퇴 중 오류가 발생했습니다.";
      alert(msg);
    },
  });

  // SideBar -> Header -> window 이벤트를 통해 모달 열기
  // 홈 진입 시 한 번만 바인딩
  useEffect(() => {
    const openHandler = () => setIsDeleteOpen(true);
    window.addEventListener("open-delete-account-modal", openHandler);
    return () => {
      window.removeEventListener("open-delete-account-modal", openHandler);
    };
  }, []);

  const handleLPClick = (lpId: number) => {
    console.log("LP clicked:", lpId);
  };

  // 자동 스크롤 로딩 비활성화: 더 보기 버튼으로만 다음 페이지를 로드합니다.

  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          {/* 정렬 버튼 */}
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => setOrder("asc")}
              className={`px-4 py-2 rounded-lg transition ${
                order === "asc"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`px-4 py-2 rounded-lg transition ${
                order === "desc"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              최신순
            </button>
          </div>

          {/* 로딩 상태 - 스켈레톤 */}
          {isLoading && (
            <div className="grid grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-800 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}

          {/* 에러 상태 */}
          {isError && (
            <div className="text-center py-20">
              <div className="text-red-500 mb-4">
                {error instanceof Error
                  ? error.message
                  : "오류가 발생했습니다."}
              </div>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* LP 그리드 */}
          {!isLoading && !isError && lps.length > 0 && (
            <>
              <div className="grid grid-cols-5 gap-4">
                {lps.map((lp) => (
                  <LPCard
                    key={lp.id}
                    lp={lp}
                    onClick={() => handleLPClick(lp.id)}
                  />
                ))}
              </div>
              {/* 다음 페이지 로딩 중 */}
              {isFetchingNextPage && (
                <div className="mt-8 grid grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-gray-800 rounded-lg mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              )}
              {/* 더 보기 버튼 (선택사항) */}
              {hasNextPage && !isFetchingNextPage && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => fetchNextPage()}
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                  >
                    더 보기
                  </button>
                </div>
              )}
            </>
          )}

          {/* LP가 없을 때 */}
          {!isLoading && !isError && lps.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              LP가 없습니다.
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div className="w-full max-w-sm space-y-5">
          <h3 className="text-lg font-semibold text-white">
            정말 탈퇴하시겠어요?
          </h3>
          <p className="text-sm text-gray-300">
            계정을 삭제하면 복구할 수 없습니다. 계속 진행하려면 확인을 눌러주세요.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
            >
              취소
            </button>
            <button
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              {deleteMutation.isPending ? "처리 중..." : "확인"}
            </button>
          </div>
        </div>
      </Modal>
      <FloatingButton />
    </>
  );
};

export default HomePage;
