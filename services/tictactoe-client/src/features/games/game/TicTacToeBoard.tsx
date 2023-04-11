import React from 'react';
import { Button, Col, Row } from 'antd';

type TicTacToeBoardProps = {
  board: string;
  onPostMove: (board: string) => void;
};

const TicTacToeBoard = ({ board, onPostMove }: TicTacToeBoardProps) => {
  const cells = board.split('');

  const handleClick = (index: number) => {
    cells[index] = 'X';
    const updatedBoard = cells.join('');
    onPostMove(updatedBoard);
  };

  const renderCell = (value: string, index: number) => {
    const isEmptyCell = value === '-';

    return (
      <Col key={index} span={8} onClick={() => handleClick(index)}>
        <Button
          disabled={!isEmptyCell}
          style={{ width: '100px', height: '100px' }}
        >
          {isEmptyCell ? '' : value}
        </Button>
      </Col>
    );
  };

  return (
    <Row
      style={{ width: '400px', margin: 'auto' }}
      gutter={[
        { xs: 8, sm: 8, md: 8, lg: 24 },
        { xs: 8, sm: 8, md: 8, lg: 24 },
      ]}
    >
      {cells.map((value, index) => renderCell(value, index))}
    </Row>
  );
};

export default TicTacToeBoard;
