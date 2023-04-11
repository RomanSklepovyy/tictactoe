import React from 'react';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';

import { AppRoutes } from './AppRoutes';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default App;
