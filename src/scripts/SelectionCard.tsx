import "../styles/SelectionCard.scss";
import React, { ReactNode } from "react";

export default function SelectionCard(): ReactNode {    return (
        <div id="selection-card-main" className="container">
            <form>
                <div className="game-selections">
                    <div id="dimension-selection" className="game-selection-row">
                        <p className="game-selection-title">Dimension</p>
                    </div>
                    <div id="difficulty-selection" className="game-selection-row">
                        <p className="game-selection-title">Difficulty</p>
                    </div>
                    <div id="game-type-selection" className="game-selection-row">
                        <p className="game-selection-title">Game Types</p>
                    </div>
                </div>
                <div id="generate-button" className="game-selection-row">
                    <p className="game-selection-title">Generate</p>
                </div>
            </form>
        </div>
    );
}
