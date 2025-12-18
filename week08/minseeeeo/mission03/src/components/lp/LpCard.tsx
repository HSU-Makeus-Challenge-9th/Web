import { memo, useEffect, useState } from "react";
import type { LpItem } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import { calculateTimeAgo } from "../../utils/time";

interface LpCardProps {
  lp: LpItem;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const navigate = useNavigate();

  // n분 전 계산
  useEffect(() => {
    calculateTimeAgo({ date: lp.updatedAt, setTimeAgo });
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

export default memo(LpCard);
