import "../styles/LoaderPage.css";
import { useNavigate } from "react-router";
import { Sudoku } from "./GenerateInfo";
import BoardLoader from "./BoardLoader";
import { useAppSelector } from "./Hooks";
import { Endpoints } from "./Constants";
import { selectUser } from "./UserState";

function _getSavedPuzzleSelection(): React.JSX.Element[] {
    const user = useAppSelector(selectUser)!;
    const puzzleSet = user.puzzles;
    
    const selection = Array<React.JSX.Element>();

    let count = 0;

    for (const puzzle of puzzleSet) {
        const sudoku = JSON.parse(puzzle.json) as Sudoku;

        selection.push(<BoardLoader key={count} puzzleId={puzzle.id} sudoku={sudoku} />);

        ++count;
    }

    return selection;
}

export default function LoaderPage(): React.JSX.Element {
    document.title = "Sudoku - Loader";

    const savedPuzzles = _getSavedPuzzleSelection();
    const nav = useNavigate();  

    return (
        <div>
            <h1 id="title-card">Previously Saved Sudoku Puzzles</h1>

            <div id="select-card">{savedPuzzles}</div>

            <button className="btn btn-info" onClick={(_) => nav(Endpoints.GAMEPLAY)}>Back</button>
        </div>
    );
}
