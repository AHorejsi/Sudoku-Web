import "../css/SudokuBoard.scss";
import React, { ReactNode } from "react";
import { Sudoku } from "./Sudoku";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
    info: Sudoku;
}

function createTableOfCells(info: Sudoku): React.JSX.Element {
    const table = Array<React.JSX.Element>();
    const maxCharLength = info.length.toString().length;

    for (let rowIndex = 0; rowIndex < info.length; ++rowIndex) {
        const row = Array<React.JSX.Element>();

        for (let colIndex = 0; colIndex < info.length; ++colIndex) {
            row.push(
                <SudokuCell
                    value={info.board[rowIndex][colIndex]}
                    row={rowIndex}
                    column={colIndex}
                    boardLength={info.length}
                    maxCharLength={maxCharLength}
                />
            );
        }

        table.push(<tr>{row}</tr>);
    }

    return (
        <table id="cell-table">
            <tbody>{table}</tbody>
        </table>
    );
}

export default function SudokuBoard(props: SudokuBoardProps): ReactNode {
    const info = props.info;

    const table = createTableOfCells(info);
    const games = info.games.join(" : ");

    return (
        <div className="container">
            <h1 id="title-card">{0 === games.length ? "REGULAR" : games} - {info.difficulty} - {info.length}x{info.length}</h1>

            <div id="board" className="container">{table}</div>
        </div>
    );
}
