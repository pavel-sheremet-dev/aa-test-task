import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { Container, ProfilesTable } from "../components";
import { useProfiles } from "../context";
import { ROUTES } from "../routes";

const ProfilesPage = () => {
  const { data, fetchByAccountId } = useProfiles();

  const location = useLocation();
  const navigate = useNavigate();

  const accountId = location.state?.id ?? null;

  useEffect(() => {
    if (!accountId) {
      navigate(ROUTES.ACCOUNTS.PATH, { replace: true });
      return;
    }
    fetchByAccountId(accountId);
  }, [accountId, fetchByAccountId, navigate]);

  return (
    <>
      <section className="">
        <Container>
          <Card.Title as="h1">Profiles</Card.Title>
          {!!data.length && <ProfilesTable />}
        </Container>
      </section>
    </>
  );
};

export default ProfilesPage;
