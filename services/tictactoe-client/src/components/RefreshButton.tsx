import React from 'react';
import { Button, ButtonProps } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

interface RefreshButtonProps extends ButtonProps {
  compact?: boolean;
}

export const RefreshButton = ({
  compact = false,
  ...rest
}: RefreshButtonProps) => {
  return (
    <Button icon={<RedoOutlined rotate={270} />} {...rest}>
      {!compact && 'Refresh'}
    </Button>
  );
};
