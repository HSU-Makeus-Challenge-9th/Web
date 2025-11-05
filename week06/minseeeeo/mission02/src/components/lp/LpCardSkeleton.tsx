const LpCardSkeleton = () => {
  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden w-44 animate-pulse">
      <div className="w-full aspect-square bg-gray-400 rounded" />

      <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-900 rounded w-1/2" />
      </div>
    </div>
  );
};

export default LpCardSkeleton;
