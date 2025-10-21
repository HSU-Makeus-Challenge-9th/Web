interface LoadingSpinnerProps {
  message?: string;
  variant?: 'light' | 'dark';
}

export default function LoadingSpinner({ 
  message = '데이터를 불러오는 중...', 
  variant = 'light' 
}: LoadingSpinnerProps) {
  const isDark = variant === 'dark';
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="flex flex-col items-center space-y-4">
        <div 
          className={`w-16 h-16 border-4 rounded-full animate-spin ${
            isDark 
              ? 'border-gray-800 border-t-white' 
              : 'border-gray-200 border-t-green-500'
          }`}
        />
        <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-600'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}