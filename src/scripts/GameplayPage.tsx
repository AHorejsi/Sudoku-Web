import "../styles/GameplayPage.css";
import { ReactNode, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { GenerateInfo } from "./GenerateInfo";
import { Puzzle, User } from "./LoginInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { selectUser, selectLoad, selectToken, token, user, load } from "./UserState";
import { renewJwtToken } from "./Fetch";
import { AppDispatch } from "./Store";

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

function _setUpJwtAutoRenewal(ref: { jwt: string }, dbUser: User, dispatch: AppDispatch, nav: NavigateFunction) {
    setInterval(() => {
        renewJwtToken(dbUser, ref.jwt).then((info) => {
            dispatch(token(info.newToken));

            ref.jwt = useAppSelector(selectToken)!;
        }).catch((error) => {
            nav(Endpoints.ERROR, { state: error });
        });
    }, 3600000); // 1 hour
}

function _logout(dispatch: AppDispatch, nav: NavigateFunction) {
    dispatch(user(null));
    dispatch(token(null));
    dispatch(load(null));

    nav(Endpoints.MAIN);
}

export default function GameplayPage(): ReactNode {
    document.title = "Sudoku - Gameplay";

    const nav = useNavigate();

    const puzzleId = useAppSelector(selectLoad);
    const dbUser = useAppSelector(selectUser)!;
    let jwt = useAppSelector(selectToken)!;

    const dispatch = useAppDispatch();

    const info = _getInfo(dbUser.puzzles, puzzleId);
    const [board, setBoard] = useState<GenerateInfo | string | Error>(info ?? "No Puzzle");

    _setUpJwtAutoRenewal({ jwt }, dbUser, dispatch, nav);

    return (
        <div className="container">
            <div id="title-card">
                <h1>Hello, { dbUser.username }!</h1>

                <button className="btn btn-info" onClick={(_) => nav(Endpoints.LOADER)}>Load</button>
                <span className="divider" />
                <button className="btn btn-info" onClick={(_) => nav(Endpoints.SETTINGS)}>User Settings</button>
                <span className="divider" />
                <button className="btn btn-danger" onClick={(_) => _logout(dispatch, nav)} />
            </div>

            <div id="gameplay">
                <SelectionCard creator={setBoard} />
                <SudokuBoard info={board} />
            </div>
        </div>
    );
}