import css from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
  return <div className={css.box}>{children}</div>;
};
