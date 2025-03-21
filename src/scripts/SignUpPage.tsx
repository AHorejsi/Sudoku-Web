import "../styles/SignupPage.scss";
import React, { ReactNode, useState } from "react";
import { signup } from "./Fetch";
import { SignupInfo } from "./SignupInfo";
import { NavigateFunction, useNavigate } from "react-router";

function _checkSignup(info: SignupInfo, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        throw new Error("Unable to sign up");
    }

    const options: any = {
        state: { success: true },
        replace: false
    };

    nav("/login", options);
}

function _signupError(error: Error) {
    throw error;
}

function _attemptSignup(username: string, email: string, password: string, nav: NavigateFunction) {
    const signupResult = signup(username, email, password);

    signupResult.then((info: SignupInfo) => {
        _checkSignup(info, nav);
    }).catch((error: Error) => {
        _signupError(error);
    })
}

export default function SignUpPage(): ReactNode {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    return (
        <div id="signup">
            <form>
                <div>
                    Username: 

                    <label htmlFor="username" />
                    <input type="text" name="username" onInput={(ev) => setUsername(ev.currentTarget.value)} />
                </div>

                <div>
                    Email: 

                    <label htmlFor="email" />
                    <input type="text" name="email" onInput={(ev) => setEmail(ev.currentTarget.value)} />
                </div>

                <div>
                    Password: 

                    <label htmlFor="password" />
                    <input type="password" name="password" onInput={(ev) => setPassword(ev.currentTarget.value)} />
                </div>

                <div>
                    <label htmlFor="signup" />
                    <input type="button" name="signup" value="Sign Up" onClick={(ev) => _attemptSignup(username, email, password, nav)} />
                </div>
            </form>
        </div>
    );
}
