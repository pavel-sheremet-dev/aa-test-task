import { createContext } from "react";

import { Profile } from "../../@types";

interface Context {
  data: Profile[];
  fetchByAccountId: (id: string) => Promise<void>;
}

export const ProfilesContext = createContext<Context>({
  data: [],
  fetchByAccountId: async () => {},
});
