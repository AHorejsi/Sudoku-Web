import "../styles/GameplayPage.scss";
import React, { ReactNode, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { Sudoku } from "./Sudoku";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";

function _moveToUserSettings(state: any, nav: NavigateFunction) {
    const options = {
        state: {
            userId: state.id,
            oldUsername: state.username,
            oldEmail: state.email,
            puzzles: state.puzzles
        },
        replace: false
    };

    nav("/settings", options);
}

export default function GameplayPage(): ReactNode {
    const [board, setBoard] = useState<Sudoku | Error>(new Error("No Puzzle"));

    const loc = useLocation();
    const nav = useNavigate();

    return (
        <div className="container">
            <div>
                <h1>Hello, { loc.state.username }!</h1>

                <div id="gameplay">
                    <SelectionCard creator={setBoard} />
                    <SudokuBoard info={board} />
                </div>

                <div>
                    <button onClick={(_) => _moveToUserSettings(loc.state, nav)}>User Settings</button>
                </div>
            </div>
        </div>
    );
}