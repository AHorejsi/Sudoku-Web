import React, { ReactNode } from "react";

interface SelectionCheckboxProps {
    text: string;

    name: string;

    value: string;

    getter: string;

    setter: React.Dispatch<React.SetStateAction<string>>;
}

function _changeGames(ev: React.FormEvent<HTMLInputElement>, props: SelectionCheckboxProps) {
    const currentGames = props.getter;
    const value = props.value;
    let newGames: string;

    if (ev.currentTarget.checked) {
        if (0 === currentGames.length) {
            newGames = value;
        }
        else {
            newGames = `${currentGames},${value}`
        }
    }
    else {
        newGames = currentGames.split(",").filter((item) => item === value).join(",");
    }

    props.setter(newGames);
}

export default function SelectionCheckbox(props: SelectionCheckboxProps): ReactNode {
    return (
        <div>
            {`${props.text}:    `}
            <label htmlFor={props.name} />
            <input type="checkbox" name={props.name} onClick={(ev) => _changeGames(ev, props)}/>
            <br />
        </div>
    );
}