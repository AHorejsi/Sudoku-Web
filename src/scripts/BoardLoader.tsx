import "../styles/BoardLoader.scss";
import { ReactNode, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";
import { deletePuzzle } from "./Fetch";
import { load } from "./LoadState";
import { update } from "./UserState";

interface BoardLoaderProps {
    puzzleId: number;

    sudoku: Sudoku;
}

function _reloadSudoku(props: BoardLoaderProps, nav: NavigateFunction, dispatch: AppDispatch) {
    dispatch(load(props.puzzleId));

    nav(Endpoints.GAMEPLAY);
}

function _deleteSudoku(props: BoardLoaderProps, div: HTMLDivElement, dispatch: AppDispatch) {
    deletePuzzle(props.puzzleId).then((info) => {
        if (info.type.endsWith("Success")) {
            dispatch(update({ operation: "DELETE_ITEM", puzzleId: props.puzzleId }));
            div.remove();
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
    const div = useRef<HTMLDivElement>(null);

    const sudoku = props.sudoku;

    return (
        <div className="border" ref={div}>
            <div>{sudoku.difficulty}</div>
            <div>{sudoku.games.join(", ")}</div>

            <button onClick={(_) => _reloadSudoku(props, nav, dispatch)}>Reload</button>
            <button onClick={(_) => _deleteSudoku(props, div.current!, dispatch)}>Delete</button>
        </div>
    );
}
