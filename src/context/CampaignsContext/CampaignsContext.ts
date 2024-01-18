import { createContext } from "react";

import { Campaign } from "../../@types";

export interface Context {
  data: Campaign[];
  fetchData: (id: string | null) => Promise<void>;
}

export const CampaignsContext = createContext<Context>({
  data: [],
  fetchData: async () => {},
});
