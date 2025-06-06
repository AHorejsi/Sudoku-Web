import { GenerateInfo } from "./GenerateInfo";
import { LoginInfo } from "./LoginInfo";
import { SignupInfo } from "./SignupInfo";
import { UpdateUserInfo } from "./UpdateUserInfo";
import { DeleteUserInfo } from "./DeleteUserInfo";
import { URLs, XRequestIds } from "./StringConstants" 

function _ensureOkResponse(response: Response) {
    if (!response.ok) {
        throw new Error("Response status: " + response.status + ". " + response.statusText);
    }
}

async function retrieveBoard(dimension: string, difficulty: string, games: string[]): Promise<GenerateInfo> {
    const response = await fetch(URLs.GENERATE, {
        headers: {
            "X-Request-ID": XRequestIds.GENERATE,
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

    const json: GenerateInfo = await response.json();
    
    return json;
}

async function signup(username: string, email: string, password: string): Promise<SignupInfo> {
    const response = await fetch(URLs.CREATE_USER, {
        headers: {
            "X-Request-ID": XRequestIds.CREATE_USER,
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
    const response = await fetch(URLs.READ_USER, {
        headers: {
            "X-Request-ID": XRequestIds.READ_USER,
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

async function updateUser(
    userId: number,
    oldUsername: string,
    oldEmail: string,
    newUsername: string,
    newEmail: string
): Promise<UpdateUserInfo> {
    const response = await fetch(URLs.UPDATE_USER, {
        headers: {
            "X-Request-ID": XRequestIds.UPDATE_USER,
            "Accept": "application/json; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
        },
        method: "PUT",
        body: JSON.stringify({ userId, oldUsername, newUsername, oldEmail, newEmail }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const update: UpdateUserInfo = await response.json();

    return update;
}

async function deleteUser(userId: number): Promise<DeleteUserInfo> {
    const response = await fetch(URLs.DELETE_USER, {
        headers: {
            "X-Request-ID": XRequestIds.DELETE_USER,
            "Accept": "application/json; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive"
        },
        method: "DELETE",
        body: JSON.stringify({ userId }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const info: DeleteUserInfo = await response.json();

    return info;
}

export { retrieveBoard, signup, login, updateUser, deleteUser };
