import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import GameplayPage from "./GameplayPage";
import LoginPage from "./LoginPage";

export default function App(): ReactNode {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/gameplay" element={<GameplayPage />} />
            </Routes>
        </BrowserRouter>
    );
}
