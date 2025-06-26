import { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Endpoints } from "./StringConstants";
import GameplayPage from "./GameplayPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserSettingsPage from "./UserSettingsPage";
import MainPage from "./MainPage";
import LoaderPage from "./LoaderPage";
import { Provider } from "react-redux";
import store from "./Store";

export default function App(): ReactNode {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={Endpoints.MAIN} element={<MainPage />} />
                    <Route path={Endpoints.SIGNUP} element={<SignUpPage />} />
                    <Route path={Endpoints.LOGIN} element={<LoginPage />} />
                    <Route path={Endpoints.GAMEPLAY} element={<GameplayPage />} />
                    <Route path={Endpoints.LOADER} element={<LoaderPage />} />
                    <Route path={Endpoints.SETTINGS} element={<UserSettingsPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
