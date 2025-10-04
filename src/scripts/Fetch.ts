import { URLs, XRequestIds } from "./StringConstants";
import { GenerateInfo } from "./GenerateInfo";
import { LoginInfo } from "./LoginInfo";
import { SignupInfo } from "./SignupInfo";
import { UpdateUserInfo } from "./UpdateUserInfo";
import { DeleteUserInfo } from "./DeleteUserInfo";
import { CreatePuzzleInfo } from "./CreatePuzzleInfo";
import { UpdatePuzzleInfo } from "./UpdatePuzzleInfo";
import { DeletePuzzleInfo } from "./DeletePuzzleInfo";

function _ensureOkResponse(response: Response) {
    if (!response.ok) {
        throw new Error("Response status: " + response.status + ". " + response.statusText);
    }
}

function _headers(xReqId: string): HeadersInit {
    return {
        "X-Request-ID": xReqId,
        "Accept": "application/json",
        "Accept-Charset": "ISO-8859-1",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/5.0"
    };
}

async function retrieveBoard(dimension: string, difficulty: string, games: string[]): Promise<GenerateInfo> {
    const response = await fetch(URLs.GENERATE, {
        headers: _headers(XRequestIds.GENERATE),
        method: "POST",
        body: JSON.stringify({ dimension, difficulty, games }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const json = await response.json() as GenerateInfo;
    
    return json;
}

async function signup(username: string, email: string, password: string): Promise<SignupInfo> {
    const response = await fetch(URLs.CREATE_USER, {
        headers: _headers(XRequestIds.CREATE_USER),
        method: "PUT",
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const signup = await response.json() as SignupInfo;

    return signup;
}

async function login(usernameOrEmail: string, password: string): Promise<LoginInfo> {
    const response = await fetch(URLs.READ_USER, {
        headers: _headers(XRequestIds.READ_USER),
        method: "POST",
        body: JSON.stringify({ usernameOrEmail, password }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const login = await response.json() as LoginInfo;

    return login;
}

async function updateUser(
    userId: number,
    newUsername: string,
    newEmail: string
): Promise<UpdateUserInfo> {
    const response = await fetch(URLs.UPDATE_USER, {
        headers: _headers(XRequestIds.UPDATE_USER),
        method: "PUT",
        body: JSON.stringify({ userId, newUsername, newEmail }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const update = await response.json() as UpdateUserInfo;

    return update;
}

async function deleteUser(userId: number): Promise<DeleteUserInfo> {
    const response = await fetch(URLs.DELETE_USER, {
        headers: _headers(XRequestIds.DELETE_USER),
        method: "DELETE",
        body: JSON.stringify({ userId }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const info = await response.json() as DeleteUserInfo;

    return info;
}

async function createPuzzle(json: string, userId: number): Promise<CreatePuzzleInfo> {
    const response = await fetch(URLs.CREATE_PUZZLE, {
        headers: _headers(XRequestIds.CREATE_PUZZLE),
        method: "PUT",
        body: JSON.stringify({ json, userId }),
        credentials: "include"
    });

    _ensureOkResponse(response)

    const info = await response.json() as CreatePuzzleInfo;

    return info;
}

async function updatePuzzle(puzzleId: number, json: string): Promise<UpdatePuzzleInfo> {
    const response = await fetch(URLs.UPDATE_PUZZLE, {
        headers: _headers(XRequestIds.UPDATE_PUZZLE),
        method: "PUT",
        body: JSON.stringify({ puzzleId, json }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const info = await response.json() as UpdatePuzzleInfo;

    return info;
}

async function deletePuzzle(puzzleId: number): Promise<DeletePuzzleInfo> {
    const response = await fetch(URLs.DELETE_PUZZLE, {
        headers: _headers(XRequestIds.DELETE_PUZZLE),
        method: "DELETE",
        body: JSON.stringify({ puzzleId }),
        credentials: "include"
    });

    _ensureOkResponse(response);

    const info = await response.json() as DeletePuzzleInfo;

    return info;
}

export { retrieveBoard, signup, login, updateUser, deleteUser, createPuzzle, updatePuzzle, deletePuzzle };
