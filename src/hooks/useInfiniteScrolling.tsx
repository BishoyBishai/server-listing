import { useCallback, useRef, useState } from "react";

interface useInfiniteScrollingProps<T> {
  data: T[];
  displayLimit: number;
  loading?: boolean;
}
function useInfiniteScrolling<T>({
  displayLimit,
  data,
  loading = false,
}: useInfiniteScrollingProps<T>) {
  const observer = useRef<IntersectionObserver>();
  const pageNumber = useRef<number>(1);
  const [displayedData, setDisplayedData] = useState<T[]>([
    ...data.slice(0, displayLimit),
  ]);

  const observerRef: React.RefCallback<HTMLElement> = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayedData.length < data.length) {
          pageNumber.current = pageNumber.current + 1;

          setDisplayedData([
            ...data.slice(0, displayLimit * pageNumber.current),
          ]);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, displayedData.length, data, displayLimit]
  );
  return { ref: observerRef, displayedData };
}

export default useInfiniteScrolling;
