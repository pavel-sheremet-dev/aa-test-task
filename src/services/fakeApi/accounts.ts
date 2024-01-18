import { faker } from "@faker-js/faker";

import { Account } from "../../@types";

const createRandomAccount = (): Account => {
  return {
    accountId: faker.string.nanoid(10),
    email: faker.internet.email(),
    creationDate: faker.date.past({ years: 0.5 }).toISOString(),
    authToken: faker.string.nanoid(),
  };
};

export const createAccounts = async () => {
  const promise = new Promise<Account[]>((resolve) => {
    setTimeout(() => {
      const data = faker.helpers.multiple(createRandomAccount, {
        count: 85,
      });
      resolve(data);
    }, 30);
  });
  return promise;
};
