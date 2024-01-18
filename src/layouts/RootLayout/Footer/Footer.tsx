import { Container } from "../../../components";

import css from "./styles.module.css";

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>Footer - {new Date().getFullYear()}</Container>
    </footer>
  );
};
