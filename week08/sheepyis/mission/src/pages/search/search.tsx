import Input from "../../components/Search/Input/Input";
import SortButton from "../../components/Common/Button/SortButton/SortButton";
import ListLp from "../../components/Home/ListLP/ListLP";
import * as S from "../../styles/pages/search/SearchStyle";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "../../hooks/lps/search/useDebounce";
import { useLpSearchQuery } from "../../hooks/lps/search/useLpSearchQuery";

const Search = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"제목" | "태그">("제목");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const debouncedQuery = useDebounce(query, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLpSearchQuery(category, debouncedQuery, order);

  const list = data?.pages.flatMap((p) => p.data.data) ?? [];

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={S.SearchContainer}>
      <Input onChange={setQuery} onCategoryChange={setCategory} />

      <div className={S.SearchSortContainer}>
        <div className={S.SearchSortInnerContainer}>
          <SortButton order={order} setOrder={setOrder} />
        </div>
      </div>

      <ListLp data={list} />

      <div ref={ref} className="h-[1px]" />
    </div>
  );
};

export default Search;
