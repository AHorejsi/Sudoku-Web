import "../styles/SudokuBoard.scss";
import { ReactNode } from "react";
import { GenerateInfo, Position } from "./GenerateInfo";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
    info: GenerateInfo | string | Error;
}

function checkIfHyperCell(hyperPos: Position[], rowIndex: number, colIndex: number): boolean {
    for (const pos of hyperPos) {
        if (rowIndex === pos.rowIndex && colIndex === pos.colIndex) {
            return true;
        }
    }

    return false;
}

function createTableOfCells(info: GenerateInfo): ReactNode {
    const puzzle = info.puzzle;

    const tableBody = Array<ReactNode>();
    const maxCharLength = puzzle.length.toString().length;
    const hyperPos = puzzle.boxes.filter((box) => box.isHyper).map((box, _i, _a) => box.positions).flat();

    for (let rowIndex = 0; rowIndex < puzzle.length; ++rowIndex) {
        const tableRow = Array<ReactNode>();

        for (let colIndex = 0; colIndex < puzzle.length; ++colIndex) {
            const isHyper = checkIfHyperCell(hyperPos, rowIndex, colIndex);
            const cell = puzzle.board[rowIndex][colIndex];

            tableRow.push(
                <SudokuCell
                    cell={cell}
                    row={rowIndex}
                    column={colIndex}
                    boardLength={puzzle.length}
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
    const info = props.info;

    if (info instanceof Error) {
        return <p id="error-text">{info.message}</p>
    }
    else if ("string" === typeof info) {
        return <p id="info-text">{info}</p>
    }
    else {
        const table = createTableOfCells(info);

        return <div id="board" className="container">{table}</div>;
    }
}
