import React, { ReactNode } from "react";

interface SelectionRadioButtonProps {
    text: string;

    name: string;

    value: string;

    setter: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectionRadioButton(props: SelectionRadioButtonProps): ReactNode {
    return (
        <div>
            {`${props.text}:    `}
            
            <label htmlFor={props.name} />
            <input type="radio" name={props.name} onClick={(ev) => { props.setter(props.value) }} />
        </div>
    );
}
