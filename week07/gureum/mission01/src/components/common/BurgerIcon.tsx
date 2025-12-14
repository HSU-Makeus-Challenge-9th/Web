interface BurgerIconProps {
  className?: string;
  onClick?: () => void;
}

const BurgerIcon = ({ className = "", onClick }: BurgerIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-gray-800 transition-colors ${className}`}
      aria-label="메뉴 열기"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 48 48" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path 
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="4" 
          d="M7.95 11.95h32m-32 12h32m-32 12h32"
        />
      </svg>
    </button>
  );
};

export default BurgerIcon;