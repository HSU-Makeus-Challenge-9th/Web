import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp, uploadImage, updateLp } from "../../apis/lp";
import type { CreateLpRequest, UpdateLpRequest, LpDetail } from "../../types/api";

interface CreateLpModalProps {
  isOpen: boolean;
  onClose: () => void;
  editMode?: boolean;
  lpData?: LpDetail;
}

const CreateLpModal = ({ isOpen, onClose, editMode = false, lpData }: CreateLpModalProps) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const queryClient = useQueryClient();

  // 수정 모드일 때 기존 데이터로 초기화
  useEffect(() => {
    if (editMode && lpData) {
      setLpName(lpData.title);
      setLpContent(lpData.content);
      setTags(lpData.tags.map(tag => tag.name));
      setPreviewUrl(lpData.thumbnail);
      setUploadedImageUrl(lpData.thumbnail);
    }
  }, [editMode, lpData]);
  
  // 이미지 업로드 mutation
  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (data) => {
      console.log('✅ 이미지 업로드 성공:', data.data.imageUrl);
      setUploadedImageUrl(data.data.imageUrl);
    },
    onError: (error: any) => {
      console.error('❌ 이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    },
  });
  
  // LP 생성/수정 mutation
  const createLpMutation = useMutation({
    mutationFn: (data: CreateLpRequest) => createLp(data),
    onSuccess: () => {
      // LP 목록 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      queryClient.invalidateQueries({ queryKey: ['myLps'] });
      
      alert('LP가 생성되었습니다.');
      // 폼 초기화 및 모달 닫기
      handleReset();
      onClose();
    },
    onError: (error: any) => {
      console.error('❌ LP 생성 실패:', error);
      const errorData = error.response?.data;
      let errorMessage = 'LP 생성에 실패했습니다.';
      
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
      
      alert(errorMessage);
    },
  });

  // LP 수정 mutation
  const updateLpMutation = useMutation({
    mutationFn: (data: UpdateLpRequest) => updateLp(lpData!.id, data),
    onSuccess: () => {
      // LP 상세, 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['lp', lpData?.id] });
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      queryClient.invalidateQueries({ queryKey: ['myLps'] });
      
      alert('LP가 수정되었습니다.');
      handleReset();
      onClose();
    },
    onError: (error: any) => {
      console.error('❌ LP 수정 실패:', error);
      const errorData = error.response?.data;
      let errorMessage = 'LP 수정에 실패했습니다.';
      
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
      
      alert(errorMessage);
    },
  });

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // 스크롤 방지
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 미리보기용 base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // 서버에 이미지 업로드
      uploadImageMutation.mutate(file);
    }
  };

  const handleAddTag = () => {
    if (lpTag.trim() && !tags.includes(lpTag.trim())) {
      setTags([...tags, lpTag.trim()]);
      setLpTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!lpName.trim() || !lpContent.trim()) return;
    
    // 이미지가 업로드 중이면 대기
    if (uploadImageMutation.isPending) {
      alert('이미지 업로드 중입니다. 잠시만 기다려주세요.');
      return;
    }
    
    // 업로드된 이미지 URL 사용, 없으면 기본 placeholder
    const thumbnail = uploadedImageUrl || 'https://via.placeholder.com/400';
    
    if (editMode) {
      // 수정 모드
      const requestData: UpdateLpRequest = {
        title: lpName.trim(),
        content: lpContent.trim(),
        thumbnail,
        tags: tags.length > 0 ? tags : [],
        published: true,
      };
      
      console.log('🚀 LP 수정 요청 데이터:', JSON.stringify(requestData, null, 2));
      updateLpMutation.mutate(requestData);
    } else {
      // 생성 모드
      const requestData: CreateLpRequest = {
        title: lpName.trim(),
        content: lpContent.trim(),
        thumbnail,
        tags: tags.length > 0 ? tags : [],
        published: true,
      };
      
      console.log('🚀 LP 생성 요청 데이터:', JSON.stringify(requestData, null, 2));
      createLpMutation.mutate(requestData);
    }
  };

  const handleReset = () => {
    setLpName("");
    setLpContent("");
    setLpTag("");
    setTags([]);
    setPreviewUrl(null);
    setUploadedImageUrl(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="모달 닫기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LP 이미지 */}
        <div className="mb-6 flex justify-center">
          <div
            onClick={handleImageClick}
            className="relative h-48 w-48 cursor-pointer overflow-hidden rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="LP 미리보기"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="12" r="1" fill="#374151" />
              </svg>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              aria-label="LP 이미지 선택"
            />
          </div>
        </div>

        {/* LP Name */}
        <input
          type="text"
          placeholder="LP Name"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
          className="mb-4 w-full rounded-md bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* LP Content */}
        <textarea
          placeholder="LP Content"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
          rows={3}
          className="mb-4 w-full rounded-md bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
        />

        {/* LP Tag 입력 */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="LP Tag"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
            className="flex-1 rounded-md bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleAddTag}
            className="rounded-md bg-gray-600 px-6 py-3 text-white hover:bg-gray-500 transition-colors"
          >
            Add
          </button>
        </div>

        {/* 태그 목록 */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-pink-500 px-3 py-1 text-sm text-white"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-gray-200"
                  aria-label={`${tag} 태그 삭제`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-md bg-gray-600 py-3 text-white hover:bg-gray-500 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={!lpName.trim() || !lpContent.trim() || createLpMutation.isPending || updateLpMutation.isPending || uploadImageMutation.isPending}
            className={`flex-1 rounded-md py-3 text-white transition-colors ${
              lpName.trim() && lpContent.trim() && !createLpMutation.isPending && !updateLpMutation.isPending && !uploadImageMutation.isPending
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {uploadImageMutation.isPending 
              ? 'Uploading...' 
              : (editMode 
                ? (updateLpMutation.isPending ? 'Updating...' : 'Update LP')
                : (createLpMutation.isPending ? 'Creating...' : 'Add LP')
              )
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLpModal;
