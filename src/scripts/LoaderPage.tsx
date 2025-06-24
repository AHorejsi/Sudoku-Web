import "../styles/LoaderPage.scss";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import BoardLoader from "./BoardLoader";
import { useAppSelector } from "./Hooks";
import { RootState } from "./Store";
import { Endpoints } from "./StringConstants";

export default function LoaderPage(): ReactNode {
    const user = useAppSelector((state: RootState) => state.login.user);
    const nav = useNavigate();

    const puzzleSet = user!.puzzles;
    const selection = Array<ReactNode>();

    for (const puzzle of puzzleSet) {
        const sudoku: Sudoku = JSON.parse(puzzle.json);

        selection.push(<BoardLoader puzzleId={puzzle.id} sudoku={sudoku} />);
    }    

    return (
        <div>
            <h1 id="title-card">Previously Saved Sudoku Puzzles</h1>

            <div id="select-card">{selection}</div>

            <button onClick={(_) => nav(Endpoints.GAMEPLAY)}>Back</button>
        </div>
    );
}
