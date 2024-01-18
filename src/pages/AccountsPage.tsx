import { useEffect, useState } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { Account } from "../@types";
import { AccountsTable, GoBack } from "../components";
import { useData } from "../hooks";
import { ROUTES } from "../routes";

const AccountsPage = () => {
  const [data, setData] = useState<Account[]>([]);
  const { fetchAccounts } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const data = await fetchAccounts();
      setData(data);
    })();
  }, [fetchAccounts]);

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
            <AccountsTable onRowClickAction={onRowClickAction} data={data} />
          )}
        </Container>
      </Stack>
    </>
  );
};

export default AccountsPage;
