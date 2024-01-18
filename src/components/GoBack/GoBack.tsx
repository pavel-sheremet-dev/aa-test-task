import { Link, To } from "react-router-dom";

import { useGoBackToFrom } from "../../hooks";

interface Props {
  to?: To;
}

export const GoBack = ({ to }: Props) => {
  const goBackLink = useGoBackToFrom();

  return (
    <Link to={to ?? goBackLink} className="text-nowrap btn btn-primary">
      Go back
    </Link>
  );
};
