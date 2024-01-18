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

import { Account } from "../../../@types";
import { TemplateTable } from "../..";
import { useAccounts } from "../../../context";

import { columns } from "./config";

interface Props {
  onRowClickAction: (id: string) => void;
}

export const AccountsTable = ({ onRowClickAction }: Props) => {
  const { data } = useAccounts();

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "creationDate",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<Account>({
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
    const { accountId } = table.getRow(id).original;

    onRowClickAction(accountId);
  };

  return <TemplateTable tableData={table} onRowClickAction={onRowClick} />;
};