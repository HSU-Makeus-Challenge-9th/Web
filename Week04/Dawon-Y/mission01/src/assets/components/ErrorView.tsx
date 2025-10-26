interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  variant?: 'light' | 'dark';
}

export default function ErrorView({ 
  message, 
  onRetry, 
  onBack,
  variant = 'light' 
}: ErrorViewProps) {
  const isDark = variant === 'dark';
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="text-center space-y-4 p-8">
        <div className={`text-6xl mb-4 ${isDark ? 'text-white' : 'text-red-500'}`}>
          ⚠️
        </div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          오류가 발생했습니다
        </h2>
        <p className={`max-w-md ${isDark ? 'text-white' : 'text-gray-600'}`}>
          {message}
        </p>
        <div className="flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-4 px-6 py-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              다시 시도
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className={`mt-4 px-6 py-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              뒤로 가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}