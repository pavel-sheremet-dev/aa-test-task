import { ColumnDef } from "@tanstack/react-table";

import { Campaign } from "../../../@types";

import { gteFilter } from "./helpers";

export const columns: ColumnDef<Campaign>[] = [
  {
    id: "campaignId",
    header: () => "ID",
    accessorKey: "campaignId",
    cell: (info) => info.getValue(),
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
    id: "profileId",
    header: () => "Profile ID",
    accessorKey: "profileId",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: "auto",
  },
];
