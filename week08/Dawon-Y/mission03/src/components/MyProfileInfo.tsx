import type { UserInfo } from '../types/auth';

interface MyProfileInfoProps {
  userInfo: UserInfo;
  onEditClick: () => void;
}

const MyProfileInfo = ({ userInfo, onEditClick }: MyProfileInfoProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">마이페이지</h1>
        <button
          onClick={onEditClick}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="설정"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* 프로필 정보 - 배경 제거, border로 구분 */}
      <div className="mb-8 pb-8 border-b border-gray-800">
        <div className="flex items-center gap-6">
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
            <p className="text-gray-400 mb-2">{userInfo.bio || '소개가 없습니다.'}</p>
            <p className="text-gray-500 text-sm">{userInfo.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfileInfo;