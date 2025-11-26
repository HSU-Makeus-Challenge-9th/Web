import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-gray-800 rounded-lg p-6 mx-4 max-w-md w-full">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* 제목과 메시지 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-gray-400">
            LP 상세 정보를 보시려면 먼저 로그인해주세요.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;