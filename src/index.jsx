import { createRoot } from "react-dom/client";
import { retrieveBoard } from "./scripts/Sudoku";
import SudokuBoard from "./scripts/SudokuBoard";

const container = document.getElementById("app");
const root = createRoot(container)

retrieveBoard("NINE", "MASTER", "").then((json) => {
    root.render(<SudokuBoard info={json} />);
}).catch((error) => {
    root.render(error.message);
});
