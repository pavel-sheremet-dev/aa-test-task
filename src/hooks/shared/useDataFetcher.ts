import { useEffect, useState } from "react";

import { useLocalStorage } from ".";

export const useDataFetcher = <Data>(
  fetchFunction: () => Promise<Data | null>,
  lsKey: string,
) => {
  const [data, setData] = useLocalStorage<Data | null>(lsKey, null, {
    storage: "sessionStorage",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (data) return;
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetchFunction();
        if (!data) return;
        setData(data);
      } catch (error) {
        setError("Oops... something went wrong");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunction]);

  return { data, isLoading, error };
};
