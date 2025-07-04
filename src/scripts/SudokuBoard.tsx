import "../styles/SudokuBoard.css";
import { ReactNode, useRef } from "react";
import { createPuzzle, updatePuzzle } from "./Fetch";
import { GenerateInfo, Position, Sudoku } from "./GenerateInfo";
import SudokuCell from "./SudokuCell";
import { User } from "./LoginInfo";
import { load, selectSave } from "./LoadState";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { AppDispatch, RootState } from "./Store";
import { puzzle, selectUser } from "./UserState";


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

function createTableOfCells(sudoku: Sudoku): ReactNode {
    const tableBody = Array<ReactNode>();
    const maxCharLength = sudoku.length.toString().length;
    const hyperPos = sudoku.boxes.filter((box) => box.isHyper).map((box, _0, _1) => box.positions).flat();

    for (let rowIndex = 0; rowIndex < sudoku.length; ++rowIndex) {
        const tableRow = Array<ReactNode>();

        for (let colIndex = 0; colIndex < sudoku.length; ++colIndex) {
            const isHyper = checkIfHyperCell(hyperPos, rowIndex, colIndex);
            const cell = sudoku.board[rowIndex]![colIndex]!;

            tableRow.push(
                <SudokuCell
                    cell={cell}
                    row={rowIndex}
                    column={colIndex}
                    boardLength={sudoku.length}
                    isHyper={isHyper}
                    maxCharLength={maxCharLength}
                    whole={sudoku.board}
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
    puzzleId: number | null,
    user: User,
    dispatch: AppDispatch,
    sudoku: Sudoku,
    button: HTMLButtonElement
) {
    const json = JSON.stringify(sudoku);

    button.disabled = true;

    if (!puzzleId) {
        createPuzzle(json, user.id).then((info) => {
            const newPuzzle = info.puzzle;

            dispatch(load(newPuzzle.id));
            dispatch(puzzle({ operation: "ADD_ITEM", newPuzzle }));

            _saveCleanup(button, info.type);
        }).catch((error) => {
            throw error;
        });
    }
    else {
        updatePuzzle(puzzleId, json).then((info) => {
            const saved = user.puzzles;

            for (const sudoku of saved) {
                if (sudoku.id === puzzleId) {
                    dispatch(puzzle({ operation: "UPDATE_ITEM", json, puzzleId }));

                    break;
                }
            }

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
        return <p id="error-text" className="all-text">{info.message}</p>
    }
    else if ("string" === typeof info) {
        return <p id="info-text" className="all-text">{info}</p>
    }
    else {
        const sudoku = info.sudoku;
        const button = useRef<HTMLButtonElement>(null);

        const puzzleId = useAppSelector(selectSave);
        const user = useAppSelector(selectUser)!;
        const dispatch = useAppDispatch();
        
        const table = createTableOfCells(sudoku);

        return (
            <div id="play-area">
                <div id="board">{table}</div>

                <div>
                    <button id="save-button" className="btn btn-primary" ref={button}
                        onClick={(_) => _savePuzzle(puzzleId, user, dispatch, sudoku, button.current!)}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
