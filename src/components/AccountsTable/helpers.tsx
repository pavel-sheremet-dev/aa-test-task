import { FilterFn } from "@tanstack/react-table";
import { format } from "date-fns";

import { Account } from "../../@types";

export const dateFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId);

  if (rowValue instanceof Date) {
    const normalizedRows = format(
      rowValue as Account["creationDate"],
      "dd-MM-yyyy"
    )
      .split("-")
      .join("");
    const normalizedValue = value.split("-").join("");
    return normalizedRows.includes(normalizedValue);
  }
  return true;
};
