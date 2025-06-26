import "../styles/MainPage.css";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";

export default function MainPage(): ReactNode {
    document.title = "Sudoku - Main";

    const nav = useNavigate();

    return (
        <div>
            <div id="top-card" className="container">
                <button className="btn btn-primary" onClick={(_) => nav(Endpoints.LOGIN)}>Login</button>

                <span className="divider" />

                <button className="btn btn-primary" onClick={(_) => nav(Endpoints.SIGNUP)}>Sign Up</button>
            </div>
        </div>
    );
}
