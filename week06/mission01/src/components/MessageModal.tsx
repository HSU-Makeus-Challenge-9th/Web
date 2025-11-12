import React from 'react';

// MessageModal 컴포넌트 정의
const MessageModal: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const title = type === 'success' ? '성공' : '오류';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-sm p-6 rounded-lg shadow-2xl ${bgColor}`}>
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-white mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 font-semibold transition"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default MessageModal;
