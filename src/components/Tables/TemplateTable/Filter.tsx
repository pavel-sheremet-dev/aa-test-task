import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { RiFilterOffLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { Column } from "@tanstack/react-table";

import { useParamsUpdates } from "../../../hooks";

export const Filter = ({
  column,
  debounce = 500,
}: {
  column: Column<any, unknown>;
  debounce?: number;
}) => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(column.id) ?? "";
  const updateParams = useParamsUpdates();

  useEffect(() => {
    if (!value) return;
    column.setFilterValue(value);
  }, [column, value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    column.setFilterValue(value);

    updateParams(column.id, value);
  };

  const onClearButton = (columnId: string) => {
    updateParams(columnId, "");
    column.setFilterValue("");
  };

  return (
    <InputGroup>
      <Form.Control
        as={DebounceInput}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type for filtering"
        debounceTimeout={debounce}
        aria-label="Filter"
      />
      <button
        type="button"
        disabled={!value}
        className="btn btn-primary d-inline-flex align-items-center justify-content-center p-1"
        onClick={() => onClearButton(column.id)}
      >
        <RiFilterOffLine size={20} />
      </button>
    </InputGroup>
  );
};
