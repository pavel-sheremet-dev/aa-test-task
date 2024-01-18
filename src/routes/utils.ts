export const cacheLoader = <Data>(
  loader: (params: unknown) => Promise<Data>,
  key: string,
) => {
  const wrapper = async (params: unknown) => {
    if (typeof window === "undefined") {
      const data = await loader(params);
      return data;
    }
    try {
      const ls = window.sessionStorage.getItem(key);

      if (ls === null || ls === "null") {
        const data = await loader(params);
        window.sessionStorage.setItem(key, JSON.stringify(data));
        return data;
      }
      const data = JSON.parse(ls) as Data;
      return data;
    } catch (error) {
      const data = await loader(params);
      window.sessionStorage.setItem(key, JSON.stringify(data));
      return data;
    }
  };
  return async () => await wrapper(null);
};
