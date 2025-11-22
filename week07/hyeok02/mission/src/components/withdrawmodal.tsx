import { useWithdrawUser } from "../hooks/usewithdraw";

interface WithdrawModalProps {
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onClose }) => {
  const { mutate } = useWithdrawUser();

  const handleConfirm = () => {
    mutate(undefined, {
      onSuccess: () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";  // ✅ 페이지 새로고침으로 홈으로 강제 이동
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-neutral-900 rounded-xl p-8 w-[320px] text-center shadow-lg border border-gray-700">
        <p className="text-white text-lg font-semibold mb-6">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="flex-1 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
