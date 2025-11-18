import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
const navigate = useNavigate();

  const formattedDate = new Date(lp.updatedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleClick = () => {
    navigate(`/lps/${lp.id}`);
  }

  return (
    <div
    onClick={handleClick}
      className="relative overflow-hidden bg-neutral-900 shadow-md 
                 transition-all duration-300 ease-out 
                 hover:scale-120 hover:shadow-2xl hover:z-10 cursor-pointer"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-60 transition-all duration-300 ease-out hover:brightness-75"
      />

      <div
        className="absolute inset-0 flex flex-col justify-end 
                   p-3 bg-black/60 opacity-0 hover:opacity-100 
                   transition-opacity duration-300 ease-out"
      >
        <h3 className="text-white text-md font-semibold mb-1 truncate">
          {lp.title}
        </h3>
        <div className="text-white text-xs flex justify-between">
          <span>{formattedDate}</span>
          <span>♥ {lp.likes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
