type TabType = 'liked' | 'written';
type SortOrder = 'desc' | 'asc';

interface MyLPTabsProps {
  activeTab: TabType;
  sortOrder: SortOrder;
  onTabChange: (tab: TabType) => void;
  onSortChange: (order: SortOrder) => void;
}

const MyLPTabs = ({ activeTab, sortOrder, onTabChange, onSortChange }: MyLPTabsProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => onTabChange('liked')}
          className={`pb-2 px-4 text-lg font-medium transition-colors ${
            activeTab === 'liked'
              ? 'text-white border-b-2 border-pink-500'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          내가 좋아요 한 LP
        </button>
        <button
          onClick={() => onTabChange('written')}
          className={`pb-2 px-4 text-lg font-medium transition-colors ${
            activeTab === 'written'
              ? 'text-white border-b-2 border-pink-500'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          내가 작성한 LP
        </button>
      </div>

      {/* 정렬 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => onSortChange('desc')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            sortOrder === 'desc'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => onSortChange('asc')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            sortOrder === 'asc'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          오래된순
        </button>
      </div>
    </div>
  );
};

export default MyLPTabs;