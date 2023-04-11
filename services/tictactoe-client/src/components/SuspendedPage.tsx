import React, { FunctionComponent, LazyExoticComponent, Suspense } from 'react';

type SuspendedPageProps = {
  component: LazyExoticComponent<FunctionComponent>;
};

export const SuspendedPage = ({ component: Component }: SuspendedPageProps) => (
  <Suspense fallback={<div className="app-spinner" />}>
    <Component />
  </Suspense>
);
