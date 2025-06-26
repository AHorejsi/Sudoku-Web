import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Puzzle, User } from "./LoginInfo";

function _findById(puzzleSet: Puzzle[], id: number): number | null {
    let index = 0;

    for (const puzzle of puzzleSet) {
        if (id === puzzle.id) {
            return index;
        }

        ++index;
    }

    return null;
}

export const userSlice = createSlice({
    name: "user",
    initialState: { user: null as User | null },
    reducers: {
        user: (state, actions) => {
            state.user = actions.payload as User | null;
        },
        puzzle: (state, actions) => {
            const payload = actions.payload;
            const puzzles = state.user!.puzzles;

            switch (payload.operation) {
            case "ADD_ITEM":
                puzzles.push(payload.newPuzzle);

                break;
            case "UPDATE_ITEM":
                const indexToUpdate = _findById(puzzles, payload.puzzleId);
                puzzles[indexToUpdate!]!.json = payload.json;

                break;
            case "DELETE_ITEM":
                const indexToRemove = _findById(puzzles, payload.puzzleId);
                puzzles.splice(indexToRemove!, 1);

                break;
            }
        }
    }
});

export const { user, puzzle } = userSlice.actions;

export const selectUser = (state: RootState) => state.login.user;

export default userSlice.reducer;
