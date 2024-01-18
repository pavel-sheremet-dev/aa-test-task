import { Account, Campaign, Profile } from "../../@types";

import { createAccounts, createProfileCampaigns, createProfiles } from ".";

export const fetchAllData = async () => {
  const accounts = await createAccounts();
  const profiles = await createAllProfiles(accounts);
  const campaigns = await createAllCampaigns(profiles);

  return { accounts, profiles, campaigns };
};

const createAllProfiles = async (accounts: Account[]): Promise<Profile[]> => {
  const profilesPromises = accounts.map(({ accountId }) =>
    createProfiles(accountId)
  );
  const groupedProfiles = await Promise.all(profilesPromises);
  const profiles = groupedProfiles.reduce(
    (acc, idProfiles) => [...acc, ...idProfiles],
    []
  );
  return profiles;
};

const createAllCampaigns = async (profiles: Profile[]): Promise<Campaign[]> => {
  const campaignsPromises = profiles.map(({ profileId }) =>
    createProfileCampaigns(profileId)
  );
  const groupedCampaigns = await Promise.all(campaignsPromises);

  const campaigns = groupedCampaigns.reduce(
    (acc, idCampaigns) => [...acc, ...idCampaigns],
    []
  );
  return campaigns;
};
