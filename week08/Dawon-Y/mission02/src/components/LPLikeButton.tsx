interface LPLikeButtonProps {
  likes: number;
  onLike: () => void;
  isPending: boolean;
}

const LPLikeButton = ({ likes, onLike, isPending }: LPLikeButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onLike}
        disabled={isPending}
        className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all ${
          isPending
            ? 'bg-gray-800 cursor-not-allowed'
            : 'bg-pink-500 hover:bg-pink-600 hover:scale-105'
        }`}
      >
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-white font-bold text-xl">{likes}</span>
      </button>
    </div>
  );
};

export default LPLikeButton;