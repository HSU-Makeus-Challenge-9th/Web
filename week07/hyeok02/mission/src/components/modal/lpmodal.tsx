import React, { useState, useRef, MouseEvent, ChangeEvent } from "react";
import instance from "../../apis/axios";
import { isAxiosError } from "axios";
import LpVinylSvg from "./lpvinysvg";
import LpFormInputs from "./lpforminput";
import LpPicture from "./lppicture";
import LpTagInput from "./lptaginput";
import LpPublishCheckbox from "./lpcheckbox";

interface Props {
  onClose: () => void;
}

const AddLpModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumbnailPreview(url);
  };

  const handleSubmit = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);
    console.log("[AddLpModal] submitting LP:", {
      title,
      content,
      tags,
      published,
      thumbnail: thumbnailPreview,
    });
    try {
      const res = await instance.post("/v1/lps", {
        title,
        content,
        tags,
        published,
        thumbnail: thumbnailPreview,
      });
      console.log("[AddLpModal] LP 생성 성공:", res.data);
      onClose();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("[AddLpModal] 실패 (AxiosError):", error.response?.status, error.response?.data);
      } else {
        console.error("[AddLpModal] 실패 (Unknown error):", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md text-white">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200">
          ✕
        </button>

        <LpVinylSvg thumbnailPreview={thumbnailPreview} onThumbnailClick={() => fileInputRef.current?.click()} />

        <div className="mt-4">
          <LpFormInputs
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
          />
          
        <div className="hidden">
          <LpPicture
            thumbnailPreview={thumbnailPreview}
            fileInputRef={fileInputRef}
            onChange={handleThumbnailChange}
         />
        </div>

      <div className="mt-3.5">
        <LpTagInput
          tags={tags}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onAdd={handleAddTag}
        />
        </div>

          <LpPublishCheckbox checked={published} onChange={(e) => setPublished(e.target.checked)} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-4 py-3 rounded text-white ${
            loading ? "bg-gray-500" : "bg-pink-500 hover:bg-pink-400"
          }`}
        >
          {loading ? "추가 중…" : "Add LP"} 
        </button>
      </div>
    </div>
  );
};

export default AddLpModal;
