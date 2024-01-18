import { useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Profile } from "../../../@types";
import { useProfiles } from "../../../context";
import { TemplateTable } from "../..";

import { columns } from "./config";

interface Props {
  onRowClickAction: (id: string) => void;
  columnFilter?: ColumnFiltersState;
}

export const ProfilesTable = ({ onRowClickAction, columnFilter }: Props) => {
  const { data } = useProfiles();

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "country",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    columnFilter ?? []
  );

  const table = useReactTable<Profile>({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const onRowClick = (id: string) => {
    const { profileId } = table.getRow(id).original;
    onRowClickAction(profileId);
  };

  return <TemplateTable tableData={table} onRowClickAction={onRowClick} />;
};
