import "../css/SudokuBoard.scss";
import React, { ReactNode } from "react";
import SudokuCell from "./SudokuCell";

export default function SudokuBoard(props): ReactNode {
    const info = props.info;
    const table = createTableOfCells(info);

    return (
        <div id="board">
            {table}
        </div>
    );
}

function createTableOfCells(info): React.JSX.Element {
    const table = Array<React.JSX.Element>();

    for (let rowIndex = 0; rowIndex < info.length; ++rowIndex) {
        const row = Array<React.JSX.Element>();

        for (let colIndex = 0; colIndex < info.length; ++colIndex) {
            row.push(<SudokuCell value={info.board[rowIndex][colIndex]} row={rowIndex} column={colIndex} />);
        }

        table.push(<tr>{row}</tr>);
    }

    return <table>{table}</table>;
}
