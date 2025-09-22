import "../styles/SudokuBoard.css";
import { ReactNode, useRef } from "react";
import { createPuzzle, updatePuzzle } from "./Fetch";
import { Box, Cage, GenerateInfo, Position, Sudoku } from "./GenerateInfo";
import SudokuCell from "./SudokuCell";
import { User } from "./LoginInfo";
import { load, selectSave } from "./LoadState";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { AppDispatch } from "./Store";
import { puzzle, selectUser } from "./UserState";
import { generateDistinctRgbColors } from "./ColorGeneration";


interface SudokuBoardProps {
    info: GenerateInfo | string | Error;
}

function _createCells(sudoku: Sudoku): ReactNode {
    const grid = Array<ReactNode>();
    const maxLength = sudoku.length.toString().length;
    const colorMap = _determineColorsOfCages(sudoku.cages, sudoku.length);
    const hyperBorders = _determineHyperBorders(sudoku.boxes, sudoku.length);

    for (let rowIndex = 0; rowIndex < sudoku.length; ++rowIndex) {
        for (let colIndex = 0; colIndex < sudoku.length; ++colIndex) {
            const cell = sudoku.board[rowIndex]![colIndex]!;
            const dashes = hyperBorders?.at(rowIndex)!.at(colIndex)! ?? "";
            const color = colorMap.at(rowIndex)!.at(colIndex)!;

            grid.push(
                <SudokuCell
                    cell={cell}
                    row={rowIndex}
                    column={colIndex}
                    color={color}
                    dashes={dashes}
                    boardLength={sudoku.length}
                    maxLength={maxLength}
                />
            );
        }
    }

    return <div id="board">{grid}</div>;
}

function _determineColorsOfCages(cageSet: Cage[] | null, boardDimensions: number): string[][] {
    const colorMap = Array.from({ length: boardDimensions }, () => Array<string>(boardDimensions));
    const adjacentMap = new Map<Cage, Cage[]>();

    if (!cageSet) {
        cageSet = _createRegularCages(boardDimensions);
    }

    for (const cage of cageSet) {
        adjacentMap.set(cage, _findAdjacentPositions(cage, cageSet));
    }

    const maxColorsNeeded = _findMaxNumberOfColorsNeeded(adjacentMap);
    const colors = generateDistinctRgbColors(maxColorsNeeded);

    const startingCage = adjacentMap.keys().next().value!;
    _assignColors(colors, adjacentMap, startingCage, 0, colorMap);

    return colorMap;
}

function _createRegularCages(dimensions: number): Cage[] {
    const cageSet = Array<Cage>();

    const boxDimensions = Math.sqrt(dimensions);
    const sum = (dimensions * (dimensions + 1)) / 2;

    for (let startRowIndex = 0; startRowIndex < dimensions; startRowIndex += boxDimensions) {
        for (let startColIndex = 0; startColIndex < dimensions; startColIndex += boxDimensions) {
            const positions = _createPositionsForRegularCage(startRowIndex, startColIndex, boxDimensions);
            const newCage: Cage = { sum, positions };

            cageSet.push(newCage);
        }
    }

    return cageSet;
}

function _createPositionsForRegularCage(startRowIndex: number, startColIndex: number, boxDimensions: number): Position[] {
    const positions = Array<Position>();

    const endRowIndex = startRowIndex + boxDimensions;
    const endColIndex = startColIndex + boxDimensions;

    for (let rowIndex = startRowIndex; rowIndex < endRowIndex; ++rowIndex) {
        for (let colIndex = startColIndex; colIndex < endColIndex; ++colIndex) {
            const newPos: Position = { rowIndex, colIndex };

            positions.push(newPos);
        }
    }

    return positions;
}

function _findAdjacentPositions(current: Cage, cageSet: Cage[]): Cage[] {
    const adjacentSet = Array<Cage>();

    for (const other of cageSet) {
        if (other === current) {
            continue;
        }

        if (_isAdjacent(current, other)) {
            adjacentSet.push(other);
        }
    }

    return adjacentSet;
}

function _isAdjacent(current: Cage, other: Cage): boolean {
    for (const currPos of current.positions) {
        for (const otherPos of other.positions) {
            const rowDiff = Math.abs(currPos.rowIndex - otherPos.rowIndex);
            const colDiff = Math.abs(currPos.colIndex - otherPos.colIndex);

            if (1 === rowDiff + colDiff) {
                return true;
            }
        }
    }

    return false;
}

function _findMaxNumberOfColorsNeeded(adjacentMap: Map<Cage, Cage[]>): number {
    let maxColors = 0;

    for (const adjacentSet of adjacentMap.values()) {
        const amountOfAdjacentCages = adjacentSet.length;

        if (maxColors < amountOfAdjacentCages) {
            maxColors = amountOfAdjacentCages;
        }
    }

    return maxColors;
}

function _assignColors(
    colors: string[],
    adjacentMap: Map<Cage, Cage[]>,
    currentCage: Cage,
    colorIndex: number,
    colorMap: string[][]
) {
    for (const pos of currentCage.positions) {
        colorMap[pos.rowIndex]![pos.colIndex] = colors[colorIndex % colors.length]!;
    }

    const adjacentCages = adjacentMap.get(currentCage)!;
    adjacentMap.delete(currentCage);

    for (let cageIndex = 0; cageIndex < adjacentCages.length; ++cageIndex) {
        const otherCage = adjacentCages[cageIndex]!;
        ++colorIndex;

        if (adjacentMap.has(otherCage)) {
            _assignColors(colors, adjacentMap, otherCage, colorIndex, colorMap);
        }
    }
}

function _determineHyperBorders(boxSet: Box[], boardDimensions: number): string[][] | null {
    const hyperSet = boxSet.filter((box) => box.isHyper);

    if (0 === hyperSet.length) {
        return null;
    }

    const borders = Array.from({ length: boardDimensions }, () => Array<string>(boardDimensions).fill(""));
    const boxDimensions = Math.sqrt(boardDimensions);

    for (const hyper of hyperSet) {
        hyper.positions.sort(_posComp);

        for (let index = 0; index < hyper.positions.length; ++index) {
            const pos = hyper.positions[index]!;

            borders[pos.rowIndex]![pos.colIndex]! = _setHyperBorder(index, boxDimensions);
        }
    }

    return borders;
}

function _posComp(left: Position, right: Position): number {
    const rowComp = left.rowIndex - right.rowIndex;

    return 0 !== rowComp ? rowComp : left.colIndex - right.colIndex;
}

function _setHyperBorder(index: number, dimensions: number): string {
    const rowIndex = Math.floor(index / dimensions);
    const colIndex = index % dimensions;

    let borders = "";

    if (0 === rowIndex) {
        borders += "dashed-top";
    }
    else if (dimensions - 1 === rowIndex) {
        borders += "dashed-bottom";
    }

    if (0 === colIndex) {
        borders += " dashed-left";
    }
    else if (dimensions - 1 === colIndex) {
        borders += " dashed-right";
    }

    return borders.trimStart();
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
        
        const grid = _createCells(sudoku);

        return (
            <div id="play-area">
                {grid}

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
