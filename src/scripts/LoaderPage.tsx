import "../styles/LoaderPage.scss";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Puzzle } from "./LoginInfo";
import { Sudoku, GenerateInfo } from "./GenerateInfo";
import SudokuBoard from "./SudokuBoard";

export default function LoaderPage(): ReactNode {
    const loc = useLocation();
    const nav = useNavigate();

    const puzzleSet: Puzzle[] = loc.state.puzzles;
    const selection = Array<ReactNode>();

    for (const puzzle of puzzleSet) {
        const sudoku: Sudoku = JSON.parse(puzzle.json);
        const info = {
            type: "Success",
            puzzle: sudoku
        };

        selection.push(<SudokuBoard info={info} userId={loc.state.id} />)
    }    

    return (
        <div>
            {selection}
        </div>
    );
}
