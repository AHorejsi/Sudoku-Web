import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

export const saveSlice = createSlice({
    name: "save",
    initialState: { puzzleId: null as number | null },
    reducers: {
        save: (state, id) => {
            state.puzzleId = id.payload;
        }
    }
});

export const { save } = saveSlice.actions;

export const selectSave = (state: RootState) => state.saver.puzzleId;

export default saveSlice.reducer;
