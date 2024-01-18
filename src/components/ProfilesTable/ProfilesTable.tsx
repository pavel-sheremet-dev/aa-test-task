import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Profile } from "../../@types";
import { useProfiles } from "../../context";
import { ROUTES } from "../../routes";
import { TemplateTable } from "..";

import { columns } from "./config";

export const ProfilesTable = () => {
  const { data } = useProfiles();
  const navigate = useNavigate();
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const onRowClick = (id: string) => {
    const { profileId } = table.getRow(id).original;
    navigate(ROUTES.CAMPAIGNS.PATH, { state: { id: profileId } });
  };

  return <TemplateTable tableData={table} onRowClickAction={onRowClick} />;
};
