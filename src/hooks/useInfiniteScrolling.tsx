import { useCallback, useRef, useState } from "react";

interface useInfiniteScrollingProps<T> {
  data: T[];
  displayLimit: number;
}
function useInfiniteScrolling<T>({
  displayLimit,
  data,
}: useInfiniteScrollingProps<T>) {
  const observer = useRef<IntersectionObserver>();
  const pageNumber = useRef<number>(1);
  const [calculatedData, setRecalculatedData] = useState<T[]>(data);
  const [displayedData, setDisplayedData] = useState<T[]>([
    ...calculatedData.slice(0, displayLimit),
  ]);

  const reCalculatedData = useCallback(
    (newData: T[]) => {
      setRecalculatedData(newData);
      setDisplayedData([...newData.slice(0, displayLimit)]);
      pageNumber.current = 1;
    },
    [displayLimit]
  );

  const observerRef: React.RefCallback<HTMLElement> = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          displayedData.length < calculatedData.length
        ) {
          pageNumber.current = pageNumber.current + 1;

          setDisplayedData([
            ...calculatedData.slice(0, displayLimit * pageNumber.current),
          ]);
        }
      });
      if (node) observer.current.observe(node);
    },
    [displayedData.length, calculatedData, displayLimit]
  );
  return { ref: observerRef, displayedData, reCalculatedData };
}

export default useInfiniteScrolling;
