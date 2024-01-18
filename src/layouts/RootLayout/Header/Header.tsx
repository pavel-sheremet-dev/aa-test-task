import { Card, Stack } from "react-bootstrap";

import { Logo, Navigation } from "../../../components";
import { ROUTES } from "../../../routes";

export const Header = () => {
  return (
    <Card.Header as="header">
      <Stack direction="horizontal" gap={2}>
        <Logo />
        <Navigation rootPath={ROUTES.HOME.PATH} />
      </Stack>
    </Card.Header>
  );
};
