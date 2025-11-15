import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../api/auth';
import { getMyLikedLPs, getMyWrittenLPs } from '../api/lps';
import type { UserInfo } from '../types/auth';
import ProfileEditModal from '../components/ProfileEditModal';
import MyProfileInfo from '../components/MyProfileInfo';
import MyLPTabs from '../components/MyLPTabs';
import MyLPGrid from '../components/MyLPGrid';

type TabType = 'liked' | 'written';
type SortOrder = 'desc' | 'asc';

interface LP {
  id: number;
  title: string;
  thumbnail: string;
  author?: {
    id: number;
    name: string;
  };
  authorId?: number;
}

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('liked');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // 사용자 정보
  const { data, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getMyInfo,
  });

  const userInfo = data?.data;

  // LP 목록 가져오기
  const { data: lpsData, isLoading: lpsLoading } = useQuery({
    queryKey: ['myLPs', activeTab, sortOrder],
    queryFn: () => {
      return activeTab === 'liked'
        ? getMyLikedLPs(sortOrder)
        : getMyWrittenLPs(sortOrder);
    },
    enabled: !!userInfo,
  });

  // 내가 작성한 LP는 프론트엔드에서 필터링 (임시 해결책)
  const allLps: LP[] = lpsData?.data?.data || [];
  const lps: LP[] = activeTab === 'written'
    ? allLps.filter((lp: LP) => lp.author?.id === userInfo?.id || lp.authorId === userInfo?.id)
    : allLps;

  const handleUpdateSuccess = (updatedUserInfo: UserInfo) => {
    console.log('Profile updated:', updatedUserInfo);
  };

  if (isLoading) {
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
        <MyProfileInfo userInfo={userInfo} onEditClick={() => setIsEditing(true)} />

        {/* LP 탭 */}
        <div className="mb-8">
          <MyLPTabs
            activeTab={activeTab}
            sortOrder={sortOrder}
            onTabChange={setActiveTab}
            onSortChange={setSortOrder}
          />

          <MyLPGrid lps={lps} isLoading={lpsLoading} />
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