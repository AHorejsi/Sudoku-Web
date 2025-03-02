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

interface Sudoku {
    board: (number | null)[][];

    solved: number[][];

    cages: Cage[] | null;

    boxes: Box[];

    length: number;

    difficulty: string;

    games: string[];
}

async function retrieveBoard(dimension: string, difficulty: string, games: string): Promise<Sudoku> {
    const url = "http://localhost:8080/generate";

    document.cookie = "dimension=" + dimension;
    document.cookie = "difficulty=" + difficulty;
    document.cookie = "games=" + games;

    const response = await fetch(url, {
        headers: {
            "X-Request-ID": "Sudoku-Generate",
            "Accept": "application/json; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive",
        },
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Response status: " + response.status);
    }

    const json: Sudoku = await response.json();
    
    return json;
}

export { Position, Cage, Box, Sudoku, retrieveBoard };
