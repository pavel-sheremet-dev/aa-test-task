import { useEffect, useState } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { Campaign } from "../@types";
import { CampaignsTable, GoBack } from "../components";
import { useData } from "../hooks";

const PROFILE_ID = "profileId";

const CampaignsPage = () => {
  const [data, setData] = useState<Campaign[]>([]);
  const { fetchCampaigns, fetchProfileCampaigns } = useData();

  const [searchParams] = useSearchParams();

  const profileId = searchParams.get(PROFILE_ID) ?? null;

  useEffect(() => {
    (async () => {
      const data = profileId
        ? await fetchProfileCampaigns(profileId)
        : await fetchCampaigns();
      setData(data);
    })();
  }, [fetchCampaigns, fetchProfileCampaigns, profileId]);

  return (
    <>
      <Stack as="section" gap={2}>
        <Container fluid>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between align-items-center"
          >
            <Card.Title as="h1" className="m-0">
              Campaigns
            </Card.Title>
            <GoBack />
          </Stack>
          {!!data.length && <CampaignsTable data={data} />}
        </Container>
      </Stack>
    </>
  );
};

export default CampaignsPage;
