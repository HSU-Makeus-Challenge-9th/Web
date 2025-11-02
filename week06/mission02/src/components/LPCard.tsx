import { useNavigate } from 'react-router-dom';
import type { LP } from '../types/lp';

interface LPCardProps {
  lp: LP;
}

const LPCard = ({ lp }: LPCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // 분 단위

    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer relative aspect-square overflow-hidden rounded-lg"
    >
      {/* 이미지 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.src = `https://via.placeholder.com/400x400?text=No+Image`;
        }}
      />

      {/* Hover 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
        {/* 제목 */}
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
          {lp.title}
        </h3>

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>{formatDate(lp.createdAt)}</span>
          <span className="flex items-center gap-1">
            ❤️ {lp.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LPCard;