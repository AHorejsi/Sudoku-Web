import "../styles/BoardLoader.scss";
import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import { Endpoints } from "./StringConstants";

interface BoardLoaderProps {
    puzzle: Sudoku;

    userState: any;
}

function _reloadSudoku(props: BoardLoaderProps, nav: NavigateFunction) {
    props.userState.loaded = props.puzzle;

    const options = {
        state: props.userState,
        replace: false
    }

    nav(Endpoints.GAMEPLAY, options);
}

export default function BoardLoader(props: BoardLoaderProps): ReactNode {
    const nav = useNavigate();

    const sudoku = props.puzzle;

    return (
        <div className="border" onClick={(_) => _reloadSudoku(props, nav)}>
            <div>{sudoku.difficulty}</div>
            <div>{sudoku.games.join(", ")}</div>
        </div>
    );
}
