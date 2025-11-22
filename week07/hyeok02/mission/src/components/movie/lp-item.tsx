import { useNavigate } from "react-router-dom";
import type { LpDataType } from "../../types/lp";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { AiOutlineHeart } from "react-icons/ai";

type Props = {
  lp: LpDataType;
};

const LPItem = ({ lp }: Props) => {
  const navigate = useNavigate();
  // 로그인 상태 확인용
  const accessToken = localStorage.getItem("accessToken");

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인을 해야 이용할 수 있습니다.");
      navigate("/login");
      return;
    }
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-full aspect-square rounded overflow-visible cursor-pointer
                 shadow-md transition-transform duration-300 hover:scale-105 z-10"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0
                      group-hover:opacity-100 transition-opacity duration-200
                      flex flex-col justify-end px-4 py-4 text-white">
        <h3 className="text-lg font-semibold mb-2">{lp.title}</h3>
        <p className="text-sm mb-2">
          {formatDistanceToNow(new Date(lp.createdAt), {
            addSuffix: true,
            locale: ko,
          })}
        </p>
        <div className="flex items-center">
          <div className="flex items-center gap-1 text-sm mr-4">
            <AiOutlineHeart className="text-white" />
            <span>{lp.likes?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPItem;
