import { Card } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  return (
    <Card.Body as="main" className="flex-grow-1">
      {children}
    </Card.Body>
  );
};
