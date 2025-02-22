import { createRoot } from "react-dom/client";
import { retrieveBoard } from "./js/Sudoku";
import SudokuBoard from "./js/SudokuBoard";

const container = document.getElementById("app");
const root = createRoot(container)

retrieveBoard("FOUR", "BEGINNER", "").then((json) => {
    root.render(<SudokuBoard info={json} />);
}).catch((error) => {
    root.render(error.message);
});
