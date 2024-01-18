import { useRef } from "react";
import { To, useLocation } from "react-router-dom";

import { ROUTES } from "../../routes";

export const useGoBackToFrom = (redirectTo = ROUTES.ACCOUNTS.PATH) => {
  const location = useLocation();
  const goBackLink = useRef<To>(location.state?.from ?? redirectTo);

  return goBackLink.current;
};
