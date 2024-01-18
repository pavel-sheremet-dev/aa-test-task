import { faker } from "@faker-js/faker";

import { Campaign } from "../../@types";
import { randomIntFromInterval } from "../../helpers";

type ProfileId = string | null;

const createRandomCampaign = (id?: ProfileId): Campaign => {
  const profileId = id
    ? faker.helpers.objectValue({ id })
    : faker.string.nanoid(7);
  const clicks = faker.number.int({ min: 0, max: 10000 });
  const cost = faker.commerce.price({
    min: 100000,
    max: 100000 + clicks * 50,
  });

  return {
    campaignId: faker.string.nanoid(7),
    profileId,
    clicks,
    cost,
    date: faker.date.past({ years: 0.5 }),
  };
};

export const fetchProfileCampaigns = async (id: ProfileId) => {
  const promise = new Promise<Campaign[]>((resolve) => {
    setTimeout(() => {
      const randomData = faker.helpers.multiple(() => createRandomCampaign(), {
        count: 500,
      });
      const dataWithId = faker.helpers.multiple(
        () => createRandomCampaign(id),
        {
          count: randomIntFromInterval(20, 100),
        }
      );

      resolve([...randomData, ...dataWithId]);
    }, 50);
  });
  return promise;
};
