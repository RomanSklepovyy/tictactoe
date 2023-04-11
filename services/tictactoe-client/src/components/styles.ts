import styled from 'styled-components';
import { Descriptions, Modal, Typography, Card } from 'antd';

export const RawDataModal = styled(Modal)`
  .ant-modal-content {
    width: fit-content;
  }

  .ant-modal-body {
    padding: 0;
  }
`;

export const JsonContainer = styled.div`
  white-space: pre-wrap;
  font-family: monospace, monospace;
  width: max-content;
  max-width: 850px;
  min-width: 400px;
  border-radius: ${(props) => props.theme.radius.default};
  background-color: ${(props) => props.theme.colors.grayBackground};
  padding: 12px;
  margin: 4px 0;
`;

export const Details = styled(Descriptions)`
  &&& .ant-descriptions-item {
    padding-bottom: 0;
  }
  .ant-descriptions-item-content {
    font-weight: 600;
    padding-bottom: 12px;
  }
`;

export const DetailsExtra = styled(Typography.Text)`
  display: block;
  font-size: 14px;
  font-weight: 400;
`;

export const DashboardCardLink = styled(Card)`
  font-size: 16px;
  text-align: center;
  font-weight: 600;

  @media only screen and (max-width: 500px) {
    font-size: 14px;

    .ant-card-body {
      padding: 16px;
    }
  }
`;
