import { faker } from "@faker-js/faker";

import { Account } from "../../@types";

const createRandomAccount = (): Account => {
  return {
    accountId: faker.string.nanoid(7),
    email: faker.internet.email(),
    creationDate: faker.date.past({ years: 0.5 }),
    authToken: faker.string.nanoid(),
  };
};

export const fetchAccounts = async () => {
  const promise = new Promise<Account[]>((resolve) => {
    setTimeout(() => {
      const data = faker.helpers.multiple(createRandomAccount, {
        count: 100,
      });
      resolve(data);
    }, 50);
  });
  return promise;
};
