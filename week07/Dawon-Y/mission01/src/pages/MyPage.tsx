import { useEffect, useState } from 'react';
import { getMyInfo } from '../api/auth';
import type { UserInfo } from '../types/auth';
import ProfileEditModal from '../components/ProfileEditModal';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getMyInfo();
        setUserInfo(data.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateSuccess = (updatedUserInfo: UserInfo) => {
    setUserInfo(updatedUserInfo);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">마이페이지</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="text-white hover:text-gray-300 text-2xl"
            aria-label="설정"
          >
            ⚙️
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {userInfo.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{userInfo.name}</h2>
              <p className="text-gray-400">{userInfo.bio || '소개가 없습니다.'}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-800">
            <p className="text-gray-300 mb-2">
              <span className="text-gray-500">이메일:</span> {userInfo.email}
            </p>
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달 */}
      {isEditing && (
        <ProfileEditModal
          userInfo={userInfo}
          onClose={() => setIsEditing(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default MyPage;