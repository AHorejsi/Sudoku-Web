import { Sudoku } from "./Sudoku";
import { LoginInfo } from "./LoginInfo";
import { SignupInfo } from "./SignupInfo";

function _ensureOkResponse(response: Response) {
    if (!response.ok) {
        throw new Error("Response status: " + response.status);
    }
}

async function retrieveBoard(dimension: string, difficulty: string, games: string[]): Promise<Sudoku> {
    const url = "http://localhost:8080/generate";

    const response = await fetch(url, {
        headers: {
            "X-Request-ID": "Generate-Sudoku",
            "Accept": "application/json; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
        },
        method: "POST",
        body: JSON.stringify({ dimension, difficulty, games }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const json: Sudoku = await response.json();
    
    return json;
}

async function signup(username: string, email: string, password: string): Promise<SignupInfo> {
    const url = "http://localhost:8080/createUser";

    const response = await fetch(url, {
        headers: {
            "X-Request-ID": "Create-User",
            "Accept": "application/json; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
        },
        method: "PUT",
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const signup: SignupInfo = await response.json();

    return signup;
}

async function login(usernameOrEmail: string, password: string): Promise<LoginInfo> {
    const url = "http://localhost:8080/readUser";

    const response = await fetch(url, {
        headers: {
            "X-Request-ID": "Read-User",
            "Accept": "application/json; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
        },
        method: "POST",
        body: JSON.stringify({ usernameOrEmail, password }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const login: LoginInfo = await response.json();

    return login;
}

export { retrieveBoard, signup, login };
