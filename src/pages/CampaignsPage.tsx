import { useEffect } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { CampaignsTable, GoBack } from "../components";
import { useCampaigns } from "../context";

const PROFILE_ID = "profileId";

const CampaignsPage = () => {
  const { data, fetchData } = useCampaigns();

  const [searchParams] = useSearchParams();

  const profileId = searchParams.get(PROFILE_ID) ?? null;

  useEffect(() => {
    fetchData(profileId);
  }, [profileId, fetchData]);

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
          {!!data.length && (
            <CampaignsTable
              columnFilter={[{ id: PROFILE_ID, value: profileId ?? "" }]}
            />
          )}
        </Container>
      </Stack>
    </>
  );
};

export default CampaignsPage;
