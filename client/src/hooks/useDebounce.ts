import { useEffect, useState } from "react";

export const useDebounce = (query: string) => {
  const [debouced, setDebounced] = useState<string>("");

  useEffect(() => {
    let timer = setTimeout(() => setDebounced(query), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query.trim()]);
  return debouced;
};
