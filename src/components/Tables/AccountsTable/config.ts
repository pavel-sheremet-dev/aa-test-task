import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Account } from "../../../@types";

import { dateFilter } from "./helpers";

export const columns: ColumnDef<Account>[] = [
  {
    id: "accountId",
    header: () => "ID",
    accessorKey: "accountId",
    cell: (info) => info.getValue(),
  },
  {
    id: "email",
    header: () => "Email",
    accessorKey: "email",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: "auto",
  },
  {
    id: "creationDate",
    header: () => "Creation Date",
    accessorKey: "creationDate",
    cell: (info) =>
      format(info.getValue() as Account["creationDate"], "dd-MM-yyyy"),
    sortingFn: "datetime",
    filterFn: dateFilter,
  },
];
