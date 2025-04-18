const Endpoints = {
    GENERATE: "http://127.0.0.1:8080/generate",
    CREATE_USER: "http://127.0.0.1:8080/createUser",
    READ_USER: "http://127.0.0.1:8080/readUser",
    UPDATE_USER: "http://127.0.0.1:8080/updateUser",
    DELETE_USER: "http://127.0.0.1:8080/deleteUser"
};

const XRequestIds = {
    GENERATE: "Generate-Sudoku",
    CREATE_USER: "Create-User",
    READ_USER: "Read-User",
    UPDATE_USER: "Update-User",
    DELETE_USER: "Delete-User"
}

export { Endpoints, XRequestIds };
