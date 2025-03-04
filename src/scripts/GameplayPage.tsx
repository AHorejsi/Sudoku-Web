import "../styles/GameplayPage.scss";
import React, { ReactNode, useState } from "react";
import { useLocation } from "react-router";
import { Sudoku } from "./Sudoku";
import { User } from "./LoginInfo";
import SelectionCard from "./SelectionCard";
import SudokuBoard from "./SudokuBoard";

export default function GameplayPage(): ReactNode {
    const [board, setBoard] = useState<Sudoku | Error>(new Error("No Puzzle"));
    const loc = useLocation();

    return (
        <div id="gameplay">
            Hello, { loc.state.username }!

            <SelectionCard creator={setBoard} />
            <SudokuBoard info={board} />
        </div>
    );
}