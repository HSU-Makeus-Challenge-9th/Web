import { useEffect, useState } from 'react';
import { getMyInfo } from '../api/auth';
import type { UserInfo } from '../types/auth';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔒 마이페이지</h1>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">내 정보</h2>
          {userInfo ? (
            <>
              <p className="text-gray-300 mb-2">이메일: {userInfo.email}</p>
              <p className="text-gray-300">이름: {userInfo.name}</p>
            </>
          ) : (
            <p className="text-gray-500">정보를 불러올 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;