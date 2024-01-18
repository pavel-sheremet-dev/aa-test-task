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
import { useCampaigns } from "../../../context";
import { TemplateTable } from "../..";

import { columns } from "./config";

interface Props {
  onRowClickAction?: (id: string) => void;
  columnFilter?: ColumnFiltersState;
}

export const CampaignsTable = ({ columnFilter }: Props) => {
  const { data } = useCampaigns();
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "cost",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    columnFilter ?? []
  );

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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return <TemplateTable tableData={table} />;
};
