import { Profile } from "..";

export interface Campaign extends Pick<Profile, "profileId"> {
  campaignId: string;
  clicks: number;
  cost: string;
  date: Date;
}
