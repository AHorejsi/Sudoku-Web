import { createRoot } from "react-dom/client";
import { retrieveBoard } from "./js/BoardRetrieval";
import SudokuBoard from "./js/SudokuBoard";

const container = document.getElementById("app");
const root = createRoot(container)

retrieveBoard("SIXTEEN", "MASTER", "").then((json) => {
    root.render(<SudokuBoard info={json} />);
}).catch((error) => {
    root.render(error.message);
});
