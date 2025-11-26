import { X } from "lucide-react";
import { useState, useRef } from "react";
import InputText from "../common/InputText";
import LpThumbnailImage from "../../assets/LpThumbnailImage.png";
import usePostLp from "../../hooks/queries/usePostLp";

interface LpCreateModalProps {
  onClose: () => void;
}

const LpCreateModal = ({ onClose }: LpCreateModalProps) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = usePostLp();

  const handleLpImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    if (!lpName.trim() || !lpContent.trim()) {
      alert("LP 이름과 내용을 입력해주세요.");
      return;
    }

    mutate(
      {
        title: lpName,
        content: lpContent,
        thumbnail: thumbnail || LpThumbnailImage,
        tags: tags,
        published: true,
      },
      {
        onSuccess: () => {
          alert("LP가 성공적으로 생성되었습니다!");
          onClose();
        },
        onError: () => {
          alert("LP 생성에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-lg p-5 relative grid gap-3 w-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* LP 이미지 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          className="flex justify-center mb-6 cursor-pointer"
          onClick={handleLpImageClick}
        >
          <img
            src={thumbnail || LpThumbnailImage}
            className="w-50 h-50 rounded-full border-2 border-gray-400 object-cover"
            alt="Lp Thumbnail"
          />
        </div>

        <InputText
          placeholder="Lp Name"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
        />

        <InputText
          placeholder="LP Content"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
        />

        <div className="flex items-center gap-2 mb-4">
          <InputText
            placeholder="LP Tag"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            onClick={handleAddTag}
            className={`px-6 py-3 h-12 w-25 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors ${
              !lpTag.trim() ? "opacity-50 cursor-not-allowed" : "bg-pink-500"
            }`}
            disabled={!lpTag.trim()}
          >
            추가
          </button>
        </div>

        {/* 추가된 태그 목록 */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-pink-500 text-white rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* LP 추가버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!lpName.trim() || !lpContent.trim() || isPending}
          className={`w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors font-medium 
            ${
              lpName.trim() && lpContent.trim() && !isPending
                ? "bg-pink-500"
                : "opacity-50 cursor-not-allowed"
            }`}
        >
          {isPending ? "LP 생성 중..." : "LP 추가하기"}
        </button>
      </div>
    </div>
  );
};

export default LpCreateModal;
