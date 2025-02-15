import { createRoot } from "react-dom/client";
import { retrieveBoard } from "./BoardRetrieval";

const container = document.getElementById("app");
const root = createRoot(container)

retrieveBoard("NINE", "MASTER", "KILLER,HYPER").then((json) => {
    root.render(<h1>{JSON.stringify(json)}</h1>);
}).catch((error) => {
    root.render(error.message);
});
