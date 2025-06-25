import "../styles/LoginPage.scss";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { login } from "./Fetch";
import { LoginInfo } from "./LoginInfo";
import InputField from "./InputField";
import { useAppDispatch } from "./Hooks";
import { user } from "./UserState";
import { AppDispatch } from "./Store";

interface _LoginAttemptState {
    borders: string;

    text: string;

    color: string;

    padding: string;
}

function _checkLogin(info: LoginInfo, setLogin: Dispatch<SetStateAction<_LoginAttemptState>>, nav: NavigateFunction, dispatch: AppDispatch) {
    const dbUser = info.user;

    if (!dbUser) {
        setLogin({ borders: "failed-login" , text: "Username or Password not authenticated", color: "failed-login-text", padding: "0em" });
    }
    else {    
        dispatch(user(dbUser));
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
    setLogin({ borders: "login-not-attempted", text: "Authenticating...", color: "login-text", padding: "0em" });

    login(usernameOrEmail, password).then((info: LoginInfo) => {
        _checkLogin(info, setLogin, nav, dispatch);
    }).catch((error: Error) => {
        throw error;
    });
}

export default function LoginPage(): ReactNode {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, setLogin] = useState<_LoginAttemptState>({ borders: "login-not-attempted", text: "", color: "", padding: "1.5em" });
    
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className="centered">
            <h1 id="login-title" className="centered">Login</h1>

            <div id="login-box" className="centered">
                <p className={login.color} style={{ paddingTop: login.padding }}>{login.text}</p>

                <form onSubmit={(_) => false}>
                    <InputField
                        label="usernameOrEmail" prompt="Username/Email:" classes={login.borders} covered={false}
                        inputEvent={(ev) => setUsernameOrEmail(ev.currentTarget.value)}
                    />

                    <InputField
                        label="password" prompt="Password:" classes={login.borders} covered={true}
                        inputEvent={(ev) => setPassword(ev.currentTarget.value)}
                    />

                    <div id="login-button">
                        <label htmlFor="login" />
                        <input
                            className="btn btn-primary"
                            type="button"
                            name="login"
                            value="Login"
                            onClick={(_) => _attemptUserLogin(usernameOrEmail, password, setLogin, nav, dispatch) }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
