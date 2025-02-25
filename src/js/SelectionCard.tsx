import "../css/SelectionCard.scss";
import React, { ReactNode } from "react";

interface SelectionCardProps {
    games: string[];
}

export default function SelectionCard(props: SelectionCardProps): ReactNode {
    const games = props.games.join(" : ");

    return (
        <div id="card-main" className="container">
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
