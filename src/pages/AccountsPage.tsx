import { useEffect } from "react";
import { Card } from "react-bootstrap";

import { AccountsTable, Container } from "../components";
import { useAccounts } from "../context";

const AccountsPage = () => {
  const { fetchAll, data } = useAccounts();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <section className="pt-2">
        <Container>
          <Card.Title as="h1">Accounts</Card.Title>
          {!!data.length && <AccountsTable />}
        </Container>
      </section>
    </>
  );
};

export default AccountsPage;
