const CommentSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-gray-700 bg-gray-800 p-4">
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 shrink-0 rounded-full bg-gray-700" />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-24 rounded bg-gray-700" />
          <div className="h-3 w-16 rounded bg-gray-700" />
        </div>
        <div className="mb-1 h-3 w-full rounded bg-gray-700" />
        <div className="h-3 w-3/4 rounded bg-gray-700" />
      </div>
    </div>
  </div>
);

export default CommentSkeleton;

