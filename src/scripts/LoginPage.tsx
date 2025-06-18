import "../styles/LoginPage.scss";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { login } from "./Fetch";
import { LoginInfo } from "./LoginInfo";
import InputField from "./InputField";

interface _LoginAttemptState {
    borders: string;

    text: string;

    color: string;
}

function _checkLogin(info: LoginInfo, setLogin: Dispatch<SetStateAction<_LoginAttemptState>>, nav: NavigateFunction) {
    const user = info.user;

    if (!user) {
        setLogin({ borders: "failed-login" , text: "Username or Password not authenticated", color: "failed-login-text" });
    }
    else {
        const options = {
            state: user,
            replace: false
        };
    
        nav(Endpoints.GAMEPLAY, options);
    }
}

function _attemptUserLogin(
    usernameOrEmail: string,
    password: string,
    setLogin: Dispatch<SetStateAction<_LoginAttemptState>>,
    nav: NavigateFunction
) {
    setLogin({ borders: "login-not-attempted", text: "Authenticating...", color: "login-text" });

    const loginResult = login(usernameOrEmail, password);

    loginResult.then((info: LoginInfo) => {
        _checkLogin(info, setLogin, nav);
    }).catch((error: Error) => {
        throw error;
    });
}

export default function LoginPage(): ReactNode {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, setLogin] = useState<_LoginAttemptState>({ borders: "login-not-attempted", text: "", color: "" });
    
    const nav = useNavigate();

    return (
        <div id="login">
            <form>
                <p className={login.color}>{login.text}</p>

                <InputField
                    label="usernameOrEmail" prompt="Username/Email:" classes={login.borders} covered={false}
                    inputEvent={(ev) => setUsernameOrEmail(ev.currentTarget.value)}
                />

                <InputField
                    label="password" prompt="Password:" classes={login.borders} covered={true}
                    inputEvent={(ev) => setPassword(ev.currentTarget.value)}
                />

                <div>
                    <label htmlFor="login" />
                    <input
                        type="button"
                        name="login"
                        value="Login"
                        onClick={(_) => _attemptUserLogin(usernameOrEmail, password, setLogin, nav) }
                    />
                </div>
            </form>
        </div>
    );
}
