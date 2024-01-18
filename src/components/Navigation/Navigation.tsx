import { Fragment, useMemo } from "react";
import { useMatches } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { NavRoute } from "../../@types";
import { navRoutes, ROUTES } from "../../routes";

interface Props {
  rootPath?: string;
  navItems?: NavRoute[];
  nestingLevel?: number;
  type?: "small" | "full";
  onLinkClickAction?: () => void;
}

export const Navigation = ({
  navItems,
  type = "full",
  rootPath,
  nestingLevel = 2,
  onLinkClickAction = () => {},
}: Props) => {
  // exclude layout level pathname
  const [{ pathname } = { pathname: "" }] = useMatches().filter(
    ({ pathname }) => pathname !== ROUTES.HOME.PATH
  );

  const routes = useMemo(
    () => navItems ?? searchRootRoutes(navRoutes, { rootPath, pathname }),
    [navItems, pathname, rootPath]
  );

  const level = nestingLevel - 1;

  return (
    <ul className="flex w-full flex-col flex-wrap gap-2">
      {routes.map(({ label, dropDown, index, crumb }) => (
        <Fragment key={crumb}>
          {(!index || crumb === "/") && (
            <li className="flex flex-col gap-2 uppercase">
              <NavLink to={crumb} onClick={onLinkClickAction}>
                {label}
              </NavLink>
              {level > 0 && dropDown.length > 0 && (
                <div className="flex w-full gap-2">
                  <div className="ml-1 w-px shrink-0 bg-slate-300 dark:bg-slate-700"></div>
                  <Navigation
                    navItems={dropDown}
                    nestingLevel={level}
                    type={type}
                  />
                </div>
              )}
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

const searchRootRoutes = (
  routes: NavRoute[],
  { rootPath, pathname }: { rootPath: Props["rootPath"]; pathname: string }
): NavRoute[] => {
  const route = routes.find(
    ({ path, index }) => path === (rootPath ?? pathname) && index !== true
  );

  if (route) {
    return rootPath ? route.dropDown : [route];
  }

  const [{ dropDown }] = routes;

  if (dropDown.length) {
    return searchRootRoutes(dropDown, { rootPath, pathname });
  }

  return [];
};
