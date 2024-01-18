import { useLoaderData } from "react-router-dom";

export const useCustomLoaderData = <Data>() => {
  const data = useLoaderData() as Data;
  return data;
};
