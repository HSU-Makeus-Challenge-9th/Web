const LpCardSkeleton = () => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-lg border border-gray-600/30">
      {/* LP 이미지 스켈레톤 (정사각형)*/}
      <div className="w-full aspect-square bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      
      {/* 호버 오버레이 효과도 스켈레톤으로 표현 */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 to-transparent opacity-80"></div>

      {/* 메타데이터 스켈레톤 (호버 시 보이는 정보들) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 opacity-80">
        {/* 제목 스켈레톤 */}
        <div className="w-3/4 h-5 bg-gray-400 rounded mb-3 animate-pulse-enhanced"></div>
        
        {/* 태그 스켈레톤 */}
        <div className="flex gap-2 mb-4">
          <div className="w-12 h-4 bg-gray-400 rounded-full animate-pulse-enhanced" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-16 h-4 bg-gray-400 rounded-full animate-pulse-enhanced" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* 좋아요/날짜 스켈레톤 */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-4 bg-gray-400 rounded animate-pulse-enhanced" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-20 h-3 bg-gray-400 rounded animate-pulse-enhanced" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

const LpListSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <LpCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LpListSkeleton;