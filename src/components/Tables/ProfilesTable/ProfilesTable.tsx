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
import { TemplateTable } from "../../../components";
import { ENV } from "../../../config";

import { columns } from "./config";

interface Props {
  onRowClickAction: (id: string) => void;
  data: Profile[];
}

export const ProfilesTable = ({ onRowClickAction = () => {}, data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "country",
      desc: true,
    },
  ]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
    debugTable: ENV().DEVELOPMENT,
    debugHeaders: ENV().DEVELOPMENT,
    debugColumns: false,
  });

  const onRowClick = (id: string) => {
    const { profileId } = table.getRow(id).original;
    onRowClickAction(profileId);
  };

  return <TemplateTable tableData={table} onRowClickAction={onRowClick} />;
};
