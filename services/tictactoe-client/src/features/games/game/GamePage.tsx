import React from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton, Card } from 'antd';

import { useGetGameQuery, usePostMoveMutation } from '../games.slice';
import { NotFoundPage } from '../../../components/NotFoundPage';
import TicTacToeBoard from './TicTacToeBoard';

const GamePage = () => {
  const { id } = useParams();
  const { data: game, isFetching } = useGetGameQuery(id);
  const [postMove] = usePostMoveMutation();

  if (!isFetching && !game) {
    return (
      <NotFoundPage subTitle="The game does not exist." isBackButton={false} />
    );
  }

  const onPostMove = (board: string) => {
    postMove({ id, board });
  };

  return (
    <Card
      title={
        isFetching ? (
          <Skeleton.Input active size="small" />
        ) : (
          <span>{game.status}</span>
        )
      }
      bordered={false}
    >
      {!isFetching && (
        <TicTacToeBoard board={game.board} onPostMove={onPostMove} />
      )}
    </Card>
  );
};

export default GamePage;
