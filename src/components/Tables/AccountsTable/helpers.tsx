import { FilterFn } from "@tanstack/react-table";
import { format } from "date-fns";

import { Account } from "../../../@types";

export const dateFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId) as Account["creationDate"];
  const formattedRowValue = format(rowValue, "ddMMyyyy");
  return formattedRowValue.includes(value);
};
