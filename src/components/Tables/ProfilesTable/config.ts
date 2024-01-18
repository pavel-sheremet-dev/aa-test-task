import { ColumnDef } from "@tanstack/react-table";

import { Profile } from "../../../@types";

export const columns: ColumnDef<Profile>[] = [
  {
    id: "profileId",
    header: () => "ID",
    accessorKey: "profileId",
    cell: (info) => info.getValue(),
  },
  {
    id: "country",
    header: () => "Country",
    accessorKey: "country",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: "auto",
  },
  {
    id: "marketplace",
    header: () => "Marketplace",
    accessorKey: "marketplace",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: "auto",
  },
  {
    id: "accountId",
    header: () => "Accound ID",
    accessorKey: "accountId",
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    filterFn: "auto",
  },
];
