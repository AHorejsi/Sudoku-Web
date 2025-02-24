import "../css/SudokuBoard.scss";
import React, { ReactNode } from "react";
import { Sudoku, Box, Position } from "./Sudoku";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
    info: Sudoku;
}

function checkIfHyperCell(hyperPos: Position[], rowIndex: number, colIndex: number): boolean {
    let index = 0;

    for (const pos of hyperPos) {
        if (rowIndex === pos.rowIndex && colIndex === pos.colIndex) {
            return true;
        }

        ++index;
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
        <table id="cell_table">
            <tbody>{tableBody}</tbody>
        </table>
    );
}

export default function SudokuBoard(props: SudokuBoardProps): ReactNode {
    const info = props.info;

    const table = createTableOfCells(info);
    const games = info.games.join(" : ");

    return (
        <div className="container">
            <h1 id="title_card">{0 === games.length ? "REGULAR" : games} - {info.difficulty} - {info.length}x{info.length}</h1>

            <div id="board" className="container">{table}</div>
        </div>
    );
}
