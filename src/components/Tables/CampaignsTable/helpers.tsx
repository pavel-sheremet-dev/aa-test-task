import { FilterFn } from "@tanstack/react-table";
import { format } from "date-fns";

import { Campaign } from "../../../@types";

export const gteFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId);

  if (typeof rowValue === "number" || !Number.isNaN(Number(rowValue))) {
    return Number(rowValue) <= Number(value);
  }

  return true;
};

export const dateFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId) as Campaign["date"];
  const formattedRowValue = format(rowValue, "ddMMyyyy");
  return formattedRowValue.includes(value);
};
