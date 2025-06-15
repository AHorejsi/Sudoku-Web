import { configureStore } from "@reduxjs/toolkit";
import saveReducer from "./SaveState";

const store = configureStore({
    reducer: {
        saver: saveReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;