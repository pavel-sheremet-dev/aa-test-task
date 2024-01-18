import { createContext } from "react";

import { Campaign } from "../../@types";

interface Context {
  data: Campaign[];
  fetchByProfileId: (id: string) => Promise<void>;
}

export const CampaignsContext = createContext<Context>({
  data: [],
  fetchByProfileId: async () => {},
});
