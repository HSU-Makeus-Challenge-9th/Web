const LPSkeleton = () => {
  return (
    <div className="aspect-square bg-gray-800 rounded-lg animate-pulse">
      <div className="w-full h-full flex flex-col p-4 gap-3">
        {/* 이미지 영역 */}
        <div className="flex-1 bg-gray-700 rounded"></div>
        {/* 텍스트 영역 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default LPSkeleton;