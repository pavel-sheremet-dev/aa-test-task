import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface UseArrayHandlerParams<T> {
  initialData?: Array<T>;
  key?: string;
  storage?: "localStorage" | "sessionStorage" | "none";
  dataLoader?: () => Promise<T[]>;
}

interface Item {
  id: string;
}

export const useArrayHandler = <T extends Item>({
  initialData = [],
  key,
  storage = "none",
  dataLoader,
}: UseArrayHandlerParams<T>) => {
  const [data, setData] = useState<Array<T>>(() => {
    if (typeof window === "undefined" || storage === "none") return initialData;

    if (!key) {
      throw new Error("pass key to useArrayHandler");
    }

    const ls = window[storage].getItem(key);

    if (!ls) return initialData;

    const parsedData = JSON.parse(ls);
    return parsedData;
  });

  useEffect(() => {
    if (!dataLoader) return;
    dataLoader().then(setData).catch(console.error);
  }, [dataLoader]);

  useEffect(() => {
    if (typeof window === "undefined" || storage === "none") return;

    if (!key) {
      throw new Error("pass key to useArrayHandler");
    }

    window[storage].setItem(key, JSON.stringify(data));
  }, [storage, data, key]);

  const add = useCallback((newItem: Omit<T, "id">) => {
    setData((prev) => [...prev, { ...newItem, id: nanoid() } as T]);
  }, []);

  const remove = useCallback((id: string) => {
    setData((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      return prev.toSpliced(index, 1);
    });
  }, []);

  const update = useCallback((updatedData: T) => {
    setData((prev) => {
      const index = prev.findIndex(({ id }) => id === updatedData.id);
      return prev.toSpliced(index, 1, updatedData);
    });
  }, []);

  return { data, add, remove, update };
};
