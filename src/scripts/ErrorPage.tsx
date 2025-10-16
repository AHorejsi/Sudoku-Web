import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";

export default function ErrorPage(): ReactNode {
    const loc = useLocation();
    const nav = useNavigate();

    const error = loc.state as Error;

    return (
        <div className="container">
            <h1>{ error.message }</h1>

            <button className="btn btn-danger" onClick={(_) => nav(Endpoints.MAIN)}>To Main Page</button>
        </div>
    );
}