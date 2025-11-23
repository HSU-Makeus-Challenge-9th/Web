import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { useSearchLPs } from './useSearchLPs';
import type { SearchType } from './useSearchLPs';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('title');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // useDebounce 적용 (300ms 지연)
  const debouncedQuery = useDebounce(searchQuery, 300);

  // 검색 쿼리 - debouncedQuery 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useSearchLPs({
    query: debouncedQuery,
    searchType,
    order: sortOrder,
  });

  // 무한 스크롤 트리거
  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const observerRef = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: hasNextPage && debouncedQuery.trim().length > 0,
    throttleInterval: 3000,
  });

  // 검색 결과 데이터
  const searchResults = data?.pages.flatMap((page) => page.data.data) || [];

  // 검색 타입 라벨
  const searchTypeLabels: Record<SearchType, string> = {
    title: '제목',
    content: '내용',
    tag: '태그',
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    setIsTypeDropdownOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleTypeDropdown = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
  };

  return {
    // 상태
    searchQuery,
    searchType,
    isTypeDropdownOpen,
    sortOrder,
    debouncedQuery,
    searchResults,
    searchTypeLabels,
    
    // 로딩/에러 상태
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    
    // 액션
    setSearchQuery,
    setSortOrder,
    handleSearchTypeChange,
    handleClearSearch,
    toggleTypeDropdown,
    
    // ref
    observerRef,
  };
};

export default useSearch;