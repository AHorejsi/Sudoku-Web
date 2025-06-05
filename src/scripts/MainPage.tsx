import "../styles/MainPage.scss";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

export default function MainPage(): ReactNode {
    const nav = useNavigate();

    return (
        <div id="top-card" className="container">
            <button className="btn btn-primary" onClick={(_) => nav("/login")}>Login</button>

            <span id="divider" />

            <button className="btn btn-primary" onClick={(_) => nav("/signup")}>Sign Up</button>
        </div>
    );
}
