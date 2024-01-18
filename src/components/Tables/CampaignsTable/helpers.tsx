import { FilterFn } from "@tanstack/react-table";

export const gteFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId);

  if (typeof rowValue === "number" || !Number.isNaN(Number(rowValue))) {
    return Number(rowValue) <= Number(value);
  }

  return true;
};
