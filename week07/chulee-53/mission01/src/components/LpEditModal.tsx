import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "../apis/lp";
import LpImage from "../images/Lp.png";
import { QUERY_KEY } from "../constants/key";

interface LpEditModalProps {
  lp: any;
  onClose: () => void;
}

const LpEditModal = ({ lp, onClose }: LpEditModalProps) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: lp?.title ?? "",
    content: lp?.content ?? "",
    thumbnail: lp?.thumbnail ?? "",
    published: lp?.published ?? true,
  });

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(
    lp?.tags?.map((t: any) => t.name) ?? []
  );
  const [preview, setPreview] = useState<string>(lp?.thumbnail ?? LpImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: (body: any) => updateLp(lp.id, body),
    onSuccess: () => {
      alert("LP가 성공적으로 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lp.id] });
      onClose();
    },
    onError: () => alert("LP 수정 실패!"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageClick = () => fileInputRef.current?.click();

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
      thumbnail: form.thumbnail || LpImage,
      tags,
      published: form.published,
    };
    mutation.mutate(body);
  };

  const isFormValid = form.title.trim() !== "" && form.content.trim() !== "";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-neutral-900 rounded-2xl p-8 shadow-2xl w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-8 mt-6">
          <img
            src={preview}
            alt="LP"
            className="w-36 h-36 drop-shadow-xl cursor-pointer hover:opacity-80 transition"
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

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

          <button
            type="submit"
            disabled={!isFormValid || mutation.isPending}
            className={`mt-3 py-3 rounded-lg transition-colors ${
              isFormValid
                ? "bg-pink-600 hover:bg-pink-500 text-white"
                : "bg-neutral-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {mutation.isPending ? "수정 중..." : "Update LP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpEditModal;
