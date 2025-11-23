import React, { useRef } from 'react';

interface ImageUploadProps {
  onFileChange: (file: File) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하만 가능합니다.');
        return;
      }

      onFileChange(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* LP 디스크 - 항상 표시 */}
      <div
        className="w-36 h-36 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
        onClick={() => fileInputRef.current?.click()}
      >
        {/* 중앙 흰색 원 (LP 레이블) */}
        <div className="w-14 h-14 bg-white rounded-full"></div>
        
        {/* 비닐 질감을 위한 미세한 원들 */}
        <div className="absolute inset-0 rounded-full" 
             style={{
               background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
             }}>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default ImageUpload;