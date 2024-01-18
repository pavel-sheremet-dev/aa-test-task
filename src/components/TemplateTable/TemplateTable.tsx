import { Table } from "react-bootstrap";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { flexRender, Table as ITable } from "@tanstack/react-table";
import clsx from "clsx";

import { Filter } from "./Filter";

interface Props {
  tableData: ITable<any>;
  onRowClickAction?: (id: string) => void;
}

export const TemplateTable = ({
  tableData,
  onRowClickAction = () => {},
}: Props) => {
  return (
    <Table striped hover>
      <thead>
        {tableData.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: "pointer" }}
                        className={clsx(
                          header.column.getCanSort() &&
                            "user-select-none cursor-pointer",
                          "d-flex justify-content-between align-items-center p-1",
                          ""
                        )}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <span>
                          {{
                            asc: <BsSortUp />,
                            desc: <BsSortDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableData.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            style={{ cursor: "pointer" }}
            onClick={() => onRowClickAction(row.id)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TemplateTable;