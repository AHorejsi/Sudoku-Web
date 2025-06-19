import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { User } from "./LoginInfo";

export const userSlice = createSlice({
    name: "user",
    initialState: { user: null as User | null },
    reducers: {
        user: (state, actions) => {
            state.user = actions.payload;
        },
        update: (state, actions) => {
            const payload = actions.payload;

            switch (payload.operation) {
            case "ADD_ITEM":
                state.user!.puzzles.push(payload.newPuzzle);

                break;
            case "UPDATE_ITEM":
                state.user!.puzzles[payload.index].json = payload.json;

                break;
            case "REMOVE_ITEM":
                state.user!.puzzles.splice(payload.index, 1);

                break;
            }
        }
    }
});

export const { user, update } = userSlice.actions;

export const selectUser = (state: RootState) => state.login.user;

export default userSlice.reducer;
