import { useEffect, useState } from "react";
import type { LpItem } from "../../types/lp";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: LpItem;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const updatedTime = new Date(lp.updatedAt);

      // 밀리초 단위 차이
      const diffMs = now.getTime() - updatedTime.getTime();

      // 각 단위로 변환
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      // 표시 로직
      if (diffDays > 0) {
        setTimeAgo(`${diffDays}일 전`);
      } else if (diffHours > 0) {
        setTimeAgo(`${diffHours}시간 전`);
      } else if (diffMinutes > 0) {
        setTimeAgo(`${diffMinutes}분 전`);
      } else {
        setTimeAgo("방금 전");
      }
    };

    calculateTimeAgo();
  }, [lp.updatedAt]);

  return (
    <div
      onClick={() => navigate(`/v1/lps/${lp.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105"
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)}
    >
      <img
        src={lp.thumbnail}
        alt={`${lp.title}의 이미지`}
        className="w-full aspect-square object-cover rounded"
        onClick={() => navigate(`/lp/${lp.id}`)}
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-end p-4 text-white">
          <div className="text-sm font-bold leading-snug">{lp.title}</div>
          <p className="text-xs text-gray-300 leading-relaxed mt-2">
            {timeAgo}
          </p>
        </div>
      )}
    </div>
  );
};

export default LpCard;
