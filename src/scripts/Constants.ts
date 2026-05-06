const ENVIRONMENT_MODE = process.env.NODE_ENV!;

enum Environment {
    DEV = "development",
    TEST = "testing",
    PROD = "production"
};

enum AuthType {
    BASIC = "basic",
    JWT = "jwt"
};

const Endpoints = {
    MAIN: process.env.ENDPOINT_MAIN!,
    SIGNUP: process.env.ENDPOINT_SIGNUP!,
    LOGIN: process.env.ENDPOINT_LOGIN!,
    GAMEPLAY: process.env.ENDPOINT_GAMEPLAY!,
    LOADER: process.env.ENDPOINT_LOADER!,
    SETTINGS: process.env.ENDPOINT_SETTINGS!,
    ERROR: process.env.ENDPOINT_ERROR!
};

const URLs = {
    GENERATE: process.env.GENERATE!,
    CREATE_USER: process.env.CREATE_USER!,
    READ_USER: process.env.READ_USER!,
    UPDATE_USER: process.env.UPDATE_USER!,
    DELETE_USER: process.env.DELETE_USER!,
    CREATE_PUZZLE: process.env.CREATE_PUZZLE!,
    UPDATE_PUZZLE: process.env.UPDATE_PUZZLE!,
    DELETE_PUZZLE: process.env.DELETE_PUZZLE!,
    TOKEN_LOGIN: process.env.TOKEN_LOGIN!,
    RENEW_TOKEN: process.env.RENEW_TOKEN!
};

const XRequestIds = {
    GENERATE: "Generate-Sudoku",
    CREATE_USER: "Create-User",
    READ_USER: "Read-User",
    UPDATE_USER: "Update-User",
    DELETE_USER: "Delete-User",
    CREATE_PUZZLE: "Create-Puzzle",
    UPDATE_PUZZLE: "Update-Puzzle",
    DELETE_PUZZLE: "Delete-Puzzle",
    TOKEN_LOGIN: "Token-Login",
    RENEW_TOKEN: "Renew-Token"
};

const BasicAuths = {
    NAME: process.env.BASIC_NAME!,
    PASS: process.env.BASIC_PASS!
};

const StorageNames = {
    JWT_TOKEN: process.env.JWT_TOKEN!
};

function hasEnv(desired: Environment): boolean {
    return desired === ENVIRONMENT_MODE;
}

function getBasicToken(): string {
    return window.btoa(`${BasicAuths.NAME}:${BasicAuths.PASS}`);
}

export { ENVIRONMENT_MODE, Endpoints, URLs, XRequestIds, StorageNames, AuthType, Environment, hasEnv, getBasicToken };
