import { useRef, useEffect, useState } from "react";
import { useInfiniteLps } from "../hooks/search/useinfinitequery";
import LPItem from "../components/lp/lp-item";
import type { LpDataType } from "../types/lp";
import { Plus } from "lucide-react";
import AddLpModal from "../components/modal/lpmodal";

const Home = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteLps({ order });
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [showInitialSkeleton, setShowInitialSkeleton] = useState(true);
  useEffect(() => {
    if (isLoading) {
      setShowInitialSkeleton(true);
    } else {
      const t = setTimeout(() => setShowInitialSkeleton(false), 800);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  const [showNextSkeleton, setShowNextSkeleton] = useState(false);
  useEffect(() => {
    if (isFetchingNextPage) {
      setShowNextSkeleton(true);
    } else {
      const t = setTimeout(() => setShowNextSkeleton(false), 800);
      return () => clearTimeout(t);
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchNextPage(),
      { rootMargin: "200px" }
    );
    obs.observe(observerRef.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const lps: LpDataType[] = data?.pages.flatMap((p) => p.data) || [];
  const initialSkeleton = Array.from({ length: 15 });
  const nextSkeleton = Array.from({ length: 20 });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="select-none px-20 py-6 relative">
      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-4 mr-2">
        <div className="flex border rounded overflow-hidden">
          <button
            onClick={() => setOrder("asc")}
            className={`w-24 px-4 py-1 text-sm ${
              order === "asc" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`w-24 px-4 py-1 text-sm ${
              order === "desc" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <section
        className="grid px-2 gap-2 text-white
                   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                   xl:grid-cols-5 2xl:grid-cols-5"
      >
        {showInitialSkeleton ? (
          initialSkeleton.map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square bg-gray-700 animate-pulse rounded-md shadow-md"
              style={{ animationDuration: "2s" }}
            />
          ))
        ) : (
          <>
            {lps.map((lp) => (
              <LPItem key={lp.id} lp={lp} />
            ))}
            {showNextSkeleton &&
              nextSkeleton.map((_, i) => (
                <div
                  key={`next-${i}`}
                  className="w-full aspect-square bg-gray-700 animate-pulse rounded-md shadow-md"
                  style={{ animationDuration: "2s" }}
                />
              ))}
          </>
        )}
      </section>

      <div ref={observerRef} />

      {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-400 focus:outline-none z-50"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Home;
