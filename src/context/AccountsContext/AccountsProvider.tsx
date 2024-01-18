import { useCallback, useState } from "react";

import { Account } from "../../@types";
import { fakeApi } from "../../services";

import { AccountsContext } from "./AccountsContext";

interface Props {
  children: React.ReactNode;
}

export function AccountsProvider({ children }: Props) {
  const [data, setData] = useState<Account[]>([]);

  const fetchAll = useCallback(async () => {
    try {
      const data = await fakeApi.fetchAccounts();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AccountsContext.Provider value={{ data, fetchAll }}>
      {children}
    </AccountsContext.Provider>
  );
}
