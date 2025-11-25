import { useEffect } from "react";
import { useThrottle } from "./useThrottle";

export const useInfiniteScroll = (
  canLoad: boolean,
  isLoadingMore: boolean,
  onLoadMore: () => void,
  threshold = 100,
  throttleInterval = 1000
) => {
  const throttledLoadMore = useThrottle(() => {
    if (canLoad && !isLoadingMore) {
      onLoadMore();
    }
  }, throttleInterval);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - threshold
      ) {
        throttledLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, throttledLoadMore]);
};
