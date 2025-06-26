import "../styles/LoaderPage.css";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import BoardLoader from "./BoardLoader";
import { useAppSelector } from "./Hooks";
import { Endpoints } from "./StringConstants";
import { selectUser } from "./UserState";

export default function LoaderPage(): ReactNode {
    const user = useAppSelector(selectUser);
    const nav = useNavigate();

    const puzzleSet = user!.puzzles;
    const selection = Array<ReactNode>();

    for (const puzzle of puzzleSet) {
        const sudoku = JSON.parse(puzzle.json) as Sudoku;

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
