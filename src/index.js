import { createRoot } from "react-dom/client";
import { retrieveBoard } from "./BoardRetrieval";

const container = document.getElementById("app");
const root = createRoot(container)

let board = retrieveBoard()

board.then((jsx) => {
    root.render(<div>{jsx}</div>);
});