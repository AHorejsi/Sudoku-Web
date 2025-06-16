import "../styles/BoardLoader.scss";
import { ReactNode, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";
import { save } from "./SaveState";

interface BoardLoaderProps {
    puzzleId: number;

    sudoku: Sudoku;

    userState: any;
}

function _reloadSudoku(props: BoardLoaderProps, nav: NavigateFunction, dispatch: AppDispatch) {
    dispatch(save(props.puzzleId));

    const options = {
        state: props.userState,
        replace: false
    }

    nav(Endpoints.GAMEPLAY, options);
}

export default function BoardLoader(props: BoardLoaderProps): ReactNode {
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const sudoku = props.sudoku;
    const div = useRef<HTMLDivElement>(null);

    return (
        <div className="border" ref={div}>
            <div>{sudoku.difficulty}</div>
            <div>{sudoku.games.join(", ")}</div>

            <button onClick={(_) => _reloadSudoku(props, nav, dispatch)}>Reload</button>
        </div>
    );
}
