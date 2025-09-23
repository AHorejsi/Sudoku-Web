import "../styles/GameplayPage.css";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { GenerateInfo } from "./GenerateInfo";
import { Puzzle } from "./LoginInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";
import { useAppSelector } from "./Hooks";
import { selectSave } from "./LoadState";
import { selectUser } from "./UserState";

function _getInfo(puzzleSet: Puzzle[], targetId: number | null): GenerateInfo | null | undefined {
    if (!targetId) {
        return null;
    }

    for (const puzzle of puzzleSet) {
        if (puzzle.id === targetId) {
            return {
                type: "Success",
                sudoku: JSON.parse(puzzle.json)
            };
        }
    }

    return undefined;
}

export default function GameplayPage(): ReactNode {
    document.title = "Sudoku - Gameplay";

    const nav = useNavigate();
    const puzzleId = useAppSelector(selectSave);
    const dbUser = useAppSelector(selectUser)!;

    const info = _getInfo(dbUser.puzzles, puzzleId);

    const [board, setBoard] = useState<GenerateInfo | string | Error>(info ?? "No Puzzle");

    return (
        <div className="container">
            <div id="title-card">
                <h1>Hello, { dbUser.username }!</h1>

                <button className="btn btn-info" onClick={(_) => nav(Endpoints.LOADER)}>Load</button>
                <span id="divider" />
                <button className="btn btn-info" onClick={(_) => nav(Endpoints.SETTINGS)}>User Settings</button>
            </div>

            <div id="gameplay">
                <SelectionCard creator={setBoard} />
                <SudokuBoard info={board} />
            </div>
        </div>
    );
}