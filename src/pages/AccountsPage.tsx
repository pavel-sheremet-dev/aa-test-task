import { useEffect } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { AccountsTable, GoBack } from "../components";
import { useAccounts } from "../context";
import { ROUTES } from "../routes";

const AccountsPage = () => {
  const { fetchAll, data } = useAccounts();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onRowClickAction = (accountId: string) => {
    const search = new URLSearchParams({ accountId: accountId }).toString();
    navigate(
      { pathname: ROUTES.PROFILES.PATH, search },
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
              Accounts
            </Card.Title>
            <GoBack />
          </Stack>
          {!!data.length && (
            <AccountsTable onRowClickAction={onRowClickAction} />
          )}
        </Container>
      </Stack>
    </>
  );
};

export default AccountsPage;
