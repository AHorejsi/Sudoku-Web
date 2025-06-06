import "../styles/SignupPage.scss";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Endpoints } from "./StringConstants";
import { signup } from "./Fetch";
import { SignupInfo } from "./SignupInfo";
import { NavigateFunction, useNavigate } from "react-router";

interface _SignupState {
    borders: string;

    text: string;

    color: string;
}

function _checkSignup(info: SignupInfo, setSignup: Dispatch<SetStateAction<_SignupState>>, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        setSignup({ borders: "failed-signup" , text: "Username/Email or Password not valid", color: "failed-signup-text" });
    }
    else {
        const options = {
            state: { success: true },
            replace: false
        };
    
        nav(Endpoints.LOGIN, options);
    }
}

function _attemptSignup(
    username: string,
    email: string,
    password: string,
    setSignup: Dispatch<SetStateAction<_SignupState>>,
    nav: NavigateFunction
) {
    setSignup({ borders: "signup-not-attempted", text: "Registering...", color: "signup-text" });

    const signupResult = signup(username, email, password);

    signupResult.then((info: SignupInfo) => {
        _checkSignup(info, setSignup, nav);
    }).catch((error: Error) => {
        throw error;
    })
}

export default function SignUpPage(): ReactNode {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signup, setSignup] = useState<_SignupState>({ borders: "signup-not-attempted", text: "", color: "" });

    const nav = useNavigate();

    return (
        <div id="signup">
            <form>
                <p className={signup.color}>{signup.text}</p>

                <div>
                    Username: 

                    <label htmlFor="username" />
                    <input
                        className={signup.borders}
                        type="text"
                        name="username"
                        onInput={(ev) => setUsername(ev.currentTarget.value)}
                    />
                </div>

                <div>
                    Email: 

                    <label htmlFor="email" />
                    <input
                        className={signup.borders}
                        type="text"
                        name="email"
                        onInput={(ev) => setEmail(ev.currentTarget.value)}
                    />
                </div>

                <div>
                    Password: 

                    <label htmlFor="password" />
                    <input
                        className={signup.borders}
                        type="password"
                        name="password"
                        onInput={(ev) => setPassword(ev.currentTarget.value)}
                    />
                </div>

                <div>
                    <label htmlFor="signup" />
                    <input
                        type="button"
                        name="signup"
                        value="Sign Up"
                        onClick={(_) => _attemptSignup(username, email, password, setSignup, nav)}
                    />
                </div>
            </form>
        </div>
    );
}
