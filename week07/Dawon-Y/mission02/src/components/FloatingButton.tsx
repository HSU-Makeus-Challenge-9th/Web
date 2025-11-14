import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import WriteModal from './WriteModal';

const FloatingButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      // 로그인 상태면 모달 열기
      setIsModalOpen(true);
    } else {
      // 비로그인 상태면 로그인 페이지로
      navigate('/login');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-8 right-8 w-14 h-14 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all hover:scale-110 flex items-center justify-center text-3xl z-50"
        aria-label="추가"
      >
        +
      </button>

      <WriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingButton;