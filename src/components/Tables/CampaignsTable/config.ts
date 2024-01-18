import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Campaign } from "../../../@types";

import { dateFilter, gteFilter } from "./helpers";

export const columns: ColumnDef<Campaign>[] = [
  {
    id: "campaignId",
    header: () => "ID",
    accessorKey: "campaignId",
    cell: (info) => info.getValue(),
  },
  {
    id: "profileId",
    header: () => "Profile ID",
    accessorKey: "profileId",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: "auto",
  },
  {
    id: "clicks",
    header: () => "Clicks",
    accessorKey: "clicks",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: gteFilter,
  },
  {
    id: "cost",
    header: () => "Cost",
    accessorKey: "cost",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: gteFilter,
  },
  {
    id: "date",
    header: () => "Date",
    accessorKey: "date",
    cell: (info) => format(info.getValue() as Campaign["date"], "dd-MM-yyyy"),
    sortingFn: "datetime",
    filterFn: dateFilter,
  },
];
