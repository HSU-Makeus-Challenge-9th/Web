import { useEffect } from "react";

export const useInfiniteScroll = (
  canLoad: boolean,
  isLoadingMore: boolean,
  onLoadMore: () => void,
  threshold = 100
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - threshold &&
        canLoad &&
        !isLoadingMore
      ) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canLoad, isLoadingMore, onLoadMore, threshold]);
};


