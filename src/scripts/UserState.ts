import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Puzzle, User } from "./LoginInfo";

interface _PuzzleSave {
    operation: "ADD_ITEM" | "UPDATE_ITEM" | "DELETE_ITEM";

    data: _PuzzleAdd | _PuzzleUpdate | _PuzzleDelete;
}

interface _PuzzleAdd {
    newPuzzle: Puzzle;
}

interface _PuzzleUpdate {
    puzzleId: number;

    json: string;
}

interface _PuzzleDelete {
    puzzleId: number;
}

function _findById(puzzleSet: Puzzle[], id: number): number {
    let index = 0;

    for (const puzzle of puzzleSet) {
        if (id === puzzle.id) {
            return index;
        }

        ++index;
    }

    return -1;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null as User | null,
        loadId: null as number | null,
        token: null as string | null
    },
    reducers: {
        user: (state, actions) => {
            state.user = actions.payload as User | null;
        },
        load: (state, actions) => {
            state.loadId = actions.payload as number | null;
        },
        save: (state, actions) => {
            const payload = actions.payload as _PuzzleSave;
            const puzzles = state.user!.puzzles;

            let data;

            switch (payload.operation) {
            case "ADD_ITEM":
                data = payload.data as _PuzzleAdd;

                puzzles.push(data.newPuzzle);

                break;
            case "UPDATE_ITEM":
                data = payload.data as _PuzzleUpdate;

                const indexToUpdate = _findById(puzzles, data.puzzleId);
                puzzles[indexToUpdate]!.json = data.json;

                break;
            case "DELETE_ITEM":
                data = payload.data as _PuzzleDelete;

                const indexToRemove = _findById(puzzles, data.puzzleId);
                puzzles.splice(indexToRemove, 1);

                break;
            }
        }
    }
});

export const { user, load, save } = userSlice.actions;

export const selectUser = (state: RootState) => state.login.user;
export const selectLoad = (state: RootState) => state.login.loadId;

export default userSlice.reducer;
