import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppLayout } from '../components/AppLayout';
import { NotFoundPage } from '../components/NotFoundPage';
import { SuspendedPage } from '../components/SuspendedPage';

const GamesList = React.lazy(
  () => import('../features/games/games-list/GamesList'),
);
const GamePage = React.lazy(() => import('../features/games/game/GamePage'));

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<SuspendedPage component={GamesList} />} />
        <Route path=":id" element={<SuspendedPage component={GamePage} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
