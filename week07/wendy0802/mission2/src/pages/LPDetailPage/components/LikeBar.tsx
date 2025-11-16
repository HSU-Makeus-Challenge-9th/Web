interface LikeBarProps {
  liked: boolean;
  likeCount: number;
  onToggle: () => void;
}

const LikeBar = ({ liked, likeCount, onToggle }: LikeBarProps) => {
  return (
    <div className="flex items-center mb-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 cursor-pointer"
      >
        {liked ? (
          <span className="text-pink-500 text-xl sm:text-2xl transition-all hover:scale-110">
            ♥
          </span>
        ) : (
          <span className="text-pink-500 text-xl sm:text-2xl transition-all hover:scale-110">
            ♡
          </span>
        )}
        <span className="text-white text-base sm:text-lg">{likeCount}</span>
      </button>
    </div>
  );
};

export default LikeBar;
