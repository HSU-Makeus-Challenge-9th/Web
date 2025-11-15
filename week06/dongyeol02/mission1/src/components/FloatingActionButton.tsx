import React from "react";
import { Link } from "react-router-dom";

interface FloatingActionButtonProps {
  to: string; // 라우팅할 경로
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ to }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to={to}
        className="flex items-center justify-center 
                   w-14 h-14 rounded-full 
                   bg-pink-600 text-white text-3xl font-bold 
                   shadow-lg hover:bg-pink-500 transition-colors duration-200"
        title="새 LP 만들기"
      >
        <span>+</span>
      </Link>
    </div>
  );
};

export default FloatingActionButton;
