interface Puzzle {
    id: number;

    json: string;
}

interface User {
    id: number;

    username: string;

    email: string;

    puzzles: Puzzle[];
}

interface LoginInfo {
    type: string;

    user: User | undefined;

    token: string | undefined;
}

export { Puzzle, User, LoginInfo };
