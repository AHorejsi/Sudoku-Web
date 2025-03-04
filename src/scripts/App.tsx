import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import GameplayPage from "./GameplayPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default function App(): ReactNode {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/gameplay" element={<GameplayPage />} />
            </Routes>
        </BrowserRouter>
    );
}
