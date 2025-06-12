import { ReactNode, Dispatch, SetStateAction } from "react";

interface SelectionCheckboxProps {
    prompt: string;

    name: string;

    value: string;

    getter: string[];

    setter: Dispatch<SetStateAction<string[]>>;
}

function _changeSelection(ev: React.FormEvent<HTMLInputElement>, props: SelectionCheckboxProps) {
    const selected = props.getter;
    const value = props.value;

    if (ev.currentTarget.checked) {
        selected.push(value);
    }
    else {
        const index = selected.indexOf(value);

        selected.splice(index, 1);
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