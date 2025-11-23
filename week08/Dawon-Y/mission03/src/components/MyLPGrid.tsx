import { Link } from 'react-router-dom';

interface LP {
  id: number;
  title: string;
  thumbnail: string;
}

interface MyLPGridProps {
  lps: LP[];
  isLoading: boolean;
}

const MyLPGrid = ({ lps, isLoading }: MyLPGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (lps.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">LP가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {lps.map((lp) => (
        <Link
          key={lp.id}
          to={`/lp/${lp.id}`}
          className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
        </Link>
      ))}
    </div>
  );
};

export default MyLPGrid;