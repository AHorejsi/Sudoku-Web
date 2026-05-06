import "../styles/GameplayPage.css";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints, StorageNames } from "./Constants";
import { GenerateInfo } from "./GenerateInfo";
import { Puzzle, User } from "./LoginInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { selectUser, selectLoad, user, load } from "./UserState";
import { renewJwtToken } from "./Fetch";
import { AppDispatch } from "./Store";
import { getItemFromStorage, setItemInStorage } from "./Storage";

function _getInfo(puzzleSet: Puzzle[], targetId: number | null): GenerateInfo | null | undefined {
    if (!targetId) {
        return null;
    }

    let info: GenerateInfo | undefined;

    for (const puzzle of puzzleSet) {
        if (puzzle.id === targetId) {
            info = {
                type: "Success",
                sudoku: JSON.parse(puzzle.json)
            };

            break;
        }
    }

    return info;
}

function _setUpJwtAutoRenewal(ref: { token: string }, dbUser: User, nav: NavigateFunction): void {
    setInterval(() => {
        renewJwtToken(dbUser, ref.token).then((info) => {
            if (info.type.endsWith("Success")) {
                setItemInStorage(StorageNames.JWT_TOKEN, info.newToken!);
            }
            else {
                nav(Endpoints.ERROR, { state: new Error("Invalid JWT Token") });
            }
        }).catch((error) => {
            nav(Endpoints.ERROR, { state: error });
        });
    }, 3600000); // 1 hour
}

function _logout(dispatch: AppDispatch, nav: NavigateFunction): void {
    dispatch(user(null));
    dispatch(load(null));

    nav(Endpoints.MAIN);
}

export default function GameplayPage(): React.JSX.Element {
    document.title = "Sudoku - Gameplay";

    const nav = useNavigate();

    const puzzleId = useAppSelector(selectLoad);
    const dbUser = useAppSelector(selectUser)!;

    const dispatch = useAppDispatch();

    const token = getItemFromStorage(StorageNames.JWT_TOKEN)!;
    _setUpJwtAutoRenewal({ token }, dbUser, nav);

    const info = _getInfo(dbUser.puzzles, puzzleId);
    const [board, setBoard] = useState<GenerateInfo | string | Error>(info ?? "No Puzzle");

    return (
        <div className="container">
            <div id="title-card">
                <h1>Hello, { dbUser.username }!</h1>

                <button className="btn btn-info" onClick={(_) => nav(Endpoints.LOADER)}>Load</button>
                <span className="divider" />
                <button className="btn btn-info" onClick={(_) => nav(Endpoints.SETTINGS)}>User Settings</button>
                <span className="divider" />
                <button className="btn btn-danger" onClick={(_) => _logout(dispatch, nav)}>Logout</button>
            </div>

            <div id="gameplay">
                <SelectionCard creator={setBoard} />
                <SudokuBoard info={board} />
            </div>
        </div>
    );
}