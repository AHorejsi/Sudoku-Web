import "../styles/BoardLoader.css";
import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { AppDispatch } from "./Store";
import { deletePuzzle } from "./Fetch";
import { load, save } from "./UserState";
import { StorageNames } from "./StringConstants";
import { getItemFromStorage } from "./Storage";

interface BoardLoaderProps {
    puzzleId: number;

    sudoku: Sudoku;
}

function _reloadSudoku(puzzleId: number, nav: NavigateFunction, dispatch: AppDispatch) {
    dispatch(load(puzzleId));

    nav(Endpoints.GAMEPLAY);
}

function _deleteSudoku(puzzleId: number, nav: NavigateFunction, dispatch: AppDispatch) {
    const token = getItemFromStorage(StorageNames.JWT_TOKEN);

    deletePuzzle(puzzleId, token).then((info) => {
        if (info.type.endsWith("Success")) {
            dispatch(save({ operation: "DELETE_ITEM", data: { puzzleId } }));
        }
        else {
            nav(Endpoints.ERROR, { state: new Error("Failed to delete") });
        }
    }).catch((error) => {
        nav(Endpoints.ERROR, { state: error });
    })
}

export default function BoardLoader(props: BoardLoaderProps): ReactNode {
    const nav = useNavigate();

    const dispatch = useAppDispatch();

    const sudoku = props.sudoku;
    const puzzleId = props.puzzleId;
    
    const difficulty = sudoku.difficulty;
    const games = 0 === sudoku.games.length ? "REGULAR" : sudoku.games.join(", ");

    return (
        <div className="border">
            <div>{difficulty}</div>
            <div>{games}</div>

            <button className="btn btn-info" onClick={(_) => _reloadSudoku(puzzleId, nav, dispatch)}>Reload</button>
            <button className="btn btn-info" onClick={(_) => _deleteSudoku(puzzleId, nav, dispatch)}>Delete</button>
        </div>
    );
}
