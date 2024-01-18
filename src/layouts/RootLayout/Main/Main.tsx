import css from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  return <main className={css.main}>{children}</main>;
};
