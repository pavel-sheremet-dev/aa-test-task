import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Table } from "@tanstack/react-table";

interface Props {
  tableData: Table<any>;
}

export const Pagination = ({ tableData }: Props) => {
  return (
    <Stack
      direction="horizontal"
      gap={4}
      className="justify-content-end flex-wrap"
    >
      <Stack direction="horizontal" gap={2}>
        <Button
          className="d-flex"
          onClick={() => tableData.setPageIndex(0)}
          disabled={!tableData.getCanPreviousPage()}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </Button>
        <Button
          className="d-flex"
          onClick={() => tableData.previousPage()}
          disabled={!tableData.getCanPreviousPage()}
        >
          <MdKeyboardArrowLeft size={20} />
        </Button>
        <Button
          className="d-flex"
          onClick={() => tableData.nextPage()}
          disabled={!tableData.getCanNextPage()}
        >
          <MdKeyboardArrowRight size={20} />
        </Button>
        <Button
          className="d-flex"
          onClick={() => tableData.setPageIndex(tableData.getPageCount() - 1)}
          disabled={!tableData.getCanNextPage()}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </Button>
      </Stack>
      <Stack
        direction="horizontal"
        gap={2}
        className="flex-nowrap align-items-center"
      >
        <div>Page</div>
        <strong className="flex-nowrap text-nowrap">
          {tableData.getState().pagination.pageIndex + 1} of{" "}
          {tableData.getPageCount()}
        </strong>
      </Stack>
      <InputGroup className="d-flex align-items-center gap-2 w-auto text-nowrap">
        Go to page:
        <Form.Control
          type="number"
          min={1}
          defaultValue={tableData.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            tableData.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </InputGroup>
      <Form.Select
        className="w-auto"
        value={tableData.getState().pagination.pageSize}
        onChange={(e) => {
          tableData.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Form.Select>
    </Stack>
  );
};
