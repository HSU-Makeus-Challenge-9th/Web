import { useRef, useState } from "react";
import { createLP } from "../../apis/lp";
import defaultThumbnail from "../../assets/lp.png";
import FormField from "./components/FormField";

interface LPCreateProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormState {
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
}

const LPCreate = ({ onClose, onSuccess }: LPCreateProps) => {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    content: "",
    thumbnail: defaultThumbnail,
    published: true,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] =
    useState<string>(defaultThumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setThumbnailPreview(result);
      setFormData((prev) => ({ ...prev, thumbnail: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleTagAdd = () => {
    const nextTag = tagInput.trim();
    if (!nextTag || tags.includes(nextTag)) return;
    setTags((prev) => [...prev, nextTag]);
    setTagInput("");
  };

  const handleTagRemove = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createLP({
        title: formData.title,
        content: formData.content,
        thumbnail: formData.thumbnail || undefined,
        tags: tags.length > 0 ? tags : undefined,
        published: formData.published,
      });

      alert("LP가 성공적으로 생성되었습니다!");
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="flex-1 text-2xl font-bold mb-6 text-white">
        새 LP 만들기
      </h2>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-full border border-gray-700 bg-linear-to-b from-gray-900 to-gray-800 shadow-inner transition hover:scale-[1.02]"
            onClick={handleThumbnailClick}
          >
            <img
              src={thumbnailPreview}
              alt="LP Thumbnail"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center text-xs font-medium text-gray-200 opacity-0 transition-opacity hover:opacity-100">
              <span>이미지 등록</span>
              <span className="mt-1 text-[10px] text-gray-300">
                클릭해서 변경하기
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            이미지를 클릭해 LP 썸네일을 변경할 수 있어요.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleThumbnailChange}
          />
        </div>
        
        <div className="space-y-4 rounded-2xl bg-gray-900/60 p-6">
          <FormField
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="LP Name"
          />

          <FormField
            label="내용"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            type="textarea"
            rows={5}
            placeholder="LP Content"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              태그
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                placeholder="LP Tag"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="rounded-lg bg-gray-100 px-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="group flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-200 transition hover:bg-pink-500/20 hover:text-pink-300"
                  >
                    #{tag}
                    <span className="text-xs opacity-70 transition group-hover:opacity-100">
                      ×
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-500 px-4 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              생성 중...
            </>
          ) : (
            "Add LP"
          )}
        </button>
      </form>
    </div>
  );
};

export default LPCreate;
