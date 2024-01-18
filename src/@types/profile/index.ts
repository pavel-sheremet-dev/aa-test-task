import { Account } from "..";

export const marketplace = ["amazon", "walmart"] as const;

export interface Profile extends Pick<Account, "accountId"> {
  profileId: string;
  country: string;
  marketplace: (typeof marketplace)[number];
}
