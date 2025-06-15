import "../styles/BoardLoader.scss";
import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";

interface BoardLoaderProps {
    puzzleId: number;

    sudoku: Sudoku;

    userState: any;
}

function _reloadSudoku(props: BoardLoaderProps, nav: NavigateFunction) {
    props.userState.loaded = { puzzleId: props.puzzleId, sudoku: props.sudoku };

    const options = {
        state: props.userState,
        replace: false
    }

    nav(Endpoints.GAMEPLAY, options);
}

export default function BoardLoader(props: BoardLoaderProps): ReactNode {
    const nav = useNavigate();

    const sudoku = props.sudoku;

    return (
        <div className="border" onClick={(_) => _reloadSudoku(props, nav)}>
            <div>{sudoku.difficulty}</div>
            <div>{sudoku.games.join(", ")}</div>
        </div>
    );
}
