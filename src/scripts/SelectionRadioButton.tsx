import "../styles/Selection.css";
import { Dispatch, SetStateAction } from "react";

interface SelectionRadioButtonProps {
    prompt: string;

    name: string;

    value: string;

    setter: Dispatch<SetStateAction<string>>
}

export default function SelectionRadioButton(props: SelectionRadioButtonProps): React.JSX.Element {
    const setter = props.setter;

    return (
        <div className="input-title">
            {`${props.prompt}:`}
            
            <div className="input-box">
                <label htmlFor={props.name} />
                <input className="" type="radio" name={props.name} onClick={(_) => setter(props.value)} />
            </div>
        </div>
    );
}
