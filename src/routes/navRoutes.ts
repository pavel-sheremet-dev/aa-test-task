import { CustomRouteObject, NavRoute } from "../@types";

import { routes } from "./router";

const getNavRoutes = (
  layoutChildren: CustomRouteObject[] | undefined
): NavRoute[] => {
  if (layoutChildren === undefined) {
    return [];
  }

  const routes = [];

  for (const item of layoutChildren) {
    const {
      index,
      path,
      handle: { crumb, title },
      children,
    } = item;

    routes.push({
      index,
      path: index ? crumb : path,
      crumb: crumb,
      label: title,
      dropDown: getNavRoutes(children as CustomRouteObject[] | undefined),
    });
  }

  return routes;
};

export const navRoutes = getNavRoutes([routes[0]]);
