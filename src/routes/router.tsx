import { createBrowserRouter, Navigate } from "react-router-dom";

import { CustomRouteObject } from "../@types";
import { DataProvider } from "../context";
import { RootLayout } from "../layouts";
import * as Pages from "../pages";

import { ROUTES } from "./lib";

export const routes: CustomRouteObject[] = [
  {
    path: ROUTES.HOME.PATH,
    element: (
      <DataProvider>
        <RootLayout />
      </DataProvider>
    ),
    handle: {
      title: "Home",
      crumb: ROUTES.HOME.PATH,
    },
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
        handle: {
          title: "Home",
          crumb: ROUTES.HOME.PATH,
        },
      },
      {
        path: ROUTES.ACCOUNTS.PATH,
        element: <Pages.AccountsPage />,
        handle: {
          title: "Accounts",
          crumb: ROUTES.ACCOUNTS.PATH,
        },
      },
      {
        path: ROUTES.PROFILES.PATH,
        element: <Pages.ProfilesPage />,
        handle: {
          title: "Profiles",
          crumb: ROUTES.PROFILES.PATH,
        },
      },
      {
        path: ROUTES.CAMPAIGNS.PATH,
        element: <Pages.CampaignsPage />,
        handle: {
          title: "Campaigns",
          crumb: ROUTES.CAMPAIGNS.PATH,
        },
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME.PATH} />,
    handle: {
      crumb: "*",
      title: "404",
    },
  },
];

export const router = createBrowserRouter(routes);
