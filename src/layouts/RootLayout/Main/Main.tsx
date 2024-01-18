import css from "./styles.module.css";

export const Main = ({ children }) => {
  return <main className={css.main}>{children}</main>;
};
