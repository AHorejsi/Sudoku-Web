import { configureStore } from "@reduxjs/toolkit";
import loadReducer from "./LoadState";
import userReducer from "./UserState";

const store = configureStore({
    reducer: {
        reloaded: loadReducer,
        login: userReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;