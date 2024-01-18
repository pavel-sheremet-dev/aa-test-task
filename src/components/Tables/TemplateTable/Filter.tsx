import { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Column } from "@tanstack/react-table";
import { useDebounce } from "usehooks-ts";

export const Filter = ({
  column,
  debounceValue = 500,
  initialValue = "",
}: {
  column: Column<any, unknown>;
  debounceValue?: number;
  initialValue: string;
}) => {
  const [value, setValue] = useState<string>(() => initialValue);
  const debouncedValue = useDebounce<string>(value, debounceValue);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    column.setFilterValue(debouncedValue);
  }, [column, debouncedValue]);

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type for filtering"
        aria-label="Filter"
      />
    </InputGroup>
  );
};
