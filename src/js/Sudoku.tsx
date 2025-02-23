interface Position {
    rowIndex: number;

    colIndex: number;
}

interface Cage {
    sum: number;

    positions: Position[];
}

interface Box {
    isHyper: Boolean;

    positions: Position[];
}

interface Sudoku {
    board: (number | null)[][];

    solved: number[][];

    cages: Cage[];

    boxes: Box[];

    length: number;

    difficulty: string;

    games: string[];
}

export { Position, Cage, Box, Sudoku };
