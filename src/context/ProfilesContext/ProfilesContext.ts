import { createContext } from "react";

import { Profile } from "../../@types";

export interface Context {
  data: Profile[];
  fetchData: (id: string | null) => Promise<void>;
}

export const ProfilesContext = createContext<Context>({
  data: [],
  fetchData: async () => {},
});
