const LpCommentSkeleton = () => {
  return (
    <>
      <div className="flex justify-center items-center animate-pulse">
        <div className="bg-gray-800 rounded-full m-3 h-10 w-10 "></div>
        <div>
          <div className="bg-gray-800 rounded-md h-4 w-48 mb-2"></div>
          <div className="bg-gray-800 rounded-md h-4 w-90 mb-2"></div>
        </div>
      </div>
    </>
  );
};

export default LpCommentSkeleton;
