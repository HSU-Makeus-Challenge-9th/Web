import type { Lp } from '../../types/api';
import { useNavigate } from 'react-router-dom';

interface LpCardProps {
  lp: Lp;
  onClick?: () => void;
}

const LpCard = ({ lp, onClick }: LpCardProps) => {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
      onClick={onClick || (() => navigate(`/lps/${lp.id}`))}
    >
      {/* LP 썸네일 이미지 */}
      <img
        src={lp.thumbnail || '/placeholder-image.svg'}
        alt={lp.title}
        className="w-full h-auto aspect-square object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder-image.svg';
        }}
      />

      {/* 비공개 표시 */}
      {!lp.published && (
        <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded text-xs z-10">
          비공개
        </div>
      )}
      
      {/* 호버 시 나타나는 상세 정보 */}
      <div className="absolute inset-0 bg-gray bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100">
        {/* 제목 */}
        <h3 className="text-xl font-bold text-center mb-4 text-white leading-tight">
          {lp.title}
        </h3>
        
        {/* 내용 */}
        <p className="text-sm text-gray-200 text-center mb-4 line-clamp-3 leading-relaxed max-w-full">
          {lp.content}
        </p>
        
        {/* 태그들 */}
        {lp.tags && lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {lp.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="bg-pink-500 bg-opacity-40 text-pink-100 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag.name}
              </span>
            ))}
            {lp.tags.length > 3 && (
              <span className="text-gray-300 text-xs px-2 py-1 font-medium">
                +{lp.tags.length - 3}개 더
              </span>
            )}
          </div>
        )}

        {/* 메타 정보 */}
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* 좋아요 */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-red-400 font-semibold text-sm">
              {lp.likes?.length || 0}
            </span>
          </div>
          
          {/* 업로드일 */}
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-300 text-sm">
              {formatDate(lp.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;