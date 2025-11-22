import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createLp } from "../apis/lp";

const LpCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
    tags: "",
    published: true,
  });

  const mutation = useMutation({
  mutationFn: createLp,
  onSuccess: (data) => {
    console.log("LP 생성 성공:", data);
    alert("LP가 성공적으로 생성되었습니다!");
    navigate(`/lps/${data.data.id}`); // 이 부분에서 data 구조 꼭 확인
  },
  onError: (error) => {
    console.error("LP 생성 실패:", error);
    alert("LP 생성 실패!");
  },
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: form.title,
      content: form.content,
      thumbnail: form.thumbnail,
      tags: form.tags.split(",").map((t) => t.trim()), // 쉼표 구분 태그
      published: form.published,
    };

    console.log("📤 LP 생성 요청 전송:", body);
    mutation.mutate(body);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-neutral-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 rounded-2xl p-6 shadow-xl w-full max-w-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold mb-2 text-center">새 LP 생성</h1>

        <input
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
          className="p-3 rounded bg-neutral-800 border border-gray-600 focus:border-pink-500 outline-none"
        />

        <textarea
          name="content"
          placeholder="내용"
          value={form.content}
          onChange={handleChange}
          rows={5}
          className="p-3 rounded bg-neutral-800 border border-gray-600 focus:border-pink-500 outline-none"
        />

        <input
          name="thumbnail"
          placeholder="썸네일 이미지 URL"
          value={form.thumbnail}
          onChange={handleChange}
          className="p-3 rounded bg-neutral-800 border border-gray-600 focus:border-pink-500 outline-none"
        />

        <input
          name="tags"
          placeholder="태그 (쉼표로 구분)"
          value={form.tags}
          onChange={handleChange}
          className="p-3 rounded bg-neutral-800 border border-gray-600 focus:border-pink-500 outline-none"
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-pink-600 py-3 rounded-lg hover:bg-pink-500 transition-colors"
        >
          {mutation.isPending ? "생성 중..." : "LP 생성"}
        </button>
      </form>
    </div>
  );
};

export default LpCreatePage;
