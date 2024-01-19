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

import { Campaign } from "../../../@types";
import { TemplateTable } from "../../../components";
import { ENV } from "../../../config";

import { columns } from "./config";

interface Props {
  data: Campaign[];
}

export const CampaignsTable = ({ data }: Props) => {
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
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: ENV().DEVELOPMENT,
    debugHeaders: ENV().DEVELOPMENT,
    debugColumns: false,
  });

  return <TemplateTable tableData={table} />;
};
