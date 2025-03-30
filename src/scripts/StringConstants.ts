const Endpoints = {
    generate: "http://127.0.0.1:8080/generate",
    createUser: "http://127.0.0.1:8080/createUser",
    readUser: "http://127.0.0.1:8080/readUser",
    updateUser: "http://127.0.0.1:8080/updateUser",
    deleteUser: "http://127.0.0.1:8080/deleteUser"
};

const XRequestIds = {
    generate: "Generate-Sudoku",
    createUser: "Create-User",
    readUser: "Read-User",
    updateUser: "Update-User",
    deleteUser: "Delete-User"
}

export { Endpoints, XRequestIds };
