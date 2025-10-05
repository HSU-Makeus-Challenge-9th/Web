import PaginationButton from "./PaginationButton";
import * as S from "./PaginationStyle";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className={S.PaginationContainer}>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<"}
      </PaginationButton>

      <p className={S.PaginationP}>{currentPage} 페이지</p>

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </PaginationButton>
    </div>
  );
};

export default Pagination;
