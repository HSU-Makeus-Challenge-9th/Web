import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../apis/lp";
import LpImage from "../images/Lp.png";
import { QUERY_KEY } from "../constants/key";

const LpCreateModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
    published: true,
  });

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [preview, setPreview] = useState<string>(LpImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: createLp,
    onSuccess: (data) => {
      alert("LP가 성공적으로 생성되었습니다!");
      console.log("생성된 LP:", data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      onClose();
    },
    onError: () => alert("LP 생성 실패!"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setForm({ ...form, thumbnail: previewUrl });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: form.title,
      content: form.content,
      thumbnail:
        form.thumbnail || "https://example.com/default-thumbnail.png",
      tags,
      published: form.published,
    };
    mutation.mutate(body);
  };

  const isFormValid = form.title.trim() !== "" && form.content.trim() !== "";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 
                 bg-black/50"
    >
      <div className="bg-neutral-900 rounded-2xl p-8 shadow-2xl w-full max-w-md relative text-white">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* LP 이미지 (클릭 시 파일 업로드 트리거) */}
        <div className="flex justify-center mb-8 mt-6">
          <img
            src={preview}
            alt="LP"
            className="w-36 h-36 drop-shadow-xl cursor-pointer hover:opacity-80 transition"
            onClick={handleImageClick}
          />
          {/* 숨겨진 파일 업로드 input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="LP Name"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded bg-neutral-800 border border-gray-700 focus:border-white outline-none"
          />
          <textarea
            name="content"
            placeholder="LP Content"
            value={form.content}
            onChange={handleChange}
            className="p-3 rounded bg-neutral-800 border border-gray-700 focus:border-white outline-none resize-none"
            rows={3}
          />

          {/* Tag 입력 + Add 버튼 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-3 rounded bg-neutral-800 border border-gray-700 focus:border-white outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
              className={`px-4 rounded-md font-medium transition-colors ${
                tagInput.trim()
                  ? "bg-pink-600 hover:bg-pink-500 text-white"
                  : "bg-neutral-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Add
            </button>
          </div>

          {/* 등록된 태그 리스트 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neutral-800 text-sm rounded-lg flex items-center gap-1 border border-white"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* LP 생성 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid || mutation.isPending}
            className={`mt-3 py-3 rounded-lg transition-colors ${
              isFormValid
                ? "bg-pink-600 hover:bg-pink-500 text-white"
                : "bg-neutral-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {mutation.isPending ? "생성 중..." : "Add LP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;
