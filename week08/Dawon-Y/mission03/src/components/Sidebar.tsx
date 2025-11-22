import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { deleteAccountAPI } from '../api/auth';
import DeleteAccountModal from './DeleteAccountModal';
import SidebarOverlay from './SidebarOverlay';
import SidebarMenu from './SidebarMenu';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 배경 스크롤 방지 (모바일에서만)
  useBodyScrollLock(isOpen);

  // 메뉴 아이템
  const menuItems = isAuthenticated
    ? [{ path: '/mypage', label: '마이페이지' }]
    : [];

  // 회원탈퇴 mutation
  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccountAPI,
    onSuccess: () => {
      logout();
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/login');
      onClose();
      setShowDeleteModal(false);
    },
    onError: (error: Error) => {
      alert(error?.message || '회원 탈퇴에 실패했습니다.');
    },
  });

  const handleSearchClick = () => {
    navigate('/search');
    onClose();
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      <SidebarOverlay isOpen={isOpen} onClose={onClose} />

      {/* 사이드바 */}
      <aside
        className={`
          fixed left-0 top-16 w-48 bg-black border-r border-gray-800 h-[calc(100vh-4rem)] p-6 flex flex-col z-50 transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* 메뉴 */}
        <SidebarMenu
          menuItems={menuItems}
          onItemClick={onClose}
          onSearchClick={handleSearchClick}
          currentPath={location.pathname}
        />

        {/* 탈퇴하기 버튼 */}
        {isAuthenticated && (
          <div className="mt-auto pt-4 border-t border-gray-800">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              탈퇴하기
            </button>
          </div>
        )}
      </aside>

      {/* 탈퇴 확인 모달 */}
      {showDeleteModal && (
        <DeleteAccountModal
          onConfirm={() => deleteAccountMutation.mutate()}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={deleteAccountMutation.isPending}
        />
      )}
    </>
  );
};

export default Sidebar;