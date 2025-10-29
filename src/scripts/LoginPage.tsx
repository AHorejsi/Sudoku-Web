import "../styles/LoginPage.css";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints, StorageNames } from "./StringConstants";
import { loginWithPassword } from "./Fetch";
import { LoginInfo } from "./LoginInfo";
import InputField from "./InputField";
import { useAppDispatch } from "./Hooks";
import { user } from "./UserState";
import { AppDispatch } from "./Store";
import { setItemInStorage } from "./Storage";

interface _LoginAttemptState {
    borders: string;

    text: string;

    style: string;

    padding: string;
}

function _checkLogin(info: LoginInfo, setLogin: Dispatch<SetStateAction<_LoginAttemptState>>, nav: NavigateFunction, dispatch: AppDispatch) {
    const dbUser = info.user;

    if (!dbUser) {
        setLogin({ borders: "failed-login" , text: "Username or Password not authenticated", style: "failed-login-text", padding: "0em" });
    }
    else {
        const jwtToken = info.token!;

        dispatch(user(dbUser));
        setItemInStorage(StorageNames.JWT_TOKEN, jwtToken);

        nav(Endpoints.GAMEPLAY);
    }
}

function _attemptUserLogin(
    usernameOrEmail: string,
    password: string,
    setLogin: Dispatch<SetStateAction<_LoginAttemptState>>,
    nav: NavigateFunction,
    dispatch: AppDispatch
) {
    setLogin({ borders: "login-not-attempted", text: "Authenticating...", style: "login-text", padding: "0em" });

    loginWithPassword(usernameOrEmail, password).then((info) => {
        _checkLogin(info, setLogin, nav, dispatch);
    }).catch((error) => {
        nav(Endpoints.ERROR, { state: error })
    });
}

export default function LoginPage(): ReactNode {
    document.title = "Sudoku - Login";

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState<_LoginAttemptState>({ borders: "login-not-attempted", text: "", style: "", padding: "1.5em" });
    
    const nav = useNavigate();

    const dispatch = useAppDispatch();

    return (
        <div className="centered">
            <h1 id="login-title" className="centered">Login</h1>

            <div id="login-box" className="centered">
                <p className={`${login.style} login-padding`} style={{ paddingTop: login.padding }}>{login.text}</p>

                <form onSubmit={(_) => false}>
                    <InputField
                        label="usernameOrEmail" prompt="Username/Email:" classes={login.borders} covered={false}
                        inputEvent={(ev) => setUsernameOrEmail(ev.currentTarget.value)}
                    />

                    <InputField
                        label="password" prompt="Password:" classes={login.borders} covered={true}
                        inputEvent={(ev) => setPassword(ev.currentTarget.value)}
                    />

                    <div className="login-padding">
                        <label htmlFor="login" />
                        <input
                            className="btn btn-primary"
                            type="button"
                            name="login"
                            value="Login"
                            onClick={(_) => _attemptUserLogin(usernameOrEmail, password, setLogin, nav, dispatch)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
