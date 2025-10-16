import { ReactNode, Dispatch, SetStateAction, FormEvent } from "react";

interface SelectionCheckboxProps {
    prompt: string;

    name: string;

    value: string;

    current: string[];

    setter: Dispatch<SetStateAction<string[]>>;
}

function _changeSelection(ev: FormEvent<HTMLInputElement>, props: SelectionCheckboxProps) {
    const current = props.current;
    const value = props.value;

    if (ev.currentTarget.checked) {
        current.push(value);
    }
    else {
        const index = current.indexOf(value);

        current.splice(index, 1);
    }

    props.setter(current);
}

export default function SelectionCheckbox(props: SelectionCheckboxProps): ReactNode {
    return (
        <div>
            {`${props.prompt}:`}

            <label htmlFor={props.name} />
            <input type="checkbox" name={props.name} onClick={(ev) => _changeSelection(ev, props)}/>
        </div>
    );
}