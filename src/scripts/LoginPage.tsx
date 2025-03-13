import React, { ReactNode, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { login } from "./Fetch";
import { LoginInfo } from "./LoginInfo";

function _checkLogin(info: LoginInfo, nav: NavigateFunction) {
    const user = info.user;

    if (!user) {
        throw new Error("Unable to login");
    }
    
    const options = {
        state: user,
        replace: false
    };

    nav("/gameplay", options);
}

function _loginError(error: Error) {
    throw error;
}

function _attemptUserLogin(usernameOrEmail: string, password: string, nav: NavigateFunction) {
    const loginResult = login(usernameOrEmail, password);

    loginResult.then((info: LoginInfo) => {
        _checkLogin(info, nav);
    }).catch((error: Error) => {
        _loginError(error);
    });
}

export default function LoginPage(): ReactNode {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const nav = useNavigate();

    return (
        <div id="login">
            <form>
                <div>
                    Username/Email: 

                    <label htmlFor="usernameOrEmail" />
                    <input type="text" name="usernameOrEmail" onInput={(ev) => setUsernameOrEmail(ev.currentTarget.value)}/>
                </div>

                <div>
                    Password: 

                    <label htmlFor="password" />
                    <input type="password" name="password" onInput={(ev) => setPassword(ev.currentTarget.value)} />
                </div>

                <div>
                    <label htmlFor="login" />
                    <input type="button" name="login" value="Login" onClick={(_) => _attemptUserLogin(usernameOrEmail, password, nav) } />
                </div>
            </form>
        </div>
    );
}
