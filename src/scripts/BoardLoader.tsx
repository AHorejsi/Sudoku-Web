import "../styles/BoardLoader.css";
import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";
import { deletePuzzle } from "./Fetch";
import { load } from "./LoadState";
import { puzzle } from "./UserState";

interface BoardLoaderProps {
    puzzleId: number;

    sudoku: Sudoku;
}

function _reloadSudoku(props: BoardLoaderProps, nav: NavigateFunction, dispatch: AppDispatch) {
    dispatch(load(props.puzzleId));

    nav(Endpoints.GAMEPLAY);
}

function _deleteSudoku(props: BoardLoaderProps, dispatch: AppDispatch) {
    deletePuzzle(props.puzzleId).then((info) => {
        if (info.type.endsWith("Success")) {
            dispatch(puzzle({ operation: "DELETE_ITEM", puzzleId: props.puzzleId }));
        }
        else {
            throw new Error("Failed to delete");
        }
    }).catch((error) => {
        throw error;
    })
}

export default function BoardLoader(props: BoardLoaderProps): ReactNode {
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const sudoku = props.sudoku;

    return (
        <div className="border">
            <div>{sudoku.difficulty}</div>
            <div>{sudoku.games.join(", ")}</div>

            <button onClick={(_) => _reloadSudoku(props, nav, dispatch)}>Reload</button>
            <button onClick={(_) => _deleteSudoku(props, dispatch)}>Delete</button>
        </div>
    );
}
