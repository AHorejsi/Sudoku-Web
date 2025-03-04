import "../styles/GameplayPage.scss";
import React, { ReactNode, useState } from "react";
import { useLocation } from "react-router";
import { Sudoku } from "./Sudoku";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";

export default function GameplayPage(): ReactNode {
    const [board, setBoard] = useState<Sudoku | Error>(new Error("No Puzzle"));
    const loc = useLocation();

    return (
        <div className="container">
            <h1>Hello, { loc.state.username }!</h1>

            <div id="gameplay">
                <SelectionCard creator={setBoard} />
                <SudokuBoard info={board} />
            </div>
        </div>
    );
}