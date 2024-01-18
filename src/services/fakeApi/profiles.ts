import { faker } from "@faker-js/faker";

import { marketplace, Profile } from "../../@types";

const createRandomProfile = (id: string): Profile => {
  return {
    country: faker.location.country(),
    marketplace: faker.helpers.arrayElement(marketplace),
    profileId: faker.string.nanoid(7),
    accountId: faker.helpers.objectValue({ id }),
  };
};

export const fetchAccountProfiles = async (id: string) => {
  const promise = new Promise<Profile[]>((resolve) => {
    setTimeout(() => {
      const data = faker.helpers.multiple(() => createRandomProfile(id), {
        count: 50,
      });
      resolve(data);
    }, 50);
  });
  return promise;
};
