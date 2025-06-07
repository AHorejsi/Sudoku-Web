import "../styles/SudokuBoard.scss";
import { ReactNode, RefObject, Dispatch, SetStateAction, useState, useRef } from "react";
import { GenerateInfo, Position, Sudoku } from "./GenerateInfo";
import { createPuzzle, updatePuzzle } from "./Fetch";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
    info: GenerateInfo | string | Error;

    userId: number;
}

function checkIfHyperCell(hyperPos: Position[], rowIndex: number, colIndex: number): boolean {
    for (const pos of hyperPos) {
        if (rowIndex === pos.rowIndex && colIndex === pos.colIndex) {
            return true;
        }
    }

    return false;
}

function createTableOfCells(info: GenerateInfo, setPuzzle: Dispatch<SetStateAction<Sudoku>>): ReactNode {
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
                    setWhole={setPuzzle}
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
    puzzle: Sudoku,
    data: any,
    userId: number,
    button: RefObject<HTMLButtonElement | null>
) {
    const json = JSON.stringify(puzzle);

    button.current!.disabled = true;

    if (!data.puzzleId) {
        createPuzzle(json, userId).then((info) => {
            data.puzzleId = info.puzzleId;

            _saveCleanup(button, info.type);
        }).catch((error) => {
            throw error;
        });
    }
    else {
        updatePuzzle(data.puzzleId, json).then((info) => {
            _saveCleanup(button, info.type);
        }).catch((error) => {
            throw error;
        });
    }
}

function _saveCleanup(button: RefObject<HTMLButtonElement | null>, message: string) {
    button.current!.disabled = false;

    if (!message.endsWith("Success")) {
        alert("Sudoku Failed to Save");
    }
}

export default function SudokuBoard(props: SudokuBoardProps): ReactNode {
    const info = props.info;
    const userId = props.userId;

    if (info instanceof Error) {
        return <p id="error-text">{info.message}</p>
    }
    else if ("string" === typeof info) {
        return <p id="info-text">{info}</p>
    }
    else {
        const [puzzle, setPuzzle] = useState(info.puzzle);
        const button = useRef<HTMLButtonElement>(null);

        const data = {};
        const table = createTableOfCells(info, setPuzzle);

        return (
            <div>
                <div id="board" className="container">{table}</div>

                <div>
                    <button
                        className="btn btn-primary"
                        ref={button}
                        onClick={(_) => _savePuzzle(puzzle, data, userId, button)}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
