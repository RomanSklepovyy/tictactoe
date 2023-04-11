import React from 'react';
import { ButtonProps } from 'antd';

import { useRemoveGameMutation } from '../games.slice';
import { ConfirmButton } from '../../../components/ConfirmButton';

interface RemoveGameButtonProps extends ButtonProps {
  id: string;
}

export const RemoveGameButton = React.memo(
  ({ id, ...props }: RemoveGameButtonProps) => {
    const [removeGame] = useRemoveGameMutation();

    return (
      <ConfirmButton
        confirmationText={`Do you want to remove the ${id} game?`}
        onConfirm={() => removeGame(id)}
        {...props}
      >
        Remove
      </ConfirmButton>
    );
  },
);
