import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorLoaderData } from "../../../components";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Main } from "../Main";

import css from "./styles.module.css";

export const RootLayout = () => {
  return (
    <div className={css.layoutBox}>
      <Header />
      <Main>
        <ErrorBoundary fallback={<ErrorLoaderData />}>
          <Suspense>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Main>
      <Footer />
    </div>
  );
};
