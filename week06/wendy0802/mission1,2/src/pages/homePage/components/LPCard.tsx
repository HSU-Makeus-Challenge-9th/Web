import { useNavigate } from "react-router-dom";

interface LPCardProps {
  lp: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    likes?: Array<{ id: number; userId: number; lpId: number }>;
  };

  onClick: () => void;
}

const LPCard = ({ lp }: LPCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };
  return (
    <div
      className="relative group cursor-pointer hover: scale-105 tramsition-transform"
      onClick={handleClick}
    >
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-800">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error(
              `Failed to load thumbnail for LP ${lp.id}:`,
              lp.thumbnail
            );
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg0black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 text-white text-center px-4">
            <h3 className="font-bold text-lg mb-1">{lp.title}</h3>
            <p className="text-sm">{lp.content}</p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between text-gray-400 text-sm mt-1">
          <div className="flex items-center gap-1">
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPCard;
