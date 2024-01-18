import { Suspense } from "react";
import { Card } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorLoaderData } from "../../../components";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Main } from "../Main";

export const RootLayout = () => {
  return (
    <Card className="min-vh-100">
      <Header />
      <Main>
        <ErrorBoundary fallback={<ErrorLoaderData />}>
          <Suspense>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Main>
      <Footer />
    </Card>
  );
};
