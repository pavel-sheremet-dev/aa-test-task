import { faker } from "@faker-js/faker";

import { Campaign, Profile } from "../../@types";
import { randomIntFromInterval } from "../../helpers";

const createRandomCampaign = (id: Profile["profileId"]): Campaign => {
  const clicks = faker.number.int({ min: 0, max: 10000 });
  const cost = faker.commerce.price({
    min: 100000,
    max: 100000 + clicks * 50,
  });

  return {
    campaignId: faker.string.nanoid(10),
    profileId: faker.helpers.objectValue({ id }),
    clicks,
    cost,
    date: faker.date.past({ years: 0.5 }).toISOString(),
  };
};

export const createProfileCampaigns = async (id: Profile["profileId"]) => {
  const promise = new Promise<Campaign[]>((resolve) => {
    setTimeout(() => {
      const data = faker.helpers.multiple(() => createRandomCampaign(id), {
        count: randomIntFromInterval(1, 35),
      });

      resolve(data);
    }, 15);
  });
  return promise;
};
