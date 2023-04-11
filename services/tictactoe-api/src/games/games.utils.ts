import { GameStatus } from 'interfaces';

export class GamesUtils {
  private static isEmptyCellsCountValid(
    currentBoard: string,
    updatedBoard: string,
  ): boolean {
    const currentEmptyCells = (currentBoard.match(/-/g) || []).length;
    const updatedEmptyCells = (updatedBoard.match(/-/g) || []).length;

    return currentEmptyCells - updatedEmptyCells === 1;
  }

  private static isUserCellsCountValid(
    currentBoard: string,
    updatedBoard: string,
  ): boolean {
    const currentUserCells = (currentBoard.match(/X/g) || []).length;
    const updatedUserCells = (updatedBoard.match(/X/g) || []).length;

    return updatedUserCells - currentUserCells === 1;
  }

  static isMoveValid(currentBoard: string, updatedBoard: string): boolean {
    // check if the board was changed
    if (currentBoard === updatedBoard) return false;

    // check if the updated board has one empty cell (-) less
    const isEmptyCellsCountValid = GamesUtils.isEmptyCellsCountValid(
      currentBoard,
      updatedBoard,
    );

    if (!isEmptyCellsCountValid) return false;

    // check if the updated board has one user cell (X) more
    return GamesUtils.isUserCellsCountValid(currentBoard, updatedBoard);
  }

  private static isCharacterSequence(
    character: string,
    board: string,
  ): boolean {
    const characterSequence = character.repeat(3);

    // get board rows
    const rows = board.match(/.{1,3}/g);

    // check for the sequence in rows
    const isRowSequence = rows.some((row) => row === characterSequence);
    if (isRowSequence) return true;

    // check for the sequence in diagonals
    const isLeftDiagonal = rows.every((row, index) => row[index] === character);
    const isRightDiagonal = rows.every(
      (row, index) => row[rows.length - (index + 1)] === character,
    );

    if (isLeftDiagonal || isRightDiagonal) return true;

    // check for the sequence in columns
    // the last the most resource consuming
    const charactersMatrix = rows.map((raw) => raw.split(''));

    const columns = charactersMatrix.reduce((columnsArray, row) => {
      return row.map((char, index) => `${columnsArray[index] || ''}${char}`);
    }, []);

    return columns.some((column) => column === characterSequence);
  }

  static isUserWon(board: string) {
    return GamesUtils.isCharacterSequence('X', board);
  }

  static isComputerWon(board: string) {
    return GamesUtils.isCharacterSequence('O', board);
  }

  static getGameStatusAfterUserMove(board: string): GameStatus {
    const isUserWon = GamesUtils.isUserWon(board);
    if (isUserWon) return GameStatus.xWon;

    const isEmptyCells = board.includes('-');
    return isEmptyCells ? GameStatus.running : GameStatus.draw;
  }

  static getGameStatusAfterComputerMove(board: string): GameStatus {
    const isComputerWon = GamesUtils.isComputerWon(board);
    if (isComputerWon) return GameStatus.oWon;

    const isEmptyCells = board.includes('-');
    return isEmptyCells ? GameStatus.running : GameStatus.draw;
  }

  private static checkForRowsToFinish(board: string): string {
    const rows = board.match(/.{1,3}/g);
    let isSequence = false;

    const updatedRows = rows.map((row) => {
      if (isSequence) return row;

      if (row.includes('OO')) {
        isSequence = true;
        return 'OOO';
      }

      return row;
    });

    if (!isSequence) return null;

    return updatedRows.join();
  }

  private static makeRandomMove(board: string): string {
    const chars = board.split('');
    const availableCellIndexes = [];

    chars.forEach((char, index) => {
      if (char === '-') availableCellIndexes.push(index);
    });

    const randomIndex = Math.floor(Math.random() * availableCellIndexes.length);
    const randomAvailableCellIndex = availableCellIndexes[randomIndex];

    chars[randomAvailableCellIndex] = 'O';

    return chars.join('');
  }

  static updateBoardWithComputerMove(board: string): string {
    // example on how computer moves logic can be extended
    // if (Math.random() < 0.8) {
    //   // 80% chance of computer finishing the row if it has two "o"
    //   const updatedBoard = GamesUtils.checkForRowsToFinish(board);
    //   if (updatedBoard) return updatedBoard;
    // }

    return GamesUtils.makeRandomMove(board);
  }
}
