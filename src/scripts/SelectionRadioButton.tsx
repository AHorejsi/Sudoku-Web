import { ReactNode, Dispatch, SetStateAction } from "react";

interface SelectionRadioButtonProps {
    prompt: string;

    name: string;

    value: string;

    setter: Dispatch<SetStateAction<string>>
}

export default function SelectionRadioButton(props: SelectionRadioButtonProps): ReactNode {
    return (
        <div>
            {`${props.prompt}:    `}
            
            <label htmlFor={props.name} />
            <input type="radio" name={props.name} onClick={(_) => { props.setter(props.value) }} />
        </div>
    );
}
