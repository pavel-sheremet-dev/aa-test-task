import { useEffect } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { GoBack, ProfilesTable } from "../components";
import { useProfiles } from "../context";
import { ROUTES } from "../routes";

const ACCOUNT_ID = "accountId";

const ProfilesPage = () => {
  const { data, fetchData } = useProfiles();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const accountId = searchParams.get(ACCOUNT_ID) ?? null;

  useEffect(() => {
    fetchData(accountId);
  }, [fetchData, accountId]);

  const onRowClickAction = (profileId: string) => {
    const search = new URLSearchParams({ profileId }).toString();
    navigate(
      { pathname: ROUTES.CAMPAIGNS.PATH, search },
      { state: { from: location } }
    );
  };

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
              Profiles
            </Card.Title>
            <GoBack />
          </Stack>
          {!!data.length && (
            <ProfilesTable
              onRowClickAction={onRowClickAction}
              columnFilter={[{ id: ACCOUNT_ID, value: accountId ?? "" }]}
            />
          )}
        </Container>
      </Stack>
    </>
  );
};

export default ProfilesPage;
