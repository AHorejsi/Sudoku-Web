import "../styles/SelectionCard.css";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { retrieveBoard } from "./Fetch";
import { GenerateInfo } from "./GenerateInfo";
import SelectionRadioButton from "./SelectionRadioButton";
import SelectionCheckbox from "./SelectionCheckbox";
import { load } from "./UserState";
import { useAppDispatch } from "./Hooks";
import { AppDispatch } from "./Store";
import { Endpoints, StorageNames } from "./Constants";
import { getItemFromStorage } from "./Storage";

interface SelectionCardProps {
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>;
}

function _generate(
    dimension: string,
    difficulty: string,
    games: string[],
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>,
    nav: NavigateFunction,
    dispatch: AppDispatch,
    button: HTMLInputElement
): void {
    creator("Retrieving...");
    button.disabled = true;

    const token = getItemFromStorage(StorageNames.JWT_TOKEN) ?? "";

    retrieveBoard(dimension, difficulty, games, token).then((info) => {
        _generateHelper(info, creator, button);
    }).catch((error) => {
        nav(Endpoints.ERROR, { state: error });
    }).finally(() => {
        dispatch(load(null));
    });
}

function _generateHelper(
    info: GenerateInfo,
    creator: Dispatch<SetStateAction<GenerateInfo | string | Error>>,
    button: HTMLInputElement
): void {
    if (info.type.endsWith("Success")) {
        creator(info);
    }
    else if (info.type.endsWith("UnfilledFields")) {
        creator(new Error("PLEASE FILL FIELDS"));
    }

    button.disabled = false;
}

export default function SelectionCard(props: SelectionCardProps): React.JSX.Element {
    const dimension = "NINE";
    const [difficulty, setDifficulty] = useState("");
    const [games, setGames] = useState(Array<string>());

    const dispatch = useAppDispatch();

    const nav = useNavigate();
    const button = useRef<HTMLInputElement>(null);

    return (
        <div id="selection-card">
            <form onClick={(_) => false}>
                <div>
                    <p className="game-selection-title">Difficulty</p>
                    <SelectionRadioButton name="difficulty" value="BEGINNER" prompt="Beginner" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="EASY" prompt="Easy" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="MEDIUM" prompt="Medium" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="HARD" prompt="Hard" setter={setDifficulty} />
                    <SelectionRadioButton name="difficulty" value="MASTER" prompt="Master" setter={setDifficulty} />

                    <p className="game-selection-title">Game Types</p>
                    <SelectionCheckbox name="game-type" value="KILLER" prompt="Killer" current={games} setter={setGames} />
                    <SelectionCheckbox name="game-type" value="HYPER" prompt="Hyper" current={games} setter={setGames} />
                </div>

                <div id="generate-button">
                    <p className="game-selection-title">Generate</p>

                    <label htmlFor="generate" />
                    <input className="btn btn-success" ref={button} type="button" name="generate" value="Generate"
                        onClick={(_) => _generate(dimension, difficulty, games, props.creator, nav, dispatch, button.current!)}
                    />
                </div>
            </form>
        </div>
    );
}
