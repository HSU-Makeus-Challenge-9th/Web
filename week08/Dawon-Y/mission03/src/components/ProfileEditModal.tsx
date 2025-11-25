import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileAPI } from '../api/auth';
import type { UserInfo } from '../types/auth';

interface ProfileEditModalProps {
  userInfo: UserInfo;
  onClose: () => void;
  onSuccess: (updatedUserInfo: UserInfo) => void;
}

const ProfileEditModal = ({ userInfo, onClose, onSuccess }: ProfileEditModalProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(userInfo.name || '');
  const [bio, setBio] = useState(userInfo.bio || '');
  const [avatar, setAvatar] = useState(userInfo.avatar || '');
  const [previewImage, setPreviewImage] = useState(userInfo.avatar || '');

  // 프로필 수정 mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateProfileAPI,
    onMutate: async (newProfile) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['userInfo'] });

      // 이전 값 저장
      const previousProfile = queryClient.getQueryData<{ data: UserInfo }>(['userInfo']);

      // Optimistic Update: 즉시 UI 업데이트
      queryClient.setQueryData<{ data: UserInfo }>(['userInfo'], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            ...newProfile,
          },
        };
      });

      // 에러 시 롤백을 위해 이전 값 반환
      return { previousProfile };
    },
    onSuccess: (response) => {
      onSuccess(response.data);
      onClose();
      alert('프로필이 수정되었습니다!');
    },
    onError: (error: Error, _newProfile, context) => {
      // 에러 발생 시 이전 값으로 롤백
      if (context?.previousProfile) {
        queryClient.setQueryData(['userInfo'], context.previousProfile);
      }
      alert(error?.message || '프로필 수정에 실패했습니다.');
    },
    onSettled: () => {
      // 성공/실패 관계없이 최신 데이터로 refetch
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const handleSubmit = () => {
    const updateData: Partial<{ name: string; bio: string; avatar: string }> = {};
    
    // 변경된 값만 전송
    if (name !== userInfo.name) updateData.name = name;
    if (bio !== (userInfo.bio || '')) updateData.bio = bio;
    if (avatar !== (userInfo.avatar || '')) updateData.avatar = avatar;

    // 변경된 것이 없으면
    if (Object.keys(updateData).length === 0) {
      onClose();
      return;
    }

    updateProfileMutation.mutate(updateData);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl w-full max-w-3xl border border-gray-700 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">프로필 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
            disabled={updateProfileMutation.isPending}
          >
            ×
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="p-8">
          <div className="flex gap-8 items-start">
            {/* 좌측: 프로필 이미지 */}
            <div className="flex-shrink-0">
              <div
                onClick={handleImageClick}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* 우측: 폼 */}
            <div className="flex-1 space-y-4">
              {/* 이름 */}
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  className="w-full bg-transparent border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                  disabled={updateProfileMutation.isPending}
                />
              </div>

              {/* Bio */}
              <div>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                  disabled={updateProfileMutation.isPending}
                />
              </div>

              {/* 이메일 (읽기 전용) */}
              <div>
                <input
                  type="email"
                  value={userInfo.email}
                  disabled
                  className="w-full bg-gray-800 border border-gray-700 text-gray-500 px-4 py-3 rounded-lg cursor-not-allowed"
                />
              </div>
            </div>

            {/* 우측 상단: 체크 버튼 */}
            <div className="flex-shrink-0">
              <button
                onClick={handleSubmit}
                disabled={updateProfileMutation.isPending}
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white text-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✓
              </button>
            </div>
          </div>

          {/* 프로필 이미지 URL (숨김 - 선택사항) */}
          <input
            type="hidden"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;