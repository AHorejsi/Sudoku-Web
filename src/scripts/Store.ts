import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserState";

const store = configureStore({
    reducer: {
        login: userReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;