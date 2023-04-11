import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const App = React.lazy(() => import('./app/App'));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Suspense fallback={<div className="app-spinner" />}>
    <App />
  </Suspense>,
);
