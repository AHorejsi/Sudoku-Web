import "../styles/SelectionCard.scss";
import React, { ReactNode, useState, Dispatch, SetStateAction } from "react";
import SelectionRadioButton from "./SelectionRadioButton";
import SelectionCheckbox from "./SelectionCheckbox";
import { GenerateInfo } from "./GenerateInfo";
import { retrieveBoard } from "./Fetch";

interface SelectionCardProps {
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>
}

function _generateButton(
    dimension: string,
    difficulty: string,
    games: string[],
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>
) {
    creator("Retrieving...");

    const generation = retrieveBoard(dimension, difficulty, games);

    generation.then((info: GenerateInfo) => {
        if (info.type.endsWith("Success")) {
            creator(info);
        }
        else {
            creator("PLEASE FILL FIELDS");
        }
    }).catch((error: Error) => {
        creator(error);
    });
}

export default function SelectionCard(props: SelectionCardProps): ReactNode {
    const [dimension, setDimension] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [games, setGames] = useState(Array<string>());

    return (
        <div id="selection-card-main" className="container">
            <form>
                <div className="game-selections">
                    <div className="game-selection-row">
                        <p className="game-selection-title">Dimension</p>

                        <SelectionRadioButton name="dimension" value="NINE" prompt="9x9" setter={setDimension} />
                        <SelectionRadioButton name="dimension" value="SIXTEEN" prompt="16x16" setter={setDimension} />
                    </div>

                    <div className="game-selection-row">
                        <p className="game-selection-title">Difficulty</p>

                        <SelectionRadioButton name="difficulty" value="BEGINNER" prompt="Beginner" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="EASY" prompt="Easy" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="MEDIUM" prompt="Medium" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="HARD" prompt="Hard" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="MASTER" prompt="Master" setter={setDifficulty} />
                    </div>

                    <div className="game-selection-row">
                        <p className="game-selection-title">Game Types</p>

                        <SelectionCheckbox name="game-type" value="KILLER" prompt="Killer" getter={games} setter={setGames} />
                        <SelectionCheckbox name="game-type" value="HYPER" prompt="Hyper" getter={games} setter={setGames} />
                    </div>
                </div>

                <div id="generate-button" className="game-selection-row">
                    <p className="game-selection-title">Generate</p>

                    <label htmlFor="generate" />
                    <input type="button" name="generate" value="Generate"
                        onClick={(_) => _generateButton(dimension, difficulty, games, props.creator)}
                    />
                </div>
            </form>
        </div>
    );
}
