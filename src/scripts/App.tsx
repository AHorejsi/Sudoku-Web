import "../styles/App.scss";
import React, { ReactNode, useState } from "react";
import { Sudoku } from "./Sudoku";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";

export default function App(): ReactNode {
    const [board, setBoard] = useState<Sudoku | Error>(new Error("No Puzzle"));

    return (
        <div id="main">
            <SelectionCard creator={setBoard} />
            <SudokuBoard info={board} />
        </div>
    );
}
