import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

export const loadSlice = createSlice({
    name: "load",
    initialState: { puzzleId: null as number | null },
    reducers: {
        load: (state, actions) => {
            state.puzzleId = actions.payload as number | null;
        }
    }
});

export const { load } = loadSlice.actions;

export const selectSave = (state: RootState) => state.reloaded.puzzleId;

export default loadSlice.reducer;
