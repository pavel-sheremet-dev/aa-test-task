import { createContext } from "react";

import { Account } from "../../@types";

interface Context {
  data: Account[];
  fetchAll: () => Promise<void>;
}

export const AccountsContext = createContext<Context>({
  data: [],
  fetchAll: async () => {},
});
