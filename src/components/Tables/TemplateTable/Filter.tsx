import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { useSearchParams } from "react-router-dom";
import { Column } from "@tanstack/react-table";

export const Filter = ({
  column,
  debounce = 500,
}: {
  column: Column<any, unknown>;
  debounce?: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(column.id) ?? "";
  useEffect(() => {
    if (!value) return;
    column.setFilterValue(value);
  }, [column, value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    column.setFilterValue(value);

    const params: { [x: string]: string } = {};

    searchParams.forEach((val, key) => {
      if (!value && key === column.id) return;
      params[key] = val;
    });

    const newParams = value ? { [column.id]: value } : {};
    setSearchParams({ ...params, ...newParams });
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        as={DebounceInput}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type for filtering"
        debounceTimeout={debounce}
        aria-label="Filter"
      />
    </InputGroup>
  );
};
