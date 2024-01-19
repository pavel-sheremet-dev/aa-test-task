import { Table } from "react-bootstrap";
import { BsList, BsSortDown, BsSortUp } from "react-icons/bs";
import { CiMedicalClipboard } from "react-icons/ci";
import { flexRender, Table as ITable } from "@tanstack/react-table";
import clsx from "clsx";
import { format, isValid } from "date-fns";

import { useParamsUpdates } from "../../../hooks";

import { Filter } from "./Filter";
import { Pagination } from "./Pagination";

interface Props {
  tableData: ITable<any>;
  onRowClickAction?: (id: string) => void;
}

export const TemplateTable = ({
  tableData,
  onRowClickAction = () => {},
}: Props) => {
  const updateParams = useParamsUpdates();

  const onClipBoardClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    columnId: string,
    value: unknown
  ) => {
    e.stopPropagation();

    if (typeof value === "string") {
      const maybeDate = new Date(value);
      const isValidDate = isValid(maybeDate);
      const newValue = isValidDate ? format(value, "ddMMyyyy") : value;
      updateParams(columnId, newValue);
      return;
    }

    updateParams(columnId, String(value));
  };

  return (
    <>
      <Table striped hover responsive>
        <thead>
          {tableData.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      backgroundColor: header.column.getIsSorted()
                        ? "#c2daff"
                        : "transparent",
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          style={{ cursor: "pointer" }}
                          className={clsx(
                            header.column.getCanSort() &&
                              "user-select-none cursor-pointer",
                            "d-flex justify-content-between align-items-center p-1"
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
                            }[header.column.getIsSorted() as string] ?? (
                              <BsList color="#999999" />
                            )}
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
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <span className="text-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary d-inline-flex align-items-center justify-content-center p-1"
                      onClick={(e) =>
                        onClipBoardClick(e, cell.column.id, cell.getValue())
                      }
                    >
                      <CiMedicalClipboard size={20} />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination tableData={tableData} />
    </>
  );
};

export default TemplateTable;
