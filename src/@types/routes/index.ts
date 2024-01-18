import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export interface Handle {
  title: string;
  crumb: string;
}

export const isHandle = (handle: unknown): handle is Handle => {
  return (
    typeof handle === "object" &&
    handle !== null &&
    "crumb" in handle &&
    "title" in handle &&
    typeof handle.crumb === "string"
  );
};

export interface IndexRouteObjectWithHandle
  extends Omit<IndexRouteObject, "handle"> {
  handle: Handle;
}

export interface NonIndexRouteObjectWithHandle
  extends Omit<NonIndexRouteObject, "handle" | "children"> {
  handle: Handle;
  children?: (IndexRouteObjectWithHandle | NonIndexRouteObjectWithHandle)[];
}

export type CustomRouteObject =
  | IndexRouteObjectWithHandle
  | NonIndexRouteObjectWithHandle;

export interface NavRoute {
  index: boolean | undefined;
  path: string | undefined;
  crumb: string;
  label: string;
  dropDown: NavRoute[];
}
