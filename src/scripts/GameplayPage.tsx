import "../styles/GameplayPage.scss";
import { ReactNode, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { GenerateInfo, Sudoku } from "./GenerateInfo";
import { Puzzle } from "./LoginInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";
import { RootState } from "./Store";
import { useAppSelector } from "./Hooks";

function _findSudoku(puzzleSet: Puzzle[]): Sudoku | null {
    const puzzleId = useAppSelector((state: RootState) => state.saver.puzzleId);

    alert(puzzleId);
    alert(JSON.stringify(puzzleSet));

    for (const puzzle of puzzleSet) {
        if (puzzle.id === puzzleId) {
            return JSON.parse(puzzle.json);
        }
    }

    return null;
}

function _loadExistingPuzzles(state: any, nav: NavigateFunction) {
    const options = {
        state,
        replace: false
    };

    nav(Endpoints.LOADER, options);
}

function _moveToUserSettings(state: any, nav: NavigateFunction) {
    const options = {
        state: {
            userId: state.id,
            oldUsername: state.username,
            oldEmail: state.email,
            puzzle: state.puzzles
        },
        replace: false
    };

    nav(Endpoints.SETTINGS, options);
}

export default function GameplayPage(): ReactNode {
    const loc = useLocation();
    const nav = useNavigate();

    const sudoku = _findSudoku(loc.state.puzzles);
    let info: GenerateInfo | undefined;

    if (sudoku) {
        info = { type: "Success", sudoku };
    }

    alert(JSON.stringify(info));

    const [board, setBoard] = useState<GenerateInfo | string | Error>(info ?? "No Puzzle");

    return (
        <div className="container">
            <div id="title-card">
                <h1>Hello, { loc.state.username }!</h1>

                <button onClick={(_) => _loadExistingPuzzles(loc.state, nav)}>Load</button>
                <button onClick={(_) => _moveToUserSettings(loc.state, nav)}>User Settings</button>
            </div>

            <div id="gameplay">
                <SelectionCard creator={setBoard} />
                <SudokuBoard info={board} userId={loc.state.id} saved={loc.state.puzzles} />
            </div>
        </div>
    );
}