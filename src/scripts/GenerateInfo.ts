interface Position {
    rowIndex: number;

    colIndex: number;
}

interface Cage {
    sum: number;

    positions: Position[];
}

interface Box {
    isHyper: boolean;

    positions: Position[];
}

interface Cell {
    value: number | null;

    editable: boolean;
}

interface Sudoku {
    board: Cell[][];

    solved: number[][];

    cages: Cage[] | null;

    boxes: Box[];

    length: number;

    difficulty: string;

    games: string[];
}

interface GenerateInfo {
    type: string;

    sudoku: Sudoku;

    reloadedId?: number;
}

export { Position, Cage, Box, Cell, Sudoku, GenerateInfo };
