import { faker } from "@faker-js/faker";

import { marketplace, Profile } from "../../@types";
import { randomIntFromInterval } from "../../helpers";

type AccountId = string | null;

const createRandomProfile = (id?: AccountId): Profile => {
  const accountId = id
    ? faker.helpers.objectValue({ id })
    : faker.string.nanoid(7);
  return {
    country: faker.location.country(),
    marketplace: faker.helpers.arrayElement(marketplace),
    profileId: faker.string.nanoid(7),
    accountId,
  };
};

export const fetchAccountProfiles = async (id: AccountId) => {
  const promise = new Promise<Profile[]>((resolve) => {
    setTimeout(() => {
      const randomData = faker.helpers.multiple(() => createRandomProfile(), {
        count: 500,
      });

      const dataWithId = faker.helpers.multiple(() => createRandomProfile(id), {
        count: randomIntFromInterval(20, 100),
      });

      resolve([...randomData, ...dataWithId]);
    }, 50);
  });
  return promise;
};
