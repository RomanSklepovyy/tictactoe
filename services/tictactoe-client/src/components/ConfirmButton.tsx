import React from 'react';
import { Button, ButtonProps, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ConfirmButtonProps extends ButtonProps {
  confirmationText?: string;
  onConfirm: () => void;
}

export const ConfirmButton = ({
  onConfirm,
  confirmationText = 'Do you Want to confirm the action?',
  ...props
}: ConfirmButtonProps) => {
  const showConfirm = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: confirmationText,
      onOk: onConfirm,
    });
  };

  return <Button onClick={showConfirm} {...props} />;
};
