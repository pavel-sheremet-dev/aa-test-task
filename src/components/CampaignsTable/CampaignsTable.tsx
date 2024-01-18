import { useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Campaign } from "../../@types";
import { useCampaigns } from "../../context";
import { TemplateTable } from "..";

import { columns } from "./config";

export const CampaignsTable = () => {
  const { data } = useCampaigns();
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "cost",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<Campaign>({
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

  return <TemplateTable tableData={table} />;
};
