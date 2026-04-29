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

function _makeHeaders(xReqId: string, token: string | null): HeadersInit {
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

function _makeRequest(httpMethod: string, xReqId: string, jwtToken: string | null, json: any): RequestInit {
    const bodyJson = json ? JSON.stringify(json) : null;

    return {
        headers: _makeHeaders(xReqId, jwtToken),
        method: httpMethod,
        body: bodyJson,
        credentials: "include",
        cache: "default",
        mode: "cors",
        redirect: "error",
        keepalive: true
    };
}

async function _handleHttp<TInfoType>(url: string, request: RequestInit): Promise<TInfoType> {
    const response = await fetch(url, request);

    if (!response.ok) {
        throw new Error(`Response Status: ${response.status}. ${response.statusText}`)
    }

    return await response.json() as TInfoType;
}

async function retrieveBoard(dimension: string, difficulty: string, games: string[], jwtToken: string | null): Promise<GenerateInfo> {
    const body = { dimension, difficulty, games };
    const request = _makeRequest("POST", XRequestIds.GENERATE, jwtToken, body);

    return await _handleHttp<GenerateInfo>(URLs.GENERATE, request);
}

async function signup(username: string, email: string, password: string): Promise<SignupInfo> {
    const body = { username, email, password };
    const request = _makeRequest("PUT", XRequestIds.CREATE_USER, null, body);
    
    return await _handleHttp<SignupInfo>(URLs.CREATE_USER, request);
}

async function loginWithPassword(usernameOrEmail: string, password: string): Promise<LoginInfo> {
    const body = { usernameOrEmail, password };
    const request = _makeRequest("POST", XRequestIds.READ_USER, null, body);

    return await _handleHttp<LoginInfo>(URLs.READ_USER, request);
}

async function loginWithToken(jwtToken: string): Promise<LoginInfo> {
    const request = _makeRequest("GET", XRequestIds.TOKEN_LOGIN, jwtToken, undefined);

    return await _handleHttp<LoginInfo>(URLs.TOKEN_LOGIN, request);
}

async function updateUser(
    userId: number,
    newUsername: string,
    newEmail: string,
    jwtToken: string | null
): Promise<UpdateUserInfo> {
    const body = { userId, newUsername, newEmail };
    const request = _makeRequest("PUT", XRequestIds.UPDATE_USER, jwtToken, body);

    return await _handleHttp<UpdateUserInfo>(URLs.UPDATE_USER, request);
}

async function deleteUser(userId: number, jwtToken: string | null): Promise<DeleteUserInfo> {
    const body = { userId };
    const request = _makeRequest("DELETE", XRequestIds.DELETE_USER, jwtToken, body);

    return await _handleHttp<DeleteUserInfo>(URLs.DELETE_USER, request);
}

async function createPuzzle(json: string, userId: number, jwtToken: string | null): Promise<CreatePuzzleInfo> {
    const body = { json, userId };
    const request = _makeRequest("PUT", XRequestIds.CREATE_PUZZLE, jwtToken, body);

    return await _handleHttp<CreatePuzzleInfo>(URLs.CREATE_PUZZLE, request);
}

async function updatePuzzle(puzzleId: number, json: string, jwtToken: string | null): Promise<UpdatePuzzleInfo> {
    const body = { puzzleId, json };
    const request = _makeRequest("PUT", XRequestIds.UPDATE_PUZZLE, jwtToken, body);

    return await _handleHttp<UpdatePuzzleInfo>(URLs.UPDATE_PUZZLE, request);
}

async function deletePuzzle(puzzleId: number, jwtToken: string | null): Promise<DeletePuzzleInfo> {
    const body = { puzzleId };
    const request = _makeRequest("DELETE", XRequestIds.DELETE_PUZZLE, jwtToken, body);

    return await _handleHttp<DeletePuzzleInfo>(URLs.DELETE_PUZZLE, request);
}

async function renewJwtToken(user: User, jwtToken: string): Promise<RenewJwtTokenInfo> {
    const body = { user };
    const request = _makeRequest("PUT", XRequestIds.RENEW_TOKEN, jwtToken, body);

    return await _handleHttp<RenewJwtTokenInfo>(URLs.RENEW_TOKEN, request);
}

export { retrieveBoard, signup, loginWithPassword, loginWithToken, updateUser, deleteUser, createPuzzle, updatePuzzle, deletePuzzle, renewJwtToken };
