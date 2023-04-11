import React from 'react';
import { ButtonProps } from 'antd';

import { useStartGameMutation } from '../games.slice';
import { ConfirmButton } from '../../../components/ConfirmButton';

export const AddGameButton = React.memo((props: ButtonProps) => {
  const [startGame] = useStartGameMutation();

  return (
    <ConfirmButton
      confirmationText="Do you want to start the new game?"
      onConfirm={() => startGame({})}
      {...props}
    >
      Start New Game
    </ConfirmButton>
  );
});
