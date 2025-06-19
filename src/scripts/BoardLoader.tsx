import "../styles/BoardLoader.scss";
import { ReactNode, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";
import { load } from "./LoadState";

interface BoardLoaderProps {
    puzzleId: number;

    sudoku: Sudoku;
}

function _reloadSudoku(props: BoardLoaderProps, nav: NavigateFunction, dispatch: AppDispatch) {
    dispatch(load(props.puzzleId));

    nav(Endpoints.GAMEPLAY);
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
        </div>
    );
}
