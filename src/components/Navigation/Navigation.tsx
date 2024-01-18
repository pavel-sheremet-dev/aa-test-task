import { Fragment, useMemo } from "react";
import { Nav } from "react-bootstrap";
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
    <Nav variant="pills" as="ul" className="d-flex justify-content-center">
      {routes.map(({ label, dropDown, index, crumb }) => (
        <Fragment key={crumb}>
          {(!index || crumb === "/") && (
            <Nav.Item as="li" className="text-center">
              <Nav.Link as={NavLink} to={crumb} onClick={onLinkClickAction}>
                {label}
              </Nav.Link>
              {level > 0 && dropDown.length > 0 && (
                <div>
                  <Navigation
                    navItems={dropDown}
                    nestingLevel={level}
                    type={type}
                  />
                </div>
              )}
            </Nav.Item>
          )}
        </Fragment>
      ))}
    </Nav>
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
