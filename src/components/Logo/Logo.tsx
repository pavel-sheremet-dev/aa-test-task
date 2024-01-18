import { Link } from "react-router-dom";

import { ROUTES } from "../../routes";

import css from "./styles.module.css";

export const Logo = () => {
  return (
    <Link className={css.logo} to={ROUTES.HOME.PATH}>
      Logo
    </Link>
  );
};
