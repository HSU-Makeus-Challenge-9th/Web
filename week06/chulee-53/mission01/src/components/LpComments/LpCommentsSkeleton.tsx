const LpCommentsSkeleton = () => {
  return (
    <div className="flex items-start gap-3 border-b border-gray-700 pb-3 animate-pulse">
      <div className="w-10 h-10 bg-gray-300 rounded-full" />

      <div className="flex-1 space-y-2">
        <div className="h-3 w-24 bg-gray-300 rounded" />
        <div className="h-3 w-full bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default LpCommentsSkeleton;
