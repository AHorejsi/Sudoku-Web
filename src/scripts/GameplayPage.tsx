import "../styles/GameplayPage.scss";
import { ReactNode, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { GenerateInfo } from "./GenerateInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";

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

    let loaded: GenerateInfo | undefined;

    if (loc.state.loaded) {
        loaded = { type: "Success", puzzle: loc.state.loaded };
    }

    const [board, setBoard] = useState<GenerateInfo | string | Error>(loaded ?? "No Puzzle");

    return (
        <div className="container">
            <div>
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