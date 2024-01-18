import { useEffect, useState } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Profile } from "../@types";
import { GoBack, ProfilesTable } from "../components";
import { useData } from "../hooks";
import { ROUTES } from "../routes";

const ACCOUNT_ID = "accountId";

const ProfilesPage = () => {
  const [data, setData] = useState<Profile[]>([]);
  const { fetchProfiles, fetchAccountProfiles } = useData();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const accountId = searchParams.get(ACCOUNT_ID) ?? null;

  useEffect(() => {
    (async () => {
      const data = accountId
        ? await fetchAccountProfiles(accountId)
        : await fetchProfiles();
      setData(data);
    })();
  }, [fetchProfiles, fetchAccountProfiles, accountId]);

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
            <ProfilesTable data={data} onRowClickAction={onRowClickAction} />
          )}
        </Container>
      </Stack>
    </>
  );
};

export default ProfilesPage;
