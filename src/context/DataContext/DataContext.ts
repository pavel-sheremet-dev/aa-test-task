import { createContext } from "react";

import { Account, Campaign, Profile } from "../../@types";

export interface Context {
  fetchAccounts: () => Promise<Account[]>;
  fetchProfiles: () => Promise<Profile[]>;
  fetchAccountProfiles: (id: string) => Promise<Profile[]>;
  fetchCampaigns: () => Promise<Campaign[]>;
  fetchProfileCampaigns: (id: string) => Promise<Campaign[]>;
}

export const DataContext = createContext<Context>({
  fetchAccounts: async () => [],
  fetchProfiles: async () => [],
  fetchAccountProfiles: async () => [],
  fetchCampaigns: async () => [],
  fetchProfileCampaigns: async () => [],
});
