import { useContext } from "react";

import { ProfilesContext } from "./ProfilesContext";

export const useProfiles = () => useContext(ProfilesContext);
