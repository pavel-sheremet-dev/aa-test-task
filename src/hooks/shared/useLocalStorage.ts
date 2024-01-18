import { useEffect, useRef, useState } from "react";

interface Options {
  storage: "localStorage" | "sessionStorage";
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: Options = { storage: "localStorage" },
) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window[options.storage].getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      // console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window !== "undefined") {
      window[options.storage].setItem(key, JSON.stringify(storedValue));
    }
  });

  return [storedValue, setStoredValue] as const;
};
