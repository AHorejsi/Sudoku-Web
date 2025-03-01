import "../styles/SelectionCard.scss";
import React, { ReactNode, useState } from "react";
import SelectionRadioButton from "./SelectionRadioButton";
import SelectionCheckbox from "./SelectionCheckbox";
import { retrieveBoard, Sudoku } from "./Sudoku";

interface SelectionCardProps {
    creator: React.Dispatch<React.SetStateAction<Sudoku | Error>>
}

function _generateButton(
    dimension: string,
    difficulty: string,
    games: string,
    creator: React.Dispatch<React.SetStateAction<Sudoku | Error>>
) {
    const sudoku = retrieveBoard(dimension, difficulty, games);

    sudoku.then((json: Sudoku) => {
        creator(json);
    }).catch((error: Error) => {
        creator(error);
    });
}

function _clearButton(
    setDimension: React.Dispatch<React.SetStateAction<string>>,
    setDifficulty: React.Dispatch<React.SetStateAction<string>>,
    setGames: React.Dispatch<React.SetStateAction<string>>,
) {
    setDimension("");
    setDifficulty("");
    setGames("");
}

export default function SelectionCard(props: SelectionCardProps): ReactNode {
    const [dimension, setDimension] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [games, setGames] = useState("");

    return (
        <div id="selection-card-main" className="container">
            <form>
                <div className="game-selections">
                    <div className="game-selection-row">
                        <p className="game-selection-title">Dimension</p>

                        <SelectionRadioButton name="dimension" value="FOUR" text="4x4" setter={setDimension} />
                        <SelectionRadioButton name="dimension" value="NINE" text="9x9" setter={setDimension} />
                        <SelectionRadioButton name="dimension" value="SIXTEEN" text="16x16" setter={setDimension} />
                    </div>

                    <div className="game-selection-row">
                        <p className="game-selection-title">Difficulty</p>

                        <SelectionRadioButton name="difficulty" value="BEGINNER" text="Beginner" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="EASY" text="Easy" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="MEDIUM" text="Medium" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="HARD" text="Hard" setter={setDifficulty} />
                        <SelectionRadioButton name="difficulty" value="MASTER" text="Master" setter={setDifficulty} />
                    </div>

                    <div className="game-selection-row">
                        <p className="game-selection-title">Game Types</p>

                        <SelectionCheckbox name="game-type" value="KILLER" text="Killer" getter={games} setter={setGames} />
                        <SelectionCheckbox name="game-type" value="HYPER" text="Hyper" getter={games} setter={setGames} />
                    </div>
                </div>

                <div id="generate-button" className="game-selection-row">
                    <p className="game-selection-title">Generate</p>

                    <label htmlFor="generate" />
                    <input type="button" value="Generate" onClick={(_) => _generateButton(dimension, difficulty, games, props.creator)} />

                    <br />

                    <label htmlFor="clear" />
                    <input type="button" value="Clear" onClick={(_) => _clearButton(setDimension, setDifficulty, setGames)} />
                </div>
            </form>
        </div>
    );
}
