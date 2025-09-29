import { useState } from "react";

const usePagination = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const updatePagination = (
    page: number,
    total_pages: number,
    total_results: number
  ) => {
    setCurrentPage(page);
    setTotalPages(total_pages);
    setTotalResults(total_results);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      return currentPage + 1;
    }
    return currentPage;
  };

  const prevPage = () => {
    if (currentPage > 1) {
      return currentPage - 1;
    }
    return currentPage;
  };

  return {
    currentPage,
    totalPages,
    totalResults,
    updatePagination,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export default usePagination;
