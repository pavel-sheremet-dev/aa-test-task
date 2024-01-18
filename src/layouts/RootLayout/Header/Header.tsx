import { Logo, Navigation } from "../../../components";
import { ROUTES } from "../../../routes";

import css from "./styles.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <Navigation rootPath={ROUTES.HOME.PATH} />
      </div>
    </header>
  );
};
