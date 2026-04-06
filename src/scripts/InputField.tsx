import "../styles/InputField.css";
import { FormEventHandler } from "react";

interface InputFieldProps {
    classes?: string;

    label: string;

    prompt: string;

    covered: boolean;

    inputEvent?: FormEventHandler<HTMLInputElement>
}

export default function InputField(props: InputFieldProps): React.JSX.Element {
    return (
        <div className="container field-block">
            <label className="field-title" htmlFor={props.label}>{props.prompt}</label>
            <input 
                className={`${props.classes} field-box`} type={props.covered ? "password" : "text"} name={props.label}
                onInput={props.inputEvent}
            />
        </div>
    );
}
