import { useSearchParams } from "react-router-dom";

export const useParamsUpdates = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (columnId: string, value: string) => {
    const params: { [x: string]: string } = {};

    searchParams.forEach((val, key) => {
      if (!value && key === columnId) return;
      params[key] = val;
    });
    const newParams = value ? { [columnId]: value } : {};
    setSearchParams({ ...params, ...newParams });
  };

  return updateParams;
};
