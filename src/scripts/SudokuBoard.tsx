import "../styles/SudokuBoard.scss";
import { ReactNode, useRef } from "react";
import { GenerateInfo, Position, Sudoku } from "./GenerateInfo";
import { createPuzzle, updatePuzzle } from "./Fetch";
import SudokuCell from "./SudokuCell";
import { Puzzle } from "./LoginInfo";

interface SudokuBoardProps {
    info: GenerateInfo | string | Error;

    userId: number;

    saved: Puzzle[];
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
    const hyperPos = puzzle.boxes.filter((box) => box.isHyper).map((box, _0, _1) => box.positions).flat();

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
                    whole={puzzle}
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

function _savePuzzle(
    saved: Puzzle[],
    sudoku: Sudoku,
    current: any,
    userId: number,
    button: HTMLButtonElement
) {
    const json = JSON.stringify(sudoku);

    button.disabled = true;

    if (!current.puzzle) {
        createPuzzle(json, userId).then((info) => {
            current.puzzle = info.puzzle;
            saved.push(info.puzzle);

            _saveCleanup(button, info.type);
        }).catch((error) => {
            throw error;
        });
    }
    else {
        updatePuzzle(current.puzzleId, json).then((info) => {
            _saveCleanup(button, info.type);
        }).catch((error) => {
            throw error;
        });
    }
}

function _saveCleanup(button: HTMLButtonElement, message: string) {
    button.disabled = false;

    if (!message.endsWith("Success")) {
        alert("Sudoku Failed to Save");
    }
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
        const userId = props.userId;
        const saved = props.saved;

        const puzzle = info.puzzle;
        const button = useRef<HTMLButtonElement>(null);

        const current = {};
        const table = createTableOfCells(info);

        return (
            <div>
                <div id="board" className="container">{table}</div>

                <div>
                    <button
                        className="btn btn-primary"
                        ref={button}
                        onClick={(_) => _savePuzzle(saved, puzzle, current, userId, button.current!)}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
