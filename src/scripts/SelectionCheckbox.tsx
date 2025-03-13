import React, { ReactNode } from "react";

interface SelectionCheckboxProps {
    prompt: string;

    name: string;

    value: string;

    getter: string[];

    setter: React.Dispatch<React.SetStateAction<string[]>>;
}

function _changeSelection(ev: React.FormEvent<HTMLInputElement>, props: SelectionCheckboxProps) {
    let selected = props.getter;
    const value = props.value;

    if (ev.currentTarget.checked) {
        selected.push(value);
    }
    else {
        selected = selected.filter((item) => item === value);
    }

    props.setter(selected);
}

export default function SelectionCheckbox(props: SelectionCheckboxProps): ReactNode {
    return (
        <div>
            {`${props.prompt}:    `}

            <label htmlFor={props.name} />
            <input type="checkbox" name={props.name} onClick={(ev) => _changeSelection(ev, props)}/>
        </div>
    );
}