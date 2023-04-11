import styled from 'styled-components';
import { Layout } from 'antd';

export const LayoutSider = styled(Layout.Sider)`
  && {
    height: 100%;
    background: transparent;
    overflow: auto;
    position: fixed;
    left: 0;
    top: 64px;

    .ant-layout-sider-zero-width-trigger {
      top: 0;
    }
  }
`;
