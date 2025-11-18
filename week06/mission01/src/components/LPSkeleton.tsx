const LPSkeleton = () => {
  return (
    <div className="aspect-square bg-gray-800 rounded-lg animate-pulse">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default LPSkeleton;