import "../styles/SelectionCard.scss";
import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { retrieveBoard } from "./Fetch";
import { GenerateInfo } from "./GenerateInfo";
import SelectionRadioButton from "./SelectionRadioButton";
import SelectionCheckbox from "./SelectionCheckbox";
import { load } from "./LoadState";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";

interface SelectionCardProps {
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>
}

function _generateButton(
    dimension: string,
    difficulty: string,
    games: string[],
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>,
    dispatch: AppDispatch
) {
    creator("Retrieving...");

    retrieveBoard(dimension, difficulty, games).then((info: GenerateInfo) => {
        if (info.type.endsWith("Success")) {
            creator(info);
        }
        else {
            creator(new Error("PLEASE FILL FIELDS"));
        }
    }).catch((error: Error) => {
        creator(error);
    }).finally(() => {
        dispatch(load(null));
    });
}

export default function SelectionCard(props: SelectionCardProps): ReactNode {
    const dimension = "NINE";
    const [difficulty, setDifficulty] = useState("");
    const [games, setGames] = useState(Array<string>());

    const dispatch = useAppDispatch();

    return (
        <div id="selection-card-main" className="container">
            <form>
                <div className="game-selections">
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
                        onClick={(_) => _generateButton(dimension, difficulty, games, props.creator, dispatch)}
                    />
                </div>
            </form>
        </div>
    );
}
