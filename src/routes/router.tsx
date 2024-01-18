import { createBrowserRouter, Navigate } from "react-router-dom";

import { CustomRouteObject } from "../@types";
import {
  AccountsProvider,
  CampaignsProvider,
  ProfilesProvider,
} from "../context";
import { RootLayout } from "../layouts";
import * as Pages from "../pages";

import { ROUTES } from "./lib";

export const routes: CustomRouteObject[] = [
  {
    path: ROUTES.HOME.PATH,
    element: <RootLayout />,
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
        element: (
          <AccountsProvider>
            <Pages.AccountsPage />
          </AccountsProvider>
        ),
        handle: {
          title: "Accounts",
          crumb: ROUTES.ACCOUNTS.PATH,
        },
      },
      {
        path: ROUTES.PROFILES.PATH,
        element: (
          <ProfilesProvider>
            <Pages.ProfilesPage />
          </ProfilesProvider>
        ),
        handle: {
          title: "Profiles",
          crumb: ROUTES.PROFILES.PATH,
        },
      },
      {
        path: ROUTES.CAMPAIGNS.PATH,
        element: (
          <CampaignsProvider>
            <Pages.CampaignsPage />
          </CampaignsProvider>
        ),
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
