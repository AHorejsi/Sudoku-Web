import "../styles/MainPage.css";
import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints, StorageNames } from "./StringConstants";
import { loginWithToken } from "./Fetch";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";
import { user } from "./UserState";
import { getItemFromStorage, setItemInStorage } from "./Storage";

function _checkJwtToken(token: string | null, nav: NavigateFunction, dispatch: AppDispatch) {
    if (!token) {
        nav(Endpoints.LOGIN);
    }
    else {
        loginWithToken(token).then((info) => {
            if (!info.type.endsWith("Success")) {
                nav(Endpoints.LOGIN);
            }
            else {
                const dbUser = info.user!;
                const jwtToken = info.token!;

                dispatch(user(dbUser));
                setItemInStorage(StorageNames.JWT_TOKEN, jwtToken);

                nav(Endpoints.GAMEPLAY);
            }
        }).catch((error) => {
            nav(Endpoints.ERROR, { state: error });
        });
    }
}

export default function MainPage(): ReactNode {
    document.title = "Sudoku - Main";

    const token = getItemFromStorage(StorageNames.JWT_TOKEN);
    
    const nav = useNavigate();

    const dispatch = useAppDispatch();

    return (
        <div>
            <div id="top-card" className="container">
                <button className="btn btn-primary" onClick={(_) => _checkJwtToken(token, nav, dispatch)}>Login</button>

                <span className="divider" />

                <button className="btn btn-primary" onClick={(_) => nav(Endpoints.SIGNUP)}>Sign Up</button>
            </div>
        </div>
    );
}
