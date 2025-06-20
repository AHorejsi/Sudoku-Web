import "../styles/GameplayPage.scss";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { GenerateInfo, Sudoku } from "./GenerateInfo";
import { Puzzle } from "./LoginInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";
import { RootState } from "./Store";
import { useAppSelector } from "./Hooks";

function _findSudoku(puzzleSet: Puzzle[], targetId: number | null): Sudoku | null {
    if (!targetId) {
        return null;
    }

    for (const puzzle of puzzleSet) {
        if (puzzle.id === targetId) {
            return JSON.parse(puzzle.json);
        }
    }

    return null;
}

export default function GameplayPage(): ReactNode {
    const nav = useNavigate();

    const puzzleId = useAppSelector((state: RootState) => state.reloaded.puzzleId);
    const user = useAppSelector((state: RootState) => state.login.user)!;

    const sudoku = _findSudoku(user.puzzles, puzzleId);
    let info: GenerateInfo | undefined;

    if (sudoku) {
        info = { type: "Success", sudoku };
    }

    const [board, setBoard] = useState<GenerateInfo | string | Error>(info ?? "No Puzzle");

    return (
        <div className="container">
            <div id="title-card">
                <h1>Hello, { user.username }!</h1>

                <button onClick={(_) => nav(Endpoints.LOADER)}>Load</button>
                <button onClick={(_) => nav(Endpoints.SETTINGS)}>User Settings</button>
            </div>

            <div id="gameplay">
                <SelectionCard creator={setBoard} />
                <SudokuBoard info={board} />
            </div>
        </div>
    );
}