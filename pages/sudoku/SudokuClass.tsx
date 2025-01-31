import React, { useState } from "react";

class Sudoku {
  board: number[][];

  constructor() {
    this.board = this.generateEmptyBoard();
    this.board = this.fillBoard(this.board, 0, 0) as number[][];
  }

  generateEmptyBoard(): number[][] {
    return Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }

  isSafe(mat: number[][], row: number, col: number, num: number) {
    // check if num exists in the row or column
    for (let x = 0; x < 9; x++) {
      if (mat[row][x] === num || mat[x][col] === num) return false;
    }

    // check if num exists in the 3x3 sub-matrix
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  }

  fillBoard(mat: number[][], row = 0, col = 0): boolean | number[][] {
    if (row === 9) return true;
    if (col === 9) return this.fillBoard(mat, row + 1, 0);

    const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(
      () => Math.random() - 0.5
    );
    for (let num of numbers) {
      if (this.isSafe(mat, row, col, num)) {
        mat[row][col] = num;
        if (this.fillBoard(mat, row, col + 1)) return mat;
        mat[row][col] = 0;
      }
    }
    return false;
  }

  removeCells(removedBoard: number[][], emptyCells: number) {
    let count = emptyCells;
    while (count > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (removedBoard[row][col] !== 0) {
        removedBoard[row][col] = 0;
        count--;
      }
    }

    return removedBoard;
  }

  solveSudokuRec(
    mat: number[][],
    row: number,
    col: number
  ): number[][] | boolean {
    if (row === 8 && col === 9) return mat;

    if (col === 9) {
      row++;
      col = 0;
    }

    if (mat[row][col] !== 0) return this.solveSudokuRec(mat, row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(mat, row, col, num)) {
        mat[row][col] = num;
        if (this.solveSudokuRec(mat, row, col + 1)) return mat;
        mat[row][col] = 0;
      }
    }
    return false;
  }
}

function SudokuClass() {
  const sudoku = new Sudoku();
  const [board, setBoard] = useState(sudoku.board);

  const emptyArray = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  const [solvedSudoku, setSolvedSudoku] = useState<number[][] | null>(board);
  const [removedSudoku, setRemovedSudoku] = useState<number[][] | null>(
    emptyArray
  );

  const generateNewSudoku = () => {
    const newSudoku = new Sudoku();
    const newSudokuCopy = JSON.parse(JSON.stringify(newSudoku));
    const removedSudoku = newSudoku.removeCells(newSudokuCopy.board, 50);
    setRemovedSudoku(removedSudoku);
    setBoard(removedSudoku);

    const removedSudokuCopy = JSON.parse(JSON.stringify(removedSudoku));
    const solvedSudoku = newSudoku.solveSudokuRec(removedSudokuCopy, 0, 0);
    setSolvedSudoku(solvedSudoku as number[][]);
  };

  const solveSudoku = () => {
    const removedBoard = JSON.parse(JSON.stringify(board));
    const result = sudoku.solveSudokuRec(removedBoard, 0, 0);

    if (result) {
      setRemovedSudoku(result as number[][]);
    } else {
      console.log("No solution found");
    }
  };

  return (
    <div>
      <div className="ml-10">
        <button
          className="hover:bg-[#1b263b] hover:text-[#e0e1dd] duration-50 p-[1px] mr-9"
          onClick={generateNewSudoku}
        >
          new sudoku
        </button>
        <button
          className="hover:bg-[#1b263b] hover:text-[#e0e1dd] duration-50 p-[1px]"
          onClick={solveSudoku}
        >
          solve sudoku
        </button>
        <div>
          {solvedSudoku?.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex} - ${colIndex}`}
                  className="w-7 h-7  border border-black text-center"
                  value={
                    removedSudoku?.[rowIndex][colIndex] !== 0
                      ? removedSudoku?.[rowIndex][colIndex]
                      : ""
                  }
                  onChange={(event) => {
                    if (removedSudoku) {
                      if (
                        Number(event.target.value) ===
                        solvedSudoku[rowIndex][colIndex]
                      ) {
                        const newSudoku = JSON.parse(
                          JSON.stringify(removedSudoku)
                        );

                        newSudoku[rowIndex][colIndex] = Number(
                          event.target.value
                        );
                        setRemovedSudoku(newSudoku);
                      }
                    }
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 w-[40vw]">
        this sudoku solver is created using typescript with react. the gui is
        also created using typescript, and it is styled using css. it uses a{" "}
        <a
          className="hover:bg-[#1b263b] hover:text-[#e0e1dd] duration-50 p-[1px] underline"
          href="https://en.wikipedia.org/wiki/Backtracking"
          target="_blank"
        >
          backtracking algorithm
        </a>{" "}
        to solve the sudoku
      </div>
    </div>
  );
}

export default SudokuClass;
