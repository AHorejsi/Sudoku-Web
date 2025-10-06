import "../styles/SelectionCard.css";
import { ReactNode, useState, Dispatch, SetStateAction, useRef } from "react";
import { retrieveBoard } from "./Fetch";
import { GenerateInfo } from "./GenerateInfo";
import SelectionRadioButton from "./SelectionRadioButton";
import SelectionCheckbox from "./SelectionCheckbox";
import { load } from "./LoadState";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";

interface SelectionCardProps {
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>;

    token: string;
}

function _generate(
    dimension: string,
    difficulty: string,
    games: string[],
    token: string,
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>,
    dispatch: AppDispatch,
    button: HTMLInputElement
) {
    creator("Retrieving...");
    button.disabled = true;

    retrieveBoard(dimension, difficulty, games, token).then((info: GenerateInfo) => {
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
        
        button.disabled = false;
    });
}

export default function SelectionCard(props: SelectionCardProps): ReactNode {
    const dimension = "NINE";
    const [difficulty, setDifficulty] = useState("");
    const [games, setGames] = useState(Array<string>());

    const dispatch = useAppDispatch();
    const button = useRef<HTMLInputElement>(null);

    return (
        <div id="selection-card">
            <form>
                <div>
                    <p className="game-selection-title">Difficulty</p>
                    <SelectionRadioButton name="difficulty" value="BEGINNER" prompt="Beginner" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="EASY" prompt="Easy" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="MEDIUM" prompt="Medium" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="HARD" prompt="Hard" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="MASTER" prompt="Master" setter={setDifficulty} />

                    <p className="game-selection-title">Game Types</p>
                    <SelectionCheckbox name="game-type" value="KILLER" prompt="Killer" getter={games} setter={setGames} />
                    <SelectionCheckbox name="game-type" value="HYPER" prompt="Hyper" getter={games} setter={setGames} />
                </div>

                <div id="generate-button">
                    <p className="game-selection-title">Generate</p>

                    <label htmlFor="generate" />
                    <input className="btn btn-success" ref={button} type="button" name="generate" value="Generate"
                        onClick={(_) => _generate(dimension, difficulty, games, props.token, props.creator, dispatch, button.current!)}
                    />
                </div>
            </form>
        </div>
    );
}
