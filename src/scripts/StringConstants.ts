const Endpoints = {
    MAIN: "/",
    SIGNUP: "/signup",
    LOGIN: "/login",
    GAMEPLAY: "/gameplay",
    LOADER: "/loader",
    SETTINGS: "/settings"
};

const URLs = {
    GENERATE: "http://127.0.0.1:8080/generate",
    CREATE_USER: "http://127.0.0.1:8080/createUser",
    READ_USER: "http://127.0.0.1:8080/readUser",
    UPDATE_USER: "http://127.0.0.1:8080/updateUser",
    DELETE_USER: "http://127.0.0.1:8080/deleteUser",
    CREATE_PUZZLE: "http://127.0.0.1:8080/createPuzzle",
    UPDATE_PUZZLE: "http://127.0.0.1:8080/updatePuzzle",
    DELETE_PUZZLE: "http://127.0.0.1:8080/deletePuzzle"
};

const XRequestIds = {
    GENERATE: "Generate-Sudoku",
    CREATE_USER: "Create-User",
    READ_USER: "Read-User",
    UPDATE_USER: "Update-User",
    DELETE_USER: "Delete-User",
    CREATE_PUZZLE: "Create-Puzzle",
    UPDATE_PUZZLE: "Update-Puzzle",
    DELETE_PUZZLE: "Delete-Puzzle"
}

export { Endpoints, URLs, XRequestIds };
