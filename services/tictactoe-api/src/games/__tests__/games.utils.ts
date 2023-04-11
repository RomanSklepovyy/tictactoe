import { GamesUtils } from '../games.utils';

// minimal tests
describe('GamesUtils', () => {
  describe('isMoveValid', () => {
    test('should be defined', () => {
      expect(GamesUtils.isMoveValid).toBeDefined();
    });

    test('should return false if no changes', () => {
      const currentBoard = 'X--OO---X';
      const updatedBoard = 'X--OO---X';

      const isValid = GamesUtils.isMoveValid(currentBoard, updatedBoard);
      expect(isValid).toBeFalsy();
    });

    test('should return false if "-" to "O" change detected', () => {
      const currentBoard = 'X--OO---X';
      const updatedBoard = 'X--OO--OX';

      const isValid = GamesUtils.isMoveValid(currentBoard, updatedBoard);
      expect(isValid).toBeFalsy();
    });

    test('should return false if "O" to "-" change detected', () => {
      const currentBoard = 'X--OO---X';
      const updatedBoard = 'X--O----X';

      const isValid = GamesUtils.isMoveValid(currentBoard, updatedBoard);
      expect(isValid).toBeFalsy();
    });

    test('should return true if "-" to "X" change detected', () => {
      const currentBoard = 'X--OO---X';
      const updatedBoard = 'X--OO-X-X';

      const isValid = GamesUtils.isMoveValid(currentBoard, updatedBoard);
      expect(isValid).toBeTruthy();
    });

    test('should return false if "X" to "-" change detected', () => {
      const currentBoard = 'X--OO---X';
      const updatedBoard = 'X--OO----';

      const isValid = GamesUtils.isMoveValid(currentBoard, updatedBoard);
      expect(isValid).toBeFalsy();
    });
  });

  describe('isUserWon', () => {
    test('should be defined', () => {
      expect(GamesUtils.isUserWon).toBeDefined();
    });

    test('should return if row sequence', () => {
      const board = 'OO-XXX---';
      const isUserWon = GamesUtils.isUserWon(board);
      expect(isUserWon).toBeTruthy();
    });

    test('should return if column sequence', () => {
      const board = 'X-OX--X-O';
      const isUserWon = GamesUtils.isUserWon(board);
      expect(isUserWon).toBeTruthy();
    });

    test('should return if left diagonal sequence', () => {
      const board = 'X-O-X--OX';
      const isUserWon = GamesUtils.isUserWon(board);
      expect(isUserWon).toBeTruthy();
    });

    test('should return if right diagonal sequence', () => {
      const board = '--X-X-XOO';
      const isUserWon = GamesUtils.isUserWon(board);
      expect(isUserWon).toBeTruthy();
    });
  });

  describe('isComputerWon', () => {
    test('should be defined', () => {
      expect(GamesUtils.isComputerWon).toBeDefined();
    });

    test('should return if row sequence', () => {
      const board = 'XX-OOO---';
      const isComputerWon = GamesUtils.isComputerWon(board);
      expect(isComputerWon).toBeTruthy();
    });

    test('should return if column sequence', () => {
      const board = 'O-XO--O-X';
      const isComputerWon = GamesUtils.isComputerWon(board);
      expect(isComputerWon).toBeTruthy();
    });

    test('should return if left diagonal sequence', () => {
      const board = 'O-X-O--XO';
      const isComputerWon = GamesUtils.isComputerWon(board);
      expect(isComputerWon).toBeTruthy();
    });

    test('should return if right diagonal sequence', () => {
      const board = '--O-O-OXX';
      const isComputerWon = GamesUtils.isComputerWon(board);
      expect(isComputerWon).toBeTruthy();
    });
  });
});
