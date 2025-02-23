import "../css/SudokuBoard.scss";
import React, { ReactNode } from "react";
import { Sudoku } from "./Sudoku";
import SudokuCell from "./SudokuCell";

function createTableOfCells(info: Sudoku): React.JSX.Element {
    const table = Array<React.JSX.Element>();

    for (let rowIndex = 0; rowIndex < info.length; ++rowIndex) {
        const row = Array<React.JSX.Element>();

        for (let colIndex = 0; colIndex < info.length; ++colIndex) {
            row.push(<SudokuCell value={info.board[rowIndex][colIndex]} row={rowIndex} column={colIndex} />);
        }

        table.push(<tr>{row}</tr>);
    }

    return (
        <table>
            <tbody>{table}</tbody>
        </table>
    );
}

export default function SudokuBoard(props): ReactNode {
    const table = createTableOfCells(props.info);

    return (
        <div id="board" className="container">{table}</div>
    );
}
