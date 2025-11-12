interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ message = '데이터를 불러오는데 실패했습니다.', onRetry }: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;