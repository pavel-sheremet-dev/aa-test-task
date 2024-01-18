import { useContext } from "react";

import { CampaignsContext } from "./CampaignsContext";

export const useCampaigns = () => useContext(CampaignsContext);
