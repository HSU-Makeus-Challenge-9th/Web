import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState, useEffect } from 'react';
import { fetchLpDetail } from '../services/lpApi';
import { ArrowLeft, Calendar, User, Heart, Edit, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import LoginRequiredModal from '../components/common/LoginRequiredModal';
import CommentList from '../components/comments/CommentList';
import CommentForm from '../components/comments/CommentForm';

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 비로그인 사용자 체크 및 모달 표시
  useEffect(() => {
    if (!accessToken) {
      setShowLoginModal(true);
    }
  }, [accessToken]);

  // 로그인 페이지로 이동 (현재 URL을 from으로 저장)
  const handleLoginRedirect = () => {
    const currentPath = location.pathname;
    navigate('/login', { 
      state: { from: currentPath },
      replace: true 
    });
  };

  // 홈으로 돌아가기
  const handleGoHome = () => {
    setShowLoginModal(false);
    navigate('/', { replace: true });
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['lp', lpId],
    queryFn: () => fetchLpDetail(Number(lpId)),
    enabled: !!lpId && !!accessToken, // 로그인된 사용자만 데이터 패칭
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });

  // 로그인 모달 렌더링
  if (showLoginModal) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 text-white" />
        <LoginRequiredModal
          isOpen={showLoginModal}
          onClose={handleGoHome}
          onConfirm={handleLoginRedirect}
        />
      </>
    );
  }

  if (isLoading) {
    return <LpDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">오류가 발생했습니다</h2>
          <p className="text-gray-400 mb-6">LP를 불러올 수 없습니다.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const lp = data?.data;
  if (!lp) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">LP를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          돌아가기
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 썸네일 섹션 */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-6">
            {/* 제목 */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {lp.author.name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(lp.createdAt)}
                </div>
              </div>
            </div>

            {/* 태그 */}
            {lp.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {lp.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-gray-700 text-sm rounded-full"
                  >
                    # {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* 좋아요 */}
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span className="text-lg font-semibold">{lp.likes.length}</span>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
                좋아요
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
                수정
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
            </div>
          </div>
        </div>

        {/* 본문 섹션 */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">상세 내용</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                {lp.content}
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-12 space-y-6">
          {/* 댓글 작성 폼 */}
          <CommentForm 
            lpId={lp.id}
            onSubmit={(content) => {
              // 추후 댓글 작성 API 연동
              console.log('댓글 작성:', content);
            }}
          />

          {/* 댓글 목록 */}
          <CommentList lpId={lp.id} />
        </div>
      </div>
    </div>
  );
};

// 로딩 스켈레톤 컴포넌트
const LpDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white animate-pulse">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 스켈레톤 */}
        <div className="w-20 h-6 bg-gray-700 rounded mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 썸네일 스켈레톤 */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-gray-700"></div>
          </div>

          {/* 정보 스켈레톤 */}
          <div className="space-y-6">
            {/* 제목 스켈레톤 */}
            <div>
              <div className="w-3/4 h-8 bg-gray-700 rounded mb-2"></div>
              <div className="flex gap-4">
                <div className="w-20 h-4 bg-gray-700 rounded"></div>
                <div className="w-24 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* 태그 스켈레톤 */}
            <div className="flex gap-2">
              <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
              <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
              <div className="w-18 h-6 bg-gray-700 rounded-full"></div>
            </div>

            {/* 좋아요 스켈레톤 */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-700 rounded"></div>
              <div className="w-8 h-6 bg-gray-700 rounded"></div>
            </div>

            {/* 버튼 스켈레톤 */}
            <div className="flex gap-3">
              <div className="w-20 h-10 bg-gray-700 rounded-lg"></div>
              <div className="w-16 h-10 bg-gray-700 rounded-lg"></div>
              <div className="w-16 h-10 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* 본문 스켈레톤 */}
        <div className="mt-12">
          <div className="w-32 h-6 bg-gray-700 rounded mb-4"></div>
          <div className="bg-gray-800 rounded-lg p-6 space-y-3">
            <div className="w-full h-4 bg-gray-700 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-700 rounded"></div>
            <div className="w-4/5 h-4 bg-gray-700 rounded"></div>
            <div className="w-full h-4 bg-gray-700 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;