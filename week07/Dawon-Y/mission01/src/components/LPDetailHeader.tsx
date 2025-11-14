import { formatDate } from '../utils/dateFormat';

interface LPDetailHeaderProps {
  authorName: string;
  createdAt: string;
}

const LPDetailHeader = ({ authorName, createdAt }: LPDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white text-xl">👤</span>
        </div>
        <p className="text-white font-medium">{authorName}</p>
      </div>
      <p className="text-gray-400 text-sm">{formatDate(createdAt)}</p>
    </div>
  );
};

export default LPDetailHeader;