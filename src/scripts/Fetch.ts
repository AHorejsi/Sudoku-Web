import { URLs, XRequestIds } from "./StringConstants";
import { GenerateInfo } from "./GenerateInfo";
import { LoginInfo, User } from "./LoginInfo";
import { SignupInfo } from "./SignupInfo";
import { UpdateUserInfo } from "./UpdateUserInfo";
import { DeleteUserInfo } from "./DeleteUserInfo";
import { CreatePuzzleInfo } from "./CreatePuzzleInfo";
import { UpdatePuzzleInfo } from "./UpdatePuzzleInfo";
import { DeletePuzzleInfo } from "./DeletePuzzleInfo";
import { RenewJwtTokenInfo } from "./RenewJwtTokenInfo";

function _headers(xReqId: string, token: string | null): HeadersInit {
    const headers: HeadersInit = {
        "X-Request-ID": xReqId,
        "Accept": "application/json",
        "Accept-Charset": "ISO-8859-1",
        "Accept-Encoding": "gzip",
        "Allow": "OPTIONS, GET, POST, PUT, DELETE",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/5.0"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

async function _handleHttpResponse<TInfoType>(response: Response): Promise<TInfoType> {
    if (!response.ok) {
        throw new Error(`Response Status: ${response.status}. ${response.statusText}`)
    }

    return await response.json() as TInfoType;
}

async function retrieveBoard(dimension: string, difficulty: string, games: string[], token: string | null): Promise<GenerateInfo> {
    const response = await fetch(URLs.GENERATE, {
        headers: _headers(XRequestIds.GENERATE, token),
        method: "POST",
        body: JSON.stringify({ dimension, difficulty, games }),
        credentials: "include"
    });

    return await _handleHttpResponse<GenerateInfo>(response);
}

async function signup(username: string, email: string, password: string): Promise<SignupInfo> {
    const response = await fetch(URLs.CREATE_USER, {
        headers: _headers(XRequestIds.CREATE_USER, null),
        method: "PUT",
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    });

    return await _handleHttpResponse<SignupInfo>(response);
}

async function loginWithPassword(usernameOrEmail: string, password: string): Promise<LoginInfo> {
    const response = await fetch(URLs.READ_USER, {
        headers: _headers(XRequestIds.READ_USER, null),
        method: "POST",
        body: JSON.stringify({ usernameOrEmail, password }),
        credentials: "include"
    });

    return await _handleHttpResponse<LoginInfo>(response);
}

async function loginWithToken(token: string): Promise<LoginInfo> {
    const response = await fetch(URLs.TOKEN_LOGIN, {
        headers: _headers(XRequestIds.TOKEN_LOGIN, token),
        method: "GET",
        credentials: "include"
    });

    return await _handleHttpResponse<LoginInfo>(response);
}

async function updateUser(
    userId: number,
    newUsername: string,
    newEmail: string,
    token: string | null
): Promise<UpdateUserInfo> {
    const response = await fetch(URLs.UPDATE_USER, {
        headers: _headers(XRequestIds.UPDATE_USER, token),
        method: "PUT",
        body: JSON.stringify({ userId, newUsername, newEmail }),
        credentials: "include"
    });

    return await _handleHttpResponse<UpdateUserInfo>(response);
}

async function deleteUser(userId: number, token: string | null): Promise<DeleteUserInfo> {
    alert(token);

    const response = await fetch(URLs.DELETE_USER, {
        headers: _headers(XRequestIds.DELETE_USER, token),
        method: "DELETE",
        body: JSON.stringify({ userId }),
        credentials: "include"
    });

    return await _handleHttpResponse<DeleteUserInfo>(response);
}

async function createPuzzle(json: string, userId: number, token: string | null): Promise<CreatePuzzleInfo> {
    const response = await fetch(URLs.CREATE_PUZZLE, {
        headers: _headers(XRequestIds.CREATE_PUZZLE, token),
        method: "PUT",
        body: JSON.stringify({ json, userId }),
        credentials: "include"
    });

    return await _handleHttpResponse<CreatePuzzleInfo>(response);
}

async function updatePuzzle(puzzleId: number, json: string, token: string | null): Promise<UpdatePuzzleInfo> {
    const response = await fetch(URLs.UPDATE_PUZZLE, {
        headers: _headers(XRequestIds.UPDATE_PUZZLE, token),
        method: "PUT",
        body: JSON.stringify({ puzzleId, json }),
        credentials: "include"
    });

    return await _handleHttpResponse<UpdatePuzzleInfo>(response);
}

async function deletePuzzle(puzzleId: number, token: string | null): Promise<DeletePuzzleInfo> {
    const response = await fetch(URLs.DELETE_PUZZLE, {
        headers: _headers(XRequestIds.DELETE_PUZZLE, token),
        method: "DELETE",
        body: JSON.stringify({ puzzleId }),
        credentials: "include"
    });

    return await _handleHttpResponse<DeletePuzzleInfo>(response);
}

async function renewJwtToken(user: User, token: string): Promise<RenewJwtTokenInfo> {
    const response = await fetch(URLs.RENEW_TOKEN, {
        headers: _headers(XRequestIds.RENEW_TOKEN, token),
        method: "PUT",
        body: JSON.stringify({ user }),
        credentials: "include"
    });

    return await _handleHttpResponse<RenewJwtTokenInfo>(response);
}

export { retrieveBoard, signup, loginWithPassword, loginWithToken, updateUser, deleteUser, createPuzzle, updatePuzzle, deletePuzzle, renewJwtToken };
