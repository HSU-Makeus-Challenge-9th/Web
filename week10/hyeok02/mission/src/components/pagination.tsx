// src/components/Pagination.tsx
type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className="flex gap-4 justify-center py-6 select-none">
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        이전
      </button>

      <span className="text-white font-semibold flex items-center">
        페이지 {page}
      </span>

      <button
        className="px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
