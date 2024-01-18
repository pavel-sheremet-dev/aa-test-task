import { useCallback, useState } from "react";

import { Campaign } from "../../@types";
import { fakeApi } from "../../services";

import { CampaignsContext } from "./CampaignsContext";

interface Props {
  children: React.ReactNode;
}

export function CampaignsProvider({ children }: Props) {
  const [data, setData] = useState<Campaign[]>([]);

  const fetchByProfileId = useCallback(async (id: string) => {
    try {
      const data = await fakeApi.fetchProfileCampaigns(id);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <CampaignsContext.Provider value={{ data, fetchByProfileId }}>
      {children}
    </CampaignsContext.Provider>
  );
}
