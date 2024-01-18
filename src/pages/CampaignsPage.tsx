import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { CampaignsTable, Container } from "../components";
import { useCampaigns } from "../context";
import { ROUTES } from "../routes";

const CampaignsPage = () => {
  const { data, fetchByProfileId } = useCampaigns();

  const location = useLocation();
  const navigate = useNavigate();

  const profileId = location.state?.id ?? null;

  useEffect(() => {
    if (!profileId) {
      navigate(ROUTES.PROFILES.PATH, { replace: true });
      return;
    }

    fetchByProfileId(profileId);
  }, [profileId, fetchByProfileId, navigate]);

  return (
    <>
      <section className="">
        <Container>
          <Card.Title as="h1">Campaigns</Card.Title>
          {!!data.length && <CampaignsTable />}
        </Container>
      </section>
    </>
  );
};

export default CampaignsPage;
