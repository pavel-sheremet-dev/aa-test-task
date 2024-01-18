import { faker } from "@faker-js/faker";

import { Account, marketplace, Profile } from "../../@types";
import { randomIntFromInterval } from "../../helpers";

const createRandomProfile = (id: Account["accountId"]): Profile => {
  return {
    country: faker.location.country(),
    marketplace: faker.helpers.arrayElement(marketplace),
    profileId: faker.string.nanoid(10),
    accountId: faker.helpers.objectValue({ id }),
  };
};

export const createProfiles = async (id: Account["accountId"]) => {
  const promise = new Promise<Profile[]>((resolve) => {
    setTimeout(() => {
      const data = faker.helpers.multiple(() => createRandomProfile(id), {
        count: randomIntFromInterval(1, 45),
      });

      resolve(data);
    }, 15);
  });
  return promise;
};
