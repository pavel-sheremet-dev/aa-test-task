import { faker } from "@faker-js/faker";

import { Campaign } from "../../@types";

const createRandomCampaign = (id: string): Campaign => {
  const clicks = faker.number.int({ min: 0, max: 10000 });
  const cost = faker.commerce.price({
    min: 100000,
    max: 100000 + clicks * 50,
  });
  return {
    campaignId: faker.string.nanoid(7),
    profileId: faker.helpers.objectValue({ id }),
    clicks,
    cost,
    date: faker.date.past({ years: 0.5 }),
  };
};

export const fetchProfileCampaigns = async (id: string) => {
  const promise = new Promise<Campaign[]>((resolve) => {
    setTimeout(() => {
      const data = faker.helpers.multiple(() => createRandomCampaign(id), {
        count: 20,
      });
      resolve(data);
    }, 50);
  });
  return promise;
};
