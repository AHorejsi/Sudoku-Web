import { useLocation, useNavigate } from "react-router";
import { Endpoints } from "./Constants";

export default function ErrorPage(): React.JSX.Element {
    document.title = "Sudoku - Error";

    const loc = useLocation();
    const nav = useNavigate();

    const error = loc.state as Error;

    return (
        <div className="container">
            <h1>{ error.message }</h1>
            <p>{ error.stack }</p>

            <button className="btn btn-danger" onClick={(_) => nav(Endpoints.MAIN)}>To Main Page</button>
        </div>
    );
}