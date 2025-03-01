import React from "react";
import { createRoot } from "react-dom/client";
import { retrieveBoard, Sudoku } from "./scripts/Sudoku";
import SudokuBoard from "./scripts/SudokuBoard";

const container = document.getElementById("app")!;
const root = createRoot(container);
const data = retrieveBoard("NINE", "MASTER", "");

data.then((json: Sudoku) => {
    root.render(<SudokuBoard info={json} />);
}).catch((error: Error) => {
    root.render(error.message);
});
