import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as LayoutAnt } from 'antd';

import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';

export const AppLayout = () => {
  return (
    <Layout>
      <Layout>
        <LayoutMain>
          <LayoutAnt.Content>
            <Outlet />
          </LayoutAnt.Content>
        </LayoutMain>
      </Layout>
    </Layout>
  );
};
