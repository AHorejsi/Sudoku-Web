import "../styles/LoaderPage.scss";
import { ReactNode } from "react";
import { useLocation } from "react-router";
import { Puzzle } from "./LoginInfo";
import { Sudoku } from "./GenerateInfo";
import BoardLoader from "./BoardLoader";

export default function LoaderPage(): ReactNode {
    const loc = useLocation();

    const puzzleSet: Puzzle[] = loc.state.puzzles;
    const selection = Array<ReactNode>();

    for (const puzzle of puzzleSet) {
        const sudoku: Sudoku = JSON.parse(puzzle.json);

        selection.push(<BoardLoader puzzle={sudoku} userState ={loc.state} />);
    }    

    return (
        <div>{selection}</div>
    );
}
