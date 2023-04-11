export enum GameStatus {
  running = 'RUNNING',
  xWon = 'X_WON',
  oWon = 'O_WON',
  draw = 'DRAW',
}

export interface Game {
  id: string;
  board: string;
  status: GameStatus;
}

export interface GameUpdate {
  board?: string;
  status?: GameStatus;
}

export interface NewGameResponse {
  location: string;
}
