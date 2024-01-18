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

import { Account } from "../../@types";
import { TemplateTable } from "../../components";
import { useAccounts } from "../../context";
import { ROUTES } from "../../routes";

import { columns } from "./config";

export const AccountsTable = () => {
  const { data } = useAccounts();
  const navigate = useNavigate();
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const onRowClick = (id: string) => {
    const { accountId } = table.getRow(id).original;

    navigate({ pathname: ROUTES.PROFILES.PATH }, { state: { id: accountId } });
  };

  return <TemplateTable tableData={table} onRowClickAction={onRowClick} />;
};
