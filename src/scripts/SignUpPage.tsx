import "../styles/SignupPage.scss";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Endpoints } from "./StringConstants";
import { signup } from "./Fetch";
import { SignupInfo } from "./SignupInfo";
import { NavigateFunction, useNavigate } from "react-router";
import InputField from "./InputField";

interface _SignupState {
    borders: string;

    text: string;

    color: string;
}

function _checkSignup(info: SignupInfo, setSignup: Dispatch<SetStateAction<_SignupState>>, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        setSignup({ borders: "failed-sign-up" , text: "Username/Email or Password not valid", color: "failed-signup-text" });
    }
    else {    
        nav(Endpoints.LOGIN);
    }
}

function _attemptSignup(
    username: string,
    email: string,
    password: string,
    setSignup: Dispatch<SetStateAction<_SignupState>>,
    nav: NavigateFunction
) {
    setSignup({ borders: "sign-up-not-attempted", text: "Registering...", color: "signup-text" });

    signup(username, email, password).then((info: SignupInfo) => {
        _checkSignup(info, setSignup, nav);
    }).catch((error: Error) => {
        throw error;
    })
}

export default function SignUpPage(): ReactNode {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signup, setSignup] = useState<_SignupState>({ borders: "sign-up-not-attempted", text: "", color: "" });

    const nav = useNavigate();

    return (
        <div id="sign-up" className="centered">
            <h1 id="sign-up-title" className="centered">Sign Up</h1>

            <div id="sign-up-box" className="centered">
                <form onSubmit={(_) => false}>
                    <p className={signup.color}>{signup.text}</p>

                    <InputField
                        label="username" prompt="Username:" classes={signup.borders} covered={false}
                        inputEvent={(ev) => setUsername(ev.currentTarget.value)}
                    />

                    <InputField
                        label="email" prompt="Email:" classes={signup.borders} covered={false}
                        inputEvent={(ev) => setEmail(ev.currentTarget.value)}
                    />

                    <InputField
                        label="password" prompt="Password:" classes={signup.borders} covered={true}
                        inputEvent={(ev) => setPassword(ev.currentTarget.value)}
                    />

                    <div id="sign-up-button">
                        <label htmlFor="signup" />
                        <input
                            className="btn btn-primary"
                            type="button"
                            name="signup"
                            value="Sign Up"
                            onClick={(_) => _attemptSignup(username, email, password, setSignup, nav)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
