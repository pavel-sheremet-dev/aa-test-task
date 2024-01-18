import { Card, Container, Stack } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Stack as="section" gap={2}>
        <Container fluid>
          <Card.Title as="h1" className="mb-2">
            Home
          </Card.Title>
          <Card.Text>Technical task for AA</Card.Text>
        </Container>
      </Stack>
    </>
  );
};

export default HomePage;
