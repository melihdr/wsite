import React, { useState, useEffect, useRef } from "react";

function isSafe(mat: number[][], row: number, col: number, num: number) {
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

function fillBoard(mat: number[][], row = 0, col = 0): boolean | number[][] {
  if (row === 9) return true;
  if (col === 9) return fillBoard(mat, row + 1, 0);

  const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(
    () => Math.random() - 0.5
  );
  for (let num of numbers) {
    if (isSafe(mat, row, col, num)) {
      mat[row][col] = num;
      if (fillBoard(mat, row, col + 1)) return mat;
      mat[row][col] = 0;
    }
  }
  return false;
}

function removeCells(removedBoard: number[][], emptyCells: number) {
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

function solveSudokuRec(mat: number[][], row: number, col: number) {
  if (row === 8 && col === 9) return true;

  if (col === 9) {
    row++;
    col = 0;
  }

  if (mat[row][col] !== 0) return solveSudokuRec(mat, row, col + 1);

  for (let num = 1; num <= 9; num++) {
    if (isSafe(mat, row, col, num)) {
      mat[row][col] = num;
      if (solveSudokuRec(mat, row, col + 1)) return mat;
      mat[row][col] = 0;
    }
  }
  return false;
}

function Sudoku() {
  const array = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  const myBoardRef = useRef<number[][] | null>(null);
  let removedBoardRef = useRef<number[][] | null>(null);

  if (myBoardRef.current === null) {
    myBoardRef.current = fillBoard(array, 0, 0) as number[][];
  }

  const myBoardRefCopy = JSON.parse(JSON.stringify(myBoardRef));

  removedBoardRef.current = removeCells(myBoardRefCopy.current, 50);

  const [state, setState] = useState<number[][] | null>(
    removedBoardRef.current
  );

  const handleClick = () => {
    setState(myBoardRef.current);
  };

  const newSudoku = fillBoard(array, 0, 0);
  console.log(newSudoku);

  return (
    <>
      <div>
        {state?.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: 30,
                  height: 30,
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleClick}>click me</button>
      <button>click me 2</button>
    </>
  );
}

export default Sudoku;
