import { useCallback, useState } from "react";

import { Profile } from "../../@types";
import { fakeApi } from "../../services";

import { ProfilesContext } from "./ProfilesContext";

interface Props {
  children: React.ReactNode;
}

export function ProfilesProvider({ children }: Props) {
  const [data, setData] = useState<Profile[]>([]);

  const fetchByAccountId = useCallback(async (id: string) => {
    try {
      const data = await fakeApi.fetchAccountProfiles(id);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ProfilesContext.Provider value={{ data, fetchByAccountId }}>
      {children}
    </ProfilesContext.Provider>
  );
}
