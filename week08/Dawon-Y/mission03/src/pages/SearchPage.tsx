import { useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const navigate = useNavigate();
  
  const {
    searchQuery,
    searchType,
    isTypeDropdownOpen,
    sortOrder,
    debouncedQuery,
    searchResults,
    searchTypeLabels,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    setSearchQuery,
    setSortOrder,
    handleSearchTypeChange,
    handleClearSearch,
    toggleTypeDropdown,
    observerRef,
  } = useSearch();

  const handleLPClick = (lpId: number) => {
    navigate(`/lp/${lpId}`);
  };

  return (
    <div className="p-4 lg:p-8">
      <SearchInput
        searchQuery={searchQuery}
        searchType={searchType}
        isTypeDropdownOpen={isTypeDropdownOpen}
        searchTypeLabels={searchTypeLabels}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
        onToggleDropdown={toggleTypeDropdown}
        onTypeChange={handleSearchTypeChange}
      />

      <SearchResults
        debouncedQuery={debouncedQuery}
        searchResults={searchResults}
        isLoading={isLoading}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        sortOrder={sortOrder}
        observerRef={observerRef}
        onSortChange={setSortOrder}
        onLPClick={handleLPClick}
      />
    </div>
  );
};

export default SearchPage;