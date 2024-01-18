import { Card } from "react-bootstrap";

export const Footer = () => {
  return (
    <Card.Footer as="footer" className="text-center">
      Footer - {new Date().getFullYear()}
    </Card.Footer>
  );
};
