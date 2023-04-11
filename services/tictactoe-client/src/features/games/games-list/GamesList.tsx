import React from 'react';
import { Card, List } from 'antd';
import { Link } from 'react-router-dom';

import { useGetGamesQuery } from '../games.slice';
import { RefreshButton } from '../../../components/RefreshButton';
import { RemoveGameButton } from './RemoveGameButton';
import { AddGameButton } from './AddGameButton';

const GamesList = () => {
  const { data: games, isFetching, refetch } = useGetGamesQuery();

  return (
    <Card
      title="Games List"
      bordered={false}
      extra={<RefreshButton loading={isFetching} onClick={refetch} />}
    >
      <List
        bordered
        dataSource={games}
        loading={isFetching}
        style={{ maxWidth: '600px', margin: 'auto' }}
        footer={<AddGameButton />}
        renderItem={(game) => (
          <List.Item
            actions={[
              <RemoveGameButton type="link" size="small" id={game.id} />,
            ]}
          >
            <Link to={`/${game.id}`}>{game.id}</Link> - {game.status}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default GamesList;
