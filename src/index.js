import { createRoot } from "react-dom/client";
import { retrieveBoard } from "./js/BoardRetrieval";
import SudokuBoard from "./js/SudokuBoard";

const container = document.getElementById("app");
const root = createRoot(container)

retrieveBoard("NINE", "MASTER", "KILLER,HYPER").then((json) => {
    root.render(
        <div><SudokuBoard info={json} /></div>
    );
}).catch((error) => {
    root.render(error.message);
});
