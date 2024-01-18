import { useCallback, useEffect, useState } from "react";

import { Account, Campaign, Profile } from "../../@types";
import { fakeApi } from "../../services";

import { Context, DataContext } from "./DataContext";

interface Props {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<{
    accounts: Account[];
    profiles: Profile[];
    campaigns: Campaign[];
  }>({
    accounts: [],
    profiles: [],
    campaigns: [],
  });

  const initializeData = useCallback(async () => {
    try {
      const data = await fakeApi.fetchAllData();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const fetchAccounts = useCallback<Context["fetchAccounts"]>(
    async () => data.accounts,
    [data.accounts]
  );

  const fetchProfiles = useCallback<Context["fetchProfiles"]>(
    async () => data.profiles,
    [data.profiles]
  );

  const fetchAccountProfiles = useCallback<Context["fetchAccountProfiles"]>(
    async (id) => data.profiles.filter(({ accountId }) => accountId === id),
    [data.profiles]
  );

  const fetchCampaigns = useCallback<Context["fetchCampaigns"]>(
    async () => data.campaigns,
    [data.campaigns]
  );

  const fetchProfileCampaigns = useCallback<Context["fetchProfileCampaigns"]>(
    async (id) => data.campaigns.filter(({ profileId }) => profileId === id),
    [data.campaigns]
  );

  return (
    <DataContext.Provider
      value={{
        fetchAccounts,
        fetchProfiles,
        fetchAccountProfiles,
        fetchCampaigns,
        fetchProfileCampaigns,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
