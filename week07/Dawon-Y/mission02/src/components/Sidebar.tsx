import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { deleteAccountAPI } from '../api/auth';
import DeleteAccountModal from './DeleteAccountModal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const menuItems = [
    { path: '/', label: '찾기' },
  ];

  const authMenuItems = isAuthenticated
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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteAccountMutation.mutate();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed left-0 top-16 w-48 bg-black border-r border-gray-800 h-[calc(100vh-4rem)] p-6 flex flex-col z-50 transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="space-y-4 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-2 py-2 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}

          {authMenuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-2 py-2 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {isAuthenticated && (
          <div className="mt-auto pt-4 border-t border-gray-800">
            <button
              onClick={handleDeleteClick}
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
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={deleteAccountMutation.isPending}
        />
      )}
    </>
  );
};

export default Sidebar;