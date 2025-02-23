import { Sudoku } from "./Sudoku";

export default async function retrieveBoard(dimension: String, difficulty: String, games: String): Promise<Sudoku> {
    const url = "http://localhost:8080/generate";

    document.cookie = "dimension=" + dimension;
    document.cookie = "difficulty=" + difficulty;
    document.cookie = "games=" + games;

    const response = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
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
