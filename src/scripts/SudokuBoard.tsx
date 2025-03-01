import "../styles/SudokuBoard.scss";
import React, { ReactNode } from "react";
import { Sudoku, Position } from "./Sudoku";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
    info: Sudoku;
}

function checkIfHyperCell(hyperPos: Position[], rowIndex: number, colIndex: number): boolean {
    for (const pos of hyperPos) {
        if (rowIndex === pos.rowIndex && colIndex === pos.colIndex) {
            return true;
        }
    }

    return false;
}

function createTableOfCells(info: Sudoku): React.JSX.Element {
    const tableBody = Array<React.JSX.Element>();
    const maxCharLength = info.length.toString().length;
    const hyperPos = info.boxes.filter((box) => box.isHyper).map((box, _i, _a) => box.positions).flat();

    for (let rowIndex = 0; rowIndex < info.length; ++rowIndex) {
        const tableRow = Array<React.JSX.Element>();

        for (let colIndex = 0; colIndex < info.length; ++colIndex) {
            const isHyper = checkIfHyperCell(hyperPos, rowIndex, colIndex);

            tableRow.push(
                <SudokuCell
                    value={info.board[rowIndex][colIndex]}
                    row={rowIndex}
                    column={colIndex}
                    boardLength={info.length}
                    isHyper={isHyper}
                    maxCharLength={maxCharLength}
                />
            );
        }

        tableBody.push(<tr>{tableRow}</tr>);
    }

    return (
        <table id="cell-table">
            <tbody>{tableBody}</tbody>
        </table>
    );
}

export default function SudokuBoard(props: SudokuBoardProps): ReactNode {
    const table = createTableOfCells(props.info);

    return (
        <div className="container">
            <div id="board">{table}</div>
        </div>
    );
}
